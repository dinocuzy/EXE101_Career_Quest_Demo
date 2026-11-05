import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Sparkles, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { fireCelebrationConfetti } from './Confetti';

export const WelcomePremiumModal: React.FC = () => {
  const {
    isWelcomePremiumOpen,
    closeWelcomePremium,
    resumeShiftAfterPayment,
    openInvoiceModal,
    setScreen,
    cardIndex,
    soloCards,
  } = useGameStore();

  if (!isWelcomePremiumOpen) return null;

  const handlePlayRemaining = () => {
    resumeShiftAfterPayment();
  };

  const handleViewAiReport = () => {
    closeWelcomePremium();
    setScreen('solo_result');
  };

  const handleViewInvoice = () => {
    closeWelcomePremium();
    openInvoiceModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-[28px] p-6 shadow-2xl border border-[#E5DFFA] text-center relative animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-[22px] bg-[#5B25F5] text-[#C8F932] flex items-center justify-center mx-auto mb-3 text-3xl shadow-md font-black">
          <Sparkles className="w-8 h-8 fill-current" />
        </div>

        <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-[#F2EEF9] text-[#5B25F5] border border-[#E5DFFA] inline-block mb-1.5 uppercase tracking-wider">
          Kích Hoạt Thành Công ⚡
        </span>

        <h3 className="text-xl font-black text-[#18181B] leading-tight">
          Chào Mừng Đến Premium!
        </h3>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
          Bạn đã mở khóa thành công trọn bộ 16 tình huống thực tế cùng bản phân tích năng lực chuyên sâu từ Gemini AI.
        </p>

        {/* Perks pill */}
        <div className="bg-[#F2EEF9]/60 rounded-2xl p-3.5 my-4 border border-[#E5DFFA] text-left space-y-2 text-xs text-slate-800 font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B25F5] shrink-0" />
            <span>Đã mở quyền truy cập 100% tình huống</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B25F5] shrink-0" />
            <span>Tự động sinh Báo cáo AI chi tiết sau ca trực</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B25F5] shrink-0" />
            <span>Biểu đồ so sánh chuẩn năng lực khởi điểm</span>
          </div>
        </div>

        {/* 3 CTAs */}
        <div className="flex flex-col gap-2 pt-1">
          {cardIndex < soloCards.length && (
            <button
              type="button"
              onClick={handlePlayRemaining}
              className="w-full min-h-[50px] bg-[#C8F932] hover:bg-[#d5fc4e] active:scale-[0.97] text-[#18181B] font-black rounded-2xl shadow-sm text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-black/10"
            >
              <span>Chơi tiếp các tình huống còn lại</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleViewAiReport}
            className="w-full min-h-[46px] bg-[#5B25F5] hover:bg-[#4d1ed3] active:scale-[0.97] text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#C8F932]" />
            <span>Xem Báo cáo AI & Radar năng lực</span>
          </button>

          <button
            type="button"
            onClick={handleViewInvoice}
            className="w-full min-h-[40px] text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xem hóa đơn điện tử</span>
          </button>
        </div>
      </div>
    </div>
  );
};
