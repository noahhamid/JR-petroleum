"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

const features = [
  "Ethiopia's leading petroleum distributor",
  "Official partner of Ethiopian Airlines",
  "ISO certified quality standards",
  "Sustainable energy practices",
];

export function AboutPreview() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-23">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <ScrollAnimation direction="left" delay={0}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/modern-petroleum-company-headquarters-building--co.jpg"
                  alt="Jr Petroleum Headquarters"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-white shadow-2xl rounded-2xl p-6 border border-border">
                <p className="text-4xl font-bold text-primary">38+</p>
                <p className="text-muted-foreground text-sm">
                  Years of Excellence
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right - Content */}
          <div>
            <ScrollAnimation direction="up" delay={0}>
              <p className="text-amber-600 text-[13px] uppercase tracking-[0.3em] mb-4">
                About Us
              </p>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">
                Powering Ethiopia's Growth Since 1985
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <p className="text-muted-foreground text-md leading-relaxed mb-8">
                Jr Petroleum has been at the forefront of Ethiopia's energy
                sector for nearly four decades. Our commitment to quality,
                innovation, and sustainability has made us the trusted choice
                for millions of customers and major partners including Ethiopian
                Airlines.
              </p>
            </ScrollAnimation>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <ScrollAnimation
                  key={feature}
                  direction="up"
                  delay={300 + index * 100}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground text-md">{feature}</span>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            {/* CTA */}
            <ScrollAnimation direction="up" delay={700}>
              <a
                href="/about"
                className="inline-flex items-center text-sm gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity group"
              >
                Discover Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
