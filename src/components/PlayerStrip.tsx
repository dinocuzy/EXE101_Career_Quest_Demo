import React from 'react';
import { CoopPlayer } from '../types/game';
import { Star } from 'lucide-react';

interface PlayerStripProps {
  players: CoopPlayer[];
  onPlayerClick?: (player: CoopPlayer) => void;
}

export const PlayerStrip: React.FC<PlayerStripProps> = ({ players, onPlayerClick }) => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-[#E5DFFA] shadow-sm flex items-center justify-between gap-1.5">
      {players.map((p) => {
        const hasActiveCard = !!p.currentSituation;

        return (
          <div
            key={p.id}
            onClick={() => onPlayerClick && onPlayerClick(p)}
            className={`flex-1 min-w-0 p-1.5 rounded-xl transition-all flex flex-col items-center text-center relative ${
              hasActiveCard
                ? 'bg-[#F2EEF9] border border-[#5B25F5] shadow-xs ring-1 ring-[#5B25F5]/30'
                : 'bg-slate-50 border border-[#E5DFFA]'
            }`}
          >
            {/* Avatar with status glow */}
            <div className="relative">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 shadow-2xs ${
                  p.isHuman
                    ? 'border-[#5B25F5] bg-[#F2EEF9]'
                    : 'border-slate-300 bg-white'
                } ${hasActiveCard ? 'animate-pulse' : ''}`}
              >
                {p.avatar}
              </div>

              {p.isHuman && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C8F932] border border-black/10 rounded-full flex items-center justify-center text-[#18181B]">
                  <Star className="w-2.5 h-2.5 fill-current" />
                </span>
              )}
            </div>

            {/* Name & Role */}
            <span className="text-[10px] font-bold text-slate-800 truncate w-full mt-1">
              {p.name.replace(' (Host)', '')}
            </span>
            <span className="text-[9px] text-[#5B25F5] font-black truncate w-full">
              {p.role.name.split(' ')[0]}
            </span>

            {/* Status Indicator */}
            {hasActiveCard ? (
              <span className="text-[8px] font-bold text-rose-600 bg-rose-50 px-1 rounded-sm mt-0.5 animate-pulse">
                Đang xử lý
              </span>
            ) : (
              <span className="text-[8px] font-medium text-slate-400 mt-0.5">
                Chờ việc
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
