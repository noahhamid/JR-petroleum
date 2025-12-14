"use client";

import { ScrollAnimation } from "@/components/scroll-animation";

const milestones = [
  {
    year: "1985",
    title: "Foundation",
    description: "Jr Petroleum established in Addis Ababa",
  },
  {
    year: "1992",
    title: "Expansion",
    description: "Opened first 10 fuel stations across Ethiopia",
  },
  {
    year: "2001",
    title: "Aviation Partnership",
    description: "Began supplying aviation fuel to Ethiopian Airlines",
  },
  {
    year: "2010",
    title: "Regional Growth",
    description: "Expanded operations to 5 regions",
  },
  {
    year: "2018",
    title: "Modernization",
    description: "Launched digital payment systems at all stations",
  },
  {
    year: "2023",
    title: "Sustainability",
    description: "Introduced eco-friendly fuel options",
  },
];

export function AboutTimeline() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-semibold text-[13px] uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl font-bold  text-foreground mt-2">
              Key Milestones
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-400/30 -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <ScrollAnimation
                key={milestone.year}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
              >
                <div
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 hidden md:block ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm inline-block max-w-md">
                      <span className="text-amber-500 font-bold text-xl">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/30">
                    <div className="w-3 h-3 bg-[#0a1628] rounded-full" />
                  </div>

                  <div className="flex-1 md:hidden">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                      <span className="text-amber-500 font-bold text-2xl">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
