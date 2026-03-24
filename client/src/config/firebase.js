// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3oeVaoxe0-kYDKD9ivrG45KddHHGuwnY",
  authDomain: "mocker-43609.firebaseapp.com",
  projectId: "mocker-43609",
  storageBucket: "mocker-43609.firebasestorage.app",
  messagingSenderId: "148771495874",
  appId: "1:148771495874:web:cfe89a5102222ef112805b",
  measurementId: "G-Y70XCFRCHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, storage, googleProvider };
export default app;
