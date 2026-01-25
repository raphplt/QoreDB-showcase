import { getReleases } from "@/lib/github";
import { ReleaseList } from "@/components/changelog/release-list";
import { useTranslation } from "@/app/[locale]/i18n";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export const metadata = {
	title: "Changelog - QoreDB",
	description:
		"Stay up to date with the latest changes and improvements to QoreDB.",
};

export default async function ChangelogPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(locale, "common");
	const releases = await getReleases();

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none -z-10" />

			<Header />

			<main className="flex-grow container relative mx-auto px-4 pt-32 pb-20 z-10">
				<div className="max-w-4xl mx-auto space-y-12">
					{/* Header */}
					<div className="text-center space-y-4">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
							{t("changelog.title", "Changelog")}
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							{t(
								"changelog.subtitle",
								"Stay up to date with the latest changes and improvements to QoreDB.",
							)}
						</p>
					</div>

					{/* Releases List */}
					<ReleaseList initialReleases={releases} />
				</div>
			</main>

			<Footer />
		</div>
	);
}
