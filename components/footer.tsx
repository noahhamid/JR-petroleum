// components/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ScrollAnimation } from "@/components/scroll-animation";

// Icon mapping (case-insensitive support)
const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  Instagram: Instagram,
} as const;

// Default data (safe & complete)
const DEFAULT_FOOTER = {
  brand: {
    logoText: "Jr",
    name: "Jr Petroleum",
    slogan: "Energy Solutions",
    description:
      "Ethiopia's leading petroleum company, powering progress and partnerships across the nation since 1985.",
  },
  contact: {
    phone: "+251 111 234 567",
    email: "info@jrpetroleum.com",
    address: "Bole Sub-City, Addis Ababa, Ethiopia",
  },
  companyLinks: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/" },
    { name: "News", href: "/" },
    { name: "Sustainability", href: "/" },
  ],
  servicesLinks: [
    { name: "Retail Fuel", href: "/products" },
    { name: "Aviation Fuel", href: "/products" },
    { name: "Commercial Supply", href: "/products" },
    { name: "Lubricants", href: "/products" },
  ],
  supportLinks: [
    { name: "Find Stations", href: "/stations" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/" },
    { name: "Partners", href: "/" },
  ],
  socialLinks: [
    { platform: "facebook", href: "#", label: "Facebook" },
    { platform: "twitter", href: "#", label: "Twitter" },
    { platform: "linkedin", href: "#", label: "LinkedIn" },
    { platform: "instagram", href: "#", label: "Instagram" },
  ],
};

export function Footer() {
  const [data, setData] = useState(DEFAULT_FOOTER);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "footer"), (snap) => {
      if (snap.exists()) {
        const fsData = snap.data() || {};

        setData({
          ...DEFAULT_FOOTER,
          brand: {
            ...DEFAULT_FOOTER.brand,
            ...(fsData.brand || {}),
          },
          contact: {
            ...DEFAULT_FOOTER.contact,
            ...(fsData.contact || {}),
          },
          companyLinks: Array.isArray(fsData.companyLinks)
            ? fsData.companyLinks
            : DEFAULT_FOOTER.companyLinks,
          servicesLinks: Array.isArray(fsData.servicesLinks)
            ? fsData.servicesLinks
            : DEFAULT_FOOTER.servicesLinks,
          supportLinks: Array.isArray(fsData.supportLinks)
            ? fsData.supportLinks
            : DEFAULT_FOOTER.supportLinks,
          socialLinks: Array.isArray(fsData.socialLinks)
            ? fsData.socialLinks
            : DEFAULT_FOOTER.socialLinks,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Safe icon resolver
  const getIcon = (platform?: string) =>
    (platform && iconMap[platform as keyof typeof iconMap]) || Facebook;

  const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks : [];

  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-23 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <ScrollAnimation direction="up" delay={0}>
              <Link href="/" className="flex items-center gap-3 mb-6">
                {/* Replaced text logo with image */}
                <img
                  src="https://res.cloudinary.com/dijiwkewo/image/upload/v1765728857/download__1_-removebg-preview_fn6qpb.png"
                  alt="Jr Petroleum Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="font-bold text-xl">
                    {data.brand?.name ?? "Jr Petroleum"}
                  </span>
                  <p className="text-amber-400/80 text-xs uppercase tracking-[0.2em]">
                    {data.brand?.slogan ?? "Energy Solutions"}
                  </p>
                </div>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <p className="text-white/60 leading-relaxed text-[15px] mb-6 max-w-sm">
                {data.brand?.description ??
                  "Ethiopia's leading petroleum company..."}
              </p>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="space-y-3">
                {data.contact?.phone && (
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{data.contact.phone}</span>
                  </a>
                )}
                {data.contact?.email && (
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-amber-400 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{data.contact.email}</span>
                  </a>
                )}
                {data.contact?.address && (
                  <div className="flex items-start gap-3 text-sm text-white/60">
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>{data.contact.address}</span>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>

          {/* Links Columns */}
          <ScrollAnimation direction="up" delay={100}>
            <div>
              <h3 className="font-semibold mb-4 text-[15px] text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {(Array.isArray(data.companyLinks)
                  ? data.companyLinks
                  : []
                ).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-amber-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={200}>
            <div>
              <h3 className="font-semibold mb-4 text-[15px] text-white">
                Services
              </h3>
              <ul className="space-y-3">
                {(Array.isArray(data.servicesLinks)
                  ? data.servicesLinks
                  : []
                ).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={300}>
            <div>
              <h3 className="font-semibold mb-4 text-[15px] text-white">
                Support
              </h3>
              <ul className="space-y-3">
                {(Array.isArray(data.supportLinks)
                  ? data.supportLinks
                  : []
                ).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-23 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <ScrollAnimation direction="left" delay={0}>
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} {data.brand?.name ?? "Jr Petroleum"}.
              All rights reserved.
            </p>
          </ScrollAnimation>

          {/* Social Links */}
          <ScrollAnimation direction="right" delay={0}>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.platform);
                return (
                  <a
                    key={social.label || social.platform}
                    href={social.href || "#"}
                    aria-label={social.label || social.platform}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-[#0a1628] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </footer>
  );
}
