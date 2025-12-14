import { Navbar } from "@/components/navbar";
import { HeroSlider } from "@/components/hero-slider";
import { PartnerBanner } from "@/components/partner-banner";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { AboutPreview } from "@/components/about-preview";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSlider />
      <PartnerBanner />
      <ServicesSection />
      <StatsSection />
      <AboutPreview />
      <CTASection />
      <Footer />
    </main>
  );
}
