"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Premium Gasoline",
    tagline: "Unleaded 95 RON",
    description:
      "Our flagship automotive fuel, engineered for optimal engine performance and fuel efficiency. Premium Gasoline delivers cleaner combustion, reduced emissions, and enhanced power output for modern vehicles.",
    image: "/premium-gasoline-fuel-pump-close-up-golden.jpg",
    features: [
      "Enhanced engine protection",
      "Improved fuel economy",
      "Lower emissions",
      "Cleaner combustion",
    ],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Super Diesel",
    tagline: "High-Performance Diesel",
    description:
      "Advanced diesel fuel formulated for commercial and heavy-duty vehicles. Super Diesel provides superior lubricity, prevents injector deposits, and delivers consistent power across all operating conditions.",
    image: "/diesel-fuel-tanker-truck-industrial.jpg",
    features: [
      "Extended engine life",
      "Maximum power output",
      "Cold weather performance",
      "Injector protection",
    ],
    badge: "Commercial Grade",
  },
  {
    id: 3,
    name: "Jet A-1 Aviation Fuel",
    tagline: "Aviation Turbine Fuel",
    description:
      "International-standard aviation fuel meeting AFQRJOS specifications. Trusted by Ethiopian Airlines for over two decades, our Jet A-1 ensures reliable performance for commercial and private aviation.",
    image: "/airplane-wing-refueling-airport-ethiopian-airlines.jpg",
    features: [
      "AFQRJOS certified",
      "Ethiopian Airlines approved",
      "Strict quality control",
      "24/7 availability",
    ],
    badge: "Aviation Partner",
  },
  {
    id: 4,
    name: "Industrial Fuel Oil",
    tagline: "Heavy Fuel Solutions",
    description:
      "Cost-effective fuel solution for industrial applications, power generation, and manufacturing facilities. Our Industrial Fuel Oil delivers consistent energy output for continuous operations.",
    image: "/industrial-power-plant-machinery-fuel.jpg",
    features: [
      "High energy density",
      "Cost-effective",
      "Consistent supply",
      "Bulk delivery",
    ],
    badge: "Industrial",
  },
  {
    id: 5,
    name: "Premium Lubricants",
    tagline: "Engine Protection Series",
    description:
      "Comprehensive range of automotive and industrial lubricants designed to protect, preserve, and enhance engine performance. Available in various grades for all vehicle types and machinery.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Full synthetic options",
      "Multi-grade protection",
      "Extended drain intervals",
      "All vehicle types",
    ],
    badge: "New Range",
  },
];

export function ProductsList() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-20">
            <span className="text-amber-500 font-semibold text-[13px] uppercase tracking-wider">
              Our Products
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-2">
              Energy Solutions for Every Need
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From everyday automotive fuels to specialized aviation and
              industrial solutions, discover our comprehensive range of premium
              energy products.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-32">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={product.id}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-20 items-center`}
              >
                {/* Image */}
                <ScrollAnimation
                  direction={isEven ? "left" : "right"}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-amber-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-75 md:h-100 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-amber-400 text-[#0a1628] text-[13px] font-bold rounded-full shadow-lg">
                          {product.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <ScrollAnimation
                    direction={isEven ? "right" : "left"}
                    delay={100}
                  >
                    <span className="text-amber-500 font-medium text-[13px] uppercase tracking-wider">
                      {product.tagline}
                    </span>
                    <h3 className="text-3xl font-bold text-foreground mt-2 mb-4">
                      {product.name}
                    </h3>
                  </ScrollAnimation>

                  <ScrollAnimation
                    direction={isEven ? "right" : "left"}
                    delay={200}
                  >
                    <p className="text-muted-foreground leading-relaxed text-md mb-8">
                      {product.description}
                    </p>
                  </ScrollAnimation>

                  <ScrollAnimation
                    direction={isEven ? "right" : "left"}
                    delay={300}
                  >
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-amber-400/20 rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-amber-500" />
                          </div>
                          <span className="text-foreground text-[13px]">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    direction={isEven ? "right" : "left"}
                    delay={400}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-[#0a1628] text-white font-semibold rounded-lg hover:bg-[#0a1628]/90 transition-colors group"
                    >
                      Request Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </ScrollAnimation>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
