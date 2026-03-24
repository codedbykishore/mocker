import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export const Timer = ({ durationMinutes, onTimeUp, onWarning }) => {
  const [seconds, setSeconds] = useState(durationMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        if (prev === 300) onWarning('5 minutes remaining!');   
        if (prev === 60)  onWarning('1 minute remaining!');    
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [durationMinutes, onTimeUp, onWarning]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const isUrgent = seconds <= 300;

  return (
    <div className={`timer px-6 py-2.5 rounded-2xl flex items-center gap-2 font-mono font-bold text-xl shadow-sm border transition-all ${isUrgent ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-900 border-slate-200'}`}>
      <Clock size={20} /> {mm}:{ss}
    </div>
  );
};
