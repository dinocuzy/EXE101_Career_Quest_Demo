import React from 'react';
import { SituationOption } from '../types/game';
import { Check } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface ChoiceButtonProps {
  option: SituationOption;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  option,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  const { currentTheme } = useGameStore();

  const selectedRingClass =
    currentTheme === 'ruang_edit'
      ? 'border-[#5B25F5] bg-violet-50/90 ring-4 ring-[#C8F932]/40 shadow-lg'
      : currentTheme === 'cyber_arcade'
      ? 'border-purple-600 bg-purple-50/90 ring-4 ring-purple-500/20 shadow-md'
      : currentTheme === 'vibrant_editorial'
      ? 'border-amber-600 bg-amber-50/90 ring-4 ring-amber-500/20 shadow-md'
      : currentTheme === 'warm_crafted'
      ? 'border-emerald-600 bg-emerald-50/90 ring-4 ring-emerald-500/20 shadow-md'
      : 'border-sky-600 bg-sky-50/90 ring-4 ring-sky-500/20 shadow-md';

  const badgeBgClass = isSelected
    ? currentTheme === 'ruang_edit'
      ? 'bg-[#5B25F5] text-[#C8F932]'
      : currentTheme === 'cyber_arcade'
      ? 'bg-purple-600 text-white'
      : currentTheme === 'vibrant_editorial'
      ? 'bg-amber-600 text-white'
      : currentTheme === 'warm_crafted'
      ? 'bg-emerald-600 text-white'
      : 'bg-sky-600 text-white'
    : 'bg-[#F2EEF9] text-[#5B25F5] group-hover:bg-violet-100';

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`group w-full min-h-[44px] sm:min-h-[48px] py-2.5 px-3 sm:px-3.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-2.5 active:scale-[0.99] cursor-pointer select-none ${
        isSelected
          ? `${selectedRingClass} -translate-y-0.5`
          : 'bg-white border-[#E5DFFA] hover:border-[#5B25F5]/40 hover:bg-slate-50/70 shadow-2xs'
      } ${disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : ''}`}
    >
      {/* Key Badge (A / B / C) */}
      <div
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 mt-0.5 transition-all shadow-2xs ${badgeBgClass}`}
      >
        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : option.key}
      </div>

      {/* Option Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs sm:text-sm leading-snug font-medium transition-colors ${
            isSelected ? 'text-[#18181B] font-bold' : 'text-slate-800'
          }`}
        >
          {option.text}
        </p>
      </div>
    </button>
  );
};
