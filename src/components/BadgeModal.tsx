import React from 'react';
import { useGameStore } from '../store/gameStore';
import { BadgeItem } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Lock, CheckCircle2, Star, Sparkles, Award, ShieldCheck, MessageSquare, Puzzle, Users, Crown } from 'lucide-react';

const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  first_step: Sparkles,
  calm_master: ShieldCheck,
  comm_star: MessageSquare,
  solver_pro: Puzzle,
  team_hero: Users,
  future_manager: Crown,
};

export const BadgeModal: React.FC = () => {
  const { isBadgeModalOpen, closeBadgeModal, badges, xp } = useGameStore();

  if (!isBadgeModalOpen) return null;

  const level = Math.floor(xp / 250) + 1;
  const unlockedCount = badges.filter((b: BadgeItem) => b.unlocked).length;


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-2xl shadow-xs">
                <Trophy className="w-6 h-6 stroke-[2.2] fill-amber-100 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  Tủ Huy Hiệu Nghề Nghiệp
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đã đạt {unlockedCount}/{badges.length} huân chương • Cấp bậc: <strong>Lv.{level} Thực tập sinh</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeBadgeModal}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5 overflow-y-auto pr-1">
            {badges.map((badge: BadgeItem) => {
              const BadgeIconComp = BADGE_ICONS[badge.id] || Award;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    badge.unlocked
                      ? 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border-amber-300 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 opacity-70'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs border ${
                      badge.unlocked
                        ? 'bg-white border-amber-200 text-amber-600'
                        : 'bg-slate-200/80 border-slate-300 text-slate-400'
                    }`}
                  >
                    {badge.unlocked ? (
                      <BadgeIconComp className="w-6 h-6 stroke-[2.2] text-amber-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4
                        className={`text-sm font-extrabold truncate ${
                          badge.unlocked ? 'text-slate-900' : 'text-slate-500'
                        }`}
                      >
                        {badge.name}
                      </h4>
                      {badge.unlocked ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Đạt
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">
                          Khóa
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                      {badge.desc}
                    </p>
                    <span className="text-[10px] text-teal-700 font-semibold block mt-1">
                      Mở khóa: {badge.requirement}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gamified Footer Note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Mỗi lựa chọn xuất sắc đều tích lũy thêm điểm XP</span>
            </div>

            <button
              type="button"
              onClick={closeBadgeModal}
              className="min-h-[40px] px-5 bg-[#5B25F5] hover:bg-[#4d1ed3] text-white font-extrabold rounded-xl text-xs cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              Tiếp tục hành trình
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
