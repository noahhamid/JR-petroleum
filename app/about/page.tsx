import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutValues } from "@/components/about/about-values"
import { AboutGallery } from "@/components/about/about-gallery"
import { AboutTimeline } from "@/components/about/about-timeline"

export const metadata = {
  title: "About Us | Jr Petroleum - Ethiopia's Leading Energy Company",
  description:
    "Learn about Jr Petroleum's 38-year legacy of excellence in Ethiopia's energy sector and our partnership with Ethiopian Airlines.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutGallery />
      <AboutTimeline />
      <Footer />
    </main>
  )
}
