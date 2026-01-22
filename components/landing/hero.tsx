"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineShadowText } from "@/components/line-shadow-text";

export function Hero() {
	return (
		<main className="relative z-10 flex flex-col items-start justify-center min-h-screen px-4 sm:px-6 lg:px-12 max-w-6xl pl-6 sm:pl-12 lg:pl-20 pt-24 sm:pt-0">
			{/* Badge amélioré */}
			<motion.div
				className="mb-6 sm:mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="group inline-flex items-center gap-2 bg-(--q-bg-0)/80 backdrop-blur-md border border-(--q-border) rounded-full px-4 py-2 hover:border-(--q-accent)/40 transition-colors duration-300">
					<Sparkles className="w-4 h-4 text-(--q-accent)" />
					<span className="text-(--q-text-1) text-xs sm:text-sm font-medium">
						Open Source
					</span>
					<span className="w-1 h-1 rounded-full bg-(--q-border)" />
					<span className="text-(--q-text-1) text-xs sm:text-sm font-medium">
						Local-first
					</span>
					<span className="w-1 h-1 rounded-full bg-(--q-border)" />
					<span className="text-(--q-text-1) text-xs sm:text-sm font-medium">
						SQL + NoSQL
					</span>
				</div>
			</motion.div>

			{/* Titre principal */}
			<motion.h1
				className="text-(--q-text-0) text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6 sm:mb-8 tracking-tight"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				La base de données.
				<br />
				<LineShadowText className="italic font-light" shadowColor="var(--q-accent)">
					Simplifiée.
				</LineShadowText>
			</motion.h1>

			{/* Sous-titre avec meilleur contraste */}
			<motion.p
				className="text-(--q-text-1) text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl leading-relaxed"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				Un client de bases de données{" "}
				<span className="text-(--q-text-0) font-medium">moderne</span>,{" "}
				<span className="text-(--q-text-0) font-medium">rapide</span> et{" "}
				<span className="text-(--q-text-0) font-medium">sécurisé</span> pour les
				développeurs qui en ont marre des outils lents et mal conçus.
			</motion.p>

			{/* Boutons CTA */}
			<motion.div
				className="flex flex-col sm:flex-row gap-4"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
			>
				<Button
					size="lg"
					className="group relative bg-linear-to-r from-(--q-accent) to-(--q-accent-strong) 
						hover:from-(--q-accent-strong) hover:to-(--q-accent) text-white px-8 py-6
						rounded-xl text-base font-semibold flex items-center gap-3
						shadow-lg shadow-(--q-accent)/20 hover:shadow-xl hover:shadow-(--q-accent)/30
						transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
				>
					Rejoindre la beta
					<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
				</Button>
				<Button
					variant="outline"
					size="lg"
					onClick={() => window.open("https://github.com/raphplt/QoreDB", "_blank")}
					className="group border-2 border-(--q-border) hover:border-(--q-text-2) bg-(--q-bg-0)/50 backdrop-blur-sm
						text-(--q-text-0) px-8 py-6 rounded-xl text-base font-medium 
						flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
				>
					<Github className="w-5 h-5" />
					Voir le projet
				</Button>
			</motion.div>

			{/* <motion.div
				className="mt-12 sm:mt-16 flex items-center gap-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.5 }}
			>
				<div className="flex -space-x-2">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="w-8 h-8 rounded-full bg-(--q-bg-2) border-2 border-(--q-bg-0) flex items-center justify-center"
						>
							<span className="text-xs text-(--q-text-2)">👤</span>
						</div>
					))}
				</div>
				<p className="text-(--q-text-2) text-sm">
					Rejoignez <span className="text-(--q-text-0) font-medium">100+</span> développeurs en attente de la beta
				</p>
			</motion.div> */}
		</main>
	);
}
