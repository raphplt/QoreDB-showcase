"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Apple, Monitor, Command, Download, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type Platform =
	| "windows-x86_64"
	| "windows-x86_64-msi"
	| "windows-x86_64-nsis"
	| "darwin-x86_64"
	| "darwin-x86_64-app"
	| "darwin-aarch64"
	| "darwin-aarch64-app"
	| "linux-x86_64"
	| "linux-x86_64-appimage"
	| "linux-x86_64-deb"
	| "linux-x86_64-rpm";

interface LatestRelease {
	version: string;
	notes: string;
	pub_date: string;
	platforms: Record<Platform, { signature: string; url: string }>;
}

export function DownloadSection() {
	const { t, i18n } = useTranslation();
	const [release, setRelease] = useState<LatestRelease | null>(null);
	const [loading, setLoading] = useState(true);
	const [os, setOs] = useState<"mac" | "windows" | "linux" | "unknown">(
		"unknown",
	);

	useEffect(() => {
		// Detect OS
		const timer = setTimeout(() => {
			const platform = navigator.userAgent.toLowerCase();
			if (platform.includes("mac")) setOs("mac");
			else if (platform.includes("win")) setOs("windows");
			else if (platform.includes("linux")) setOs("linux");
		}, 0);

		// Fetch latest release
		fetch("/api/latest-release")
			.then((res) => {
				if (!res.ok) throw new Error("API response not ok");
				return res.json();
			})
			.then((data) => {
				setRelease(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to fetch latest version", err);
				setLoading(false);
			});

		return () => clearTimeout(timer);
	}, []);

	// ...

	const formatDate = (dateString: string) => {
		// Use i18n.language to ensure consistency if available, or fallback to fixed locale if needed.
		// But simply checking if dateString exists is good too.
		return new Date(dateString).toLocaleDateString(i18n.language || "en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};
	// ...
	// Note: skipping full file view for replacement content, focusing on the fix.
	// The previous tool output showed the line numbers. I'll replace the whole useEffect block and the background class line.

	const getDownloadLink = (os: string) => {
		if (!release) return null;

		if (os === "mac") {
			// Prefer aarch64 for Apple Silicon, but we can't easily detect arch in browser without user agent hinting
			// defaulting to universal or x64 if calling "mac".
			// Actually, let's provide both options if possible or default to Apple Silicon if likely?
			// Safer to check User Agent for "Intel" vs "ARM"?
			// Latest MacBooks are ARM, but let's see what keys we have.
			// "darwin-aarch64" vs "darwin-x86_64".
			const isSilicon =
				navigator.userAgent.includes("Mac") &&
				!navigator.userAgent.includes("Intel");
			// This is a naive check.
			return isSilicon
				? release.platforms["darwin-aarch64"]?.url
				: release.platforms["darwin-x86_64"]?.url;
		}
		if (os === "windows") {
			// prefer msi or exe?
			return (
				release.platforms["windows-x86_64-nsis"]?.url ||
				release.platforms["windows-x86_64"]?.url
			);
		}
		if (os === "linux") {
			// prefer AppImage as generic
			return release.platforms["linux-x86_64-appimage"]?.url;
		}
		return null;
	};

	const mainLink = getDownloadLink(os);

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />

			<div className="container relative mx-auto px-4 z-10">
				<motion.div
					initial="hidden"
					animate="show"
					variants={container}
					className="max-w-4xl mx-auto text-center space-y-8"
				>
					<motion.div variants={item} className="space-y-4">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
							{t("download.title", "Download QoreDB")}
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							{t(
								"download.subtitle",
								"Get the latest version of QoreDB for your operating system.",
							)}
						</p>
					</motion.div>

					{loading ? (
						<div className="flex justify-center py-12">
							<Loader2 className="w-8 h-8 animate-spin text-primary" />
						</div>
					) : release ? (
						<motion.div
							variants={item}
							initial="hidden"
							animate="show"
							className="space-y-12"
						>
							<div className="p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-2xl max-w-xl mx-auto">
								<div className="mb-6">
									<div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
										{os === "mac" ? (
											<Apple className="w-8 h-8 text-primary" />
										) : os === "windows" ? (
											<Monitor className="w-8 h-8 text-primary" />
										) : (
											<Command className="w-8 h-8 text-primary" />
										)}
									</div>
									<h2 className="text-2xl font-bold mb-2">
										{os === "mac"
											? "macOS"
											: os === "windows"
												? "Windows"
												: os === "linux"
													? "Linux"
													: "All Platforms"}
									</h2>
									<p className="text-sm text-muted-foreground">
										Version {release.version} • {formatDate(release.pub_date)}
									</p>
								</div>

								{mainLink && (
									<Button
										size="lg"
										className="w-full text-lg h-12 gap-2"
										onClick={() => (window.location.href = mainLink)}
									>
										<Download className="w-5 h-5" />
										{t("download.download_now", "Download Now")}
									</Button>
								)}

								{!mainLink && (
									<p className="text-sm text-muted-foreground">
										{t("download.select_platform", "Select your platform below.")}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{/* macOS */}
								<div className="p-6 rounded-xl border bg-card/30 hover:bg-card/50 transition-colors text-left space-y-4">
									<div className="flex items-center gap-3">
										<Apple className="w-6 h-6" />
										<h3 className="font-semibold">macOS</h3>
									</div>
									<div className="space-y-2">
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["darwin-aarch64"]?.url &&
												(window.location.href = release.platforms["darwin-aarch64"].url)
											}
										>
											Apple Silicon (M1/M2/M3)
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["darwin-x86_64"]?.url &&
												(window.location.href = release.platforms["darwin-x86_64"].url)
											}
										>
											Intel Chip
										</Button>
									</div>
								</div>

								{/* Windows */}
								<div className="p-6 rounded-xl border bg-card/30 hover:bg-card/50 transition-colors text-left space-y-4">
									<div className="flex items-center gap-3">
										<Monitor className="w-6 h-6" />
										<h3 className="font-semibold">Windows</h3>
									</div>
									<div className="space-y-2">
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["windows-x86_64-nsis"]?.url &&
												(window.location.href =
													release.platforms["windows-x86_64-nsis"].url)
											}
										>
											Installer (.exe)
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["windows-x86_64"]?.url &&
												(window.location.href = release.platforms["windows-x86_64"].url)
											}
										>
											MSI Installer
										</Button>
									</div>
								</div>

								{/* Linux */}
								<div className="p-6 rounded-xl border bg-card/30 hover:bg-card/50 transition-colors text-left space-y-4">
									<div className="flex items-center gap-3">
										<Command className="w-6 h-6" />
										<h3 className="font-semibold">Linux</h3>
									</div>
									<div className="space-y-2">
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["linux-x86_64-appimage"]?.url &&
												(window.location.href =
													release.platforms["linux-x86_64-appimage"].url)
											}
										>
											AppImage
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["linux-x86_64-deb"]?.url &&
												(window.location.href = release.platforms["linux-x86_64-deb"].url)
											}
										>
											Debian / Ubuntu (.deb)
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="w-full justify-start"
											onClick={() =>
												release.platforms["linux-x86_64-rpm"]?.url &&
												(window.location.href = release.platforms["linux-x86_64-rpm"].url)
											}
										>
											Fedora / RHEL (.rpm)
										</Button>
									</div>
								</div>
							</div>
						</motion.div>
					) : (
						<div className="text-center text-muted-foreground">
							{t("download.error", "Unable to load version information.")}
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
}
