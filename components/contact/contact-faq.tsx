"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How can I become a Jr Petroleum fuel distributor?",
    answer:
      "To become an authorized distributor, please fill out our contact form with 'Partnership Inquiry' selected, or email our business development team at partnerships@jrpetroleum.et. Our team will guide you through the application process.",
  },
  {
    question: "What are the minimum order quantities for bulk fuel supply?",
    answer:
      "Minimum order quantities vary by product type. For diesel and gasoline, the minimum is typically 5,000 liters. For aviation fuel and industrial fuel oil, please contact our commercial team for specific requirements.",
  },
  {
    question: "Do you offer corporate fuel accounts?",
    answer:
      "Yes, we offer corporate fuel accounts with benefits including volume discounts, consolidated billing, dedicated account managers, and priority delivery. Contact us to learn more about our corporate programs.",
  },
  {
    question: "How do I report an issue at one of your stations?",
    answer:
      "You can report station issues through our contact form by selecting 'Station Feedback', call our customer service hotline, or use the feedback option in our mobile app. We take all feedback seriously and respond within 24 hours.",
  },
  {
    question: "What quality certifications does Jr Petroleum have?",
    answer:
      "Jr Petroleum is ISO 9001:2015 certified and our aviation fuel meets AFQRJOS specifications. We conduct regular quality audits and testing to ensure all our products meet or exceed international standards.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-3.5xl font-bold text-foreground mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and
              partnerships.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 50}>
              <div className="border-b border-border">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-md font-semibold text-foreground group-hover:text-amber-500 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-amber-500"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                  )}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
