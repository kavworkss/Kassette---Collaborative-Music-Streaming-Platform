// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQESFnZDmK4qlXraVHeAgRKAFwxLM5NhI",
  authDomain: "kasette-414a4.firebaseapp.com",
  projectId: "kasette-414a4",
  storageBucket: "kasette-414a4.appspot.com",
  messagingSenderId: "1075363139428",
  appId: "1:1075363139428:web:49a632a0fd2a3fb916f471",
  measurementId: "G-NVWJ0NX3K4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };