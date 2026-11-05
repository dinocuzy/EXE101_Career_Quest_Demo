import React from 'react';
import { Situation } from '../types/game';
import { TimerRing } from './TimerRing';
import { Sparkles, Users } from 'lucide-react';
import { LimeSparkle } from './RuangMotifs';

interface SituationCardProps {
  situation: Situation;
  onTimerExpire: () => void;
  paused?: boolean;
  onTick?: (remaining: number) => void;
}

export const SituationCard: React.FC<SituationCardProps> = ({
  situation,
  onTimerExpire,
  paused = false,
  onTick,
}) => {
  const isShared = situation.role === 'ALL';

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-4.5 shadow-2xs border border-[#E5DFFA] hover:border-[#5B25F5]/40 transition-all duration-200 relative overflow-hidden group">
      {/* Top accent bar in Violet & Neon Lime */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B25F5] via-[#7C3AED] to-[#C8F932]" />

      {/* Header with quiet unboxed metadata */}
      <div className="flex items-center justify-between gap-3 mb-2.5 pt-0.5">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-black">
            {isShared ? (
              <span className="flex items-center gap-1 text-[#5B25F5] bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200 text-[10px]">
                <Users className="w-3 h-3" />
                Thử Thách Phối Hợp
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#18181B] bg-[#C8F932] px-2 py-0.5 rounded-full border border-[#b2e817] text-[10px]">
                <Sparkles className="w-3 h-3 text-[#18181B]" />
                Tình Huống Chuyên Môn
              </span>
            )}
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="font-mono text-slate-500 font-bold tracking-wider text-[10px]">
            #{situation.id}
          </span>
        </div>

        {/* Circular Countdown Timer */}
        <TimerRing
          totalSeconds={situation.timeLimit}
          onExpire={onTimerExpire}
          paused={paused}
          onTick={onTick}
        />
      </div>

      {/* Main Situation Body Text */}
      <p className="text-xs sm:text-sm text-[#18181B] leading-relaxed font-medium antialiased">
        {situation.text}
      </p>
    </div>
  );
};
