import type { Metadata } from "next";
import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import type { PostDocument } from "@/types/posts";
import { ArticleCard } from "../../../components/blog/ArticleCard";
import { client } from "../../../lib/sanity/client";
import { POSTS_QUERY } from "../../../lib/sanity/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return {
    title: t("metadata.blog_title"),
    description: t("metadata.blog_description"),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <div className="min-h-screen flex flex-col bg-(--q-bg-0) text-(--q-text-0)">
      <Header />
      <main className="flex-1 container mx-auto pt-32 pb-20 px-6 space-y-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("blog_page.title")}
          </h1>
          <p className="text-(--q-text-1) text-lg">{t("blog_page.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post: PostDocument) => (
              <div key={post._id}>
                <ArticleCard post={post} locale={locale} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-(--q-text-2)">
              <p>{t("blog_page.empty")}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
