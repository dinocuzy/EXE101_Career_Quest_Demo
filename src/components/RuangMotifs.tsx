import React from 'react';
import { ArrowRight, ArrowUpRight, Laptop, Lightbulb, Palette, PenTool, Settings, Sparkles, Wand2 } from 'lucide-react';

/**
 * 8-pointed rounded Asterisk Flower from Ruang Edit design
 */
export const LimeAsterisk: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} text-[#C8F932] fill-current shrink-0 select-none animate-spin-slow`}
    style={{ animationDuration: '30s' }}
  >
    {/* 8 rounded petals forming the flower asterisk */}
    <g transform="translate(50,50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="-7"
          y="-42"
          width="14"
          height="42"
          rx="7"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="12" />
    </g>
  </svg>
);

/**
 * 4-pointed Star Sparkle from Ruang Edit design
 */
export const LimeSparkle: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} text-[#C8F932] fill-current shrink-0 select-none`}
  >
    <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" />
  </svg>
);

/**
 * Inline Arrow Pill: Level Up Your Design [ -> ] with Our
 */
export const InlineArrowPill: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center justify-center align-middle mx-2 px-3 py-1 bg-[#C8F932] text-[#18181B] rounded-full shadow-xs ${className}`}
  >
    <ArrowRight className="w-5 h-5 stroke-[3]" />
  </span>
);

/**
 * Ruang Edit Signature Pill Button:
 * Neon lime background with black bold text and a dark circular icon with diagonal arrow ↗
 */
interface RuangPillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'lime' | 'violet' | 'white';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const RuangPillButton: React.FC<RuangPillButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'lime',
  size = 'md',
  type = 'button',
  disabled = false,
}) => {
  const baseSize =
    size === 'sm'
      ? 'min-h-[40px] px-4 py-1.5 text-xs'
      : size === 'lg'
      ? 'min-h-[56px] px-7 py-3 text-base'
      : 'min-h-[48px] px-5 py-2 text-sm';

  const variantStyles = {
    lime: 'bg-[#C8F932] hover:bg-[#bbf01f] text-[#18181B] border border-[#b2e817] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    violet: 'bg-[#5B25F5] hover:bg-[#4d1de0] text-white border border-[#4d1de0] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
    white: 'bg-white hover:bg-slate-50 text-[#18181B] border border-slate-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]',
  }[variant];

  const arrowCircleStyles = {
    lime: 'bg-[#18181B] text-[#C8F932]',
    violet: 'bg-[#C8F932] text-[#18181B]',
    white: 'bg-[#5B25F5] text-white',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-black flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer select-none ${baseSize} ${variantStyles} ${
        disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
      } ${className}`}
    >
      <span>{children}</span>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${arrowCircleStyles}`}
      >
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
      </div>
    </button>
  );
};

/**
 * Circular Arrow Button (as shown on top right of Class cards in screenshot)
 */
export const CircleArrowButton: React.FC<{
  variant?: 'violet' | 'lime' | 'white';
  className?: string;
  onClick?: () => void;
}> = ({ variant = 'violet', className = '', onClick }) => {
  const colors = {
    violet: 'bg-[#5B25F5] text-white hover:bg-[#4d1de0]',
    lime: 'bg-[#C8F932] text-[#18181B] hover:bg-[#bbf01f]',
    white: 'bg-white text-[#5B25F5] hover:bg-slate-100 shadow-sm',
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shrink-0 ${colors} ${className}`}
      aria-label="Xem chi tiết"
    >
      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
    </button>
  );
};

/**
 * 5-Card Showcase Visual from the uploaded Ruang Edit screenshot
 */
export const RuangHeroCards: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 py-6 px-2 overflow-x-auto select-none">
      {/* 1. Left Violet Square Card: Color Swatches */}
      <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 rounded-[24px] bg-[#5B25F5] p-3 shadow-xl flex flex-col justify-center items-center shrink-0 border border-violet-400/30 transform hover:-translate-y-1 transition-transform">
        <div className="flex gap-1.5 p-2 bg-[#481bcc] rounded-xl shadow-inner border border-violet-400/40">
          <div className="w-3.5 h-4 rounded-sm bg-rose-400" />
          <div className="w-3.5 h-4 rounded-sm bg-amber-400" />
          <div className="w-3.5 h-4 rounded-sm bg-lime-400" />
          <div className="w-3.5 h-4 rounded-sm bg-emerald-400 relative">
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-1 ring-white" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-violet-200 mt-2">Kỹ năng mềm</span>
      </div>

      {/* 2. Left Dark Card: Pen Tool */}
      <div className="w-24 sm:w-28 lg:w-32 h-44 sm:h-52 lg:h-56 rounded-[28px] bg-[#1E1C27] p-3 shadow-xl flex flex-col items-center justify-center shrink-0 border border-slate-700/60 transform hover:-translate-y-1 transition-transform relative overflow-hidden">
        <div className="absolute top-2 w-8 h-1 rounded-full bg-slate-700" />
        <div className="w-14 h-24 relative flex items-center justify-center">
          {/* Stylized vector pen path */}
          <svg className="w-16 h-16 text-cyan-400" viewBox="0 0 100 100">
            <path d="M 20 80 Q 50 10 80 80" fill="none" stroke="#60A5FA" strokeWidth="4" strokeDasharray="4 4" />
            <circle cx="20" cy="80" r="5" fill="#38BDF8" />
            <circle cx="50" cy="45" r="5" fill="#F43F5E" />
            <circle cx="80" cy="80" r="5" fill="#38BDF8" />
          </svg>
          <div className="absolute bottom-2 w-6 h-14 bg-gradient-to-t from-violet-600 to-amber-400 rounded-t-full transform rotate-12 shadow-md flex items-center justify-center">
            <div className="w-1.5 h-3 bg-amber-200 rounded-full" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-slate-400 mt-2">Xử lý tình huống</span>
      </div>

      {/* 3. Center Tall Card: Full-bleed workplace photo (Highlight) */}
      <div className="w-36 sm:w-44 lg:w-48 h-56 sm:h-64 lg:h-72 rounded-[32px] overflow-hidden shadow-2xl shrink-0 border-2 border-violet-400/40 relative group transform hover:scale-105 transition-all duration-300">
        {/* Full-bleed background photo */}
        <img
          src="/cards/hero_student.jpg"
          alt="Thử việc ảo"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Dark-to-violet overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240c75]/95 via-[#5B25F5]/50 to-black/20" />

        {/* Top badge */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
          <div className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-sm text-[10px] font-black text-white border border-white/20">
            Thử việc Ảo
          </div>
          <div className="w-7 h-7 rounded-full bg-[#C8F932] text-[#18181B] flex items-center justify-center shadow-xs">
            <Lightbulb className="w-4 h-4 fill-current stroke-[2.5]" />
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C8F932] text-[#18181B] text-[11px] font-black uppercase tracking-wider shadow-xs mb-2">
            Ca Trực 24h
          </span>
          <p className="text-[10px] font-bold text-violet-200">Mô phỏng thực chiến</p>
        </div>
      </div>

      {/* 4. Right Dark Card: Tool Stack */}
      <div className="w-24 sm:w-28 lg:w-32 h-44 sm:h-52 lg:h-56 rounded-[28px] bg-[#1E1C27] p-3 shadow-xl flex flex-col items-center justify-center shrink-0 border border-slate-700/60 transform hover:-translate-y-1 transition-transform relative overflow-hidden">
        <div className="w-10 sm:w-12 h-28 sm:h-32 rounded-2xl bg-[#5B25F5] p-2 flex flex-col items-center justify-between shadow-lg border border-violet-400/30">
          <div className="w-6 h-6 rounded-lg bg-[#C8F932] text-[#18181B] flex items-center justify-center text-xs font-black shadow-xs">
            ▲
          </div>
          <div className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs font-black">
            T
          </div>
          <div className="w-6 h-6 rounded-lg bg-emerald-400 text-slate-900 flex items-center justify-center text-xs font-black">
            ●
          </div>
          <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center text-xs font-black">
            ✦
          </div>
        </div>
        <span className="text-[10px] font-bold text-slate-400 mt-2">Báo cáo AI</span>
      </div>

      {/* 5. Right Violet Square Card: Gear & Compass */}
      <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 rounded-[24px] bg-[#5B25F5] p-3 shadow-xl flex flex-col justify-center items-center shrink-0 border border-violet-400/30 transform hover:-translate-y-1 transition-transform">
        <div className="w-11 h-11 rounded-2xl bg-white text-[#5B25F5] flex items-center justify-center shadow-md relative">
          <Settings className="w-6 h-6 animate-spin-slow stroke-[2.2]" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#C8F932] border border-white flex items-center justify-center text-[8px] font-black text-black">
            ✓
          </div>
        </div>
        <span className="text-[10px] font-bold text-violet-200 mt-2">Đánh giá 360°</span>
      </div>
    </div>
  );
};
