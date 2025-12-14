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
import { ScrollAnimation } from "@/components/scroll-animation";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/" },
    { name: "News", href: "/" },
    { name: "Sustainability", href: "/" },
  ],
  services: [
    { name: "Retail Fuel", href: "/products" },
    { name: "Aviation Fuel", href: "/products" },
    { name: "Commercial Supply", href: "/products" },
    { name: "Lubricants", href: "/products" },
  ],
  support: [
    { name: "Find Stations", href: "/stations" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/" },
    { name: "Partners", href: "/" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-23 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <ScrollAnimation direction="up" delay={0}>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-[#0a1628] font-bold text-xl">Jr</span>
                </div>
                <div>
                  <span className="font-bold text-xl">Jr Petroleum</span>
                  <p className="text-amber-400/80 text-xs uppercase tracking-[0.2em]">
                    Energy Solutions
                  </p>
                </div>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={100}>
              <p className="text-white/60 leading-relaxed text-[15px] mb-6 max-w-sm">
                Ethiopia's leading petroleum company, powering progress and
                partnerships across the nation since 1985.
              </p>
            </ScrollAnimation>

            {/* Contact Info */}
            <ScrollAnimation direction="up" delay={200}>
              <div className="space-y-3">
                <a
                  href="tel:+251111234567"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+251 111 234 567</span>
                </a>
                <a
                  href="mailto:info@jrpetroleum.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@jrpetroleum.com</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
                </div>
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
                {footerLinks.company.map((link) => (
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
                {footerLinks.services.map((link) => (
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
                {footerLinks.support.map((link) => (
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
              © {new Date().getFullYear()} Jr Petroleum. All rights reserved.
            </p>
          </ScrollAnimation>

          {/* Social Links */}
          <ScrollAnimation direction="right" delay={0}>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-[#0a1628] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </footer>
  );
}
