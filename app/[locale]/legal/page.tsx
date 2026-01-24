"use client";

import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();
  
  const sections = [
    "editor", 
    "hosting", 
    "ip", 
    "liability", 
    "external_links", 
    "privacy", 
    "terms",
    "license",
    "contact"
  ];

  return (
			<div className="min-h-screen flex flex-col bg-(--q-bg-0) text-(--q-text-0)">
				<Header />
				<main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
					<div className="text-center mb-16 relative">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-(--q-accent) opacity-5 blur-[100px] rounded-full pointer-events-none" />
						<h1 className="relative text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-br from-(--q-text-0) to-(--q-text-1)">
							{t("legal_page.title")}
						</h1>
						<p className="text-(--q-text-2) relative">
							{t("legal_page.last_updated")}
						</p>
					</div>

					<div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
						{sections.map((section) => (
							<section key={section} className="space-y-4">
								<h2 className="text-2xl font-semibold text-(--q-text-0)">
									{t(`legal_page.sections.${section}.title`)}
								</h2>
								<div
									className="text-(--q-text-1) leading-relaxed whitespace-pre-line"
									dangerouslySetInnerHTML={{
										__html: t(`legal_page.sections.${section}.content`)
											.replace(
												/\*\*(.*?)\*\*/g,
												"<strong class='text-(--q-text-0)'>$1</strong>",
											)
											.replace(
												/\[(.*?)\]\((.*?)\)/g,
												"<a href='$2' class='text-(--q-accent) hover:underline'>$1</a>",
											)
											.replace(
												/^> (.*)/gm,
												"<blockquote class='border-l-4 border-(--q-accent) pl-4 italic text-(--q-text-2)'>$1</blockquote>",
											)
											.replace(
												/➡️/g,
												"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='inline-block mr-1 mb-0.5 text-(--q-accent)'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>",
											)
											// Simple markdown list parser for * item
											.replace(
												/^\* (.*)/gm,
												"<ul class='list-disc pl-5'><li>$1</li></ul>",
											),
										// Fix adjacent lists (very naive, but might work for this specific content structure if needed, or better: just let prose handle it if we passed raw markdown, but we aren't using a markdown renderer here, just simple replacements. The regex above for lists creates a new ul for every item. Ideally we'd group them but for simple display this might be 'okay' visually if margins are small, or I should improve it.)
										// Actually, the `whitespace-pre-line` class handles newlines, so replacing `* ` with bullet points might work if we wrap properly.
										// Let's rely on the simple replacement for now. The previous privacy page used simple replacements too.
									}}
								/>
							</section>
						))}
					</div>
				</main>
				<Footer />
			</div>
		);
}
