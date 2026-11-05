import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { MessageCircle, Mail, ShieldCheck, X, PhoneCall } from 'lucide-react';

export const SupportSheet: React.FC = () => {
  const { isSupportSheetOpen, closeSupportSheet, addToast } = useGameStore();

  if (!isSupportSheetOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hotro@careerquest.vn');
      addToast('Đã sao chép email hotro@careerquest.vn', 'success');
    } catch {
      addToast('hotro@careerquest.vn', 'info');
    }
  };

  const handleOpenZalo = () => {
    addToast('Đang kết nối Zalo hỗ trợ học sinh THPT: 0987.654.321', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSupportSheet}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[430px] bg-white rounded-t-[32px] shadow-2xl p-6 z-10"
        >
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-2 mb-4" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-[#18181B]">
                Trung Tâm Hỗ Trợ Career Quest
              </h3>
            </div>
            <button
              type="button"
              onClick={closeSupportSheet}
              className="p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 mb-5">
            {/* Zalo option */}
            <div
              onClick={handleOpenZalo}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                  Zalo
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Kênh Zalo Hỗ Trợ 24/7</h4>
                  <p className="text-[11px] text-slate-500">Phản hồi trong 5 phút</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600">Nhắn tin →</span>
            </div>

            {/* Email option */}
            <div
              onClick={handleCopyEmail}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Email Dự Án</h4>
                  <p className="text-[11px] text-slate-500 font-mono">hotro@careerquest.vn</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Sao chép</span>
            </div>
          </div>

          {/* Refund commitment */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-extrabold text-amber-900">
                Cam kết bảo vệ quyền lợi học sinh
              </h5>
              <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
                Hoàn tiền 100% ngay lập tức nếu AI gặp lỗi không thể xuất bản Báo cáo Năng lực hoặc có bất kỳ gián đoạn kỹ thuật nào.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
