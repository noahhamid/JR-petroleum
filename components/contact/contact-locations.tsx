"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { MapPin, Building2, Plane } from "lucide-react";

const offices = [
  {
    icon: Building2,
    name: "Headquarters",
    location: "Bole Road, Addis Ababa",
    description: "Main corporate office and customer service center",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    icon: Plane,
    name: "Aviation Division",
    location: "Bole International Airport",
    description:
      "Aviation fuel operations and Ethiopian Airlines partnership hub",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    icon: MapPin,
    name: "Regional Office",
    location: "Bahir Dar, Ethiopia",
    description: "Northern region operations and distribution center",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export function ContactLocations() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
              Our Offices
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Visit Our Locations
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Find the nearest Jr Petroleum office for in-person consultations
              and support.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <ScrollAnimation
              key={office.name}
              direction={index === 0 ? "left" : index === 1 ? "up" : "right"}
              delay={index * 100}
            >
              <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={office.image || "/placeholder.svg"}
                    alt={office.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                      <office.icon className="w-5 h-5 text-[#0a1628]" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-amber-500 transition-colors">
                    {office.name}
                  </h3>
                  <p className="text-amber-500 text-sm font-medium mb-2">
                    {office.location}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {office.description}
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
