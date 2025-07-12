// firebaseTasks.js
import { db } from "./firebase"; // adjust path if needed
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Add new task — always includes user UID
export async function addTask(text) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = await addDoc(collection(db, "tasks"), {
    text,
    done: false,
    uid: user.uid,
    createdAt: serverTimestamp(),
  });

  return docRef;
}

// ✅ Get only current user’s tasks
export async function getTasks() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ✅ Toggle done
export async function toggleTask(id, done) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "tasks", id);
  await updateDoc(docRef, { done });
}

// ✅ Delete
export async function deleteTask(id) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "tasks", id);
  await deleteDoc(docRef);
}
