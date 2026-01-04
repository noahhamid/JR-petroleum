"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { ChevronRight, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  showPartner: boolean;
};

const SLIDE_INTERVAL = 4000;

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Track initial loading

  const slideTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch slides from Firestore
  useEffect(() => {
    setIsLoading(true);

    const unsub = onSnapshot(collection(db, "hero_slides"), (snapshot) => {
      const fetched = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Slide)
      );
      setSlides(fetched);
      setIsLoading(false); // Data loaded → hide spinner
    });

    return () => unsub();
  }, []);

  const resetTimers = useCallback(() => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);

    setProgress(0);

    progressTimer.current = setInterval(() => {
      setProgress((prev) =>
        prev >= 100 ? 100 : prev + 100 / (SLIDE_INTERVAL / 40)
      );
    }, 40);

    slideTimer.current = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, SLIDE_INTERVAL);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0 || isLoading) return;
    resetTimers();

    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [currentSlide, slides.length, isLoading, resetTimers]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || index < 0 || index >= slides.length) return;
      setAnimationKey((prev) => prev + 1);
      setCurrentSlide(index);
      setProgress(0);
    },
    [currentSlide, slides.length]
  );

  const nextSlide = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="relative w-20 h-20">
          {/* Spinner */}
          <div className="absolute inset-0 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animate-[spin_1.5s_linear_infinite]" />
          <div className="absolute inset-4 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full opacity-20 blur-md animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium"></div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>No slides available</p>
      </div>
    );
  }

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-6 lg:px-23 flex items-center">
        <div className="max-w-2xl" key={animationKey}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full mb-6 opacity-0 animate-[slideUp_0.6s_ease-out_0.1s_forwards]">
            {slides[currentSlide].showPartner && (
              <Plane className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-amber-400 text-sm font-medium">
              {slides[currentSlide].badge}
            </span>
          </div>

          <p className="text-amber-400/80 text-[13px] uppercase tracking-[0.3em] mb-4 opacity-0 animate-[slideUp_0.6s_ease-out_0.2s_forwards]">
            {slides[currentSlide].subtitle}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance opacity-0 animate-[slideUp_0.6s_ease-out_0.3s_forwards]">
            {slides[currentSlide].title}
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl opacity-0 animate-[slideUp_0.6s_ease-out_0.4s_forwards]">
            {slides[currentSlide].description}
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-[slideUp_0.6s_ease-out_0.5s_forwards]">
            <a
              href="/stations"
              className="group px-8 py-4 text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a1628] font-semibold rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg hover:shadow-amber-400/25 flex items-center gap-2"
            >
              Explore More
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/products"
              className="px-8 py-4 border text-sm border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Our Products
            </a>
          </div>

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

      {/* Progress Dots */}
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
            {index === currentSlide && (
              <div
                className="absolute inset-y-0 left-0 bg-amber-400 rounded-full transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
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
