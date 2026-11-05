import React from 'react';
import { useGameStore } from '../store/gameStore';
import { BadgeItem } from '../types/game';
import { Flame, Trophy, Volume2, VolumeX, Zap, Sparkles } from 'lucide-react';

export const GamifiedHUD: React.FC = () => {
  const { xp, streakDays, soundEnabled, toggleSound, badges, openBadgeModal, openSpeedSprint } =
    useGameStore();

  const level = Math.floor(xp / 250) + 1;
  const currentLevelBaseXp = (level - 1) * 250;
  const nextLevelXp = level * 250;
  const progressInLevel = Math.min(100, Math.round(((xp - currentLevelBaseXp) / 250) * 100));

  const unlockedCount = badges.filter((b: BadgeItem) => b.unlocked).length;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 select-none">
      {/* 1. Streak Flame */}
      <div
        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-900 text-xs font-black shadow-2xs hover:scale-105 transition-transform"
        title={`Chuỗi tìm hiểu nghề: ${streakDays} ngày liên tiếp`}
      >
        <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
        <span>{streakDays} ngày</span>
      </div>

      {/* 2. Level & XP Badge with mini progress bar in Ruang Edit Lime */}
      <div
        className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8F932] border border-[#b2e817] text-xs font-black text-[#18181B] shadow-2xs"
        title={`Cấp độ ${level}: ${xp}/${nextLevelXp} XP`}
      >
        <span className="w-2 h-2 rounded-full bg-[#18181B] animate-ping" />
        <span>Lv.{level}</span>
        <div className="w-12 h-1.5 bg-black/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#18181B] rounded-full transition-all duration-300"
            style={{ width: `${progressInLevel}%` }}
          />
        </div>
        <span className="text-[10px] font-mono font-bold text-black/80">{xp} XP</span>
      </div>

      {/* 3. Tủ Huy Hiệu Button */}
      <button
        type="button"
        onClick={openBadgeModal}
        className="min-h-[38px] px-2.5 py-1 rounded-full bg-violet-100 hover:bg-violet-200 border border-violet-300 text-[#5B25F5] text-xs font-black flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
        title="Xem tủ huy hiệu thành tích nghề nghiệp"
      >
        <Trophy className="w-3.5 h-3.5 text-[#5B25F5] fill-violet-200" />
        <span className="hidden sm:inline">Huy hiệu</span>
        <span className="bg-[#5B25F5] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
          {unlockedCount}/{badges.length}
        </span>
      </button>

      {/* 4. Speed Sprint 60s Challenge Button */}
      <button
        type="button"
        onClick={openSpeedSprint}
        className="min-h-[38px] px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-black flex items-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
        title="Thử thách phản xạ nhanh 60 giây"
      >
        <Zap className="w-3.5 h-3.5 text-rose-600 fill-rose-500 animate-pulse" />
        <span className="hidden sm:inline">Phản xạ 60s</span>
        <span className="text-[9px] bg-rose-200 text-rose-900 px-1 rounded font-black">HOT</span>
      </button>

      {/* 5. Sound Effects Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-90 ${
          soundEnabled
            ? 'bg-violet-50 border-violet-200 text-[#5B25F5] hover:bg-violet-100'
            : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
        }`}
        title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
        aria-label="Bật tắt âm thanh"
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 stroke-[2.2]" />
        ) : (
          <VolumeX className="w-4 h-4 stroke-[2.2]" />
        )}
      </button>
    </div>
  );
};
