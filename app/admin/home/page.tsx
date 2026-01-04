// app/admin/home/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Plus, Edit3, Trash2, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Slide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  showPartner: boolean;
};

type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
};

type AboutPreviewData = {
  image: string;
  years: string;
  title: string;
  description: string;
  features: string[];
};

type Stat = {
  id: string;
  value: number;
  label: string;
  prefix: string;
  suffix: string;
};

export default function HomeAdmin() {
  // Hero Slides
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(true);
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [slideForm, setSlideForm] = useState({
    image: "",
    title: "",
    subtitle: "",
    description: "",
    badge: "",
    showPartner: false,
  });

  // Services
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    icon: "Fuel",
    title: "",
    description: "",
    color: "from-amber-400 to-orange-500",
  });

  // About Preview
  const [aboutData, setAboutData] = useState<AboutPreviewData>({
    image: "/modern-petroleum-company-headquarters-building--co.jpg",
    years: "38+",
    title: "Powering Ethiopia's Growth Since 1985",
    description:
      "Jr Petroleum has been at the forefront of Ethiopia's energy sector for nearly four decades. Our commitment to quality, innovation, and sustainability has made us the trusted choice for millions of customers and major partners including Ethiopian Airlines.",
    features: [
      "Ethiopia's leading petroleum distributor",
      "Official partner of Ethiopian Airlines",
      "ISO certified quality standards",
      "Sustainable energy practices",
    ],
  });
  const [showAboutForm, setShowAboutForm] = useState(false);

  // Stats
  const [stats, setStats] = useState<Stat[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [showStatForm, setShowStatForm] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [statForm, setStatForm] = useState({
    value: 0,
    label: "",
    prefix: "",
    suffix: "",
  });

  // Load all data
  useEffect(() => {
    // Slides
    const slidesUnsub = onSnapshot(collection(db, "hero_slides"), (snap) => {
      setSlides(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Slide)));
      setLoadingSlides(false);
    });

    // Services
    const servicesUnsub = onSnapshot(collection(db, "services"), (snap) => {
      setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service)));
      setLoadingServices(false);
    });

    // About Preview
    const aboutDocRef = doc(db, "about_preview", "main");
    const aboutUnsub = onSnapshot(aboutDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setAboutData(docSnap.data() as AboutPreviewData);
      }
    });

    // Stats
    const statsUnsub = onSnapshot(collection(db, "stats"), (snap) => {
      setStats(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Stat)));
      setLoadingStats(false);
    });

    return () => {
      slidesUnsub();
      servicesUnsub();
      aboutUnsub();
      statsUnsub();
    };
  }, []);

  // Hero Slide CRUD
  const saveSlide = async () => {
    if (
      !slideForm.image ||
      !slideForm.title ||
      !slideForm.subtitle ||
      !slideForm.description
    )
      return;
    if (editingSlide) {
      await updateDoc(doc(db, "hero_slides", editingSlide.id), slideForm);
    } else {
      await addDoc(collection(db, "hero_slides"), slideForm);
    }
    resetSlideForm();
  };

  const deleteSlide = async (id: string) => {
    if (confirm("Delete this slide?"))
      await deleteDoc(doc(db, "hero_slides", id));
  };

  const openSlideEdit = (slide: Slide) => {
    setSlideForm(slide);
    setEditingSlide(slide);
    setShowSlideForm(true);
  };

  const resetSlideForm = () => {
    setSlideForm({
      image: "",
      title: "",
      subtitle: "",
      description: "",
      badge: "",
      showPartner: false,
    });
    setShowSlideForm(false);
    setEditingSlide(null);
  };

  // Service CRUD
  const saveService = async () => {
    if (!serviceForm.title || !serviceForm.description) return;
    if (editingService) {
      await updateDoc(doc(db, "services", editingService.id), serviceForm);
    } else {
      await addDoc(collection(db, "services"), serviceForm);
    }
    resetServiceForm();
  };

  const deleteService = async (id: string) => {
    if (confirm("Delete this service?"))
      await deleteDoc(doc(db, "services", id));
  };

  const openServiceEdit = (service: Service) => {
    setServiceForm(service);
    setEditingService(service);
    setShowServiceForm(true);
  };

  const resetServiceForm = () => {
    setServiceForm({
      icon: "Fuel",
      title: "",
      description: "",
      color: "from-amber-400 to-orange-500",
    });
    setShowServiceForm(false);
    setEditingService(null);
  };

  // About Preview Save
  const saveAbout = async () => {
    await setDoc(doc(db, "about_preview", "main"), {
      ...aboutData,
      lastUpdated: serverTimestamp(),
    });
    setShowAboutForm(false);
  };

  // Stats CRUD
  const saveStat = async () => {
    if (!statForm.label) return;
    if (editingStat) {
      await updateDoc(doc(db, "stats", editingStat.id), statForm);
    } else {
      await addDoc(collection(db, "stats"), statForm);
    }
    resetStatForm();
  };

  const deleteStat = async (id: string) => {
    if (confirm("Delete this stat?")) await deleteDoc(doc(db, "stats", id));
  };

  const openStatEdit = (stat: Stat) => {
    setStatForm({
      value: stat.value,
      label: stat.label,
      prefix: stat.prefix,
      suffix: stat.suffix,
    });
    setEditingStat(stat);
    setShowStatForm(true);
  };

  const resetStatForm = () => {
    setStatForm({
      value: 0,
      label: "",
      prefix: "",
      suffix: "",
    });
    setShowStatForm(false);
    setEditingStat(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8"
        >
          ← Back to Admin Home
        </Link>

        <h1 className="text-5xl font-extrabold text-white mb-12 text-center">
          Home Page Management
        </h1>

        {/* Hero Slider */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">Hero Slider</h2>
            <button
              onClick={() => setShowSlideForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg text-white"
            >
              <Plus size={20} /> Add Slide
            </button>
          </div>

          {loadingSlides ? (
            <p className="text-center text-white">Loading slides...</p>
          ) : slides.length === 0 ? (
            <p className="text-center text-gray-400">No slides yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="relative group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">
                      {slide.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{slide.subtitle}</p>
                    <p className="text-sm text-gray-400 mt-4 line-clamp-3">
                      {slide.description}
                    </p>
                    {slide.showPartner && (
                      <span className="inline-block mt-4 px-4 py-1 bg-green-600/30 text-green-300 text-sm rounded-full">
                        Show Partner Badge
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openSlideEdit(slide)}
                      className="p-3 bg-blue-600 rounded-full text-white"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteSlide(slide.id)}
                      className="p-3 bg-red-600 rounded-full text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Services */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">
              What We Do - Services
            </h2>
            <button
              onClick={() => setShowServiceForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg text-white"
            >
              <Plus size={20} /> Add Service
            </button>
          </div>

          {loadingServices ? (
            <p className="text-center text-white">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-400">No services yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="relative group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-2xl transition-all"
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                      service.color
                    )}
                  >
                    <div className="w-8 h-8 text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mt-2 text-sm">
                    {service.description}
                  </p>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openServiceEdit(service)}
                      className="p-3 bg-blue-600 rounded-full text-white"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-3 bg-red-600 rounded-full text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* About Preview */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">
              About Us Preview (Home)
            </h2>
            <button
              onClick={() => setShowAboutForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg text-white"
            >
              <Edit3 size={20} /> Edit About Preview
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Header Image</label>
                <img
                  src={aboutData.image}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-xl"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Years of Excellence
                </label>
                <p className="text-white text-xl">{aboutData.years}</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <p className="text-white text-2xl font-bold">
                  {aboutData.title}
                </p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <p className="text-gray-300">{aboutData.description}</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Features</label>
                <ul className="list-disc pl-5 text-gray-300">
                  {aboutData.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Management */}
        <section className="mt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">Home Stats</h2>
            <button
              onClick={() => {
                setStatForm({
                  value: 0,
                  label: "",
                  prefix: "",
                  suffix: "",
                });
                setEditingStat(null);
                setShowStatForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg text-white"
            >
              <Plus size={20} /> Add Stat
            </button>
          </div>

          {loadingStats ? (
            <p className="text-center text-white">Loading stats...</p>
          ) : stats.length === 0 ? (
            <p className="text-center text-gray-400">No stats yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="relative group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-2xl transition-all"
                >
                  <div className="text-center">
                    <p className="text-4xl font-bold text-amber-400 mb-2">
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="text-white/80">{stat.label}</p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openStatEdit(stat)}
                      className="p-3 bg-blue-600 rounded-full text-white"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteStat(stat.id)}
                      className="p-3 bg-red-600 rounded-full text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Slide Form Modal */}
      {showSlideForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                {editingSlide ? "Edit Slide" : "Add New Slide"}
              </h2>
              <button
                onClick={resetSlideForm}
                className="text-gray-400 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Slide Image URL
                </label>
                <input
                  value={slideForm.image}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, image: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {slideForm.image && (
                  <img
                    src={slideForm.image}
                    alt="Preview"
                    className="mt-4 w-full max-h-64 object-cover rounded-xl"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Title
                </label>
                <input
                  value={slideForm.title}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, title: e.target.value })
                  }
                  placeholder="e.g. Proud Partner of Ethiopian Airlines"
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Subtitle
                </label>
                <input
                  value={slideForm.subtitle}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, subtitle: e.target.value })
                  }
                  placeholder="e.g. Aviation Fuel Excellence"
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  value={slideForm.description}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, description: e.target.value })
                  }
                  rows={4}
                  placeholder="Detailed description..."
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Badge Text
                </label>
                <input
                  value={slideForm.badge}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, badge: e.target.value })
                  }
                  placeholder="e.g. Strategic Partnership"
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={slideForm.showPartner}
                  onChange={(e) =>
                    setSlideForm({
                      ...slideForm,
                      showPartner: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-emerald-500"
                />
                Show Ethiopian Airlines Partner Badge
              </label>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={saveSlide}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg"
                >
                  {editingSlide ? "Update Slide" : "Save Slide"}
                </button>
                <button
                  onClick={resetSlideForm}
                  className="flex-1 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingService ? "Edit Service" : "Add New Service"}
            </h3>
            <div className="space-y-4">
              <select
                value={serviceForm.icon}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, icon: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              >
                <option value="Fuel">Fuel</option>
                <option value="Plane">Plane</option>
                <option value="Truck">Truck</option>
                <option value="Building2">Building</option>
              </select>

              <input
                placeholder="Title"
                value={serviceForm.title}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, title: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />

              <textarea
                placeholder="Description"
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    description: e.target.value,
                  })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
                rows={4}
              />

              <input
                placeholder="Color (e.g. from-amber-400 to-orange-500)"
                value={serviceForm.color}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, color: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />

              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveService}
                  className="flex-1 py-3 bg-emerald-600 rounded-lg text-white"
                >
                  Save
                </button>
                <button
                  onClick={resetServiceForm}
                  className="flex-1 py-3 bg-gray-600 rounded-lg text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Preview Edit Modal */}
      {showAboutForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                Edit About Preview
              </h2>
              <button
                onClick={() => setShowAboutForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Header Image URL
                </label>
                <input
                  value={aboutData.image}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, image: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <img
                  src={aboutData.image}
                  alt="Preview"
                  className="mt-4 w-full max-h-64 object-cover rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Years of Excellence
                </label>
                <input
                  value={aboutData.years}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, years: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  value={aboutData.title}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, title: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={aboutData.description}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={aboutData.features.join("\n")}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      features: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  rows={6}
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                  placeholder="One feature per line"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={saveAbout}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowAboutForm(false)}
                  className="flex-1 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stat Form Modal */}
      {showStatForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingStat ? "Edit Stat" : "Add New Stat"}
            </h3>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Value (e.g. 500)"
                value={statForm.value}
                onChange={(e) =>
                  setStatForm({ ...statForm, value: Number(e.target.value) })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />

              <input
                placeholder="Label (e.g. Fuel Stations)"
                value={statForm.label}
                onChange={(e) =>
                  setStatForm({ ...statForm, label: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />

              <input
                placeholder="Prefix (e.g. empty or $)"
                value={statForm.prefix}
                onChange={(e) =>
                  setStatForm({ ...statForm, prefix: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />

              <input
                placeholder="Suffix (e.g. + or M+)"
                value={statForm.suffix}
                onChange={(e) =>
                  setStatForm({ ...statForm, suffix: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />

              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveStat}
                  className="flex-1 py-3 bg-emerald-600 rounded-lg text-white"
                >
                  Save
                </button>
                <button
                  onClick={resetStatForm}
                  className="flex-1 py-3 bg-gray-600 rounded-lg text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
