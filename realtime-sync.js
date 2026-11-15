import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, onSnapshot, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuOgES0lUt-MGSiM5blxxCm36W67xQK3c",
  authDomain: "studypunchone.firebaseapp.com",
  databaseURL: "https://studypunchone-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studypunchone",
  storageBucket: "studypunchone.firebasestorage.app",
  messagingSenderId: "381035155998",
  appId: "1:381035155998:web:89d31d81751a8a92cbd40f",
  measurementId: "G-43W16NHSN4"
};

// Reuse existing Firebase app instance if already loaded
const fbApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(fbApp);

// 1. Enable Offline Persistence (saves locally when offline & syncs automatically when online)
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("Offline persistence status:", err.code);
});

// 2. Real-Time Live Sync Stream for All Students & Leaderboard
onSnapshot(collection(db, "students"), (snapshot) => {
  let usersMap = {};
  try {
    usersMap = JSON.parse(localStorage.getItem("studypunch_users_map") || "{}");
  } catch {}

  const savedCurrent = localStorage.getItem("studypunch_current_user");
  const currentUser = savedCurrent ? JSON.parse(savedCurrent) : null;

  snapshot.forEach((docSnap) => {
    const cloudUser = docSnap.data();
    usersMap[docSnap.id] = cloudUser;

    // Keep current user's data synced across devices
    if (currentUser && docSnap.id === currentUser.id) {
      localStorage.setItem("studypunch_current_user", JSON.stringify(cloudUser));
    }
  });

  localStorage.setItem("studypunch_users_map", JSON.stringify(usersMap));

  // If the Leaderboard tab is currently open, click refresh automatically
  const leaderboardView = document.getElementById("leaderboardView");
  const refreshBtn = document.getElementById("refreshLeaderboardBtn");
  if (leaderboardView && !leaderboardView.classList.contains("hidden") && refreshBtn) {
    refreshBtn.click();
  }
}, (error) => {
  console.warn("Live cloud stream paused:", error.message);
});
