import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { AppThemeId } from '../types/game';
import { Palette, Check, Sparkles, ChevronDown, Wand2 } from 'lucide-react';

interface ThemeOption {
  id: AppThemeId;
  name: string;
  badge: string;
  isNewDefault?: boolean;
  desc: string;
  gradient: string;
  accentBorder: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'ruang_edit',
    name: 'Ruang Edit (Mẫu Thiết Kế)',
    badge: 'CHUẨN ẢNH MẪU ⚡',
    isNewDefault: true,
    desc: 'Tím Điện Tử & Vàng Neon Lime, thẻ 3D, icon hoa cúc & sao lấp lánh như mẫu',
    gradient: 'from-[#5B25F5] via-[#7C3AED] to-[#C8F932]',
    accentBorder: 'border-[#5B25F5]',
  },
  {
    id: 'neo_quest',
    name: 'Neo-Quest Studio',
    badge: 'CYAN & TEAL',
    desc: 'Thiết kế hiện đại, độ tương phản sắc nét, viền phát sáng Cyan & Sapphire',
    gradient: 'from-sky-500 via-teal-500 to-indigo-600',
    accentBorder: 'border-sky-400',
  },
  {
    id: 'vibrant_editorial',
    name: 'Vibrant Editorial',
    badge: 'TẠP CHÍ',
    desc: 'Tone màu kem ấm, đất nung Terracotta & xanh ngọc bích chuẩn hướng nghiệp',
    gradient: 'from-amber-600 via-rose-500 to-teal-700',
    accentBorder: 'border-amber-400',
  },
  {
    id: 'cyber_arcade',
    name: 'Cyber Arcade',
    badge: 'ARCADE GAME',
    desc: 'Neon Tím Huyền Bí & Vàng Điện, phong cách mô phỏng tương lai',
    gradient: 'from-purple-600 via-violet-500 to-amber-500',
    accentBorder: 'border-purple-400',
  },
  {
    id: 'warm_crafted',
    name: 'Warm Minimal',
    badge: 'SCANDINAVIAN',
    desc: 'Tối giản ấm áp, dịu mắt, phong cách thiết kế giáo dục chuẩn quốc tế',
    gradient: 'from-emerald-600 via-teal-600 to-slate-700',
    accentBorder: 'border-emerald-400',
  },
];

export const ThemeStyleSelector: React.FC = () => {
  const { currentTheme, setTheme } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTheme = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-bold border transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-md ${
          isOpen
            ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-sky-500/30'
            : 'bg-white/95 text-slate-800 hover:text-slate-950 border-slate-300/90 hover:border-slate-400 backdrop-blur-md'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${activeTheme.gradient} shadow-xs ring-1 ring-white/50`} />
        
        <span className="hidden sm:inline text-slate-500 font-medium">Bộ Style:</span>
        <span className="font-extrabold flex items-center gap-1">
          {activeTheme.name}
          {activeTheme.isNewDefault && (
            <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded-full font-black border border-sky-200">
              MỚI
            </span>
          )}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Palette className="w-4 h-4 text-sky-600" />
              <span>Chọn Bộ Style Giao Diện</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              4 Phong cách
            </span>
          </div>

          <div className="space-y-1.5">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-2.5 cursor-pointer select-none active:scale-[0.98] ${
                    isSelected
                      ? `bg-slate-50/90 ${theme.accentBorder} ring-2 ring-sky-500/20 shadow-xs`
                      : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg bg-gradient-to-br ${theme.gradient} shrink-0 mt-0.5 shadow-xs flex items-center justify-center text-white text-[10px]`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {theme.name}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md ${
                          theme.isNewDefault
                            ? 'bg-sky-500 text-white'
                            : isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {theme.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                      {theme.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 px-2 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Style tự động lưu cho phiên này</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
