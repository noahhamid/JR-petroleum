"use client";

import { MapPin, Phone, ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-23">
        <ScrollAnimation direction="up">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/modern-gas-station-at-sunset--premium-fuel-station.jpg')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/80 to-[#0a1628]/60" />

            {/* Content */}
            <div className="relative z-10 py-16 lg:py-24 px-8 lg:px-16">
              <div className="max-w-2xl">
                <ScrollAnimation direction="up" delay={100}>
                  <p className="text-amber-400 text-[13px] uppercase tracking-[0.3em] mb-4">
                    Get Started
                  </p>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={200}>
                  <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-6 text-balance">
                    Find a Jr Petroleum Station Near You
                  </h2>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={300}>
                  <p className="text-white/70 text-md leading-relaxed mb-8">
                    With over 100 stations across Ethiopia, premium fuel is
                    never far away. Experience the Jr Petroleum difference
                    today.
                  </p>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={400}>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/stations"
                      className="inline-flex items-center text-sm gap-2 px-6 py-3 bg-amber-400 text-[#0a1628] font-semibold rounded-lg hover:bg-amber-300 transition-colors group"
                    >
                      <MapPin className="w-5 h-5" />
                      Find Stations
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="tel:+251111234567"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call Us
                    </a>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
