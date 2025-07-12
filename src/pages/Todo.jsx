import { useState } from 'react';
import { FiPlusCircle, FiTrash2, FiCheckSquare } from 'react-icons/fi';

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white px-4 py-10 flex justify-center">
      <div className="todo-wrapper">
        <h1 className="todo-title">
          <FiCheckSquare className="inline-block mr-2" size={26} />
          To-Do List
        </h1>

        {/* 🧾 Add Task Section */}
        <div className="todo-input-row">
          <input
            type="text"
            className="todo-input"
            placeholder="What's next?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="todo-button" onClick={addTask}>
            <FiPlusCircle size={18} /> Add
          </button>
        </div>

        {/* 🗒 Task List */}
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className={`todo-card ${task.done ? 'done' : ''}`}>
              <span onClick={() => toggleTask(index)} className="todo-text">
                {task.text}
              </span>
              <button className="todo-delete" onClick={() => deleteTask(index)}>
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}