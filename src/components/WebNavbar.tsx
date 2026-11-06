import React from 'react';
import { ChevronRight, LogOut, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GamifiedHUD } from './GamifiedHUD';

export const WebNavbar: React.FC = () => {
  const { screen, setScreen, incrementLogoClick, selectedRole, cardIndex, soloCards, currentTheme } = useGameStore();

  const getBreadcrumb = () => {
    switch (screen) {
      case 'mode_select':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: 'Chọn Chế Độ Chơi', current: true },
        ];
      case 'role_pick':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: 'Chọn Chế Độ', action: () => setScreen('mode_select') },
          { label: 'Chọn Vị Trí Thử Việc', current: true },
        ];
      case 'shift_intro':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: 'Chọn Vị Trí', action: () => setScreen('role_pick') },
          { label: `Nhận Ca: ${selectedRole?.name || 'Thử Việc'}`, current: true },
        ];
      case 'solo_play':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: selectedRole?.name || 'Vị trí', action: () => setScreen('role_pick') },
          {
            label: `Ca trực: Tình huống ${cardIndex + 1}/${soloCards.length || 6}`,
            current: true,
          },
        ];
      case 'solo_result':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: selectedRole?.name || 'Vị trí' },
          { label: 'Biểu Đồ Năng Lực & Báo Cáo AI', current: true },
        ];
      case 'admin_demo':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: 'Bảng Điều Khiển Admin & Analytics', current: true },
        ];
      case 'coop_lobby':
      case 'coop_play':
      case 'coop_summary':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: 'Chế Độ Co-op 4 Người (Mô Phỏng)', current: true },
        ];
      case 'game_over':
        return [
          { label: 'Trang chủ', action: () => setScreen('landing') },
          { label: 'Kết Thúc Ca Trực', current: true },
        ];
      default:
        return [{ label: 'Trang chủ', current: true }];
    }
  };

  const breadcrumbs = getBreadcrumb();

  const handleBackOrExit = () => {
    if (screen === 'solo_play') {
      const confirmExit = window.confirm('Bạn có chắc chắn muốn rời ca trực hiện tại? Tiến trình ca này sẽ quay về danh sách vị trí.');
      if (confirmExit) {
        setScreen('role_pick');
      }
      return;
    }
    if (screen === 'shift_intro') {
      setScreen('role_pick');
      return;
    }
    if (screen === 'role_pick') {
      setScreen('mode_select');
      return;
    }
    if (screen === 'mode_select' || screen === 'admin_demo' || screen === 'solo_result') {
      setScreen('landing');
      return;
    }
    setScreen('landing');
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#E5DFFA] shadow-xs sticky top-0 z-30 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Logo styled after Ruang Edit */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={incrementLogoClick}
            className="flex items-center gap-2.5 cursor-pointer select-none active:scale-95 transition-transform group text-left"
            title="Nhấp 5 lần để mở Admin Demo"
          >
            {/* Geometric golden/lime fold mark like Ruang Edit logo */}
            <div className="w-9 h-9 rounded-xl bg-[#5B25F5] flex items-center justify-center text-white shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 40 40" className="w-6 h-6">
                <path d="M 10 30 L 25 10 L 32 20 Z" fill="#C8F932" />
                <path d="M 8 30 L 20 12 L 14 30 Z" fill="#E2F97D" opacity="0.8" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-[#18181B] block leading-tight">
                  Career Quest
                </span>
              </div>
            </div>
          </button>

          {/* Center Breadcrumb */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 pl-4 border-l border-slate-200">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {crumb.action ? (
                  <button
                    type="button"
                    onClick={crumb.action}
                    className="hover:text-[#5B25F5] font-medium transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span
                    className={`font-bold ${
                      crumb.current
                        ? 'text-[#18181B] bg-[#C8F932]/40 px-2.5 py-1 rounded-md border border-[#C8F932]'
                        : 'text-slate-700'
                    }`}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center/Right: Gamified HUD on desktop navbar */}
        <div className="hidden lg:flex items-center">
          <GamifiedHUD />
        </div>

        {/* Right: Exit / Back CTA */}
        <div className="flex items-center gap-3 pr-40 sm:pr-48">
          <button
            type="button"
            onClick={handleBackOrExit}
            className="min-h-[40px] px-4 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#18181B] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            {screen === 'solo_play' ? (
              <>
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Rời ca</span>
              </>
            ) : (
              <>
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
