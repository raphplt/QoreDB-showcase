import dynamic from "next/dynamic";
import { HeroBackgroundManager } from "@/components/hero-background-manager";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";

const DatabaseStrip = dynamic(() =>
  import("@/components/landing/database-strip").then((m) => ({
    default: m.DatabaseStrip,
  })),
);
const FeaturesSection = dynamic(() =>
  import("@/components/landing/features-section").then((m) => ({
    default: m.FeaturesSection,
  })),
);
const FeatureShowcase = dynamic(() =>
  import("@/components/landing/feature-showcase").then((m) => ({
    default: m.FeatureShowcase,
  })),
);
const InlineCTA = dynamic(() =>
  import("@/components/landing/inline-cta").then((m) => ({
    default: m.InlineCTA,
  })),
);
const ComparisonTable = dynamic(() =>
  import("@/components/landing/comparison-table").then((m) => ({
    default: m.ComparisonTable,
  })),
);
const PricingPreview = dynamic(() =>
  import("@/components/landing/pricing-preview").then((m) => ({
    default: m.PricingPreview,
  })),
);
const CTASection = dynamic(() =>
  import("@/components/landing/cta-section").then((m) => ({
    default: m.CTASection,
  })),
);
const Footer = dynamic(() =>
  import("@/components/landing/footer").then((m) => ({
    default: m.Footer,
  })),
);

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <HeroBackgroundManager />
      <Header />
      <Hero />
      <DatabaseStrip />
      <FeaturesSection />
      <FeatureShowcase />
      <InlineCTA />
      <ComparisonTable />
      <PricingPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
