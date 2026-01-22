"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
		<section id="features" className="relative z-10 py-24 px-6 bg-(--q-bg-0)">
			<div className="max-w-6xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-(--q-text-0) text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
						Ce que QoreDB fait bien
					</h2>
					<p className="text-(--q-text-1) text-lg max-w-2xl mx-auto">
						Conçu pour les développeurs qui veulent un outil qui fonctionne, tout
						simplement.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							className="group p-6 rounded-xl bg-(--q-bg-1) border border-(--q-border) hover:border-(--q-accent)/50 transition-all duration-300 hover:shadow-lg hover:shadow-(--q-accent)/10"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<div className="w-12 h-12 rounded-lg bg-(--q-accent-soft) flex items-center justify-center mb-4 group-hover:bg-(--q-accent) transition-colors duration-300">
								<feature.icon className="w-6 h-6 text-(--q-accent) group-hover:text-white transition-colors duration-300" />
							</div>
							<h3 className="text-(--q-text-0) font-semibold text-lg mb-2">
								{feature.title}
							</h3>
							<p className="text-(--q-text-2) text-sm">{feature.description}</p>
						</motion.div>
					))}
				</div>

				<motion.div
					className="mt-24 text-center"
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h3 className="text-(--q-text-0) text-2xl font-bold mb-8">
						Bases de données supportées
					</h3>
					<div className="flex flex-wrap justify-center gap-6 sm:gap-12">
						<div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-(--q-bg-1) border border-(--q-border) min-w-[140px] hover:border-[#00758F] transition-colors duration-300 group">
							<div className="relative w-12 h-12">
								<Image
									src="/images/databases/mysql.png"
									alt="MySQL"
									fill
									className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
								/>
							</div>
							<span className="font-semibold text-(--q-text-0)">MySQL</span>
						</div>
						<div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-(--q-bg-1) border border-(--q-border) min-w-[140px] hover:border-[#336791] transition-colors duration-300 group">
							<div className="relative w-12 h-12">
								<Image
									src="/images/databases/postgresql.png"
									alt="PostgreSQL"
									fill
									className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
								/>
							</div>
							<span className="font-semibold text-(--q-text-0)">PostgreSQL</span>
						</div>
						<div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-(--q-bg-1) border border-(--q-border) min-w-[140px] hover:border-[#47A248] transition-colors duration-300 group">
							<div className="relative w-12 h-12">
								<Image
									src="/images/databases/mongodb.png"
									alt="MongoDB"
									fill
									className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
								/>
							</div>
							<span className="font-semibold text-(--q-text-0)">MongoDB</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
