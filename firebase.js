import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6bxPsQbZtdRIt-q2hGvfXsAd2EnRjnII",
  authDomain: "art-tile-ceramics.firebaseapp.com",
  projectId: "art-tile-ceramics",
  storageBucket: "art-tile-ceramics.firebasestorage.app",
  messagingSenderId: "197115417380",
  appId: "1:197115417380:web:dfe0fdaa0995a840e959b1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const ADMIN_EMAIL = "sp1706smart@gmail.com";

const loginBtn = document.getElementById("loginBtn");
const adminPanel = document.getElementById("adminPanel");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    if (user.email !== ADMIN_EMAIL) {
      alert("Access Denied");
      await signOut(auth);
      return;
    }

    alert("Login Successful");
  } catch (error) {
    console.log(error);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user && user.email === ADMIN_EMAIL) {
    adminPanel.style.display = "block";
    loginBtn.style.display = "none";
  } else {
    adminPanel.style.display = "none";
    loginBtn.style.display = "block";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});
