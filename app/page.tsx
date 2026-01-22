"use client";

import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Menu,
	Database,
	Shield,
	Terminal,
	FolderOpen,
	Layers,
	Zap,
	RefreshCw,
	Lock,
	X,
	Github,
	ExternalLink,
} from "lucide-react";
import { LineShadowText } from "@/components/line-shadow-text";
import { ShimmerButton } from "@/components/shimmer-button";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeroBackground } from "@/components/hero-background";

const features = [
	{
		icon: Database,
		title: "SQL + NoSQL unifié",
		description: "PostgreSQL, MySQL, MongoDB dans une seule interface cohérente.",
	},
	{
		icon: Shield,
		title: "Vault sécurisé",
		description: "Credentials chiffrés via keyring système + Argon2.",
	},
	{
		icon: Lock,
		title: "SSH Tunneling",
		description: "Support natif des tunnels SSH pour bases distantes.",
	},
	{
		icon: Terminal,
		title: "Éditeur intelligent",
		description: "Syntax highlighting, autocomplétion, formatage automatique.",
	},
	{
		icon: FolderOpen,
		title: "Query Library",
		description: "Bibliothèque de requêtes avec dossiers, tags et export.",
	},
	{
		icon: Layers,
		title: "Protection environnements",
		description: "Dev/Staging/Prod distincts, blocage mutations en prod.",
	},
	{
		icon: Zap,
		title: "Data Grid performant",
		description: "Grille haute performance avec virtualisation.",
	},
	{
		icon: RefreshCw,
		title: "Auto-Update",
		description: "Mise à jour automatique de l'application.",
	},
];

export default function HomePage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen overflow-hidden relative">
			<HeroBackground />
			{/* Header Navigation */}
			<header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 lg:px-12">
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

				<ShimmerButton className="hidden md:flex bg-[var(--q-accent)] hover:bg-[var(--q-accent-strong)] text-white px-4 lg:px-6 py-2 rounded-xl text-sm lg:text-base font-medium shadow-lg">
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

			{/* Hero Section */}
			<main className="relative z-10 flex flex-col items-start justify-start sm:justify-center min-h-[calc(100vh)] px-4 sm:px-6 lg:px-12 max-w-6xl pt-4 sm:-mt-12 lg:-mt-24 pl-6 sm:pl-12 lg:pl-20">
				{/* Badge */}
				<motion.div
					className="mb-4 sm:mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="inline-flex items-center bg-[var(--q-accent-soft)] backdrop-blur-sm border border-[var(--q-accent)]/30 rounded-full px-3 sm:px-4 py-2">
						<span className="text-[var(--q-text-0)] text-xs md:text-sm">
							Open Source • Local-first • SQL + NoSQL
						</span>
					</div>
				</motion.div>

				<motion.h1
					className="text-[var(--q-text-0)] text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-tight mb-4 sm:mb-6 text-balance"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					La base de données.
					<br />
					<LineShadowText
						className="italic font-light"
						shadowColor="var(--q-accent)"
					>
						Simplifiée.
					</LineShadowText>
				</motion.h1>

				<motion.p
					className="text-[var(--q-text-1)] text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl text-pretty"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					Un client de bases de données moderne, rapide et sécurisé pour les
					développeurs qui en ont marre des outils lents et mal conçus.
				</motion.p>

				<motion.div
					className="flex flex-col sm:flex-row gap-4"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<Button className="group relative bg-gradient-to-r from-[var(--q-accent)] to-[var(--q-accent-strong)] hover:from-[var(--q-accent-strong)] hover:to-[var(--q-accent)] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-semibold flex items-center gap-2 backdrop-blur-sm border border-[var(--q-accent)]/30 shadow-lg shadow-[var(--q-accent)]/25 hover:shadow-xl hover:shadow-[var(--q-accent)]/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
						Rejoindre la beta
						<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</Button>
					<Button
						variant="outline"
						className="border-[var(--q-border)] text-[var(--q-text-0)] hover:bg-[var(--q-bg-1)] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium flex items-center gap-2"
					>
						<Github className="w-4 h-4 sm:w-5 sm:h-5" />
						Voir le projet
					</Button>
				</motion.div>
			</main>

			{/* Why Section */}
			<section className="relative z-10 py-24 px-6 bg-[var(--q-bg-1)]">
				<motion.div
					className="max-w-4xl mx-auto text-center"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h2 className="text-[var(--q-text-0)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
						Les outils actuels vous ralentissent
					</h2>
					<p className="text-[var(--q-text-1)] text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
						DBeaver, phpMyAdmin, pgAdmin... Ils font le job, mais l&apos;UX est
						médiocre, les workflows sont mal optimisés et ils n&apos;ont pas évolué
						avec la façon moderne de travailler.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
						<motion.div
							className="flex flex-col items-center p-6 rounded-xl bg-[var(--q-bg-0)] border border-[var(--q-border)]"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<span className="text-4xl mb-3">🐢</span>
							<span className="text-[var(--q-text-0)] font-semibold text-lg">
								Lent
							</span>
							<span className="text-[var(--q-text-2)] text-sm mt-1">
								Chargement interminable
							</span>
						</motion.div>
						<motion.div
							className="flex flex-col items-center p-6 rounded-xl bg-[var(--q-bg-0)] border border-[var(--q-border)]"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<span className="text-4xl mb-3">🎨</span>
							<span className="text-[var(--q-text-0)] font-semibold text-lg">
								Daté
							</span>
							<span className="text-[var(--q-text-2)] text-sm mt-1">
								Interface d&apos;un autre âge
							</span>
						</motion.div>
						<motion.div
							className="flex flex-col items-center p-6 rounded-xl bg-[var(--q-bg-0)] border border-[var(--q-border)]"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<span className="text-4xl mb-3">😤</span>
							<span className="text-[var(--q-text-0)] font-semibold text-lg">
								Fatiguant
							</span>
							<span className="text-[var(--q-text-2)] text-sm mt-1">
								Workflows mal pensés
							</span>
						</motion.div>
					</div>

					<motion.p
						className="text-[var(--q-text-0)] text-xl sm:text-2xl font-medium"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						viewport={{ once: true }}
					>
						QoreDB fait pour les bases de données ce que{" "}
						<span className="text-[var(--q-accent)]">Linear</span>,{" "}
						<span className="text-[var(--q-accent)]">Raycast</span> ou{" "}
						<span className="text-[var(--q-accent)]">VS Code</span> ont fait pour
						leurs domaines.
					</motion.p>
				</motion.div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="relative z-10 py-24 px-6 bg-[var(--q-bg-0)]"
			>
				<div className="max-w-6xl mx-auto">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-[var(--q-text-0)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
							Ce que QoreDB fait bien
						</h2>
						<p className="text-[var(--q-text-1)] text-lg max-w-2xl mx-auto">
							Conçu pour les développeurs qui veulent un outil qui fonctionne, tout
							simplement.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								className="group p-6 rounded-xl bg-[var(--q-bg-1)] border border-[var(--q-border)] hover:border-[var(--q-accent)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--q-accent)]/10"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="w-12 h-12 rounded-lg bg-[var(--q-accent-soft)] flex items-center justify-center mb-4 group-hover:bg-[var(--q-accent)] transition-colors duration-300">
									<feature.icon className="w-6 h-6 text-[var(--q-accent)] group-hover:text-white transition-colors duration-300" />
								</div>
								<h3 className="text-[var(--q-text-0)] font-semibold text-lg mb-2">
									{feature.title}
								</h3>
								<p className="text-[var(--q-text-2)] text-sm">{feature.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* App Preview Section */}
			<section
				id="preview"
				className="relative z-10 py-24 px-6 bg-[var(--q-bg-1)]"
			>
				<div className="max-w-6xl mx-auto">
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-[var(--q-text-0)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
							Une interface pensée pour les développeurs
						</h2>
						<p className="text-[var(--q-text-1)] text-lg max-w-2xl mx-auto">
							Dense mais respirable. Sérieuse mais moderne.
						</p>
					</motion.div>

					<motion.div
						className="relative rounded-xl overflow-hidden border border-[var(--q-border)] shadow-2xl shadow-[var(--q-accent)]/10"
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.7 }}
						viewport={{ once: true }}
					>
						{/* Glow effect */}
						<div className="absolute -inset-4 bg-gradient-to-r from-[var(--q-accent)]/20 via-transparent to-[var(--q-accent)]/20 blur-3xl opacity-50" />
						<Image
							src="/app-preview.png"
							alt="QoreDB Interface"
							width={1920}
							height={1080}
							className="w-full relative z-10"
						/>
					</motion.div>
				</div>
			</section>

			{/* Early Access CTA Section */}
			<section className="relative z-10 py-24 px-6 bg-gradient-to-b from-[var(--q-bg-0)] to-[var(--q-bg-1)]">
				<motion.div
					className="max-w-2xl mx-auto text-center"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h2 className="text-[var(--q-text-0)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
						Rejoignez les premiers utilisateurs
					</h2>
					<p className="text-[var(--q-text-1)] text-lg mb-8">
						QoreDB est en développement actif. Inscrivez-vous pour être notifié du
						lancement de la beta fermée.
					</p>

					<form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
						<input
							type="email"
							placeholder="votre@email.com"
							className="flex-1 px-4 py-3 rounded-lg bg-[var(--q-bg-0)] border border-[var(--q-border)] text-[var(--q-text-0)] placeholder:text-[var(--q-text-2)] focus:outline-none focus:ring-2 focus:ring-[var(--q-accent)] focus:border-transparent"
						/>
						<Button className="bg-[var(--q-accent)] hover:bg-[var(--q-accent-strong)] text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap">
							S&apos;inscrire
						</Button>
					</form>

					<p className="mt-4 text-sm text-[var(--q-text-2)]">
						Pas de spam. Uniquement les annonces importantes.
					</p>
				</motion.div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 py-12 border-t border-[var(--q-border)] bg-[var(--q-bg-0)]">
				<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center gap-3">
						<Image src="/icon.png" alt="QoreDB" width={32} height={32} />
						<span className="text-[var(--q-text-0)] font-medium">QoreDB</span>
					</div>

					<nav className="flex gap-6 mt-4 md:mt-0">
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors text-sm flex items-center gap-1"
						>
							GitHub <ExternalLink className="w-3 h-3" />
						</a>
						<a
							href="#"
							className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors text-sm"
						>
							Documentation
						</a>
						<a
							href="#"
							className="text-[var(--q-text-1)] hover:text-[var(--q-text-0)] transition-colors text-sm"
						>
							Contact
						</a>
					</nav>

					<p className="text-sm text-[var(--q-text-2)] mt-4 md:mt-0">
						© 2025 QoreDB. Open Source.
					</p>
				</div>
			</footer>
		</div>
	);
}
