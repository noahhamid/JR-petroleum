"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ScrollAnimation } from "@/components/scroll-animation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

// --- EXISTING DATA AS DEFAULT ---
const DEFAULT_INFO = {
  address: "Bole Road, Addis Ababa, Ethiopia, 1000",
  phones: ["+251 11 234 5678", "+251 11 234 5679"],
  emails: ["info@jrpetroleum.et", "support@jrpetroleum.et"],
  hours: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
  emergencyPhone: "+251 11 999 8888",
  socials: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
};

export function ContactInfo() {
  // Initialize state with the existing data
  const [data, setData] = useState(DEFAULT_INFO);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "contact_info"), (docSnap) => {
      if (docSnap.exists()) {
        // Overwrite defaults with database data if it exists
        setData(docSnap.data() as typeof DEFAULT_INFO);
      }
    });
    return () => unsub();
  }, []);

  // Map the state (Default or DB) to your UI structure
  const contactDetails = [
    {
      icon: MapPin,
      title: "Head Office",
      details: [data.address],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: data.phones,
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: data.emails,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: data.hours,
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: data.socials.facebook, label: "Facebook" },
    { icon: Twitter, href: data.socials.twitter, label: "Twitter" },
    { icon: Linkedin, href: data.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: data.socials.instagram, label: "Instagram" },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Main Contact Info */}
      <ScrollAnimation direction="right">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
          <span className="text-amber-500 font-semibold text-[12px] uppercase tracking-wider">
            Contact Information
          </span>
          <h2 className="text-2xl font-bold text-foreground mt-2 mb-6">
            Reach Out to Us
          </h2>

          <div className="space-y-6">
            {contactDetails.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">
                    {item.title}
                  </h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-[13px]">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {/* 2. Connect Card */}
      <ScrollAnimation direction="right" delay={100}>
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
          <h3 className="font-bold text-foreground mb-4">Connect With Us</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:bg-amber-400 hover:text-[#0a1628] transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {/* 3. Emergency Card */}
      <ScrollAnimation direction="right" delay={200}>
        <div className="bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold">Emergency Fuel Supply</h3>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Need urgent bulk fuel delivery? Our emergency response team is
            available 24/7 for critical supply needs.
          </p>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-amber-400">
              {data.emergencyPhone}
            </span>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}
