// Firebase core
import { initializeApp } from "firebase/app";

// Firestore database
import { getFirestore } from "firebase/firestore";

// Authentication (for OTP)
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJgJjYYxOX2vEYGN7sfY_-9EJh8Xzq4Ag",
  authDomain: "the-only-place-ea5f9.firebaseapp.com",
  projectId: "the-only-place-ea5f9",
  storageBucket: "the-only-place-ea5f9.firebasestorage.app",
  messagingSenderId: "206770996681",
  appId: "1:206770996681:web:04f5d33480d103bdf71418",
  measurementId: "G-ZNBN012MX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Authentication (for OTP verification)
export const auth = getAuth(app);