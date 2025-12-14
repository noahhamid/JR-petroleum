import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StationsHero } from "@/components/stations/stations-hero"
import { StationsList } from "@/components/stations/stations-list"
import { StationsMap } from "@/components/stations/stations-map"

export default function StationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <StationsHero />
      <StationsList />
      <StationsMap />
      <Footer />
    </main>
  )
}
