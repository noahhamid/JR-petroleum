"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

export function ProductsCta() {
  return (
    <section className="py-24 bg-[#0a1628] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <ScrollAnimation direction="up">
          <span className="inline-block px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            Custom Solutions Available
          </span>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={100}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Need a Tailored Energy Solution?
          </h2>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={200}>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Our team of energy experts is ready to help you find the perfect product for your specific requirements. Get
            in touch for personalized service.
          </p>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#0a1628] font-bold rounded-lg hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Our Team
            </Link>
            <a
              href="tel:+251111234567"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +251 111 234 567
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
