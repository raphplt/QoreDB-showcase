"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { ShimmerButton } from "@/components/shimmer-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const handleLogoClick = (e: React.MouseEvent) => {
		setMobileMenuOpen(false);
		if (pathname === "/") {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<>
			<header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 lg:px-12 backdrop-blur-md bg-transparent transition-all duration-300">
				<Link
					href="/"
					className="flex items-center space-x-2 pl-3 sm:pl-6 lg:pl-12"
					onClick={handleLogoClick}
				>
					<Image
						src="/icon.png"
						alt="QoreDB Logo"
						width={48}
						height={48}
						className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
					/>
					<span className="text-(--q-text-0) font-semibold text-lg sm:text-xl">
						QoreDB
					</span>
				</Link>

				<nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
					<Link
						href="/#features"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm lg:text-base"
					>
						Fonctionnalités
					</Link>
					<Link
						href="/#preview"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm lg:text-base"
					>
						Aperçu
					</Link>
					<Link
						href="/blog"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm lg:text-base"
					>
						Blog
					</Link>
					<Link
						href="/roadmap"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm lg:text-base"
					>
						Roadmap
					</Link>
					<Link
						href="/faq"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors text-sm lg:text-base flex items-center gap-1"
					>
						FAQ
					</Link>
				</nav>

				{/* Mobile menu button */}
				<button
					className="md:hidden text-(--q-text-0) p-2"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>

				<div className="flex items-center space-x-4">
					{/* <Link
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors flex items-center gap-1"
					>
						<Github className="w-5 h-5" />
					</Link> */}

					<button
						className="group hidden md:flex items-center gap-2 relative overflow-hidden
							bg-(--q-text-0)/90 backdrop-blur-sm
							text-(--q-bg-0) px-5 lg:px-5 py-2 rounded-xl 
							text-sm lg:text-base font-semibold 
							border border-(--q-accent)/40
							shadow-[0_0_20px_color-mix(in_srgb,var(--q-accent)_15%,transparent)]
							hover:border-(--q-accent)/80
							hover:shadow-[0_0_30px_color-mix(in_srgb,var(--q-accent)_40%,transparent)]
							hover:scale-105 hover:-translate-y-0.5
							transition-all duration-300 ease-out"
					>
						<span 
							className="absolute inset-0 bg-linear-to-r from-transparent via-(--q-accent)/20 to-transparent animate-shimmer"
							style={{
								backgroundSize: '200% 100%',
								animation: 'shimmer 3s ease-in-out infinite',
							}}
						/>
						<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-(--q-accent) to-transparent opacity-60 group-hover:opacity-100 group-hover:h-0.5 transition-all duration-300" />
						<span className="absolute inset-0 rounded-xl bg-(--q-accent)/0 group-hover:bg-(--q-accent)/10 transition-colors duration-300" />
						
						<span className="relative z-10">Rejoindre la beta</span>
						<ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
					</button>
				</div>
			</header>

			{mobileMenuOpen && (
				<div className="md:hidden absolute top-16 left-0 right-0 bg-(--q-bg-0)/95 backdrop-blur-sm border-b border-(--q-border) z-20">
					<nav className="flex flex-col space-y-4 px-6 py-6">
						<Link
							href="/#features"
							className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Fonctionnalités
						</Link>
						<Link
							href="/#preview"
							className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Aperçu
						</Link>
						<Link
							href="/blog"
							className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Blog
						</Link>
						<Link
							href="/roadmap"
							className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Roadmap
						</Link>

						<Link
							href="/faq"
							className="text-(--q-text-1) hover:text-(--q-text-0) transition-colors flex items-center gap-1"
						>
							FAQ
						</Link>
						<ShimmerButton className="bg-(--q-accent) hover:bg-(--q-accent-strong) text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg w-fit">
							Rejoindre la beta
						</ShimmerButton>
					</nav>
				</div>
			)}
		</>
	);
}
