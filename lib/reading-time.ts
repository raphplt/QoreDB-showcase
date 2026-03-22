import type { PortableText } from "@/types/posts";

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(body?: PortableText): number {
  if (!body) return 1;
  const text = body
    .filter((block) => block._type === "block")
    .flatMap((block) =>
      "children" in block && block.children
        ? block.children.map((span) => span.text)
        : []
    )
    .join(" ");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
