import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Drama, Check, Clock } from 'lucide-react';

export const DualRoleModal: React.FC = () => {
  const { coopDualRolePrompt, dismissCoopDualRole } = useGameStore();
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (!coopDualRolePrompt) {
      setSecondsLeft(30);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          dismissCoopDualRole();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [coopDualRolePrompt, dismissCoopDualRole]);

  if (!coopDualRolePrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-[390px] bg-gradient-to-b from-orange-50 via-white to-orange-50/50 rounded-3xl p-6 shadow-2xl border-2 border-orange-300 text-center relative flex flex-col items-center">
        {/* Badge & Timer */}
        <div className="flex items-center justify-between w-full mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider border border-orange-200">
            <Drama className="w-3.5 h-3.5" /> Nhập Vai Kép (30s)
          </span>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-orange-600 bg-white px-2.5 py-0.5 rounded-full border border-orange-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{secondsLeft}s</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          Hãy đọc to câu thoại này cho đồng đội <strong>{coopDualRolePrompt.forPlayerName}</strong> cùng nghe!
        </p>

        {/* Large Stakeholder Card */}
        <div className="w-24 h-24 rounded-3xl bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-5xl mb-3 shadow-md">
          {coopDualRolePrompt.stakeholderAvatar}
        </div>

        <h3 className="text-sm font-bold text-slate-800 mb-2">
          {coopDualRolePrompt.stakeholderName}
        </h3>

        {/* Speech dialogue callout */}
        <div className="w-full bg-orange-100/80 border-2 border-orange-300 rounded-2xl p-4 shadow-sm mb-5 text-slate-900 text-base font-extrabold leading-snug">
          “{coopDualRolePrompt.line}”
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={dismissCoopDualRole}
          className="w-full min-h-[48px] bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.97] text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Đã đọc xong câu thoại</span>
        </button>
      </div>
    </div>
  );
};
