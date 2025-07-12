import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiRotateCcw, FiClock } from 'react-icons/fi';

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            switchMode();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const switchMode = () => {
    setIsRunning(false);
    setMode(prev => (prev === 'work' ? 'break' : 'work'));
    setSecondsLeft(mode === 'work' ? 5 * 60 : 25 * 60);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center text-white px-4 py-10">
      <div className="pomodoro-wrapper">
        <h1 className="pomodoro-title">
          <FiClock className="inline-block mr-2" size={28} />
          Pomodoro Timer
        </h1>

        {/* Mode badge */}
        <div className={`mode-badge ${mode === 'work' ? 'bg-orange-500' : 'bg-green-600'}`}>
          {mode === 'work' ? 'Work Session' : 'Break Time'}
        </div>

        {/* Time display */}
        <div className="pomodoro-display">{formatTime(secondsLeft)}</div>

        {/* Controls */}
        <div className="pomodoro-controls">
          <button
            className={`pomodoro-button ${isRunning ? 'bg-yellow-500' : 'bg-sky-600'}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <FiPause size={20} /> : <FiPlay size={20} />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="pomodoro-button bg-red-600" onClick={resetTimer}>
            <FiRotateCcw size={20} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}