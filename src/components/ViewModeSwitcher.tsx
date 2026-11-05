import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { ThemeStyleSelector } from './ThemeStyleSelector';

export const ViewModeSwitcher: React.FC = () => {
  const { landingViewMode, setLandingViewMode, currentTheme } = useGameStore();

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-6 z-50 flex items-center gap-2">
      {/* Theme Style Selector (Bộ Style) */}

      {/* Mobile / Website View Switcher */}
      <div
        className="bg-white/95 backdrop-blur-md p-1 rounded-full border border-slate-300/80 shadow-xl flex items-center gap-1 transition-all"
        role="group"
        aria-label="Chuyển đổi giao diện"
      >
        <button
          type="button"
          onClick={() => setLandingViewMode('mobile')}
          className={`min-h-[38px] px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer select-none active:scale-95 ${
            landingViewMode === 'mobile'
              ? 'bg-[#5B25F5] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-pressed={landingViewMode === 'mobile'}
        >
          <Smartphone className="w-3.5 h-3.5 stroke-[2.2]" />
        </button>

        <button
          type="button"
          onClick={() => setLandingViewMode('website')}
          className={`min-h-[38px] px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer select-none active:scale-95 ${
            landingViewMode === 'website'
              ? 'bg-[#5B25F5] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-pressed={landingViewMode === 'website'}
        >
          <Monitor className="w-3.5 h-3.5 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};
