"use client";

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

const contactDetails = [
  {
    icon: MapPin,
    title: "Head Office",
    details: ["Bole Road, Addis Ababa", "Ethiopia, 1000"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+251 11 234 5678", "+251 11 234 5679"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["info@jrpetroleum.et", "support@jrpetroleum.et"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <ScrollAnimation direction="right">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
          <span className="text-amber-500 font-semibold text-[12px] uppercase tracking-wider">
            Contact Information
          </span>
          <h2 className="text-2xl font-bold text-foreground mt-2 mb-6">
            Reach Out to Us
          </h2>

          <div className="space-y-6">
            {contactDetails.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">
                    {item.title}
                  </h3>
                  {item.details.map((detail) => (
                    <p
                      key={detail}
                      className="text-muted-foreground text-[13px]"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation direction="right" delay={100}>
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
          <h3 className="font-bold text-foreground mb-4">Connect With Us</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:bg-amber-400 hover:text-[#0a1628] transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </ScrollAnimation>

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
            <span className="font-bold text-amber-400">+251 11 999 8888</span>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}
