"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Target, Eye } from "lucide-react";

export function AboutStory() {
  const [storyData, setStoryData] = useState({
    content: "",
    years: "38+",
    image: "/modern-petroleum-company-headquarters-building--co.jpg",
    mission: "",
    vision: "",
  });

  useEffect(() => {
    const storyDocRef = doc(db, "about", "story");
    const unsub = onSnapshot(storyDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStoryData({
          content: data?.content || "",
          years: data?.years || "38+",
          image:
            data?.image ||
            "/modern-petroleum-company-headquarters-building--co.jpg",
          mission: data?.mission || "",
          vision: data?.vision || "",
        });
      }
    });

    return () => unsub();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-23">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <ScrollAnimation direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={storyData.image}
                  alt="Jr Petroleum Headquarters"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-8 -right-8 bg-amber-400 text-[#0a1628] p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">{storyData.years}</div>
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
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">
                A Legacy of Energy Excellence
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">
                {storyData.content || "Loading story..."}
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
                      {storyData.mission || "Loading mission..."}
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
                      {storyData.vision || "Loading vision..."}
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
