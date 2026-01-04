// seed-stats.js
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

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

const statsData = [
  { value: 500, label: "Fuel Stations", prefix: "", suffix: "+" },
  { value: 38, label: "Years of Excellence", prefix: "", suffix: "+" },
  { value: 1, label: "Daily Customers", prefix: "", suffix: "M+" },
  { value: 24, label: "Operations", prefix: "", suffix: "/7" },
];

async function seed() {
  console.log("Seeding stats...");
  for (const stat of statsData) {
    await addDoc(collection(db, "stats"), stat);
    console.log(`Added: ${stat.label}`);
  }
  console.log("Stats seeded! Check /admin/home");
}

seed().catch(console.error);