import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/locale";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import {
  getAbsoluteUrl,
  getLanguageAlternates,
  getLocalizedUrl,
  INDEXABLE_PATHS,
} from "@/lib/seo";
import type { PostDocument } from "@/types/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = INDEXABLE_PATHS.flatMap(
    (pathname) =>
      SUPPORTED_LOCALES.map((locale) => ({
        url: getLocalizedUrl(locale, pathname),
        lastModified: now,
        changeFrequency: (pathname === "/" ? "weekly" : "monthly") as
          | "weekly"
          | "monthly",
        priority: pathname === "/" ? 1 : pathname === "/pricing" ? 0.9 : 0.8,
        alternates: {
          languages: getLanguageAlternates(pathname),
        },
      })),
  );

  const posts = await client.fetch<PostDocument[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 300 } },
  );
  const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((post) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: getLocalizedUrl(locale, `/blog/${post.slug.current}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: getLanguageAlternates(`/blog/${post.slug.current}`),
      },
      images: post.mainImage
        ? [getAbsoluteUrl("/images/screenshots/query-screen.png")]
        : undefined,
    })),
  );

  return [...staticRoutes, ...blogRoutes];
}
