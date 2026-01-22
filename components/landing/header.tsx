"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, ExternalLink } from "lucide-react";
import { ShimmerButton } from "@/components/shimmer-button";

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 lg:px-12 backdrop-blur-md bg-transparent transition-all duration-300">
				<div className="flex items-center space-x-2 pl-3 sm:pl-6 lg:pl-12">
					<Image
						src="/icon.png"
						alt="QoreDB Logo"
						width={48}
						height={48}
						className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
					/>
					<span className="text-[var(--q-text-0)] font-semibold text-lg sm:text-xl">
						QoreDB
					</span>
				</div>

				<nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
					<a
						href="#features"
						className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors text-sm lg:text-base"
					>
						Fonctionnalités
					</a>
					<a
						href="#preview"
						className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors text-sm lg:text-base"
					>
						Aperçu
					</a>
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors text-sm lg:text-base flex items-center gap-1"
					>
						GitHub <ExternalLink className="w-3 h-3" />
					</a>
				</nav>

				{/* Mobile menu button */}
				<button
					className="md:hidden text-[var(--q-text-0)] p-2"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>

				<ShimmerButton className="hidden md:flex bg-[var(--q-accent)] hover:bg-[var(--q-accent-strong)] text-white px-4 lg:px-6 py-2 rounded-xl text-sm lg:text-base font-medium shadow-lg border border-[var(--q-accent)]/30">
					Rejoindre la beta
				</ShimmerButton>
			</header>

			{mobileMenuOpen && (
				<div className="md:hidden absolute top-16 left-0 right-0 bg-[var(--q-bg-0)]/95 backdrop-blur-sm border-b border-[var(--q-border)] z-20">
					<nav className="flex flex-col space-y-4 px-6 py-6">
						<a
							href="#features"
							className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors"
						>
							Fonctionnalités
						</a>
						<a
							href="#preview"
							className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors"
						>
							Aperçu
						</a>
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors flex items-center gap-1"
						>
							GitHub <ExternalLink className="w-3 h-3" />
						</a>
						<ShimmerButton className="bg-[var(--q-accent)] hover:bg-[var(--q-accent-strong)] text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg w-fit">
							Rejoindre la beta
						</ShimmerButton>
					</nav>
				</div>
			)}
		</>
	);
}
