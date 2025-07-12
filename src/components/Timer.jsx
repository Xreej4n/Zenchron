import { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((sec) => sec > 0 ? sec - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Pomodoro Timer</h2>
      <div className="text-4xl mb-4">{formatTime()}</div>
      <button onClick={() => setIsActive(true)} className="bg-green-500 text-white px-4 py-2 mr-2">Start</button>
      <button onClick={() => setIsActive(false)} className="bg-red-500 text-white px-4 py-2">Pause</button>
    </div>
  );
}
