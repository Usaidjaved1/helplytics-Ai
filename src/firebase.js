import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBsV10ircdccL0fgvqVLhd_QigWuwYB7ns",
  authDomain: "helplytics-ai-76d49.firebaseapp.com",
  projectId: "helplytics-ai-76d49",
  storageBucket: "helplytics-ai-76d49.appspot.com",
  messagingSenderId: "191830931209",
  appId: "1:191830931209:web:c2b97de74e2d505daa85d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore export
export const db = getFirestore(app);
export const auth = getAuth(app);