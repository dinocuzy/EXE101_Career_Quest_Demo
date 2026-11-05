import React from 'react';
import { SkillsState } from '../types/game';
import { MessageSquare, ShieldAlert, Compass, Sparkles, Flame, TrendingUp } from 'lucide-react';

interface SkillScoreboardHUDProps {
  skills: SkillsState;
  recentGain?: Partial<Record<keyof SkillsState, number>>;
  compact?: boolean;
  className?: string;
}

const SKILL_DEFS: {
  key: keyof SkillsState;
  code: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  textColor: string;
  barColor: string;
}[] = [
  {
    key: 'C',
    code: 'C',
    name: 'Giao tiếp',
    icon: MessageSquare,
    color: 'text-blue-600',
    badgeBg: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700',
    barColor: 'bg-blue-500',
  },
  {
    key: 'P',
    code: 'P',
    name: 'Xử lý sự cố',
    icon: ShieldAlert,
    color: 'text-amber-600',
    badgeBg: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700',
    barColor: 'bg-amber-500',
  },
  {
    key: 'A',
    code: 'A',
    name: 'Thích ứng',
    icon: Compass,
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-700',
    barColor: 'bg-emerald-500',
  },
  {
    key: 'T',
    code: 'T',
    name: 'Làm việc nhóm',
    icon: Sparkles,
    color: 'text-purple-600',
    badgeBg: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700',
    barColor: 'bg-purple-500',
  },
  {
    key: 'E',
    code: 'E',
    name: 'Đạo đức & Áp lực',
    icon: Flame,
    color: 'text-rose-600',
    badgeBg: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-700',
    barColor: 'bg-rose-500',
  },
];

export const SkillScoreboardHUD: React.FC<SkillScoreboardHUDProps> = ({
  skills,
  recentGain,
  compact = false,
  className = '',
}) => {
  // Mobile / ultra compact view
  if (compact) {
    return (
      <div className={`w-full flex items-center justify-between gap-1 overflow-x-auto py-1 px-0.5 select-none scrollbar-none ${className}`}>
        {SKILL_DEFS.map((def) => {
          const score = skills[def.key] || 0;
          const gained = recentGain?.[def.key];
          const Icon = def.icon;

          return (
            <div
              key={def.key}
              title={`${def.name}: ${score} điểm`}
              className={`flex-1 min-w-[56px] py-1 px-1.5 rounded-lg border flex items-center justify-between gap-1 transition-all ${
                gained ? 'bg-[#C8F932]/40 border-[#b2e817] ring-1 ring-[#b2e817]' : def.badgeBg
              }`}
            >
              <div className="flex items-center gap-1">
                <Icon className={`w-3 h-3 ${def.color}`} />
                <span className={`text-[10px] font-black ${def.textColor}`}>{def.code}</span>
              </div>
              <div className="flex items-center">
                <span className={`text-[11px] font-black ${def.textColor}`}>{score}</span>
                {gained !== undefined && gained > 0 && (
                  <span className="text-[9px] font-black text-emerald-600 ml-0.5">+{gained}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop / standard view (Clean horizontal card, fixed height, zero layout shift)
  return (
    <div className={`w-full bg-white rounded-2xl p-3.5 border border-[#E5DFFA] shadow-2xs select-none ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#5B25F5]" />
          <span>Bảng Điểm Kỹ Năng Ca Trực</span>
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          Cập nhật tức thời theo quyết định
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {SKILL_DEFS.map((def) => {
          const score = skills[def.key] || 0;
          const gained = recentGain?.[def.key];
          const Icon = def.icon;

          return (
            <div
              key={def.key}
              className={`p-2 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                gained
                  ? 'bg-[#C8F932]/30 border-[#b2e817] shadow-xs ring-1 ring-[#b2e817]'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-black flex items-center gap-1 ${def.textColor}`}>
                  <Icon className="w-3 h-3" />
                  <span>{def.code}</span>
                </span>
                <span className={`text-xs font-black ${gained ? 'text-[#18181B]' : def.textColor}`}>
                  {score}
                  {gained !== undefined && gained > 0 && (
                    <span className="text-[10px] text-emerald-600 font-extrabold ml-0.5">+{gained}</span>
                  )}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 font-medium truncate mb-1.5">
                {def.name}
              </div>

              {/* Mini progress bar (max 10 points) */}
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${def.barColor}`}
                  style={{ width: `${Math.min(100, Math.max(10, score * 15))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

