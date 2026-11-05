import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { analytics } from '../services/analytics';
import { ArrowLeft, Download, RefreshCw, BarChart3, Database, Sparkles, Key, Copy, Check } from 'lucide-react';

export const AdminDemoScreen: React.FC = () => {
  const { setScreen, addToast, landingViewMode } = useGameStore();
  const [, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const metrics = analytics.getMetrics();
  const rawEvents = analytics.getEvents();
  const isWeb = landingViewMode === 'website';

  const handleExportJson = () => {
    const jsonStr = analytics.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_quest_analytics_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Đã tải xuống file JSON Analytics!', 'success');
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(analytics.exportJSON());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addToast('Đã sao chép toàn bộ dữ liệu vào Clipboard!', 'success');
    } catch {
      addToast('Không thể sao chép dữ liệu.', 'error');
    }
  };

  const formatVND = (amt: number) => amt.toLocaleString('vi-VN') + 'đ';

  return (
    <div className={`w-full flex flex-col min-h-full ${isWeb ? 'py-6 px-4 max-w-7xl mx-auto' : 'p-4 pb-12'} bg-slate-900 text-slate-100 rounded-3xl shadow-xl`}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {!isWeb && (
            <button
              type="button"
              onClick={() => setScreen('landing')}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h2 className={`${isWeb ? 'text-2xl' : 'text-base'} font-bold text-white flex items-center gap-2`}>
              <span>Bảng Điều Khiển Admin & Analytics</span>
              <span className="text-[10px] bg-[#C8F932] text-[#18181B] font-black px-2.5 py-0.5 rounded-full">
                In-Memory Data
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Đo lường các giả thuyết sản phẩm H1 - H5 (Landing, Hoàn thành ca, Sẵn sàng trả phí, Đánh giá AI)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyJson}
            className="min-h-[40px] px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">Sao chép JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="min-h-[40px] px-3.5 rounded-xl bg-[#5B25F5] hover:bg-[#4d1ed3] text-white text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-[#C8F932]" />
            <span className="hidden sm:inline">Xuất file JSON</span>
          </button>

          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Hypothesis Cards Grid (4 columns on Web, 1 column on Mobile) */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between mb-3">
          <span>Chỉ số nghiên cứu sản phẩm</span>
          <span className="text-xs font-mono text-[#C8F932]">Mã phiên: {metrics.sessionCode}</span>
        </p>

        <div className={`grid ${isWeb ? 'grid-cols-4 gap-4' : 'grid-cols-1 gap-3'}`}>
          {/* H1 Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#C8F932] block mb-1">
                H1: Nhu cầu Thử việc vs Test
              </span>
              <p className="text-[11px] text-slate-400 mb-3">Tỷ lệ tương tác Landing CTA</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-700/60">
                <span className="text-xl font-black text-amber-400">{metrics.clicksVaoCa}</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Click Vào ca</p>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-700/60">
                <span className="text-xl font-black text-slate-300">{metrics.clicksLamTest}</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Click Làm test</p>
              </div>
            </div>
          </div>

          {/* H2 Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 block mb-1">
                H2: Tỷ lệ hoàn thành ca trực
              </span>
              <p className="text-[11px] text-slate-400 mb-2">Tỷ lệ người chơi xong 6 thẻ</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-emerald-300">{metrics.completionRate}</span>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-800">
                <span>Bắt đầu: {metrics.startedShifts}</span>
                <span>Xong: {metrics.completedShifts}</span>
              </div>
            </div>
          </div>

          {/* H3 Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-orange-400">
                  H3: Sẵn sàng trả phí
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300">
                  {formatVND(metrics.priceVariant)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">A/B Testing phễu thanh toán</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
                <span className="text-base font-black text-slate-200">{metrics.paywallViews}</span>
                <p className="text-[9px] text-slate-400">Xem</p>
              </div>
              <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
                <span className="text-base font-black text-amber-400">{metrics.qrClicks}</span>
                <p className="text-[9px] text-slate-400">VietQR</p>
              </div>
              <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
                <span className="text-base font-black text-emerald-400">{metrics.paymentConfirmDemos}</span>
                <p className="text-[9px] text-slate-400">Demo</p>
              </div>
            </div>
          </div>

          {/* H5 Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-400 block mb-1">
                H5: Hài lòng về Báo cáo AI
              </span>
              <p className="text-[11px] text-slate-400 mb-2">Điểm hữu ích trung bình</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-amber-300">
                {metrics.avgAiRating} {metrics.avgAiRating !== 'Chưa có' ? '⭐' : ''}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Đánh giá thực tế từ học sinh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Event Log (Wide Table on Web) */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Nhật ký sự kiện thời gian thực ({rawEvents.length} bản ghi)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">Tự động ghi nhận in-memory</span>
        </div>

        <div className="bg-slate-950 rounded-2xl p-4 flex-1 min-h-[240px] max-h-[380px] overflow-y-auto font-mono text-xs text-slate-300 border border-slate-800 space-y-1.5">
          {rawEvents.length === 0 ? (
            <p className="text-slate-600 italic py-8 text-center">Chưa có sự kiện nào được ghi nhận trong phiên này</p>
          ) : (
            rawEvents.map((evt, idx) => (
              <div key={idx} className="border-b border-slate-900/80 pb-1.5 flex items-start gap-2 hover:bg-slate-900/40 px-2 py-1 rounded">
                <span className="text-teal-400 font-bold shrink-0">
                  [{new Date(evt.timestamp).toLocaleTimeString()}]
                </span>
                <span className="text-amber-300 font-semibold shrink-0">{evt.eventName}:</span>
                <span className="text-slate-400 break-all">{JSON.stringify(evt.data || {})}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {!isWeb && (
        <button
          type="button"
          onClick={() => setScreen('landing')}
          className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <span>Quay lại màn hình chính</span>
        </button>
      )}
    </div>
  );
};
