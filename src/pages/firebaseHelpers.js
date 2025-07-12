// firebaseHelpers.js
import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc
} from "firebase/firestore";

export async function saveHabitSnapshot(uid, weekStart, habits) {
  const docRef = doc(db, "habits", `${uid}_${weekStart}`);
  await setDoc(docRef, {
    uid,
    weekStart,
    habits
  });
}

export async function getHabitHistory(uid) {
  const q = query(
    collection(db, "habits"),
    where("uid", "==", uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

export async function updateHabitSnapshot(uid, weekStart, habits) {
  const docRef = doc(db, "habits", `${uid}_${weekStart}`);
  await updateDoc(docRef, { habits });
}
