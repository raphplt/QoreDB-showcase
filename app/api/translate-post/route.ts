import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { randomBytes, randomUUID } from "crypto";

// Configure a client with a write token
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const TARGET_LANGUAGES = ["en", "es", "it", "de", "zh", "ja"];

function randomKey(): string {
  return randomBytes(6).toString("hex");
}

// 100% Free Translation Function using GROQ API (Llama 3)
// Requires GROQ_API_KEY in .env.local
async function translateBatch(texts: string[], targetLang: string) {
  if (!texts.length) return texts;

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    console.warn("GROQ_API_KEY is missing. Returning original text.");
    return texts;
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: `You are an expert translator. Translate the strings inside the JSON object into ${targetLang}. Preserve any specific formatting. RETURN ONLY A VALID JSON OBJECT strictly following this structure: {"translations": ["traduction 1", "traduction 2"]}. Do NOT include markdown blocks like \`\`\`json.`,
            },
            {
              role: "user",
              content: JSON.stringify({ translations: texts }),
            },
          ],
          temperature: 0.1,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      console.error("Groq API Error:", await response.text());
      return texts;
    }

    const data = await response.json();
    const resultContent = JSON.parse(data.choices[0].message.content);

    if (
      resultContent.translations &&
      Array.isArray(resultContent.translations)
    ) {
      return resultContent.translations;
    }

    return texts;
  } catch (error) {
    console.error("Translation error:", error);
    return texts;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { documentId } = await req.json();

    if (!documentId)
      return NextResponse.json({ error: "No documentId" }, { status: 400 });

    // Fetch the published version of the document (strip drafts. prefix)
    const baseId = documentId.replace("drafts.", "");
    const originalPost = await writeClient.getDocument(baseId);
    if (!originalPost)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const originalLang = (originalPost.language as string) || "fr";
    console.log(
      `Starting translation of post ${baseId} (lang: ${originalLang}) to ${TARGET_LANGUAGES.length} languages...`
    );

    // Check if a translation.metadata document already exists for this post
    const existingMetadata = await writeClient.fetch(
      `*[_type == "translation.metadata" && references($id)][0]`,
      { id: baseId }
    );

    // Determine the metadata document ID
    const metadataId = existingMetadata?._id || randomUUID();

    // Run all translations in parallel
    const translationResults = await Promise.all(
      TARGET_LANGUAGES.map(async (lang) => {
        console.log(`Translating to ${lang}...`);

        // Extract all translatable text
        const textsToTranslate: string[] = [];
        const textPaths: { blockIndex: number; childIndex: number }[] = [];

        textsToTranslate.push((originalPost.title as string) || "");

        const translatedBody = JSON.parse(
          JSON.stringify(originalPost.body || [])
        );

        for (let i = 0; i < translatedBody.length; i++) {
          const block = translatedBody[i];
          if (block._type === "block" && Array.isArray(block.children)) {
            for (let j = 0; j < block.children.length; j++) {
              const child = block.children[j];
              if (
                child._type === "span" &&
                child.text &&
                child.text.trim() !== ""
              ) {
                textsToTranslate.push(child.text);
                textPaths.push({ blockIndex: i, childIndex: j });
              }
            }
          }
        }

        // Send batch to translate
        const translatedTexts = await translateBatch(textsToTranslate, lang);
        const translatedTitle = translatedTexts[0] || originalPost.title;

        // Re-inject translations into body
        for (let k = 0; k < textPaths.length; k++) {
          const path = textPaths[k];
          translatedBody[path.blockIndex].children[path.childIndex].text =
            translatedTexts[k + 1] || textsToTranslate[k + 1];
        }

        // Generate a stable ID for this translation
        const translatedDocId = `${baseId}-${lang}`;

        // Build the translated document — published directly (no drafts. prefix)
        // so the translation.metadata references resolve correctly
        const { _createdAt, _updatedAt, _rev, ...postWithoutMeta } =
          originalPost;
        const translatedDoc = {
          ...postWithoutMeta,
          _id: translatedDocId,
          _type: "post",
          language: lang,
          title: translatedTitle,
          body: translatedBody,
          slug: originalPost.slug,
        };

        await writeClient.createOrReplace(translatedDoc);
        console.log(`Created published translation for ${lang}: ${translatedDocId}`);

        return { lang, id: translatedDocId };
      })
    );

    // Build the translations array in the exact format expected by
    // @sanity/document-internationalization v6
    // Each entry needs: { _key, _type, language, value: { _type, _ref, _weak, _strengthenOnPublish } }
    const translationsArray = [
      // Original document reference
      {
        _key: randomKey(),
        _type: "internationalizedArrayReferenceValue",
        language: originalLang,
        value: {
          _type: "reference",
          _ref: baseId,
          _weak: true,
          _strengthenOnPublish: {
            type: "post",
          },
        },
      },
      // All translated document references
      ...translationResults.map((doc) => ({
        _key: randomKey(),
        _type: "internationalizedArrayReferenceValue",
        language: doc.lang,
        value: {
          _type: "reference",
          _ref: doc.id,
          _weak: true,
          _strengthenOnPublish: {
            type: "post",
          },
        },
      })),
    ];

    // Create or update the translation.metadata document
    // This document uses liveEdit, so we write directly (no drafts prefix)
    if (existingMetadata) {
      await writeClient
        .patch(metadataId)
        .set({ translations: translationsArray })
        .commit();
      console.log(`Updated translation metadata: ${metadataId}`);
    } else {
      await writeClient.createOrReplace({
        _id: metadataId,
        _type: "translation.metadata",
        translations: translationsArray,
        schemaTypes: ["post"],
      });
      console.log(`Created translation metadata: ${metadataId}`);
    }

    return NextResponse.json({
      success: true,
      translations: translationResults.length,
    });
  } catch (error: any) {
    console.error("Translation API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
