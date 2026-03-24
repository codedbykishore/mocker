// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-uVXH7-EApaNJyWiL_PSdxQqRHYwlsM0",
  authDomain: "hackathon-cbef5.firebaseapp.com",
  projectId: "hackathon-cbef5",
  storageBucket: "hackathon-cbef5.firebasestorage.app",
  messagingSenderId: "995359933473",
  appId: "1:995359933473:web:a66d858f6f290ab4f90f60",
  measurementId: "G-G3QJ4P77G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
export default app;
