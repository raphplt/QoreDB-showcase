"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	useMemo,
	useCallback,
} from "react";

// Types
type OS = "mac" | "windows" | "linux" | "unknown";
type Arch = "arm64" | "x86_64" | "unknown";

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

export interface LatestRelease {
	version: string;
	notes: string;
	pub_date: string;
	platforms: Record<Platform, { signature: string; url: string }>;
}

interface DownloadContextType {
	os: OS;
	arch: Arch;
	release: LatestRelease | null;
	loading: boolean;
	error: string | null;
	getDownloadLink: (targetOs?: OS) => string | null;
	getOsDisplayName: (targetOs?: OS) => string;
}

const DownloadContext = createContext<DownloadContextType | undefined>(
	undefined,
);

// Utility functions for OS and architecture detection
function detectOS(): OS {
	if (typeof window === "undefined") return "unknown";

	const platform = navigator.userAgent.toLowerCase();
	if (platform.includes("mac")) return "mac";
	if (platform.includes("win")) return "windows";
	if (platform.includes("linux")) return "linux";
	return "unknown";
}

function detectArch(): Arch {
	if (typeof window === "undefined") return "unknown";

	// Check for Apple Silicon
	// Modern browsers on Apple Silicon often show ARM in various ways
	const ua = navigator.userAgent;

	// macOS detection for Apple Silicon
	if (ua.includes("Mac")) {
		// If it doesn't mention Intel, it's likely Apple Silicon (M1/M2/M3/M4)
		if (!ua.includes("Intel")) {
			return "arm64";
		}
		return "x86_64";
	}

	// For Windows ARM (rare but exists)
	if (ua.includes("ARM") || ua.includes("aarch64")) {
		return "arm64";
	}

	return "x86_64";
}

export function DownloadProvider({ children }: { children: ReactNode }) {
	// Use lazy initialization to avoid calling setState in effect
	const [os] = useState<OS>(() => detectOS());
	const [arch] = useState<Arch>(() => detectArch());
	const [release, setRelease] = useState<LatestRelease | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch release info on mount
	useEffect(() => {
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
				setError("Failed to fetch release data");
				setLoading(false);
			});
	}, []);

	const getDownloadLink = useCallback(
		(targetOs?: OS): string | null => {
			if (!release) return null;

			const effectiveOs = targetOs || os;

			if (effectiveOs === "mac") {
				// Use detected architecture for macOS
				return arch === "arm64"
					? release.platforms["darwin-aarch64"]?.url
					: release.platforms["darwin-x86_64"]?.url;
			}
			if (effectiveOs === "windows") {
				return (
					release.platforms["windows-x86_64-nsis"]?.url ||
					release.platforms["windows-x86_64"]?.url
				);
			}
			if (effectiveOs === "linux") {
				return release.platforms["linux-x86_64-appimage"]?.url;
			}
			return null;
		},
		[release, os, arch],
	);

	const getOsDisplayName = useCallback(
		(targetOs?: OS): string => {
			const effectiveOs = targetOs || os;
			switch (effectiveOs) {
				case "mac":
					return "macOS";
				case "windows":
					return "Windows";
				case "linux":
					return "Linux";
				default:
					return "Your Platform";
			}
		},
		[os],
	);

	const value = useMemo(
		() => ({
			os,
			arch,
			release,
			loading,
			error,
			getDownloadLink,
			getOsDisplayName,
		}),
		[os, arch, release, loading, error, getDownloadLink, getOsDisplayName],
	);

	return (
		<DownloadContext.Provider value={value}>{children}</DownloadContext.Provider>
	);
}

export function useDownload() {
	const context = useContext(DownloadContext);
	if (context === undefined) {
		throw new Error("useDownload must be used within a DownloadProvider");
	}
	return context;
}
