// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC6bxPsQbZtdRIt-q2hGvfXsAd2EnRjnII",
  authDomain: "art-tile-ceramics.firebaseapp.com",
  projectId: "art-tile-ceramics",
  storageBucket: "art-tile-ceramics.firebasestorage.app",
  messagingSenderId: "197115417380",
  appId: "1:197115417380:web:dfe0fdaa0995a840e959b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export { collection, addDoc, getDocs, deleteDoc, doc };
