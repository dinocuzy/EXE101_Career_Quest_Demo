import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { calculateTitle } from '../engine/titles';
import { RadarResult } from '../components/RadarResult';
import { ReportView } from '../components/ReportView';
import { fireCelebrationConfetti } from '../components/Confetti';
import {
  Share2,
  RotateCcw,
  Sparkles,
  Zap,
  Star,
  ChevronRight,
  Lock,
  ArrowRight,
  TrendingUp,
  Trophy,
  Flame,
  Award,
  Shield,
  Rocket,
} from 'lucide-react';
import { SKILL_METADATA } from '../components/SkillChip';
import { SkillKey } from '../types/game';

export const SoloResultScreen: React.FC = () => {
  const {
    stats,
    selectedRole,
    setScreen,
    startSoloShift,
    aiReport,
    isLoadingAiReport,
    fetchAiReport,
    isPremium,
    isPausedAtFreeLimit,
    openPaywall,
    addToast,
    landingViewMode,
  } = useGameStore();

  const titleInfo = calculateTitle(stats.rep, stats.energy);
  const isWeb = landingViewMode === 'website';

  useEffect(() => {
    if (!isPausedAtFreeLimit) {
      fireCelebrationConfetti();
    }
  }, [isPausedAtFreeLimit]);

  // If premium is active and report not loaded yet, fetch it
  useEffect(() => {
    if (isPremium && !aiReport && !isLoadingAiReport && !isPausedAtFreeLimit) {
      fetchAiReport();
    }
  }, [isPremium, aiReport, isLoadingAiReport, isPausedAtFreeLimit, fetchAiReport]);

  const handleShare = async () => {
    const textToShare = `🎉 Tôi vừa hoàn thành ca thử việc ảo vị trí "${selectedRole?.name}" trong Career Quest!\n🌟 Danh hiệu: ${titleInfo.title} (${titleInfo.badge})\n⚡ Năng lượng: ${stats.energy}/10 | ⭐ Uy tín: ${stats.rep}/10\nKhám phá bạn hợp với nghề nào tại Career Quest!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kết quả Career Quest',
          text: textToShare,
        });
        addToast('Đã mở hộp thoại chia sẻ!', 'success');
        return;
      } catch {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(textToShare);
      addToast('Đã sao chép kết quả vào bộ nhớ tạm!', 'success');
    } catch {
      addToast('Không thể sao chép kết quả.', 'error');
    }
  };

  const skillKeys: SkillKey[] = ['C', 'P', 'A', 'T', 'E'];

  // Left Column Content: Trophy, Radar, Benchmark
  const renderLeftColumn = () => (
    <div className="flex flex-col gap-5">
      {/* Trophy Card */}
      {isPausedAtFreeLimit ? (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-center shadow-xs">
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-200 text-amber-900 inline-block mb-2">
            Tạm Dừng Thử Việc
          </span>
          <h2 className="text-xl font-black text-amber-950">
            Bạn đã chơi 2/6 thẻ
          </h2>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            Bạn đã hoàn thành 2 tình huống thử nghiệm của vị trí <strong>{selectedRole?.name}</strong>. Mở khóa gói Premium để tiếp tục xử lý 4 tình huống cao trào và nhận Báo cáo AI chuyên sâu!
          </p>

          <button
            type="button"
            onClick={openPaywall}
            className="mt-4 w-full min-h-[48px] bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.97] text-white font-extrabold rounded-2xl shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mở khóa tiếp 4 thẻ còn lại & Báo cáo AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative rounded-[28px] p-6 text-center overflow-hidden border border-[#E5DFFA] shadow-xs bg-white">
          <div
            className={`w-24 h-24 rounded-[24px] mx-auto flex items-center justify-center mb-3 shadow-md bg-gradient-to-tr ${titleInfo.bgGradient} text-white`}
          >
            {titleInfo.id === 'future_star' ? (
              <Sparkles className="w-12 h-12 stroke-[2.2]" />
            ) : titleInfo.id === 'survivor' ? (
              <Shield className="w-12 h-12 stroke-[2.2]" />
            ) : (
              <Rocket className="w-12 h-12 stroke-[2.2]" />
            )}
          </div>

          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#F2EEF9] text-[#5B25F5] border border-[#E5DFFA] inline-block mb-1.5">
            Danh Hiệu Ca Trực
          </span>

          <h2 className="text-2xl font-black text-[#18181B] leading-tight">
            {titleInfo.title}
          </h2>
          <p className="text-xs font-bold text-[#5B25F5] mt-0.5">
            {titleInfo.tagline}
          </p>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">
            {titleInfo.description}
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-[#E5DFFA]/70">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Zap className="w-4 h-4 text-amber-600 fill-current" />
              <span>Năng lượng: {stats.energy}/10</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#F2EEF9] border border-[#E5DFFA] text-[#5B25F5] text-xs font-bold">
              <Star className="w-4 h-4 text-[#5B25F5] fill-current" />
              <span>Uy tín: {stats.rep}/10</span>
            </div>
          </div>
        </div>
      )}

      {/* Radar Chart */}
      <RadarResult skills={stats.skills} />

      {/* Benchmark 5/10 comparison */}
      {isPremium && (
        <div className="w-full bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-[#18181B] uppercase tracking-wider">
                Bạn vs Mức Khởi Điểm 5/10
              </h4>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#C8F932] text-[#18181B]">
              Chỉ số Premium
            </span>
          </div>

          <div className="space-y-3">
            {skillKeys.map((key) => {
              const meta = SKILL_METADATA[key];
              const score = stats.skills[key];
              const diff = score - 5;

              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <span>{meta.icon}</span>
                      <span>{meta.name}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {score}/10{' '}
                      <span
                        className={`text-[11px] font-semibold ${
                          diff > 0
                            ? 'text-[#5B25F5] font-black'
                            : diff < 0
                            ? 'text-rose-500'
                            : 'text-slate-400'
                        }`}
                      >
                        ({diff > 0 ? `+${diff}` : diff === 0 ? '±0' : `${diff}`})
                      </span>
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full relative overflow-hidden flex items-center">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 z-10" />
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score >= 5 ? 'bg-[#5B25F5]' : 'bg-rose-400'
                      }`}
                      style={{ width: `${(score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 mt-3 italic text-center">
            Đường vạch giữa thể hiện mức xuất phát điểm 5/10 trước khi vào ca
          </p>
        </div>
      )}
    </div>
  );

  // Right Column Content: AI Report & Action Buttons
  const renderRightColumn = () => (
    <div className="flex flex-col gap-5">
      {/* AI Report Card */}
      {!isPremium ? (
        <div className="relative w-full rounded-[28px] overflow-hidden border border-[#E5DFFA] shadow-xs bg-white p-6 sm:p-8">
          <div className="filter blur-sm select-none pointer-events-none opacity-40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100" />
              <div className="h-5 bg-slate-200 rounded w-1/2" />
            </div>
            <div className="h-24 bg-slate-100 rounded-2xl p-4" />
            <div className="h-16 bg-slate-100 rounded-2xl p-4" />
            <div className="h-16 bg-slate-100 rounded-2xl p-4" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/95 to-white flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center mb-3 shadow-2xs border border-[#E5DFFA]">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-[#18181B] mb-1.5">
              Báo Cáo AI: Phong Cách Làm Việc
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed mb-5">
              Mở khóa để nhận phân tích chi tiết từ Gemini AI, dẫn chứng quyết định thực tế, gợi ý 3 vị trí nghề và 2 tổ hợp môn THPT phù hợp nhất.
            </p>

            <button
              type="button"
              onClick={openPaywall}
              className="w-full max-w-sm min-h-[50px] bg-[#5B25F5] hover:bg-[#4d1ed3] active:scale-[0.97] text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C8F932]" />
              <span>Mở khóa báo cáo AI (VietQR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <ReportView
          report={aiReport}
          isLoading={isLoadingAiReport}
          playerTitle={titleInfo.title}
        />
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs flex flex-col gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="w-full min-h-[52px] bg-[#C8F932] hover:bg-[#d4fa4c] active:scale-[0.97] text-[#18181B] font-black rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm cursor-pointer select-none"
        >
          <Share2 className="w-4 h-4" />
          <span>Chia sẻ kết quả cho bạn bè & giáo viên</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={startSoloShift}
            className="min-h-[46px] bg-white hover:bg-slate-50 active:scale-[0.97] text-[#18181B] font-extrabold rounded-2xl border border-[#E5DFFA] transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer select-none shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi lại ca này</span>
          </button>

          <button
            type="button"
            onClick={() => setScreen('role_pick')}
            className="min-h-[46px] bg-[#5B25F5] hover:bg-[#4c1ed3] active:scale-[0.97] text-white font-extrabold rounded-2xl transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer select-none shadow-2xs"
          >
            <span>Thử vị trí khác</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8F932]" />
          </button>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // WEBSITE DESKTOP DASHBOARD (2 COLUMNS 45% : 55%)
  // ==========================================
  if (isWeb) {
    return (
      <div className="w-full max-w-7xl mx-auto py-6">
        <div className="mb-6 flex items-center justify-between pb-4 border-b border-[#E5DFFA]">
          <div>
            <h2 className="text-2xl font-black text-[#18181B] leading-tight">
              Tổng Kết Ca Trực & Báo Cáo Năng Lực
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Vị trí thử việc: <strong>{selectedRole?.name}</strong> • Phân tích bởi Gemini AI
            </p>
          </div>
          <span className="text-xs font-black text-[#18181B] bg-[#C8F932] px-3.5 py-1.5 rounded-full border border-black/10">
            Hoàn thành xuất sắc ⚡
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Cột trái (45% ~ 5.4 -> 5 cols or 6 cols) */}
          <div className="col-span-12 lg:col-span-5">
            {renderLeftColumn()}
          </div>

          {/* Cột phải (55% ~ 6.6 -> 7 cols) */}
          <div className="col-span-12 lg:col-span-7">
            {renderRightColumn()}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MOBILE APP VIEW (VERTICAL SCROLL)
  // ==========================================
  return (
    <div className="w-full flex flex-col min-h-full p-4 pb-28 gap-4">
      {renderLeftColumn()}
      {renderRightColumn()}
    </div>
  );
};
