// app/admin/about/page.tsx
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

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

type Milestone = {
  id: string;
  year: string;
  title: string; // Editable title field
  description: string;
};

export default function AboutAdmin() {
  // Gallery
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(
    null
  );
  const [galleryForm, setGalleryForm] = useState({
    src: "",
    alt: "",
    caption: "",
  });

  // Our Story - Pre-populated with your original content
  const [story, setStory] = useState(
    "Founded in 1985, Jr Petroleum began as a small fuel distribution company in Addis Ababa. Through unwavering commitment to quality and customer service, we have grown to become one of Ethiopia's most trusted petroleum companies.\n\nOur strategic partnership with Ethiopian Airlines, spanning over two decades, showcases our capability to meet the highest international standards in aviation fuel supply, supporting the growth of Africa's largest airline."
  );
  const [storyYears, setStoryYears] = useState("38+");
  const [storyImage, setStoryImage] = useState(
    "/modern-petroleum-company-headquarters-building--co.jpg"
  );
  const [mission, setMission] = useState(
    "To deliver reliable energy solutions that power progress across Ethiopia."
  );
  const [vision, setVision] = useState(
    "To be East Africa's most trusted and innovative energy partner."
  );
  const [editingStory, setEditingStory] = useState(false);

  // Key Milestones
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null
  );
  const [milestoneForm, setMilestoneForm] = useState({
    year: "",
    title: "",
    description: "",
  });

  // Load real data from Firestore (overrides defaults if exists)
  useEffect(() => {
    // Gallery
    const galleryUnsub = onSnapshot(collection(db, "gallery"), (snap) => {
      setGalleryImages(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage))
      );
    });

    // Story
    const storyDocRef = doc(db, "about", "story");
    const storyUnsub = onSnapshot(storyDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStory(data?.content || story);
        setStoryYears(data?.years || storyYears);
        setStoryImage(data?.image || storyImage);
        setMission(data?.mission || mission);
        setVision(data?.vision || vision);
      }
    });

    // Milestones
    const milestonesUnsub = onSnapshot(collection(db, "milestones"), (snap) => {
      setMilestones(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Milestone))
      );
    });

    return () => {
      galleryUnsub();
      storyUnsub();
      milestonesUnsub();
    };
  }, []);

  // Gallery CRUD
  const saveGallery = async () => {
    if (!galleryForm.src || !galleryForm.alt || !galleryForm.caption) return;
    if (editingGallery) {
      await updateDoc(doc(db, "gallery", editingGallery.id), galleryForm);
    } else {
      await addDoc(collection(db, "gallery"), galleryForm);
    }
    setGalleryForm({ src: "", alt: "", caption: "" });
    setShowGalleryForm(false);
    setEditingGallery(null);
  };

  const deleteGallery = async (id: string) => {
    if (confirm("Delete this image permanently?")) {
      await deleteDoc(doc(db, "gallery", id));
    }
  };

  // Story Save
  const saveStory = async () => {
    await setDoc(doc(db, "about", "story"), {
      content: story,
      years: storyYears,
      image: storyImage,
      mission,
      vision,
      lastUpdated: serverTimestamp(),
    });
    setEditingStory(false);
  };

  // Milestones CRUD
  const saveMilestone = async () => {
    if (
      !milestoneForm.year ||
      !milestoneForm.title ||
      !milestoneForm.description
    )
      return;
    if (editingMilestone) {
      await updateDoc(
        doc(db, "milestones", editingMilestone.id),
        milestoneForm
      );
    } else {
      await addDoc(collection(db, "milestones"), milestoneForm);
    }
    setMilestoneForm({ year: "", title: "", description: "" });
    setShowMilestoneForm(false);
    setEditingMilestone(null);
  };

  const deleteMilestone = async (id: string) => {
    if (confirm("Delete this milestone?")) {
      await deleteDoc(doc(db, "milestones", id));
    }
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
          About Us Management
        </h1>

        {/* 1. Our Story */}
        <section className="mb-20 bg-white/5 backdrop-blur-lg rounded-3xl p-10 border border-white/10">
          <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>

          {editingStory ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Years of Excellence
                </label>
                <input
                  value={storyYears}
                  onChange={(e) => setStoryYears(e.target.value)}
                  placeholder="e.g. 38+"
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Header Image URL
                </label>
                <input
                  value={storyImage}
                  onChange={(e) => setStoryImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {storyImage && (
                  <img
                    src={storyImage}
                    alt="Preview"
                    className="mt-4 w-full max-h-64 object-cover rounded-xl"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Main Story Text
                </label>
                <textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={8}
                  placeholder="The full company story..."
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Our Mission
                </label>
                <textarea
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  rows={3}
                  placeholder="Our mission statement..."
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Our Vision
                </label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  rows={3}
                  placeholder="Our vision statement..."
                  className="w-full px-5 py-4 bg-gray-700 rounded-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={saveStory}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg"
                >
                  Save Story
                </button>
                <button
                  onClick={() => setEditingStory(false)}
                  className="flex-1 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-8">
                {story || "No story added yet..."}
              </div>
              <button
                onClick={() => setEditingStory(true)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
              >
                Edit Story
              </button>
            </div>
          )}
        </section>

        {/* 2. Gallery */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">Gallery</h2>
            <button
              onClick={() => setShowGalleryForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg text-white"
            >
              <Plus size={20} /> Add Image
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="relative group bg-gray-800 rounded-xl overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setGalleryForm({
                          src: img.src,
                          alt: img.alt,
                          caption: img.caption,
                        });
                        setEditingGallery(img);
                        setShowGalleryForm(true);
                      }}
                      className="p-3 bg-blue-600 rounded-full"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteGallery(img.id)}
                      className="p-3 bg-red-600 rounded-full"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="p-3 text-white text-sm">{img.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Key Milestones */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">Key Milestones</h2>
            <button
              onClick={() => {
                setMilestoneForm({ year: "", title: "", description: "" });
                setEditingMilestone(null);
                setShowMilestoneForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg text-white"
            >
              <Plus size={20} /> Add Milestone
            </button>
          </div>

          <div className="space-y-6">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="bg-white/5 p-6 rounded-xl flex justify-between items-start"
              >
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400">
                    {m.year}
                  </h3>
                  <h4 className="text-xl font-semibold text-white mt-1">
                    {m.title}
                  </h4>
                  <p className="text-gray-300 mt-2">{m.description}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMilestoneForm({
                        year: m.year,
                        title: m.title,
                        description: m.description,
                      });
                      setEditingMilestone(m);
                      setShowMilestoneForm(true);
                    }}
                    className="p-3 bg-blue-600 rounded-full text-white"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => deleteMilestone(m.id)}
                    className="p-3 bg-red-600 rounded-full text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Gallery Add/Edit Modal */}
      {showGalleryForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingGallery ? "Edit Image" : "Add New Image"}
            </h3>
            <div className="space-y-4">
              <input
                placeholder="Image URL"
                value={galleryForm.src}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, src: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />
              <input
                placeholder="Alt Text"
                value={galleryForm.alt}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, alt: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />
              <textarea
                placeholder="Caption"
                value={galleryForm.caption}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, caption: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
                rows={3}
              />
              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveGallery}
                  className="flex-1 py-3 bg-emerald-600 rounded-lg text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowGalleryForm(false)}
                  className="flex-1 py-3 bg-gray-600 rounded-lg text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Milestone Add/Edit Modal */}
      {showMilestoneForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingMilestone ? "Edit Milestone" : "Add New Milestone"}
            </h3>
            <div className="space-y-4">
              <input
                placeholder="Year (e.g. 2015)"
                value={milestoneForm.year}
                onChange={(e) =>
                  setMilestoneForm({ ...milestoneForm, year: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />
              <input
                placeholder="Title (e.g. Regional Growth)"
                value={milestoneForm.title}
                onChange={(e) =>
                  setMilestoneForm({ ...milestoneForm, title: e.target.value })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
              />
              <textarea
                placeholder="Description"
                value={milestoneForm.description}
                onChange={(e) =>
                  setMilestoneForm({
                    ...milestoneForm,
                    description: e.target.value,
                  })
                }
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
                rows={4}
              />
              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveMilestone}
                  className="flex-1 py-3 bg-emerald-600 rounded-lg text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowMilestoneForm(false)}
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
