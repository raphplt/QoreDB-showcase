"use client";

import { motion } from "framer-motion";

export function WhySection() {
	return (
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
	);
}
