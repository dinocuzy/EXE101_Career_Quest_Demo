import React from 'react';
import { Clock } from 'lucide-react';

interface ProgressStepperProps {
  currentIndex: number; // 0 to 5
  totalCards: number;   // 6
  shiftHour: string;    // '08:00', ...
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentIndex,
  totalCards,
  shiftHour,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-3 px-1 py-1">
      {/* Step Indicator */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-black text-[#18181B] bg-[#E5DFFA]/70 px-2 py-0.5 rounded-lg">
          Thẻ {currentIndex + 1}/{totalCards}
        </span>
        <div className="flex items-center gap-1 ml-1">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 bg-[#5B25F5]'
                  : i < currentIndex
                  ? 'w-2 bg-[#C8F932]'
                  : 'w-2 bg-[#E5DFFA]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Clock Pill */}
      <div className="inline-flex items-center gap-1.5 bg-white border border-[#E5DFFA] px-2.5 py-1 rounded-full shadow-2xs">
        <Clock className="w-3.5 h-3.5 text-[#5B25F5]" />
        <span className="text-xs font-mono font-bold text-[#18181B]">
          {shiftHour}
        </span>
      </div>
    </div>
  );
};
