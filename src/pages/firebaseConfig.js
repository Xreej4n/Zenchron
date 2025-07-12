import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjAOE7d3kT2gG02jAWRp7ZdvtqIQrlc7w",
  authDomain: "zenchron-186f2.firebaseapp.com",
  projectId: "zenchron-186f2",
  storageBucket: "zenchron-186f2.firebasestorage.app",
  messagingSenderId: "320516993325",
  appId: "1:320516993325:web:579bdacfa5083b3a07e3a4",
  measurementId: "G-NZPJ6PMV9H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firebase initialized:", app.name);

