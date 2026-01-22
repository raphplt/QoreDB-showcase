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
		<div className="min-h-screen relative overflow-hidden">
			<div className="absolute inset-0 bg-[var(--q-bg-0)]">
				{/* Flowing wave rays overlay */}
				<div className="absolute inset-0">
					<svg
						className="absolute inset-0 w-full h-full"
						viewBox="0 0 1200 800"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid slice"
					>
						<defs>
							<radialGradient id="neonPulse1" cx="50%" cy="50%" r="50%">
								<stop offset="0%" stopColor="rgba(255,255,255,1)" />
								<stop offset="30%" stopColor="rgba(122,108,255,1)" />
								<stop offset="70%" stopColor="rgba(107,92,255,0.8)" />
								<stop offset="100%" stopColor="rgba(107,92,255,0)" />
							</radialGradient>
							<radialGradient id="neonPulse2" cx="50%" cy="50%" r="50%">
								<stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
								<stop offset="25%" stopColor="rgba(122,108,255,0.9)" />
								<stop offset="60%" stopColor="rgba(88,71,255,0.7)" />
								<stop offset="100%" stopColor="rgba(88,71,255,0)" />
							</radialGradient>
							<radialGradient id="neonPulse3" cx="50%" cy="50%" r="50%">
								<stop offset="0%" stopColor="rgba(255,255,255,1)" />
								<stop offset="35%" stopColor="rgba(154,140,255,1)" />
								<stop offset="75%" stopColor="rgba(122,108,255,0.6)" />
								<stop offset="100%" stopColor="rgba(122,108,255,0)" />
							</radialGradient>
							{/* Hero text background gradients */}
							<radialGradient id="heroTextBg" cx="30%" cy="50%" r="70%">
								<stop offset="0%" stopColor="rgba(122,108,255,0.15)" />
								<stop offset="40%" stopColor="rgba(154,140,255,0.08)" />
								<stop offset="80%" stopColor="rgba(88,71,255,0.05)" />
								<stop offset="100%" stopColor="rgba(0,0,0,0)" />
							</radialGradient>
							<filter id="heroTextBlur" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur stdDeviation="12" result="blur" />
								<feTurbulence baseFrequency="0.7" numOctaves="4" result="noise" />
								<feColorMatrix
									in="noise"
									type="saturate"
									values="0"
									result="monoNoise"
								/>
								<feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
									<feFuncA type="discrete" tableValues="0.03 0.06 0.09 0.12" />
								</feComponentTransfer>
								<feComposite
									in="blur"
									in2="alphaAdjustedNoise"
									operator="multiply"
									result="noisyBlur"
								/>
								<feMerge>
									<feMergeNode in="noisyBlur" />
								</feMerge>
							</filter>
							<linearGradient id="threadFade1" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="var(--q-accent)" stopOpacity="0" />
								<stop offset="15%" stopColor="var(--q-accent)" stopOpacity="0.8" />
								<stop offset="85%" stopColor="var(--q-accent)" stopOpacity="0.8" />
								<stop offset="100%" stopColor="var(--q-accent)" stopOpacity="0" />
							</linearGradient>
							<linearGradient id="threadFade2" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="var(--q-accent-strong)" stopOpacity="0" />
								<stop
									offset="12%"
									stopColor="var(--q-accent-strong)"
									stopOpacity="0.7"
								/>
								<stop
									offset="88%"
									stopColor="var(--q-accent-strong)"
									stopOpacity="0.7"
								/>
								<stop
									offset="100%"
									stopColor="var(--q-accent-strong)"
									stopOpacity="0"
								/>
							</linearGradient>
							<linearGradient id="threadFade3" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="var(--q-accent)" stopOpacity="0" />
								<stop offset="18%" stopColor="var(--q-accent)" stopOpacity="0.8" />
								<stop offset="82%" stopColor="var(--q-accent)" stopOpacity="0.8" />
								<stop offset="100%" stopColor="var(--q-accent)" stopOpacity="0" />
							</linearGradient>
							<filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur stdDeviation="2" result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>

						<g>
							{/* Hero text background shape */}
							<ellipse
								cx="300"
								cy="350"
								rx="400"
								ry="200"
								fill="url(#heroTextBg)"
								filter="url(#heroTextBlur)"
								opacity="0.6"
							/>
							<ellipse
								cx="350"
								cy="320"
								rx="500"
								ry="250"
								fill="url(#heroTextBg)"
								filter="url(#heroTextBlur)"
								opacity="0.4"
							/>

							{/* Thread 1 */}
							<path
								id="thread1"
								d="M50 720 Q200 590 350 540 Q500 490 650 520 Q800 550 950 460 Q1100 370 1200 340"
								stroke="url(#threadFade1)"
								strokeWidth="0.8"
								fill="none"
								opacity="0.8"
							/>
							<circle
								r="2"
								fill="url(#neonPulse1)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="4s" repeatCount="indefinite">
									<mpath href="#thread1" />
								</animateMotion>
							</circle>

							{/* Thread 2 */}
							<path
								id="thread2"
								d="M80 730 Q250 620 400 570 Q550 520 700 550 Q850 580 1000 490 Q1150 400 1300 370"
								stroke="url(#threadFade2)"
								strokeWidth="1.5"
								fill="none"
								opacity="0.7"
							/>
							<circle
								r="3"
								fill="url(#neonPulse2)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="5s" repeatCount="indefinite">
									<mpath href="#thread2" />
								</animateMotion>
							</circle>

							{/* Thread 3 */}
							<path
								id="thread3"
								d="M20 710 Q180 580 320 530 Q460 480 600 510 Q740 540 880 450 Q1020 360 1200 330"
								stroke="url(#threadFade3)"
								strokeWidth="1.2"
								fill="none"
								opacity="0.8"
							/>
							<circle
								r="2.5"
								fill="url(#neonPulse1)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="4.5s" repeatCount="indefinite">
									<mpath href="#thread3" />
								</animateMotion>
							</circle>

							{/* Thread 4 */}
							<path
								id="thread4"
								d="M120 740 Q280 640 450 590 Q620 540 770 570 Q920 600 1070 510 Q1220 420 1350 390"
								stroke="url(#threadFade1)"
								strokeWidth="0.6"
								fill="none"
								opacity="0.6"
							/>
							<circle
								r="1.5"
								fill="url(#neonPulse3)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="5.5s" repeatCount="indefinite">
									<mpath href="#thread4" />
								</animateMotion>
							</circle>

							{/* Thread 5 */}
							<path
								id="thread5"
								d="M60 725 Q220 600 380 550 Q540 500 680 530 Q820 560 960 470 Q1100 380 1280 350"
								stroke="url(#threadFade2)"
								strokeWidth="1.0"
								fill="none"
								opacity="0.7"
							/>
							<circle
								r="2.2"
								fill="url(#neonPulse2)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="4.2s" repeatCount="indefinite">
									<mpath href="#thread5" />
								</animateMotion>
							</circle>

							{/* Thread 6 */}
							<path
								id="thread6"
								d="M150 735 Q300 660 480 610 Q660 560 800 590 Q940 620 1080 530 Q1220 440 1400 410"
								stroke="url(#threadFade3)"
								strokeWidth="1.3"
								fill="none"
								opacity="0.6"
							/>
							<circle
								r="2.8"
								fill="url(#neonPulse1)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="5.2s" repeatCount="indefinite">
									<mpath href="#thread6" />
								</animateMotion>
							</circle>

							{/* Thread 7 */}
							<path
								id="thread7"
								d="M40 715 Q190 585 340 535 Q490 485 630 515 Q770 545 910 455 Q1050 365 1250 335"
								stroke="url(#threadFade1)"
								strokeWidth="0.9"
								fill="none"
								opacity="0.8"
							/>
							<circle
								r="2"
								fill="url(#neonPulse3)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="4.8s" repeatCount="indefinite">
									<mpath href="#thread7" />
								</animateMotion>
							</circle>

							{/* Thread 8 */}
							<path
								id="thread8"
								d="M100 728 Q260 630 420 580 Q580 530 720 560 Q860 590 1000 500 Q1140 410 1320 380"
								stroke="url(#threadFade2)"
								strokeWidth="1.4"
								fill="none"
								opacity="0.7"
							/>
							<circle
								r="3"
								fill="url(#neonPulse2)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="5.8s" repeatCount="indefinite">
									<mpath href="#thread8" />
								</animateMotion>
							</circle>

							{/* Thread 9 */}
							<path
								id="thread9"
								d="M30 722 Q170 595 310 545 Q450 495 590 525 Q730 555 870 465 Q1010 375 1180 345"
								stroke="url(#threadFade3)"
								strokeWidth="0.5"
								fill="none"
								opacity="0.6"
							/>
							<circle
								r="1.2"
								fill="url(#neonPulse1)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="6s" repeatCount="indefinite">
									<mpath href="#thread9" />
								</animateMotion>
							</circle>

							{/* Thread 10 */}
							<path
								id="thread10"
								d="M90 732 Q240 625 390 575 Q540 525 680 555 Q820 585 960 495 Q1100 405 1300 375"
								stroke="url(#threadFade1)"
								strokeWidth="1.1"
								fill="none"
								opacity="0.8"
							/>
							<circle
								r="2.5"
								fill="url(#neonPulse3)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="4.3s" repeatCount="indefinite">
									<mpath href="#thread10" />
								</animateMotion>
							</circle>

							{/* Thread 11 */}
							<path
								id="thread11"
								d="M70 727 Q210 605 360 555 Q510 505 650 535 Q790 565 930 475 Q1070 385 1260 355"
								stroke="url(#threadFade2)"
								strokeWidth="0.4"
								fill="none"
								opacity="0.5"
							/>
							<circle
								r="1"
								fill="url(#neonPulse2)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="5.7s" repeatCount="indefinite">
									<mpath href="#thread11" />
								</animateMotion>
							</circle>

							{/* Thread 12 */}
							<path
								id="thread12"
								d="M110 738 Q270 645 430 595 Q590 545 730 575 Q870 605 1010 515 Q1150 425 1380 395"
								stroke="url(#threadFade3)"
								strokeWidth="1.5"
								fill="none"
								opacity="0.7"
							/>
							<circle
								r="3.2"
								fill="url(#neonPulse1)"
								opacity="1"
								filter="url(#neonGlow)"
							>
								<animateMotion dur="4.7s" repeatCount="indefinite">
									<mpath href="#thread12" />
								</animateMotion>
							</circle>
						</g>
					</svg>
				</div>
			</div>

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
			<main className="relative z-10 flex flex-col items-start justify-start sm:justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-12 max-w-6xl pt-4 sm:-mt-12 lg:-mt-24 pl-6 sm:pl-12 lg:pl-20">
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
