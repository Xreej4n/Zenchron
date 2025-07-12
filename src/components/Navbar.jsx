
import { Link, useNavigate } from 'react-router-dom';
import {
  MdHome,
  MdTimer,
  MdChecklist,
  MdBarChart,
  MdLogin,
  MdLogout
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import logo from '../assets/favicon.ico';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
    window.location.reload();
  };

  return (
    <nav className="navbar fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl px-10 py-6 flex flex-col items-center justify-center">
      {/* Title + Auth/User Button */}
      <div className="w-full flex items-center justify-between mb-2">
        <Link to="/" className="navbar-title hover:no-underline py-2 flex items-center gap-3">
          <img src={logo} alt="Zenchron Logo" className="main-logo object-contain mr-2" style={{filter: 'drop-shadow(0 2px 8px #0ea5e9)'}} />
          <span className="audiowide-regular text-3xl font-extrabold tracking-wide leading-tight bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
            Zenchron
          </span>
        </Link>
        {!user ? (
          <Link to="/auth" className="navbar-link button-glow flex items-center gap-3 ml-4 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 text-sm rounded text-white transition duration-300">
            <MdLogin size={20} /> <span>Log In / Register</span>
          </Link>
        ) : (
          <div className="flex items-center gap-3 ml-4">
            <CgProfile size={22} className="text-indigo-200" />
            <span className="navbar-user text-white font-medium">{user.username}</span>
            <button
              onClick={handleLogout}
              className="logout navbar-link button-glow flex items-center gap-3 ml-4 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 text-sm rounded text-white transition duration-300"
            >
              <MdLogout size={18} /> <span>Log Out</span>
            </button>
          </div>
        )}
      </div>

      {/* 🌐 Nav Section */}
      <div className="flex flex-wrap justify-center items-center gap-12 text-lg font-medium py-4">
        <Link to="/" className="navbar-link flex items-center gap-3">
          <MdHome className="navbar-icon" /> <span>Dashboard</span>
        </Link>
        <Link to="/pomodoro" className="navbar-link flex items-center gap-3">
          <MdTimer className="navbar-icon" /> <span>Focus Timer</span>
        </Link>
        <Link to="/todo" className="navbar-link flex items-center gap-3">
          <MdChecklist className="navbar-icon" /> <span>Task Manager</span>
        </Link>
        <Link to="/habit" className="navbar-link flex items-center gap-3">
          <MdBarChart className="navbar-icon" /> <span>Habit Tracker</span>
        </Link>
      </div>
    </nav>
  );
}