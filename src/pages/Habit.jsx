import { useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function Habit() {
  const [habits, setHabits] = useState(["Read", "Exercise"]);
  const [tracked, setTracked] = useState({});
  const [newHabit, setNewHabit] = useState("");
  const [weekStart, setWeekStart] = useState(getCurrentMonday());
  const [weekHistory, setWeekHistory] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null); // index of week being edited
  const [editData, setEditData] = useState(null); // { weekStart, habits }
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getCurrentMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split("T")[0];
  }

  function getCurrentMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split("T")[0];
  }

  const toggleDay = (habit, day) => {
    if (editingIdx !== null) {
      setEditData(prev => ({
        ...prev,
        habits: {
          ...prev.habits,
          [habit]: {
            ...prev.habits[habit],
            [day]: !prev.habits[habit]?.[day]
          }
        }
      }));
      return;
    }
    setTracked(prev => ({
      ...prev,
      [habit]: {
        ...prev[habit],
        [day]: !prev[habit]?.[day]
      }
    }));
  };

  const addHabit = () => {
    if (editingIdx !== null) return;
    if (newHabit.trim()) {
      setHabits([...habits, newHabit.trim()]);
      setNewHabit("");
    }
  };

  const calculateStreak = (habit, customTracked = null) => {
    const data = customTracked || tracked;
    return days.reduce((count, day) => data[habit]?.[day] ? count + 1 : count, 0);
  };

  const startNewWeek = () => {
    const snapshot = { weekStart, habits: tracked };
    setWeekHistory([...weekHistory, snapshot]);
    setTracked({});
    setWeekStart(getCurrentMonday());
  };

  // Edit week handlers
  const handleEditWeek = (idx) => {
    setEditingIdx(idx);
    setEditData(JSON.parse(JSON.stringify(weekHistory[idx])));
  };
  const handleEditCheckbox = (habit, day) => {
    setEditData(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        [habit]: {
          ...prev.habits[habit],
          [day]: !prev.habits[habit]?.[day]
        }
      }
    }));
  };
  const handleSaveEditWeek = () => {
    setWeekHistory(weekHistory.map((w, i) => i === editingIdx ? editData : w));
    setEditingIdx(null);
    setEditData(null);
  };
  const handleCancelEditWeek = () => {
    setEditingIdx(null);
    setEditData(null);
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white px-4 py-10 flex justify-center">
      <div className="habit-wrapper">
        <h2 className="habit-title">Habit Tracker</h2>

        <div className="habit-input-row">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit..."
            className="habit-input"
            disabled={editingIdx !== null}
          />
          <button onClick={addHabit} className="habit-button" disabled={editingIdx !== null}>Add Habit</button>
        </div>

        {/* Week Info Section */}
        {editingIdx === null ? (
          <div className="habit-week-info">
            Current Week Starting: <span>{weekStart}</span>
          </div>
        ) : (
          <div className="habit-week-info bg-yellow-400/90 text-blue-900 px-4 py-2 rounded-lg font-bold text-lg shadow-lg border-2 border-yellow-600 mb-4 flex items-center gap-4">
            <span>Editing Week: <span>{editData.weekStart}</span></span>
            <button className="habit-button px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white" onClick={handleSaveEditWeek}><FaSave className="inline mr-1" />Save</button>
            <button className="habit-button px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white" onClick={handleCancelEditWeek}><FaTimes className="inline mr-1" />Cancel</button>
          </div>
        )}

        <div className="habit-table-container">
          <table className="habit-table">
            <thead>
              <tr>
                <th>Habit</th>
                {days.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {editingIdx === null
                ? habits.map(habit => (
                    <tr key={habit}>
                      <td>
                        {habit} <span className="streak">({calculateStreak(habit)})</span>
                      </td>
                      {days.map(day => (
                        <td key={day}>
                          <input
                            type="checkbox"
                            checked={tracked[habit]?.[day] || false}
                            onChange={() => toggleDay(habit, day)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                : Object.keys(editData.habits).map(habit => (
                    <tr key={habit}>
                      <td>
                        {habit} <span className="streak">({calculateStreak(habit, editData.habits)})</span>
                      </td>
                      {days.map(day => (
                        <td key={day}>
                          <input
                            type="checkbox"
                            checked={editData.habits[habit]?.[day] || false}
                            onChange={() => handleEditCheckbox(habit, day)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {editingIdx === null && (
          <button className="habit-button mt-6" onClick={startNewWeek}>
            Save & Start New Week
          </button>
        )}

        <h3 className="habit-history-title">Past Weeks</h3>
        <ul className="habit-history-list">
          {weekHistory.map((week, i) => (
            <li key={i} className="habit-history-card flex items-center justify-between">
              <div>
                <p>Week Starting: {week.weekStart}</p>
                {Object.keys(week.habits).map(habit => (
                  <p key={habit} className="history-entry">
                    {habit}: {days.filter(day => week.habits[habit][day]).join(", ") || "No entries"}
                  </p>
                ))}
              </div>
              <button className="ml-4 p-2 bg-yellow-400 text-blue-900 rounded-full shadow hover:bg-yellow-300 transition" onClick={() => handleEditWeek(i)} title="Edit this week" disabled={editingIdx !== null}>
                <FaEdit />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}