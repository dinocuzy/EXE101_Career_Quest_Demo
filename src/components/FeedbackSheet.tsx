import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OptionFx, SkillKey } from '../types/game';
import { SKILL_METADATA } from './SkillChip';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, Zap, Star, Users } from 'lucide-react';

interface FeedbackSheetProps {
  isOpen: boolean;
  title: string;
  text: string;
  quality: 'good' | 'ok' | 'bad';
  fx: OptionFx;
  wasColleague?: boolean;
  onContinue: () => void;
  isLastCard?: boolean;
}

export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({
  isOpen,
  title,
  text,
  quality,
  fx,
  wasColleague = false,
  onContinue,
  isLastCard = false,
}) => {
  const qualityThemes = {
    good: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      headerBg: 'bg-emerald-600',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    },
    ok: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      headerBg: 'bg-amber-500',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    },
    bad: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-800',
      headerBg: 'bg-rose-600',
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
    },
  }[quality];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Sheet Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-5 pb-7 z-10 flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-1" />

            {/* Header with Title */}
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-white shadow-xs border border-slate-100">
                {qualityThemes.icon}
              </div>
              <div>
                <h3 className={`text-base font-bold ${qualityThemes.text}`}>
                  {title}
                </h3>
                {wasColleague && (
                  <span className="text-[11px] font-medium text-teal-600 flex items-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    <span>Quyết định nhờ đồng nghiệp trợ giúp</span>
                  </span>
                )}
              </div>
            </div>

            {/* Feedback Content Text */}
            <div className={`p-4 rounded-2xl border text-sm leading-relaxed text-slate-700 ${qualityThemes.bg} ${qualityThemes.border}`}>
              {text}
            </div>

            {/* Impact / Delta Chips */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Biến động chỉ số sau quyết định:
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Energy */}
                {fx.energy !== 0 && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                      fx.energy > 0
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Năng lượng {fx.energy > 0 ? `+${fx.energy}` : fx.energy}
                  </span>
                )}

                {/* Reputation */}
                {fx.rep !== 0 && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                      fx.rep > 0
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Uy tín {fx.rep > 0 ? `+${fx.rep}` : fx.rep}
                  </span>
                )}

                {/* Skills deltas */}
                {(Object.entries(fx.skills || {}) as [SkillKey, number][]).map(([key, val]) => {
                  if (!val || val === 0) return null;
                  const meta = SKILL_METADATA[key];
                  return (
                    <span
                      key={key}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                        val > 0
                          ? `${meta.bg} ${meta.color} ${meta.border}`
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.name}</span>
                      <span>{val > 0 ? `+${val}` : val}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={onContinue}
              className="mt-2 w-full py-4 px-4 bg-[#5B25F5] hover:bg-[#4d1ed3] active:scale-[0.97] text-white font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer select-none text-sm"
            >
              <span>{isLastCard ? 'Xem kết quả ca trực' : 'Thẻ tiếp theo'}</span>
              <ArrowRight className="w-4 h-4 text-[#C8F932]" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
