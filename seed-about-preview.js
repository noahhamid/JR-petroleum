// seed-about-preview.js
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, serverTimestamp } = require("firebase/firestore");

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

async function seedAboutPreview() {
  await setDoc(doc(db, "about_preview", "main"), {
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
    lastUpdated: serverTimestamp(),
  });

  console.log("About Preview data seeded!");
}

seedAboutPreview().catch(console.error);