"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function Footer() {
	return (
		<footer className="relative z-10 py-12 border-t border-(--q-border) bg-(--q-bg-0)">
			<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center gap-3">
					<Image src="/icon.png" alt="QoreDB" width={32} height={32} />
					<span className="text-(--q-text-0) font-medium">QoreDB</span>
				</div>

				<nav className="flex gap-6 mt-4 md:mt-0">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm flex items-center gap-1"
					>
						GitHub <ExternalLink className="w-3 h-3" />
					</a>
					<a
						href="#"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm"
					>
						Documentation
					</a>
					<a
						href="#"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm"
					>
						Contact
					</a>
				</nav>

				<p className="text-sm text-(--q-text-2) mt-4 md:mt-0">
					© 2025 QoreDB. Open Source.
				</p>
			</div>
		</footer>
	);
}
