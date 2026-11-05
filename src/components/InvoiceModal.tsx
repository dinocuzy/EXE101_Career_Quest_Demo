import React from 'react';
import { useGameStore } from '../store/gameStore';
import { FileText, CheckCircle2, X, Download } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const {
    isInvoiceModalOpen,
    closeInvoiceModal,
    priceVariant,
    discountPercent,
    sessionCode,
  } = useGameStore();

  if (!isInvoiceModalOpen) return null;

  const currentPrice = discountPercent > 0
    ? Math.round(priceVariant * (1 - discountPercent / 100))
    : priceVariant;

  const formatVND = (amt: number) => amt.toLocaleString('vi-VN') + 'đ';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={closeInvoiceModal}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center mx-auto mb-2 border border-[#E5DFFA]">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-[#18181B]">
            Hóa Đơn Điện Tử (Mô phỏng)
          </h3>
          <p className="text-[11px] text-slate-400">Career Quest Education Suite</p>
        </div>

        {/* Invoice Body */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs space-y-2.5 mb-4">
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Mã hóa đơn:</span>
            <span className="font-mono font-bold text-slate-800">INV-{sessionCode}-2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Thời gian giao dịch:</span>
            <span className="font-medium text-slate-800">{new Date().toLocaleString('vi-VN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Gói dịch vụ:</span>
            <span className="font-bold text-[#5B25F5]">Trọn bộ 16 tình huống + Báo cáo AI</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Đơn vị thụ hưởng:</span>
            <span className="font-semibold text-slate-800">CLB BIZTECH – CAREER QUEST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phương thức:</span>
            <span className="font-medium text-slate-800">Chuyển khoản VietQR</span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Ưu đãi áp dụng (NHOM3):</span>
              <span className="font-bold">-20%</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
            <span className="font-bold text-slate-800">Tổng thanh toán:</span>
            <span className="font-black text-[#5B25F5]">{formatVND(currentPrice)}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 pt-1 text-emerald-600 font-bold text-[11px]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Trạng thái: ĐÃ THANH TOÁN THÀNH CÔNG</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>In / Lưu hóa đơn</span>
          </button>
          <button
            type="button"
            onClick={closeInvoiceModal}
            className="py-2.5 px-4 bg-[#5B25F5] text-white rounded-xl text-xs font-black transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
