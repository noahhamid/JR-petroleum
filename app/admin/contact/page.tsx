"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Save,
  ArrowLeft,
  MessageSquare,
  Map as MapIcon,
  HelpCircle,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Loader2,
} from "lucide-react";
import Link from "next/link";

// These are the defaults used if the database is empty
const INITIAL_DATA = {
  address: "Bole Road, Addis Ababa, Ethiopia, 1000",
  phones: ["+251 11 234 5678", "+251 11 234 5679"],
  emails: ["info@jrpetroleum.et", "support@jrpetroleum.et"],
  hours: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
  emergencyPhone: "+251 11 999 8888",
  socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
};

export default function ContactAdmin() {
  const [activeTab, setActiveTab] = useState<"info" | "location" | "faq">(
    "info"
  );
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [infoData, setInfoData] = useState(INITIAL_DATA);

  useEffect(() => {
    // Listen to the contact_info document
    const unsub = onSnapshot(doc(db, "settings", "contact_info"), (docSnap) => {
      if (docSnap.exists()) {
        setInfoData(docSnap.data() as typeof INITIAL_DATA);
      } else {
        // If document doesn't exist, we keep the INITIAL_DATA in state
        console.log("No existing data found, using defaults.");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // We use setDoc so it creates the document if it doesn't exist
      await setDoc(doc(db, "settings", "contact_info"), {
        ...infoData,
        lastUpdated: serverTimestamp(),
      });
      alert("Contact Information synced successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-bold">Main Dashboard</span>
          </Link>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
            <p className="text-[10px] uppercase text-emerald-500 font-bold tracking-widest">
              Database Linked
            </p>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <h1 className="text-4xl font-black tracking-tight">
            Contact Settings
          </h1>
          <p className="text-gray-500 text-sm">
            Update the global contact details used across the entire website.
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-10 p-1.5 bg-gray-900/50 w-fit rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === "info"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Phone size={16} className="inline mr-2" /> Form Info
          </button>
          {/* ... other tabs ... */}
        </div>

        {activeTab === "info" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Main Info Card */}
              <div className="bg-gray-900 border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-amber-500">
                  Contact Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500">
                      Head Office Address
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 outline-none"
                      value={infoData.address}
                      onChange={(e) =>
                        setInfoData({ ...infoData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-gray-500">
                        Phone Numbers
                      </label>
                      {infoData.phones.map((p, i) => (
                        <input
                          key={i}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500"
                          value={p}
                          onChange={(e) => {
                            const n = [...infoData.phones];
                            n[i] = e.target.value;
                            setInfoData({ ...infoData, phones: n });
                          }}
                        />
                      ))}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-gray-500">
                        Emails
                      </label>
                      {infoData.emails.map((em, i) => (
                        <input
                          key={i}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500"
                          value={em}
                          onChange={(e) => {
                            const n = [...infoData.emails];
                            n[i] = e.target.value;
                            setInfoData({ ...infoData, emails: n });
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500">
                      Business Hours
                    </label>
                    <div className="grid md:grid-cols-2 gap-4 mt-1">
                      {infoData.hours.map((h, i) => (
                        <input
                          key={i}
                          className="p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500"
                          value={h}
                          onChange={(e) => {
                            const n = [...infoData.hours];
                            n[i] = e.target.value;
                            setInfoData({ ...infoData, hours: n });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials Card */}
              <div className="bg-gray-900 border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-amber-500">
                  Social Connections
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.keys(infoData.socials).map((key) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-lg text-gray-400">
                        {key === "facebook" && <Facebook size={18} />}
                        {key === "twitter" && <Twitter size={18} />}
                        {key === "linkedin" && <Linkedin size={18} />}
                        {key === "instagram" && <Instagram size={18} />}
                      </div>
                      <input
                        className="bg-transparent flex-1 p-2 outline-none text-sm"
                        placeholder={`${key} link`}
                        value={(infoData.socials as any)[key]}
                        onChange={(e) =>
                          setInfoData({
                            ...infoData,
                            socials: {
                              ...infoData.socials,
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Save Section */}
            <div className="space-y-6">
              <div className="bg-amber-500 rounded-3xl p-8 text-black shadow-xl shadow-amber-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <Globe strokeWidth={3} />
                  <h3 className="font-black uppercase tracking-tight">
                    Emergency Support
                  </h3>
                </div>
                <p className="text-black/60 text-[10px] font-bold uppercase mb-2">
                  Displayed on Home & Contact
                </p>
                <input
                  className="w-full p-4 bg-black/10 border border-black/10 rounded-xl outline-none font-black text-xl focus:bg-black/20"
                  value={infoData.emergencyPhone}
                  onChange={(e) =>
                    setInfoData({ ...infoData, emergencyPhone: e.target.value })
                  }
                />
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-6 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={24} />
                )}
                {isSaving ? "Saving..." : "Apply All Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
