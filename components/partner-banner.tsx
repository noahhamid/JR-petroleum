"use client";

import { Plane, Award, Shield, Globe } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

export function PartnerBanner() {
  return (
    <section className="relative py-20 px-6 lg:px-23 bg-gradient-to-br from-[#0a1628] via-[#0f2744] to-[#0a1628] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side - Partnership Info */}
          <div className="flex-1 text-center lg:text-left">
            <ScrollAnimation direction="up" delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">
                  Strategic Partnership
                </span>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Proud Fuel Partner of{" "}
                <span className="text-green-400">Ethiopian Airlines</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
                We are honored to be the trusted fuel partner of Africa's
                largest and most successful airline, providing premium aviation
                fuel that powers flights across five continents.
              </p>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">125+</p>
                    <p className="text-white/50 text-[13px]">Destinations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">140+</p>
                    <p className="text-white/50 text-[13px]">Aircraft Fleet</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">20+</p>
                    <p className="text-white/50 text-[13px]">Years Partner</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Side - Logo Display */}
          <ScrollAnimation
            direction="right"
            delay={200}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-amber-500/20 blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 lg:p-14">
                <div className="flex items-center gap-6">
                  {/* Jr Petroleum Logo */}
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-[#0a1628] font-bold text-3xl">
                      Jr
                    </span>
                  </div>

                  {/* Connection Lines */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 border-2 border-amber-400 rounded-full" />
                    <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-green-500" />
                    <div className="w-4 h-4 border-2 border-green-500 rounded-full" />
                  </div>

                  {/* Ethiopian Airlines Logo */}
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Plane className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-white/80 font-medium">
                    Fueling Excellence Together
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
