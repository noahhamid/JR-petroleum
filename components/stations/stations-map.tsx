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
            {/* Real Interactive Google Maps Embed */}
            <div className="relative h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d403456.166904529!2d38.589!3d9.033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c6b5e5b5e9%3A0x3e8f5f5f5f5f5f5f!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JR Petroleum Stations Map - Ethiopia"
              ></iframe>

              {/* Overlay Info (optional - can remove if you want clean map) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0a1628] font-bold rounded-full shadow-xl mb-4">
                    <MapPin className="w-5 h-5" />
                    12+ Active Stations Across Ethiopia
                  </div>
                  <p className="text-white text-sm">
                    Zoom and explore our nationwide network
                  </p>
                </div>
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
                  href="https://www.google.com/maps/search/JR+Petroleum+stations+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Map
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
