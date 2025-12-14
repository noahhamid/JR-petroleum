"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Fuel, Award, Shield } from "lucide-react";

export function ProductsHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('/premium-fuel-pump-golden-light-modern-gas-station.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-23 pt-32 pb-20">
        <div className="max-w-2xl">
          <ScrollAnimation direction="left" delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.75 bg-amber-400 text-[#0a1628] text-[13px] font-bold rounded-full">
                Premium Quality
              </span>
              <span className="px-4 py-1.75 bg-white/10 border border-white/20 text-white text-[13px] font-medium rounded-full">
                ISO Certified
              </span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Fuel Your World
              <span className="block text-amber-400">With Excellence</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={200}>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              From premium automotive fuels to specialized aviation solutions,
              Jr Petroleum delivers energy products that meet the highest
              international standards.
            </p>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={300}>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Fuel className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    5+ Products
                  </div>
                  <div className="text-white/50 text-[13px]">Fuel Range</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Top Grade
                  </div>
                  <div className="text-white/50 text-[13px]">Quality</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Certified
                  </div>
                  <div className="text-white/50 text-[13px]">Safety</div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0723] via-[#0d0723]/60 to-transparent" />
    </section>
  );
}
