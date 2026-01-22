"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PreviewSection() {
	return (
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
	);
}
