// seed-hero-slides.js
// Run this once: node seed-hero-slides.js
// It will add your original 4 hero slides to Firestore collection "hero_slides"

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBqXSPPBoLGt92rlwUXfkOmwk1ehWoyHeo",
  authDomain: "jr-pt-8c3ab.firebaseapp.com",
  projectId: "jr-pt-8c3ab",
  storageBucket: "jr-pt-8c3ab.firebasestorage.app",
  messagingSenderId: "517828591958",
  appId: "1:517828591958:web:72c176c10c2939976056f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const originalSlides = [
  {
    image:
      "https://res.cloudinary.com/dijiwkewo/image/upload/v1765721617/IMG-20251211-WA0027_r8yloo.jpg",
    title: "Quality at Every Station",
    subtitle: "Nationwide Network",
    description:
      "Over 100 stations across Ethiopia, delivering premium fuel products with exceptional customer service.",
    badge: "100+ Stations",
    showPartner: false
  },
 
  {
    image:
      "https://res.cloudinary.com/dijiwkewo/image/upload/v1765722482/IMG-20251211-WA0015_fu2lob.jpg",
    title: "Powering Ethiopia's Future",
    subtitle: "Energy Leadership",
    description:
      "Leading the nation's energy sector with state-of-the-art infrastructure and sustainable solutions for tomorrow.",
    badge: "Since 1985",
    showPartner: false
  },
   {
    image: "/ethiopian-airlines-airplane-refueling-at-airport-w.jpg",
    title: "Proud Partner of Ethiopian Airlines",
    subtitle: "Aviation Fuel Excellence",
    description:
      "Powering Africa's largest airline with premium aviation fuel, ensuring safe and reliable flights across the globe.",
    badge: "Strategic Partnership",
    showPartner: true
  },
  {
    image:
      "https://res.cloudinary.com/dijiwkewo/image/upload/v1765722602/IMG-20251211-WA0031_xgjopp.jpg",
    title: "Reliable Distribution",
    subtitle: "Logistics Excellence",
    description:
      "Our extensive fleet ensures timely delivery of petroleum products to every corner of Ethiopia.",
    badge: "24/7 Operations",
    showPartner: false
  }
];

async function seedHeroSlides() {
  console.log("Starting to seed your original hero slides...");

  for (const slide of originalSlides) {
    await addDoc(collection(db, "hero_slides"), {
      ...slide,
      createdAt: serverTimestamp(),
    });
    console.log(`Added slide: ${slide.title}`);
  }

  console.log("\nSeeding complete! 🎉");
  console.log("Now go to /admin/home — you should see your 4 original slides listed.");
  console.log("Public homepage slider will also show them immediately.");
}

seedHeroSlides().catch((error) => {
  console.error("Error during seeding:", error);
});