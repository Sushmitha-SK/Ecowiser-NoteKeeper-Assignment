import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSbh_X__SRyScrXVzC4ogG79NVL2tM6sc",
  authDomain: "noteskeeper-4f6c1.firebaseapp.com",
  projectId: "noteskeeper-4f6c1",
  storageBucket: "noteskeeper-4f6c1.firebasestorage.app",
  messagingSenderId: "731135729569",
  appId: "1:731135729569:web:5e697802ee4d1fcfaff5e0",
  measurementId: "G-NEFR01SQ7F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db, app, analytics };
