"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactHero() {
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
      <div className="relative z-10 container mx-auto px-6 lg:px-23 pt-32 pb-20">
        <div className="max-w-2xl">
          <ScrollAnimation direction="left" delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.75 bg-amber-400 text-[#0a1628] text-[13px] font-bold rounded-full">
                Get in Touch
              </span>
              <span className="px-4 py-1.75 bg-white/10 border border-white/20 text-white text-[13px] font-medium rounded-full">
                24/7 Support
              </span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Power Your
              <span className="block text-amber-400">Success Together</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={200}>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Whether you need bulk fuel supply, partnership inquiries, or
              customer support, our team is ready to assist you.
            </p>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={300}>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Quick Response
                  </div>
                  <div className="text-white/50 text-[13px]">Within 24hrs</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Email Support
                  </div>
                  <div className="text-white/50 text-[13px]">
                    Always Available
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Visit Us
                  </div>
                  <div className="text-white/50 text-[13px]">Addis Ababa</div>
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
