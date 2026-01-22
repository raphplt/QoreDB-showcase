"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export function CTASection() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		
		setIsSubmitting(true);
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000));
		setIsSubmitting(false);
		setIsSubmitted(true);
		setEmail("");
	};

	return (
		<section className="relative z-10 py-32 px-6 overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-linear-to-b from-(--q-bg-0) via-(--q-bg-1) to-(--q-bg-0)" />
			
			{/* Accent glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--q-accent)/5 blur-3xl rounded-full" />
			
			<motion.div
				className="relative max-w-2xl mx-auto text-center"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				viewport={{ once: true }}
			>
				{/* Badge */}
				<motion.div
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--q-accent)/10 border border-(--q-accent)/20 mb-8"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<Sparkles className="w-4 h-4 text-(--q-accent)" />
					<span className="text-(--q-accent) text-sm font-medium">Beta privée en préparation</span>
				</motion.div>
				
				<h2 className="text-(--q-text-0) text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
					Rejoignez les{" "}
					<span className="text-(--q-accent)">premiers utilisateurs</span>
				</h2>
				<p className="text-(--q-text-1) text-lg mb-10 leading-relaxed">
					QoreDB est en développement actif. Inscrivez-vous pour être notifié du
					lancement de la beta fermée et façonner le produit avec nous.
				</p>

				{/* Form avec effet glassmorphism léger */}
				<motion.div
					className="relative p-1 rounded-2xl bg-linear-to-b from-(--q-border) to-transparent"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}
				>
					<div className="p-6 sm:p-8 rounded-xl bg-(--q-bg-0)">
						{isSubmitted ? (
							<motion.div
								className="flex flex-col items-center gap-4 py-4"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
							>
								<div className="w-12 h-12 rounded-full bg-(--q-success)/10 flex items-center justify-center">
									<svg className="w-6 h-6 text-(--q-success)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<p className="text-(--q-text-0) font-medium">Merci ! Vous serez parmi les premiers informés.</p>
							</motion.div>
						) : (
							<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="votre@email.com"
									required
									className="flex-1 px-5 py-3.5 rounded-xl bg-(--q-bg-1) border border-(--q-border) text-(--q-text-0) placeholder:text-(--q-text-2) focus:outline-none focus:ring-2 focus:ring-(--q-accent)/50 focus:border-(--q-accent) transition-all duration-200 text-base"
								/>
								<button
									type="submit"
									disabled={isSubmitting}
									className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-(--q-accent) hover:bg-(--q-accent-strong) text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-(--q-accent)/25 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
								>
									{isSubmitting ? (
										<>
											<svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
											</svg>
											<span>Envoi...</span>
										</>
									) : (
										<>
											<span>S&apos;inscrire</span>
											<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
										</>
									)}
								</button>
							</form>
						)}
					</div>
				</motion.div>

				{/* Trust indicators */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-(--q-text-2) text-sm">
					<div className="flex items-center gap-2">
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
						<span>Pas de spam</span>
					</div>
					<div className="flex items-center gap-2">
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<span>Uniquement les annonces</span>
					</div>
					<div className="flex items-center gap-2">
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
						</svg>
						<span>Accès prioritaire</span>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
