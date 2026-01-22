"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
	return (
		<section className="relative z-10 py-24 px-6 bg-linear-to-b from-(--q-bg-0) to-(--q-bg-1)">
			<motion.div
				className="max-w-2xl mx-auto text-center"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				viewport={{ once: true }}
			>
				<h2 className="text-(--q-text-0) text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
					Rejoignez les premiers utilisateurs
				</h2>
				<p className="text-(--q-text-1) text-lg mb-8">
					QoreDB est en développement actif. Inscrivez-vous pour être notifié du
					lancement de la beta fermée.
				</p>

				<form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
					<input
						type="email"
						placeholder="votre@email.com"
						className="flex-1 px-4 py-3 rounded-lg bg-(--q-bg-0) border border-(--q-border) text-(--q-text-0) placeholder:text-(--q-text-2) focus:outline-none focus:ring-2 focus:ring-(--q-accent) focus:border-transparent"
					/>
					<Button className="bg-(--q-accent) hover:bg-(--q-accent-strong) text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap">
						S&apos;inscrire
					</Button>
				</form>

				<p className="mt-4 text-sm text-(--q-text-2)">
					Pas de spam. Uniquement les annonces importantes.
				</p>
			</motion.div>
		</section>
	);
}
