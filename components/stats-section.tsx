"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { ScrollAnimation } from "@/components/scroll-animation";

type Stat = {
  id: string;
  value: number;
  label: string;
  prefix: string;
  suffix: string;
};

function CountUp({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValue + (target - startValue) * easeOutQuart
      );

      setCount(currentValue);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "stats"), (snapshot) => {
      const fetched = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Stat)
      );
      setStats(fetched);
    });

    return () => unsub();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-[#0a1628] to-[#0f2744]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <ScrollAnimation key={stat.id} direction="up" delay={index * 100}>
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-400 mb-2">
                  <CountUp
                    target={stat.value}
                    duration={2000}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-white/60 text-[13px] uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
