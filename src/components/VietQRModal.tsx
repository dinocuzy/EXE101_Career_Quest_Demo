import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useGameStore } from '../store/gameStore';
import {
  X,
  Copy,
  Clock,
  HelpCircle,
  CheckCircle2,
  Loader2,
  ShieldAlert,
} from 'lucide-react';

export const VietQRModal: React.FC = () => {
  const {
    isQrModalOpen,
    closeQrModal,
    priceVariant,
    discountPercent,
    sessionCode,
    unlockPremium,
    openSupportSheet,
    addToast,
  } = useGameStore();

  const [timeLeft, setTimeLeft] = useState(900); // 15:00 (15 minutes)
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Timer countdown
  useEffect(() => {
    if (!isQrModalOpen) {
      setTimeLeft(900);
      setIsProcessing(false);
      setStep(1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQrModalOpen]);

  if (!isQrModalOpen) return null;

  const currentPrice = discountPercent > 0
    ? Math.round(priceVariant * (1 - discountPercent / 100))
    : priceVariant;

  const formatVND = (amt: number) => amt.toLocaleString('vi-VN') + 'đ';

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const transferNote = `CQ-${sessionCode}`;
  const qrString = `VIETQR|STK:0123456789|NH:MB|SO_TIEN:${currentPrice}|ND:${transferNote}`;

  const handleCopyNote = async () => {
    try {
      await navigator.clipboard.writeText(transferNote);
      addToast('Đã sao chép nội dung chuyển khoản!', 'success');
    } catch {
      addToast(transferNote, 'info');
    }
  };

  const handleConfirmTransfer = () => {
    setIsProcessing(true);
    setStep(1);

    // 6-second simulated 3-step verification:
    // Step 1: 0 - 2s
    // Step 2: 2 - 4s
    // Step 3: 4 - 6s
    setTimeout(() => {
      setStep(2);
    }, 2000);

    setTimeout(() => {
      setStep(3);
    }, 4000);

    setTimeout(() => {
      setIsProcessing(false);
      unlockPremium();
    }, 6000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={closeQrModal}
          disabled={isProcessing}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Processing 3-Step Waiting Screen */}
        {isProcessing ? (
          <div className="py-8 px-2 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F2EEF9] border-2 border-[#5B25F5] flex items-center justify-center mb-5 text-[#5B25F5]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <h3 className="text-lg font-black text-[#18181B] mb-1">
              Đang Xác Thực Giao Dịch
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Hệ thống đang đối soát với ngân hàng...
            </p>

            <div className="w-full space-y-3 text-left">
              {/* Step 1 */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${
                  step >= 1
                    ? 'bg-[#F2EEF9] border-[#5B25F5] text-[#5B25F5]'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span>Bước 1: Đã nhận yêu cầu chuyển khoản</span>
                {step >= 1 && <CheckCircle2 className="w-4 h-4 text-[#5B25F5]" />}
              </div>

              {/* Step 2 */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${
                  step >= 2
                    ? 'bg-[#F2EEF9] border-[#5B25F5] text-[#5B25F5]'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span>Bước 2: Đối soát giao dịch ngân hàng</span>
                {step >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-[#5B25F5]" />
                ) : (
                  <span className="text-[10px] text-slate-400">Đang chờ</span>
                )}
              </div>

              {/* Step 3 */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${
                  step >= 3
                    ? 'bg-[#C8F932] border-black/10 text-[#18181B]'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span>Bước 3: Kích hoạt gói Premium</span>
                {step >= 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-[#18181B]" />
                ) : (
                  <span className="text-[10px] text-slate-400">Đang chờ</span>
                )}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-5 italic">
              Quá trình mô phỏng tự động hoàn tất trong vài giây
            </p>
          </div>
        ) : (
          /* Standard VietQR Display */
          <div>
            {/* Header */}
            <div className="text-center mb-3">
              <h3 className="text-base font-black text-[#18181B] leading-tight">
                Thanh Toán Chuyển Khoản VietQR
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F2EEF9] text-[#5B25F5] text-[11px] font-black border border-[#E5DFFA] mt-1">
                <Clock className="w-3 h-3 text-[#5B25F5]" />
                <span>Mã có hiệu lực: {formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="bg-[#F2EEF9]/50 p-4 rounded-2xl border border-[#E5DFFA] flex flex-col items-center justify-center mb-3">
              <div className="bg-white p-3 rounded-2xl shadow-xs border border-[#E5DFFA]">
                <QRCodeSVG value={qrString} size={160} level="M" />
              </div>
              <p className="text-xl font-black text-[#5B25F5] mt-2 font-mono">
                {formatVND(currentPrice)}
              </p>
            </div>

            {/* Details Table */}
            <div className="bg-[#F2EEF9]/60 rounded-2xl p-3.5 border border-[#E5DFFA] text-xs space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Chủ tài khoản:</span>
                <span className="font-extrabold text-[#18181B] text-[11px]">
                  CLB BIZTECH – CAREER QUEST
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Ngân hàng:</span>
                <span className="font-bold text-[#18181B]">MB Bank (Quân Đội)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Số tài khoản:</span>
                <span className="font-mono font-black text-[#18181B]">0123456789</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E5DFFA]">
                <span className="text-slate-500 font-medium">Nội dung CK:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-[#5B25F5] bg-white px-2 py-0.5 rounded-md border border-[#E5DFFA]">
                    {transferNote}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNote}
                    className="p-1 rounded-md text-[#5B25F5] hover:bg-white"
                    title="Sao chép"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Orange info note */}
            <div className="p-2.5 rounded-xl bg-[#F2EEF9] border border-[#E5DFFA] text-[11px] text-[#5B25F5] font-bold mb-3 leading-snug">
              ⚡ Premium được kích hoạt tự động ngay sau khi đối soát thành công.
            </div>

            {/* Confirmation CTA */}
            <button
              type="button"
              onClick={handleConfirmTransfer}
              className="w-full min-h-[48px] bg-[#C8F932] hover:bg-[#d5fc4e] active:scale-[0.97] text-[#18181B] font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer border border-black/10"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tôi đã chuyển khoản thành công</span>
            </button>

            {/* Footer helper links */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E5DFFA] text-[11px]">
              <span className="text-slate-400 italic">
                (Chế độ demo: không có giao dịch thật)
              </span>
              <button
                type="button"
                onClick={openSupportSheet}
                className="text-[#5B25F5] font-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Cần hỗ trợ?</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
