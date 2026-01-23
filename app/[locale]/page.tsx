"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { HeroBackground } from "@/components/hero-background";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { WhySection } from "@/components/landing/why-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
	const [showHeroBackground, setShowHeroBackground] = useState(true);
	const [parallaxOffset, setParallaxOffset] = useState(0);
	const [bgKey, setBgKey] = useState(0);
	const wasHiddenRef = useRef(false);

	const handleScroll = useCallback(() => {
		const scrollY = window.scrollY;
		const viewportHeight = window.innerHeight;

		if (scrollY > viewportHeight) {
			setShowHeroBackground(false);
			wasHiddenRef.current = true;
		} else {
			if (wasHiddenRef.current) {
				setBgKey((prev) => prev + 1);
				wasHiddenRef.current = false;
			}
			setShowHeroBackground(true);
			setParallaxOffset(scrollY * 0.3);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<div className="min-h-screen overflow-hidden relative">
			{showHeroBackground && (
				<div
					key={bgKey}
					className="fixed inset-0 -z-10"
					style={{ transform: `translateY(${parallaxOffset}px)` }}
				>
					<HeroBackground />
				</div>
			)}
			<Header />
			<Hero />
			<WhySection />
			<FeaturesSection />
			<PreviewSection />
			<CTASection />
			<Footer />
		</div>
	);
}
