"use client";

import { motion } from "framer-motion";
import {
	Database,
	Shield,
	Terminal,
	FolderOpen,
	Layers,
	Zap,
	RefreshCw,
	Lock,
} from "lucide-react";

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

export function FeaturesSection() {
	return (
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
	);
}
