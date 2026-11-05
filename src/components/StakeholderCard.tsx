import React from 'react';
import { Stakeholder } from '../types/game';
import { MessageCircle } from 'lucide-react';

interface StakeholderCardProps {
  stakeholder: Stakeholder;
}

export const StakeholderCard: React.FC<StakeholderCardProps> = ({ stakeholder }) => {
  const typeTag = {
    Khách: { label: 'Khách hàng', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    Sếp: { label: 'Quản lý cấp trên', color: 'text-[#5B25F5] bg-violet-50 border-violet-200' },
    'Đồng nghiệp': { label: 'Đồng nghiệp', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    'Đối tác': { label: 'Đối tác / NCC', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  }[stakeholder.type] || { label: stakeholder.type, color: 'text-slate-700 bg-slate-50 border-slate-200' };

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-3.5 shadow-2xs border border-[#E5DFFA] transition-all hover:shadow-sm">
      {/* Top Header */}
      <div className="flex items-center gap-2.5">
        {/* Avatar with rounded-xl container */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2EEF9] border border-[#E5DFFA] flex items-center justify-center text-2xl shadow-2xs shrink-0 select-none">
          {stakeholder.avatar}
        </div>

        {/* Stakeholder Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-black text-[#18181B] text-sm tracking-tight truncate">
              {stakeholder.name}
            </h3>
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${typeTag.color}`}
            >
              {typeTag.label}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            Tác nhân trong ca trực
          </p>
        </div>
      </div>

      {/* Pressure Dialogue Bubble */}
      <div className="mt-2 bg-[#F2EEF9]/80 rounded-xl p-2.5 sm:p-3 border border-[#E5DFFA] relative">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-[#5B25F5] text-[#C8F932] flex items-center justify-center shrink-0 text-[10px] font-black shadow-2xs">
            “
          </div>
          <div className="flex-1 min-w-0 text-[#18181B] text-xs font-semibold leading-relaxed">
            <span className="italic">{stakeholder.line}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
