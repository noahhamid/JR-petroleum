"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Stations", href: "/stations" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#0a1628]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-23 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12  flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="https://res.cloudinary.com/dijiwkewo/image/upload/v1765728857/download__1_-removebg-preview_fn6qpb.png"
              alt="Logo"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-white font-bold text-xl tracking-tight">
              Jr Petroleum
            </span>
            <span className="text-amber-400/80 text-[10px] uppercase tracking-[0.2em]">
              Energy Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-5 py-2 text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a1628] font-semibold text-sm rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg hover:shadow-amber-400/25"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-[#0a1628]/98 backdrop-blur-md transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 border-b border-white/10" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 px-4 py-3 bg-amber-400 text-[#0a1628] font-semibold rounded-lg text-center"
          >
            Get In Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
