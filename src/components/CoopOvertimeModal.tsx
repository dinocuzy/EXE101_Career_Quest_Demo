import React from 'react';
import { useGameStore } from '../store/gameStore';
import { AlertTriangle, Clock, Zap, ArrowRight } from 'lucide-react';

export const CoopOvertimeModal: React.FC = () => {
  const { coopOvertimeModalOpen, dismissCoopOvertime } = useGameStore();

  if (!coopOvertimeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-[390px] bg-white rounded-3xl p-6 shadow-2xl border-2 border-rose-400 text-center relative">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-300 shadow-md">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200 inline-block mb-1.5">
          Cảnh Báo Vỡ Trận
        </span>

        <h3 className="text-xl font-black text-slate-900 leading-tight">
          TĂNG CA KHẨN CẤP
        </h3>

        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Chỉ số Vận hành của bộ phận đã chạm đáy <strong>0/10</strong>! Toàn bộ 4 thành viên phải kích hoạt cơ chế tăng ca khẩn cấp để cứu vãn ca trực.
        </p>

        <div className="bg-rose-50 rounded-2xl p-3.5 my-4 border border-rose-200 text-left space-y-1.5 text-xs text-rose-900">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-rose-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Hình phạt:</span>
            </span>
            <span>Mỗi người bị trừ 2 điểm ở kỹ năng cao nhất</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Hồi sinh:</span>
            </span>
            <span>Chỉ số Vận hành hồi phục lên 3/10</span>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1 border-t border-rose-200/60">
            Lưu ý: Cơ chế này chỉ áp dụng tối đa 1 lần duy nhất trong ca trực.
          </p>
        </div>

        <button
          type="button"
          onClick={dismissCoopOvertime}
          className="w-full min-h-[48px] bg-rose-600 hover:bg-rose-700 active:scale-[0.97] text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>Chấp nhận Tăng ca & Tiếp tục</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
