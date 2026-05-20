import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (value, context) => {
          const { document, getClient } = context;
          const id = document?._id?.replace(/^drafts\./, "") || "";
          const language = document?.language || "fr";
          const query = `!defined(*[
            !(_id in [$draft, $published]) &&
            slug.current == $slug &&
            language == $language
          ][0]._id)`;
          const client = getClient({ apiVersion: "2023-01-01" });
          return await client.fetch(query, {
            draft: `drafts.${id}`,
            published: id,
            slug: (value as string) || "",
            language,
          });
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        }),
        defineArrayMember({
          name: "codeBlock",
          title: "Code Block",
          type: "object",
          fields: [
            {
              name: "code",
              title: "Code",
              type: "text",
            },
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "JavaScript", value: "javascript" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                  { title: "SQL", value: "sql" },
                  { title: "JSON", value: "json" },
                  { title: "Bash", value: "bash" },
                ],
              },
            },
            {
              name: "filename",
              title: "Filename",
              type: "string",
              description: "e.g., index.ts",
            },
          ],
        }),
        defineArrayMember({
          name: "callout",
          title: "Callout",
          type: "object",
          fields: [
            {
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Tip", value: "tip" },
                ],
                layout: "radio",
              },
            },
            {
              name: "text",
              title: "Text",
              type: "text",
            },
          ],
        }),
        defineArrayMember({
          name: "youtube",
          title: "YouTube Video",
          type: "object",
          fields: [
            {
              name: "url",
              title: "YouTube Video URL",
              type: "url",
            },
          ],
        }),
        defineArrayMember({
          name: "divider",
          title: "Divider",
          type: "object",
          fields: [
            {
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [{ title: "Horizontal Rule", value: "hr" }],
              },
              initialValue: "hr",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "related",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
      description: "Select related articles manually to start with.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
