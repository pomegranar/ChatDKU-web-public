import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { PartnerLogos } from "@/components/landing/partner-logos";
import { FeaturesSection } from "@/components/landing/features-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { AgentFlowSection } from "@/components/landing/agent-flow-section";
import { SeekBenchSection } from "@/components/landing/seekbench-section";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { CtaSection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-background font-inter text-foreground">
      <LandingNav />
      <HeroSection />
      <PartnerLogos />
      <FeaturesSection />
      <ArchitectureSection />
      <AgentFlowSection />
      <SeekBenchSection />
      <RoadmapSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}