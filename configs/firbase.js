// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAfDJCJyn0KIBiaPnNynmLOZv5pbhtREjg",
  authDomain: "ronflix-cac5b.firebaseapp.com",
  projectId: "ronflix-cac5b",
  storageBucket: "ronflix-cac5b.firebasestorage.app",
  messagingSenderId: "931186223874",
  appId: "1:931186223874:web:a05dfabac78b13d110301b",
  measurementId: "G-KJSW45T8DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔥 Export Firestore + Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { 
  db,
  auth,
  collection, 
  addDoc,
  getDocs,
  doc,
  setDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
