"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineShadowText } from "@/components/line-shadow-text";

export function Hero() {
	return (
		<main className="relative z-10 flex flex-col items-start justify-start sm:justify-center min-h-screen px-4 sm:px-6 lg:px-12 max-w-6xl pt-32 sm:pt-12 lg:pt-20 pl-6 sm:pl-12 lg:pl-20">
			<motion.div
				className="mb-4 sm:mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="inline-flex items-center bg-(--q-accent-soft) backdrop-blur-sm border border-(--q-accent)/30 rounded-full px-3 sm:px-4 py-2">
					<span className="text-(--q-text-0) text-xs md:text-sm">
						Open Source • Local-first • SQL + NoSQL
					</span>
				</div>
			</motion.div>

			<motion.h1
				className="text-(--q-text-0) text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-tight mb-4 sm:mb-6 text-balance"
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

			<motion.p
				className="text-(--q-text-1) text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl text-pretty"
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
				<Button
					className="group relative bg-linear-to-r from-(--q-accent) to-(--q-accent-strong) 
				hover:from-(--q-accent-strong) hover:to-(--q-accent) text-white px-6 sm:px-8 py-2.5
				sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-semibold flex
				items-center gap-2 backdrop-blur-sm border border-(--q-accent)/30
				shadow-lg shadow-(--q-accent)/25 hover:shadow-xl hover:shadow-(--q-accent)/40
				transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
				>
					Rejoindre la beta
					<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
				</Button>
				<Button
					variant="outline"
					onClick={() => window.open("https://github.com/raphplt/QoreDB", "_blank")}
					className="border-(--q-border) text-[var(--q-text-0) px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
				>
					<Github className="w-4 h-4 sm:w-5 sm:h-5" />
					Voir le projet
				</Button>
			</motion.div>
		</main>
	);
}
