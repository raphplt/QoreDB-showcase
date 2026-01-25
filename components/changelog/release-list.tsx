"use client";

import { useState } from "react";
import { GithubRelease } from "@/lib/github";
import { ReleaseCard } from "./release-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ReleaseListProps {
	initialReleases: GithubRelease[];
}

export function ReleaseList({ initialReleases }: ReleaseListProps) {
	const { t } = useTranslation();
	const [visibleCount, setVisibleCount] = useState(2);
	const releases = initialReleases.slice(0, visibleCount);
	const hasMore = visibleCount < initialReleases.length;

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	return (
		<div className="space-y-6">
			{releases.length > 0 ? (
				releases.map((release, index) => (
					<ReleaseCard key={release.id} release={release} index={index} />
				))
			) : (
				<div className="text-center text-muted-foreground py-12">
					<p>{t("changelog.no_releases", "No release notes found.")}</p>
				</div>
			)}

			{hasMore && (
				<div className="flex justify-center pt-8">
					<Button
						variant="outline"
						size="lg"
						onClick={handleLoadMore}
						className="gap-2"
					>
						{t("changelog.load_more", "Load more releases")}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
