"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Building2, ShieldCheck, Globe } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('/modern-corporate-office-building-sunset-glass-arch.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/85 to-[#0a1628]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-26  pt-32 pb-20">
        <div className="max-w-2xl">
          <ScrollAnimation direction="left" delay={0}>
            <span className="inline-block px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 text-sm font-medium mb-6">
              Established 1985
            </span>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              Powering Ethiopia's
              <span className="block text-amber-400">Progress</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={200}>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              For nearly four decades, Jr Petroleum has been at the forefront of
              Ethiopia's energy sector, delivering excellence and building
              partnerships that fuel the nation's growth.
            </p>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={300}>
            <div className="flex flex-wrap gap-6">
              {/* Experience */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Industry Experience
                  </div>
                  <div className="text-white/50 text-[13px]">
                    Years of trusted operations
                  </div>
                </div>
              </div>

              {/* Quality */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Quality & Safety
                  </div>
                  <div className="text-white/50 text-[13px]">
                    International standards
                  </div>
                </div>
              </div>

              {/* Reach */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Nationwide Presence
                  </div>
                  <div className="text-white/50 text-[13px]">
                    Serving across Ethiopia
                  </div>
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
