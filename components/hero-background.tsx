"use client";

import { useEffect, useState, useId } from "react";

type BackgroundQuality = "high" | "medium" | "low";

function useBackgroundQuality(): BackgroundQuality {
	const [quality, setQuality] = useState<BackgroundQuality>("high");

	useEffect(() => {
		const compute = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const maxDim = Math.max(width, height);
			const dpr = window.devicePixelRatio ?? 1;

			if (maxDim >= 2200 || dpr >= 2.5) return "low";
			if (maxDim >= 1600 || dpr >= 2) return "medium";
			return "high";
		};

		const update = () => setQuality(compute());
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return quality;
}

export function HeroBackground() {
	const quality = useBackgroundQuality();
	const uid = useId().replace(/:/g, "");

	const glowStdDeviation =
		quality === "low" ? 2 : quality === "medium" ? 2.5 : 3;

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute inset-0 bg-(--q-bg-0)">
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
						backgroundRepeat: "repeat",
						backgroundSize: "128px 128px",
					}}
				/>

				<div
					className="absolute"
					style={{
						top: "15%",
						left: "5%",
						width: "60%",
						height: "50%",
						background:
							"radial-gradient(ellipse at 30% 50%, rgba(122,108,255,0.12) 0%, rgba(122,108,255,0.06) 35%, rgba(88,71,255,0.02) 60%, transparent 80%)",
						filter: "blur(60px)",
						pointerEvents: "none",
					}}
				/>

				{/* Second halo plus léger et large */}
				<div
					className="absolute"
					style={{
						top: "10%",
						left: "0%",
						width: "70%",
						height: "60%",
						background:
							"radial-gradient(ellipse at 25% 40%, rgba(154,140,255,0.08) 0%, rgba(122,108,255,0.04) 40%, transparent 70%)",
						filter: "blur(80px)",
						pointerEvents: "none",
					}}
				/>

				{/* Halo accent très subtil en haut à gauche */}
				<div
					className="absolute"
					style={{
						top: "0%",
						left: "10%",
						width: "40%",
						height: "35%",
						background:
							"radial-gradient(ellipse at 50% 50%, rgba(122,108,255,0.06) 0%, transparent 70%)",
						filter: "blur(50px)",
						pointerEvents: "none",
					}}
				/>

				{/* Ellipses de fond (remplace les SVG ellipses avec feGaussianBlur) */}
				<div
					className="absolute"
					style={{
						bottom: "20%",
						left: "50%",
						transform: "translateX(-50%)",
						width: "150%",
						height: "60%",
						background:
							"radial-gradient(ellipse at 50% 80%, rgba(122,108,255,0.12) 0%, rgba(122,108,255,0.06) 30%, rgba(88,71,255,0.03) 50%, transparent 70%)",
						filter: "blur(40px)",
						pointerEvents: "none",
					}}
				/>
				<div
					className="absolute"
					style={{
						bottom: "15%",
						left: "50%",
						transform: "translateX(-50%)",
						width: "170%",
						height: "70%",
						background:
							"radial-gradient(ellipse at 50% 75%, rgba(122,108,255,0.08) 0%, rgba(88,71,255,0.04) 35%, transparent 65%)",
						filter: "blur(50px)",
						pointerEvents: "none",
					}}
				/>
				<div
					className="absolute"
					style={{
						bottom: "10%",
						left: "50%",
						transform: "translateX(-50%)",
						width: "200%",
						height: "80%",
						background:
							"radial-gradient(ellipse at 50% 70%, rgba(122,108,255,0.05) 0%, rgba(88,71,255,0.02) 40%, transparent 60%)",
						filter: "blur(60px)",
						pointerEvents: "none",
					}}
				/>

				<div className="absolute inset-0">
					<svg
						className="absolute inset-0 w-full h-full"
						viewBox="0 0 1200 760"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMinYMax slice"
						style={{
							willChange: "transform",
							contain: "layout style paint",
						}}
					>
						<defs>
							{/* Gradients pour les orbes lumineux */}
							<radialGradient id={`neonPulse1-${uid}`} cx="50%" cy="50%" r="50%">
								<stop offset="0%" stopColor="rgba(255,255,255,1)" />
								<stop offset="30%" stopColor="rgba(122,108,255,1)" />
								<stop offset="70%" stopColor="rgba(88,71,255,0.8)" />
								<stop offset="100%" stopColor="rgba(88,71,255,0)" />
							</radialGradient>
							<radialGradient id={`neonPulse2-${uid}`} cx="50%" cy="50%" r="50%">
								<stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
								<stop offset="25%" stopColor="rgba(122,108,255,0.9)" />
								<stop offset="60%" stopColor="rgba(154,140,255,0.7)" />
								<stop offset="100%" stopColor="rgba(154,140,255,0)" />
							</radialGradient>
							<radialGradient id={`neonPulse3-${uid}`} cx="50%" cy="50%" r="50%">
								<stop offset="0%" stopColor="rgba(255,255,255,1)" />
								<stop offset="35%" stopColor="rgba(122,108,255,1)" />
								<stop offset="75%" stopColor="rgba(88,71,255,0.6)" />
								<stop offset="100%" stopColor="rgba(88,71,255,0)" />
							</radialGradient>

							{/* Thread fades avec meilleure opacité */}
							<linearGradient
								id={`threadFade1-${uid}`}
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop offset="0%" stopColor="var(--q-accent)" stopOpacity="0" />
								<stop offset="10%" stopColor="var(--q-accent)" stopOpacity="0.9" />
								<stop offset="90%" stopColor="var(--q-accent)" stopOpacity="0.9" />
								<stop offset="100%" stopColor="var(--q-accent)" stopOpacity="0" />
							</linearGradient>
							<linearGradient
								id={`threadFade2-${uid}`}
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop offset="0%" stopColor="var(--q-accent-strong)" stopOpacity="0" />
								<stop
									offset="8%"
									stopColor="var(--q-accent-strong)"
									stopOpacity="0.85"
								/>
								<stop
									offset="92%"
									stopColor="var(--q-accent-strong)"
									stopOpacity="0.85"
								/>
								<stop
									offset="100%"
									stopColor="var(--q-accent-strong)"
									stopOpacity="0"
								/>
							</linearGradient>
							<linearGradient
								id={`threadFade3-${uid}`}
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop offset="0%" stopColor="var(--q-accent)" stopOpacity="0" />
								<stop offset="12%" stopColor="var(--q-accent)" stopOpacity="0.9" />
								<stop offset="88%" stopColor="var(--q-accent)" stopOpacity="0.9" />
								<stop offset="100%" stopColor="var(--q-accent)" stopOpacity="0" />
							</linearGradient>

							{/* Glow effect pour les orbes */}
							<filter
								id={`neonGlow-${uid}`}
								x="-100%"
								y="-100%"
								width="300%"
								height="300%"
							>
								<feGaussianBlur stdDeviation={glowStdDeviation} result="coloredBlur" />
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>

					</svg>
				</div>
			</div>
		</div>
	);
}
