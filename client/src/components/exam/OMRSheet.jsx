import React from 'react';
const OPTIONS = ['A', 'B', 'C', 'D'];

export const OMRSheet = ({ questions, answers, onSelect, currentQ }) => {
  return (
    <div className="omr-grid overflow-y-auto h-full p-8 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="text-xl font-bold font-outfit mb-8 sticky top-0 bg-white/5 mx-[-10px] py-2">Bubble Sheet</h3>
      {questions.map((q, index) => (
        <div
          key={q._id || index}
          className={`omr-row flex items-center gap-4 mb-4 p-3.5 rounded-2xl transition-all duration-300
            ${index === currentQ ? 'bg-slate-900 text-white shadow-xl translate-x-1 outline outline-slate-100 outline-offset-4 scale-105 z-10' : 'bg-white hover:bg-slate-50'}`}
        >
          <span className={`text-sm font-bold w-6 ${index === currentQ ? 'text-white' : 'text-slate-400'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onSelect(index, opt)}
                className={`w-9 h-9 rounded-full border-2 text-sm font-black transition-all duration-200
                  ${answers[index] === opt
                    ? (index === currentQ ? 'bg-white border-white text-slate-900 rotate-12' : 'bg-slate-900 border-slate-900 text-white shadow-md active:scale-90')
                    : (index === currentQ ? 'border-slate-700 text-slate-400 hover:border-white hover:text-white' : 'border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-950')
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
