import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { Sparkles, X, CheckCircle2, QrCode, Tag, ArrowRight } from 'lucide-react';

export const PaywallSheet: React.FC = () => {
  const {
    isPaywallOpen,
    closePaywall,
    openQrModal,
    priceVariant,
    discountPercent,
    discountCode,
    discountError,
    applyPromoCode,
    pauseShiftAtFreeLimit,
    isPremium,
    cardIndex,
  } = useGameStore();

  const [inputCode, setInputCode] = useState('');

  if (!isPaywallOpen || isPremium) return null;

  const originalPrice = 149000;
  const currentPrice = discountPercent > 0
    ? Math.round(priceVariant * (1 - discountPercent / 100))
    : priceVariant;

  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromoCode(inputCode);
  };

  const handleOpenQR = () => {
    openQrModal();
  };

  const handleLater = () => {
    // If during play at card 3 (index 2), go to paused result screen
    if (cardIndex >= 2) {
      pauseShiftAtFreeLimit();
    } else {
      closePaywall();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleLater}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* 75% Height Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[430px] h-[75vh] max-h-[75vh] bg-white rounded-t-[32px] shadow-2xl p-5 pb-6 z-10 flex flex-col justify-between overflow-y-auto"
        >
          <div>
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-3" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2EEF9] text-[#5B25F5] font-black text-xs border border-[#E5DFFA] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8F932] fill-current" /> Gói Thực Tập Sinh Toàn Diện
                </span>
                <h3 className="text-xl font-black text-[#18181B] leading-tight">
                  Mở khóa trọn bộ 16 tình huống
                </h3>
              </div>
              <button
                type="button"
                onClick={handleLater}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Benefit Checks */}
            <div className="space-y-2 mb-4 bg-[#F2EEF9]/60 p-4 rounded-2xl border border-[#E5DFFA]">
              {[
                '16 tình huống đã được chuyên gia thẩm định',
                'Báo cáo AI về phong cách làm việc',
                'Radar kỹ năng chi tiết + gợi ý nghề',
                'Thanh toán 1 lần, không đăng ký tháng',
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#18181B] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#5B25F5] shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* PriceCard */}
            <div className="bg-[#F2EEF9] border-2 border-[#5B25F5] rounded-2xl p-4 mb-3 flex items-center justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-slate-400 line-through">
                    {formatVND(originalPrice)}
                  </span>
                  <span className="bg-[#C8F932] text-[#18181B] text-[10px] font-black px-2 py-0.5 rounded-md">
                    Giá ra mắt
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-[#5B25F5] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      -20%
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-[#5B25F5]">
                    {formatVND(currentPrice)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    / trọn đời
                  </span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#5B25F5] text-[#C8F932] flex items-center justify-center shadow-xs font-black">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Promo Code Input (NHOM3 = -20%) */}
            <div className="mb-3">
              <form onSubmit={handleApplyCode} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Mã giảm giá (nhập NHOM3)"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#E5DFFA] bg-white font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B25F5]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#5B25F5] hover:bg-[#4d1ed3] active:scale-95 text-white text-xs font-black rounded-xl transition-all cursor-pointer select-none shrink-0"
                >
                  Áp dụng
                </button>
              </form>

              {discountCode === 'NHOM3' && (
                <p className="text-[11px] font-black text-[#5B25F5] mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5B25F5]" />
                  Đã áp dụng mã giới thiệu nhóm NHOM3 (-20%)
                </p>
              )}
              {discountError && (
                <p className="text-[11px] font-bold text-rose-500 mt-1.5">
                  {discountError}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#E5DFFA]">
            <button
              type="button"
              onClick={handleOpenQR}
              className="w-full min-h-[50px] bg-[#C8F932] hover:bg-[#d6ff47] active:scale-[0.97] text-[#18181B] font-black rounded-2xl shadow-sm text-sm flex items-center justify-center gap-2 cursor-pointer transition-all select-none border border-black/10"
            >
              <QrCode className="w-4 h-4" />
              <span>Mở khóa ngay ({formatVND(currentPrice)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleLater}
              className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer text-center select-none"
            >
              Để sau
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
