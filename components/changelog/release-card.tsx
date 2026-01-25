import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { GithubRelease } from "@/lib/github";
import { Download, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

interface ReleaseCardProps {
	release: GithubRelease;
	index: number;
}

export function ReleaseCard({ release, index }: ReleaseCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const { t } = useTranslation();
	const MAX_LENGTH = 300;

	const shouldTruncate = release.body.length > MAX_LENGTH;
	const displayBody =
		isExpanded || !shouldTruncate
			? release.body
			: `${release.body.slice(0, MAX_LENGTH)}...`;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-colors hover:bg-white/10"
		>
			<div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
				<div className="md:w-1/4">
					<div className="sticky top-24 flex flex-col gap-4">
						<div className="flex items-center gap-2 text-primary">
							<Tag className="h-5 w-5" />
							<span className="text-xl font-bold">{release.tag_name}</span>
						</div>

						<div className="flex flex-col gap-1 text-sm text-muted-foreground">
							<span>{format(new Date(release.published_at), "MMMM d, yyyy")}</span>
							<span>{format(new Date(release.published_at), "h:mm a")}</span>
						</div>

						<div className="flex flex-wrap gap-2">
							{release.prerelease && (
								<Badge
									variant="secondary"
									className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
								>
									Pre-release
								</Badge>
							)}
							{release.draft && (
								<Badge
									variant="secondary"
									className="bg-gray-500/10 text-gray-500 border-gray-500/20"
								>
									Draft
								</Badge>
							)}
							{!release.prerelease && !release.draft && (
								<Badge
									variant="secondary"
									className="bg-green-500/10 text-green-500 border-green-500/20"
								>
									Latest
								</Badge>
							)}
						</div>
					</div>
				</div>

				<div className="md:w-3/4 space-y-6">
					<h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
						{release.name || release.tag_name}
					</h2>

					<div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded-md prose-code:px-1 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
						<ReactMarkdown>{displayBody}</ReactMarkdown>
					</div>

					{shouldTruncate && (
						<Button
							variant="link"
							onClick={() => setIsExpanded(!isExpanded)}
							className="p-0 h-auto font-semibold text-primary"
						>
							{isExpanded
								? t("changelog.show_less", "Show less")
								: t("changelog.read_more", "Read more")}
						</Button>
					)}

					<div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
						<Button variant="outline" size="sm" asChild className="gap-2">
							<a href={release.html_url} target="_blank" rel="noopener noreferrer">
								<ExternalLink className="h-4 w-4" />
								View on GitHub
							</a>
						</Button>
						{release.assets.map((asset) => (
							<Button
								key={asset.id}
								variant="ghost"
								size="sm"
								asChild
								className="gap-2"
							>
								<a href={asset.browser_download_url}>
									<Download className="h-4 w-4" />
									{asset.name}
									<span className="text-xs text-muted-foreground ml-1">
										({(asset.size / 1024 / 1024).toFixed(1)} MB)
									</span>
								</a>
							</Button>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
