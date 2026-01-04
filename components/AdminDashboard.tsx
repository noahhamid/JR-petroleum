"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Info,
  Droplets,
  Fuel,
  MessageSquare,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Plus,
  Footprints, // New icon for Footer (or use Globe, Edit, etc.)
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default function AdminDashboard() {
  const menuItems = [
    {
      title: "Overview",
      description: "Network health and analytics summary.",
      icon: <LayoutDashboard size={28} />,
      href: "/admin/home",
    },
    {
      title: "Stations",
      description: "Manage fuel levels and availability.",
      icon: <Fuel size={28} />,
      href: "/admin/stations",
    },
    {
      title: "Products",
      description: "Edit catalog and technical specs.",
      icon: <Droplets size={28} />,
      href: "/admin/products",
    },
    {
      title: "Gallery",
      description: "Update the About Us visual journey.",
      icon: <ImageIcon size={28} />,
      href: "/admin/about",
    },
    {
      title: "Messages",
      description: "View inquiries and contact requests.",
      icon: <MessageSquare size={28} />,
      href: "/admin/contact",
    },
    {
      title: "Footer",
      description: "Customize brand, contact & links in the footer.",
      icon: <Footprints size={28} />, // You can also use Globe, Edit3, AtSign, etc.
      href: "/admin/footer",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
      {/* Background Subtle Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg text-black">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <span className="font-black tracking-tighter text-xl uppercase">
              JR Petroleum <span className="text-amber-500">HQ</span>
            </span>
          </div>
          <LogoutButton />
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            Command <span className="text-gray-500">Center.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Welcome back, Administrator. Select a module below to manage your
            petroleum network operations.
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="h-full bg-gray-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl transition-all duration-300 group-hover:bg-gray-900 group-hover:border-white/20 group-hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {item.title}
                  <ArrowRight
                    size={16}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500"
                  />
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Subtle Indicator Line */}
                <div className="mt-6 h-1 w-12 rounded-full bg-white/5 group-hover:w-full group-hover:bg-amber-500 transition-all duration-500" />
              </div>
            </Link>
          ))}

          {/* Quick Settings Card (placeholder for future modules) */}
          <div className="border border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4">
              <Plus size={20} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">
              New Module Coming Soon
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-medium uppercase tracking-widest">
            System Status:{" "}
            <span className="text-emerald-500">All Systems Operational</span>
          </p>
          <p className="text-gray-600 text-xs font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} JR Petroleum Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
}
