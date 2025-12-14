"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    src: "/fuel-station-modern-ethiopia-night-lights.jpg",
    alt: "Jr Petroleum Fuel Station",
    caption: "Modern Fuel Station in Addis Ababa",
  },
  {
    src: "/aviation-fuel-airplane-refueling-ethiopian-airline.jpg",
    alt: "Aviation Fuel Service",
    caption: "Ethiopian Airlines Partnership",
  },
  {
    src: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728507/IMG-20251211-WA0015_yfzrzl.jpg",
    alt: "Tanker Fleet",
    caption: "Our Modern Distribution Fleet",
  },
  {
    src: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728508/IMG-20251211-WA0028_mo2obe.jpg",
    alt: "Storage Facility",
    caption: "State-of-the-Art Storage Facilities",
  },
  {
    src: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728498/IMG-20251211-WA0022_q2rngl.jpg",
    alt: "Our Team",
    caption: "Dedicated Team of Professionals",
  },
  {
    src: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728506/IMG-20251211-WA0024_mt11kv.jpg",
    alt: "Community Program",
    caption: "Community Development Initiatives",
  },
  {
    src: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728498/IMG-20251211-WA0020_vixmow.jpg",
    alt: "Quality Lab",
    caption: "Quality Assurance Laboratory",
  },
  {
    src: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728496/IMG-20251211-WA0032_jzvfmm.jpg",
    alt: "Convenience Store",
    caption: "Full-Service Convenience Stores",
  },
];

export function AboutGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-23">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-semibold text-[13px] uppercase tracking-wider">
              Visual Journey
            </span>
            <h2 className="text-3xl  font-bold text-foreground mt-2">
              Our Gallery
            </h2>
            <p className="text-muted-foreground text-sm mt-4 max-w-xl mx-auto">
              Explore our operations, facilities, and the people who make Jr
              Petroleum a trusted name in Ethiopian energy.
            </p>
          </div>
        </ScrollAnimation>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <ScrollAnimation
              key={image.alt}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 50}
            >
              <div
                className={cn(
                  "relative group cursor-pointer overflow-hidden rounded-xl",
                  index === 0 || index === 5
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                )}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={cn(
                    "w-full object-cover transition-transform duration-500 group-hover:scale-110",
                    index === 0 || index === 5
                      ? "h-[300px] md:h-[400px]"
                      : "h-[200px]"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium">{image.caption}</p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-amber-400/0 group-hover:border-amber-400/50 rounded-xl transition-colors duration-300" />
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 md:left-8 text-white/70 hover:text-white p-2 z-50"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            className="absolute right-4 md:right-8 text-white/70 hover:text-white p-2 z-50"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div
            className="max-w-5xl max-h-[80vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {galleryImages[selectedImage].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
