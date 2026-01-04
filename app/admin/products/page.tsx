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
} from "firebase/firestore";
import {
  Plus,
  Edit3,
  Trash2,
  Package,
  Tag,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  badge: string;
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    tagline: "",
    description: "",
    image: "",
    features: [""],
    badge: "",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product)));
    });
    return () => unsub();
  }, []);

  // --- STATS CALCULATION ---
  const stats = {
    total: products.length,
    featured: products.filter((p) => p.badge).length,
  };

  const saveProduct = async () => {
    const data = { ...formData, lastUpdated: serverTimestamp() };
    editingId
      ? await updateDoc(doc(db, "products", editingId), data)
      : await addDoc(collection(db, "products"), data);
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      tagline: "",
      description: "",
      image: "",
      features: [""],
      badge: "",
    });
  };

  const addFeatureField = () =>
    setFormData({ ...formData, features: [...formData.features, ""] });
  const removeFeatureField = (index: number) => {
    const newFeatures = formData.features.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, features: newFeatures });
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
              <Package size={18} className="text-emerald-500" />
              <div>
                <p className="text-[10px] uppercase text-emerald-500/70 font-bold leading-none">
                  Total Products
                </p>
                <p className="text-lg font-black leading-tight">
                  {stats.total}
                </p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <Star size={18} className="text-amber-500" />
              <div>
                <p className="text-[10px] uppercase text-amber-500/70 font-bold leading-none">
                  Badged/Featured
                </p>
                <p className="text-lg font-black leading-tight">
                  {stats.featured}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Product Catalog
            </h1>
            <p className="text-gray-500 text-sm">
              Manage JR Petroleum product listings and specifications.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col"
            >
              <div className="relative h-40">
                <img
                  src={product.image || "/placeholder.svg"}
                  className="w-full h-full object-cover opacity-60"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-amber-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase">
                    {product.badge}
                  </span>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => {
                      setFormData(product);
                      setEditingId(product.id);
                      setShowForm(true);
                    }}
                    className="p-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-amber-500 hover:text-black transition-all"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={async () =>
                      confirm("Delete product?") &&
                      (await deleteDoc(doc(db, "products", product.id)))
                    }
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-amber-500 text-xs font-bold mb-3 uppercase tracking-wider">
                  {product.tagline}
                </p>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 italic">
                  "{product.description}"
                </p>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {product.features?.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="text-[9px] bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/5"
                      >
                        {f}
                      </span>
                    ))}
                    {product.features?.length > 3 && (
                      <span className="text-[9px] text-gray-600">
                        +{product.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL FORM --- */}
        {showForm && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-white/10 p-8 rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-500 rounded-2xl text-black">
                  <Package size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Product Details</h2>
                  <p className="text-gray-500 text-sm">
                    Enter technical specifications and marketing info.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                      Product Name
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Jet A-1 Fuel"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                      Badge
                    </label>
                    <input
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      placeholder="e.g. Premium Grade"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                    Tagline
                  </label>
                  <input
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                    value={formData.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    placeholder="Efficiency for the long run"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mt-1 focus:border-amber-500 transition-colors outline-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Detailed product summary..."
                  />
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

                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-gray-500 ml-1">
                    Key Features
                  </label>
                  {formData.features.map((feature: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl focus:border-amber-500 transition-colors outline-none text-sm"
                        value={feature}
                        onChange={(e) => {
                          const newF = [...formData.features];
                          newF[index] = e.target.value;
                          setFormData({ ...formData, features: newF });
                        }}
                        placeholder="Feature point..."
                      />
                      <button
                        onClick={() => removeFeatureField(index)}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFeatureField}
                    className="w-full py-3 border border-dashed border-white/20 rounded-xl text-xs font-bold text-gray-500 hover:border-amber-500 hover:text-amber-500 transition-all"
                  >
                    + Add Feature Point
                  </button>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={saveProduct}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20"
                  >
                    {editingId ? "Update Product" : "Publish Product"}
                  </button>
                  <button
                    onClick={closeForm}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all"
                  >
                    Cancel
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
