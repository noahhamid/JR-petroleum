"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/ethiopian-airlines-airplane-refueling-at-airport-w.jpg",
    title: "Proud Partner of Ethiopian Airlines",
    subtitle: "Aviation Fuel Excellence",
    description:
      "Powering Africa's largest airline with premium aviation fuel, ensuring safe and reliable flights across the globe.",
    badge: "Strategic Partnership",
    showPartner: true,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dijiwkewo/image/upload/v1765722482/IMG-20251211-WA0015_fu2lob.jpg",
    title: "Powering Ethiopia's Future",
    subtitle: "Energy Leadership",
    description:
      "Leading the nation's energy sector with state-of-the-art infrastructure and sustainable solutions for tomorrow.",
    badge: "Since 1985",
    showPartner: false,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dijiwkewo/image/upload/v1765721617/IMG-20251211-WA0027_r8yloo.jpg",
    title: "Quality at Every Station",
    subtitle: "Nationwide Network",
    description:
      "Over 100 stations across Ethiopia, delivering premium fuel products with exceptional customer service.",
    badge: "100+ Stations",
    showPartner: false,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dijiwkewo/image/upload/v1765722602/IMG-20251211-WA0031_xgjopp.jpg",
    title: "Reliable Distribution",
    subtitle: "Logistics Excellence",
    description:
      "Our extensive fleet ensures timely delivery of petroleum products to every corner of Ethiopia.",
    badge: "24/7 Operations",
    showPartner: false,
  },
];

const SLIDE_INTERVAL = 4000;

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const slideRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return;
      setAnimationKey((prev) => prev + 1);
      setCurrentSlide(index);
      setProgress(0);
    },
    [currentSlide]
  );

  const nextSlide = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    // Clear existing timers
    if (slideRef.current) clearInterval(slideRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    // Start progress animation (updates every 40ms for smooth animation)
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_INTERVAL / 40);
      });
    }, 40);

    // Auto advance slide
    slideRef.current = setInterval(nextSlide, SLIDE_INTERVAL);

    return () => {
      if (slideRef.current) clearInterval(slideRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [nextSlide, currentSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image with Zoom Effect */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-out",
              index === currentSlide ? "scale-110" : "scale-100"
            )}
            style={{
              backgroundImage: `url(${slide.image})`,
              transformOrigin: "center center",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-6 lg:px-23 flex items-center">
        <div className="max-w-2xl" key={animationKey}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full mb-6 opacity-0 animate-[slideUp_0.6s_ease-out_0.1s_forwards]">
            {slides[currentSlide].showPartner && (
              <Plane className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-amber-400 text-sm font-medium">
              {slides[currentSlide].badge}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-amber-400/80 text-[13px] uppercase tracking-[0.3em] mb-4 opacity-0 animate-[slideUp_0.6s_ease-out_0.2s_forwards]">
            {slides[currentSlide].subtitle}
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance opacity-0 animate-[slideUp_0.6s_ease-out_0.3s_forwards]">
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl opacity-0 animate-[slideUp_0.6s_ease-out_0.4s_forwards]">
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-[slideUp_0.6s_ease-out_0.5s_forwards]">
            <button className="group px-8 py-4 text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a1628] font-semibold rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg hover:shadow-amber-400/25 flex items-center gap-2">
              Explore More
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border text-sm border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
              Our Services
            </button>
          </div>

          {/* Ethiopian Airlines Partner Badge */}
          {slides[currentSlide].showPartner && (
            <div className="mt-10 inline-flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl opacity-0 animate-[slideUp_0.6s_ease-out_0.6s_forwards]">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Official Fuel Partner
                </p>
                <p className="text-white/60 text-[13px]">
                  Ethiopian Airlines Group
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "relative h-1.5 rounded-full transition-all duration-300 overflow-hidden",
              index === currentSlide
                ? "w-[50px] bg-white/20"
                : "w-3 bg-white/20 hover:bg-white/40"
            )}
          >
            {/* Progress fill for active slide */}
            {index === currentSlide && (
              <div
                className="absolute inset-y-0 left-0 bg-amber-400 rounded-full transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
            {/* Dot indicator for inactive slides */}
            {index !== currentSlide && (
              <div className="absolute inset-0 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-12 z-30 hidden lg:flex items-center gap-4">
        <span className="text-white/40 text-sm">0{currentSlide + 1}</span>
        <div className="w-12 h-px bg-white/20" />
        <span className="text-white/40 text-sm">0{slides.length}</span>
      </div>

      {/* Inline keyframes for slideUp animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
