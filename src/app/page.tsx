import { Hero } from "@/components/hero";
import { PlatformsSection } from "@/components/platforms/PlatformsSection";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { ArchitectureSection } from "@/components/architecture/ArchitectureSection";
import { OperationsSection } from "@/components/operations/OperationsSection";
import { CaseStudiesSection } from "@/components/casestudies/CaseStudiesSection";
import { StackSection } from "@/components/stack/StackSection";
import { CTASection } from "@/components/cta/CTASection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      <Hero />
      <PlatformsSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <OperationsSection />
      <CaseStudiesSection />
      <StackSection />
      <CTASection />
      <Footer />
    </div>
  );
}