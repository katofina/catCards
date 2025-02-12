import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAlAQdMLrjsyrlrLwayu-FfwvrHR5pbOes",
  authDomain: "catcards-66087.firebaseapp.com",
  projectId: "catcards-66087",
  storageBucket: "catcards-66087.firebasestorage.app",
  messagingSenderId: "1042344848243",
  appId: "1:1042344848243:web:4c33c41aeece0a5fdbf306"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);
