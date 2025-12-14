import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductsHero } from "@/components/products/products-hero"
import { ProductsList } from "@/components/products/products-list"
import { ProductsCta } from "@/components/products/products-cta"

export const metadata = {
  title: "Products | Jr Petroleum - Premium Fuels & Lubricants",
  description:
    "Explore Jr Petroleum's range of premium automotive fuels, aviation fuel, industrial solutions, and lubricants. ISO certified quality for Ethiopia.",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductsHero />
      <ProductsList />
      <ProductsCta />
      <Footer />
    </main>
  )
}
