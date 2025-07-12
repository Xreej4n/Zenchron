import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export async function testWrite() {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");

  await addDoc(collection(db, "debug_test"), {
    userId: uid,
    test: "working!",
    timestamp: new Date()
  });

  console.log("✅ Write succeeded");
}