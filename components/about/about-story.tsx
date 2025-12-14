"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Target, Eye } from "lucide-react";

export function AboutStory() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-23">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <ScrollAnimation direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/modern-petroleum-company-headquarters-building--co.jpg"
                  alt="Jr Petroleum Headquarters"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-8 -right-8 bg-amber-400 text-[#0a1628] p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">38+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Content Side */}
          <div>
            <ScrollAnimation direction="right" delay={100}>
              <span className="text-amber-500 font-semibold text-[13px] uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl  font-bold text-foreground mt-2 mb-6">
                A Legacy of Energy Excellence
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">
                Founded in 1985, Jr Petroleum began as a small fuel distribution
                company in Addis Ababa. Through unwavering commitment to quality
                and customer service, we have grown to become one of Ethiopia's
                most trusted petroleum companies.
              </p>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={300}>
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
                Our strategic partnership with Ethiopian Airlines, spanning over
                two decades, showcases our capability to meet the highest
                international standards in aviation fuel supply, supporting the
                growth of Africa's largest airline.
              </p>
            </ScrollAnimation>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6">
              <ScrollAnimation direction="up" delay={400}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      Our Mission
                    </h3>
                    <p className="text-[13px] text-muted-foreground">
                      To deliver reliable energy solutions that power progress
                      across Ethiopia.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={500}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">
                      Our Vision
                    </h3>
                    <p className="text-[13px] text-muted-foreground">
                      To be East Africa's most trusted and innovative energy
                      partner.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
