import React from 'react';
import { motion } from 'motion/react';
import { Zap, Star } from 'lucide-react';

interface StatBarProps {
  energy: number; // 0 - 10
  rep: number;    // 0 - 10
}

export const StatBar: React.FC<StatBarProps> = ({ energy, rep }) => {
  const isEnergyLow = energy <= 3;
  const isRepLow = rep <= 3;

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* Energy Bar */}
      <motion.div
        animate={
          isEnergyLow
            ? { x: [-2, 2, -2, 2, 0] }
            : { x: 0 }
        }
        transition={{
          repeat: isEnergyLow ? Infinity : 0,
          repeatDelay: 1.2,
          duration: 0.35,
        }}
        className={`flex items-center gap-2.5 p-2 px-3 rounded-2xl border transition-colors ${
          isEnergyLow
            ? 'bg-rose-50/90 border-rose-300 ring-1 ring-rose-300'
            : 'bg-white/90 border-slate-200/80 shadow-2xs'
        }`}
      >
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isEnergyLow
              ? 'bg-rose-500 text-white'
              : 'bg-amber-100 text-amber-600'
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className={`font-semibold ${isEnergyLow ? 'text-rose-700' : 'text-slate-700'}`}>
              Năng lượng
            </span>
            <span className={`font-extrabold ${isEnergyLow ? 'text-rose-600 font-mono animate-pulse' : 'text-slate-800'}`}>
              {energy}/10
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                isEnergyLow
                  ? 'bg-rose-500'
                  : energy <= 6
                  ? 'bg-amber-400'
                  : 'bg-emerald-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(4, (energy / 10) * 100)}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Reputation Bar */}
      <motion.div
        animate={
          isRepLow
            ? { x: [-2, 2, -2, 2, 0] }
            : { x: 0 }
        }
        transition={{
          repeat: isRepLow ? Infinity : 0,
          repeatDelay: 1.2,
          duration: 0.35,
        }}
        className={`flex items-center gap-2.5 p-2 px-3 rounded-2xl border transition-colors ${
          isRepLow
            ? 'bg-rose-50/90 border-rose-300 ring-1 ring-rose-300'
            : 'bg-white/90 border-[#E5DFFA] shadow-2xs'
        }`}
      >
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isRepLow
              ? 'bg-rose-500 text-white'
              : 'bg-[#F2EEF9] text-[#5B25F5]'
          }`}
        >
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className={`font-semibold ${isRepLow ? 'text-rose-700' : 'text-slate-700'}`}>
              Uy tín
            </span>
            <span className={`font-extrabold ${isRepLow ? 'text-rose-600 font-mono animate-pulse' : 'text-slate-800'}`}>
              {rep}/10
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                isRepLow
                  ? 'bg-rose-500'
                  : rep <= 5
                  ? 'bg-indigo-400'
                  : 'bg-[#5B25F5]'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(4, (rep / 10) * 100)}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
