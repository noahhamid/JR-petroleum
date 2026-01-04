"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Plus,
  Edit3,
  Trash2,
  MapPin,
  Fuel,
  Droplets,
  Plane,
  Clock,
  ArrowLeft,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function StationsAdmin() {
  const [stations, setStations] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    location: "",
    city: "",
    image: "",
    gasoline: "available",
    diesel: "available",
    lubricants: "available",
    jetFuel: "out",
    phone: "",
    hours: "24/7",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "stations"), (snap) => {
      setStations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // --- STATS CALCULATION ---
  const stats = {
    low: stations.filter((s) => s.gasoline === "low" || s.diesel === "low")
      .length,
    out: stations.filter((s) => s.gasoline === "out" && s.diesel === "out")
      .length,
    total: stations.length,
  };

  const quickUpdate = async (id: string, field: string, value: string) => {
    await updateDoc(doc(db, "stations", id), {
      [field]: value,
      lastUpdated: serverTimestamp(),
    });
  };

  const saveStation = async () => {
    editingId
      ? await updateDoc(doc(db, "stations", editingId), {
          ...formData,
          lastUpdated: serverTimestamp(),
        })
      : await addDoc(collection(db, "stations"), {
          ...formData,
          lastUpdated: serverTimestamp(),
        });
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      location: "",
      city: "",
      image: "",
      gasoline: "available",
      diesel: "available",
      lubricants: "available",
      jetFuel: "out",
      phone: "",
      hours: "24/7",
    });
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* --- TOP NAVIGATION & STATS BAR --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors group w-fit"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-bold">Main Dashboard</span>
          </Link>

          <div className="flex flex-wrap gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <div>
                <p className="text-[10px] uppercase text-emerald-500/70 font-bold leading-none">
                  Total Stations
                </p>
                <p className="text-lg font-black leading-tight">
                  {stats.total}
                </p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <AlertTriangle size={18} className="text-amber-500" />
              <div>
                <p className="text-[10px] uppercase text-amber-500/70 font-bold leading-none">
                  Low Stock
                </p>
                <p className="text-lg font-black leading-tight">{stats.low}</p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <XCircle size={18} className="text-red-500" />
              <div>
                <p className="text-[10px] uppercase text-red-500/70 font-bold leading-none">
                  Critical Out
                </p>
                <p className="text-lg font-black leading-tight">{stats.out}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Manage Stations
            </h1>
            <p className="text-gray-500 text-sm">
              Update inventory and fuel availability in real-time.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
          >
            <Plus size={20} /> Add Station
          </button>
        </div>

        {/* --- STATION GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <div
              key={station.id}
              className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-5 border-b border-white/5 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{station.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {station.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData(station);
                      setEditingId(station.id);
                      setShowForm(true);
                    }}
                    className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={async () =>
                      confirm(
                        "Are you sure you want to delete this station?"
                      ) && (await deleteDoc(doc(db, "stations", station.id)))
                    }
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* QUICK TOGGLES */}
              <div className="p-5 grid grid-cols-2 gap-3 bg-black/20">
                {[
                  {
                    id: "gasoline",
                    label: "Gasoline",
                    icon: <Fuel size={14} />,
                  },
                  {
                    id: "diesel",
                    label: "Diesel",
                    icon: <Droplets size={14} />,
                  },
                  {
                    id: "lubricants",
                    label: "Lubricants",
                    icon: <Droplets size={14} className="text-blue-400" />,
                  },
                  {
                    id: "jetFuel",
                    label: "Jet Fuel",
                    icon: <Plane size={14} className="text-sky-400" />,
                  },
                ].map((type) => (
                  <div key={type.id} className="space-y-1.5">
                    <span className="text-[10px] uppercase font-black text-gray-500 flex items-center gap-1">
                      {type.icon} {type.label}
                    </span>
                    <select
                      value={station[type.id] || "out"}
                      onChange={(e) =>
                        quickUpdate(station.id, type.id, e.target.value)
                      }
                      className={`w-full text-[11px] font-bold px-2 py-2 rounded-lg border outline-none cursor-pointer transition-colors
                        ${
                          station[type.id] === "available"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : station[type.id] === "low"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                    >
                      <option value="available" className="bg-gray-900">
                        In Stock
                      </option>
                      <option value="low" className="bg-gray-900">
                        Low Stock
                      </option>
                      <option value="out" className="bg-gray-900">
                        Out / Closed
                      </option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL FORM --- */}
        {showForm && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-white/10 p-8 rounded-3xl w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-500 rounded-2xl text-black">
                  {editingId ? <Edit3 size={24} /> : <Plus size={24} />}
                </div>
                <div>
                  <h2 className="text-2xl font-black">Station Setup</h2>
                  <p className="text-gray-500 text-sm">
                    Fill in the details below to update the map.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                      Station Name
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. JR Bole"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                      City
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Addis Ababa"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                    Full Address / Location
                  </label>
                  <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Bole Road, next to..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                      Contact Phone
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+251..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                      Operation Hours
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: e.target.value })
                      }
                      placeholder="24/7"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                    Image URL
                  </label>
                  <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={saveStation}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20"
                  >
                    {editingId ? "Save Changes" : "Create Station"}
                  </button>
                  <button
                    onClick={closeForm}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
