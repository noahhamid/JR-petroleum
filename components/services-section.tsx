"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Fuel, Truck, Building2, Plane, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "@/components/scroll-animation";

type Service = {
  id: string;
  icon: string; // string key for ICON_MAP
  title: string;
  description: string;
  color: string;
};

const ICON_MAP: Record<string, any> = {
  Fuel: Fuel,
  Plane: Plane,
  Truck: Truck,
  Building2: Building2,
};

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "services"), (snapshot) => {
      const fetched = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Service)
      );
      setServices(fetched);
    });

    return () => unsub();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-23">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollAnimation direction="up" delay={0}>
            <p className="text-amber-600 text-[13px] uppercase tracking-[0.3em] mb-4">
              What We Do
            </p>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={100}>
            <h2 className="text-3xl max-w-2xl mx-auto font-bold text-foreground mb-6 text-balance">
              Comprehensive Energy Solutions for Every Need
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={200}>
            <p className="text-muted-foreground text-md leading-relaxed">
              From retail stations to aviation fuel, we deliver excellence
              across all petroleum sectors with unwavering commitment to quality
              and reliability.
            </p>
          </ScrollAnimation>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Fuel; // fallback

            return (
              <ScrollAnimation
                key={service.id}
                direction="up"
                delay={300 + index * 100}
              >
                <div className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                      service.color
                    )}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
