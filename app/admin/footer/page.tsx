// app/admin/footer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Save,
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

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
    { name: "Careers", href: "/careers" },
    { name: "News", href: "/news" },
    { name: "Sustainability", href: "/sustainability" },
  ],
  servicesLinks: [
    { name: "Retail Fuel", href: "/products/retail" },
    { name: "Aviation Fuel", href: "/products/aviation" },
    { name: "Commercial Supply", href: "/products/commercial" },
    { name: "Lubricants", href: "/products/lubricants" },
  ],
  supportLinks: [
    { name: "Find Stations", href: "/stations" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Partners", href: "/partners" },
  ],
  socialLinks: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
};

export default function FooterAdmin() {
  const [data, setData] = useState(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "footer"), (snap) => {
      if (snap.exists()) {
        setData(snap.data() as typeof DEFAULT_FOOTER);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "footer"), {
        ...data,
        lastUpdated: serverTimestamp(),
      });
      alert("Footer updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save footer data");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header & Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-500 mb-2"
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Footer Settings
            </h1>
            <p className="text-gray-500 mt-1">
              Manage the content shown in the website footer
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Brand & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brand Section */}
            <section className="bg-gray-900/70 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <Globe size={22} /> Brand Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                    Logo Text
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    value={data.brand.logoText}
                    onChange={(e) =>
                      setData({
                        ...data,
                        brand: { ...data.brand, logoText: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                    Brand Name
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    value={data.brand.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        brand: { ...data.brand, name: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                  Slogan
                </label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  value={data.brand.slogan}
                  onChange={(e) =>
                    setData({
                      ...data,
                      brand: { ...data.brand, slogan: e.target.value },
                    })
                  }
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 resize-none"
                  value={data.brand.description}
                  onChange={(e) =>
                    setData({
                      ...data,
                      brand: { ...data.brand, description: e.target.value },
                    })
                  }
                />
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-gray-900/70 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <Phone size={22} /> Contact Information
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                    Phone
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    value={data.contact.phone}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact, phone: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    value={data.contact.email}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact, email: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-400 mb-2">
                    Address
                  </label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    value={data.contact.address}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...data.contact, address: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section className="bg-gray-900/70 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <LinkIcon size={22} /> Social Media Links
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {Object.entries(data.socialLinks).map(([platform, url]) => (
                  <div key={platform} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300">
                      {platform === "facebook" && <Facebook size={20} />}
                      {platform === "twitter" && <Twitter size={20} />}
                      {platform === "linkedin" && <Linkedin size={20} />}
                      {platform === "instagram" && <Instagram size={20} />}
                    </div>
                    <input
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                      placeholder={`${platform} URL`}
                      value={url}
                      onChange={(e) =>
                        setData({
                          ...data,
                          socialLinks: {
                            ...data.socialLinks,
                            [platform]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Quick Links Preview */}
          <div className="space-y-6">
            <div className="bg-amber-600/20 border border-amber-500/30 rounded-2xl p-6">
              <h3 className="font-bold text-amber-300 mb-4">
                Quick Links Sections
              </h3>
              <p className="text-sm text-gray-300">
                You can manage the quick links (Company, Services, Support) in
                the next version or directly in Firestore for now.
              </p>
            </div>

            <div className="bg-gray-900/70 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-3">Save Reminder</h3>
              <p className="text-sm text-gray-400">
                Don't forget to click "Save Changes" after editing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
