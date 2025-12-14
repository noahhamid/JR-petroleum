"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { MapPin, ExternalLink } from "lucide-react";

export function StationsMap() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
              Coverage Map
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Nationwide Presence
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From the capital to regional hubs, Jr Petroleum ensures quality
              fuel is always within reach.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={100}>
          <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
            {/* Map Placeholder */}
            <div className="relative h-[500px] bg-gradient-to-br from-[#0a1628] to-[#1a2d4a]">
              <img
                src="/ethiopia-map-with-location-pins-fuel-stations.jpg"
                alt="Jr Petroleum Station Map"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Overlay Info */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0a1628] font-bold rounded-full shadow-xl mb-4">
                    <MapPin className="w-5 h-5" />
                    12+ Active Stations
                  </div>
                  <p className="text-white/70 text-sm max-w-md mx-auto">
                    Interactive map coming soon. Contact us for specific
                    location details.
                  </p>
                </div>
              </div>

              {/* Animated Pins */}
              <div className="absolute top-[30%] left-[45%] animate-bounce">
                <div className="w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50" />
              </div>
              <div
                className="absolute top-[25%] left-[35%] animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
              </div>
              <div
                className="absolute top-[40%] left-[55%] animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
              </div>
              <div
                className="absolute top-[50%] left-[40%] animate-bounce"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-6 bg-card border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      Headquarters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      Fuel Stations
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
