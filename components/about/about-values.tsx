"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Shield, Leaf, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "We prioritize safety in every operation, ensuring the wellbeing of our employees, partners, and communities.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Committed to environmentally responsible practices that protect Ethiopia's natural heritage for future generations.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description:
      "Building lasting relationships with the communities we serve through employment and development initiatives.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuously investing in modern technology and practices to deliver superior energy solutions.",
  },
];

export function AboutValues() {
  return (
    <section className="py-24 bg-[#0a1628]">
      <div className="container mx-auto px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-[13px] uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="text-3xl  font-bold text-white mt-2">
              Our Core Values
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ScrollAnimation
              key={value.title}
              direction="up"
              delay={index * 100}
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group">
                <div className="w-11 h-11 bg-amber-400/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                  <value.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
