import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tasksRef = collection(db, "users", user.uid, "tasks");
        const q = query(tasksRef, orderBy("createdAt", "asc"));
        const snap = await getDocs(q);
        setTasks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } else {
        setTasks([]);
        navigate("/login");
      }
    });
    return unsub;
  }, [auth, db, navigate]);

  const handleAdd = async () => {
    const user = auth.currentUser;
    if (!user || !newTask.trim()) return;

    const tasksRef = collection(db, "users", user.uid, "tasks");
    const docRef = await addDoc(tasksRef, {
      text: newTask.trim(),
      done: false,
      createdAt: new Date(),
    });

    setTasks([...tasks, { id: docRef.id, text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  const handleToggle = async (taskId, idx) => {
    const user = auth.currentUser;
    if (!user) return;

    const newStatus = !tasks[idx].done;
    const taskRef = doc(db, "users", user.uid, "tasks", taskId);
    await updateDoc(taskRef, { done: newStatus });

    const updated = [...tasks];
    updated[idx].done = newStatus;
    setTasks(updated);
  };

  const handleDelete = async (taskId, idx) => {
    const user = auth.currentUser;
    if (!user) return;

    const taskRef = doc(db, "users", user.uid, "tasks", taskId);
    await deleteDoc(taskRef);

    setTasks(tasks.filter((_, i) => i !== idx));
  };

  return (
    <div className="page-content flex justify-center">
      <div className="todo-wrapper">
        <h1 className="todo-title">✅ My To-Do List</h1>

        <div className="todo-input-row">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task..."
            className="todo-input"
          />
          <button onClick={handleAdd} className="todo-button">
            Add
          </button>
        </div>

        <ul className="todo-list">
          {tasks.map((task, idx) => (
            <li
              key={task.id}
              className={`todo-card ${task.done ? "done" : ""}`}
            >
              <span
                onClick={() => handleToggle(task.id, idx)}
                className="todo-text"
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDelete(task.id, idx)}
                className="todo-delete"
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
