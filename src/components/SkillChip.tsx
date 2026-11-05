import React from 'react';
import { SkillKey } from '../types/game';
import { MessageSquare, Puzzle, Compass, Users, Scale } from 'lucide-react';

export const SKILL_METADATA: Record<
  SkillKey,
  { name: string; short: string; color: string; bg: string; border: string; icon: React.ReactNode }
> = {
  C: {
    name: 'Giao tiếp',
    short: 'Communication',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  P: {
    name: 'Giải quyết vấn đề',
    short: 'Problem Solving',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: <Puzzle className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  A: {
    name: 'Thích ứng linh hoạt',
    short: 'Adaptability',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: <Compass className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  T: {
    name: 'Làm việc nhóm',
    short: 'Teamwork',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: <Users className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
  E: {
    name: 'Trách nhiệm & Đạo đức',
    short: 'Ethics & Responsibility',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: <Scale className="w-3.5 h-3.5 stroke-[2.2]" />,
  },
};

interface SkillChipProps {
  skill: SkillKey;
  showIcon?: boolean;
  value?: number;
  size?: 'sm' | 'md';
}

export const SkillChip: React.FC<SkillChipProps> = ({
  skill,
  showIcon = true,
  value,
  size = 'sm',
}) => {
  const meta = SKILL_METADATA[skill];
  if (!meta) return null;

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs'
      : 'px-3 py-1.5 text-sm font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${meta.bg} ${meta.border} ${meta.color} font-medium tracking-tight shadow-xs transition-all ${sizeClasses}`}
    >
      {showIcon && <span>{meta.icon}</span>}
      <span>{meta.name}</span>
      {typeof value === 'number' && (
        <span className="ml-0.5 rounded-md bg-white/80 px-1 py-0.2 text-[10px] font-bold shadow-2xs">
          {value}/10
        </span>
      )}
    </span>
  );
};
