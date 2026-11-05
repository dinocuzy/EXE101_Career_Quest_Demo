import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Zap, Star, Clock, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { RuangPillButton, LimeAsterisk, LimeSparkle } from '../components/RuangMotifs';
import { RoleIconBadge } from '../components/RoleIconBadge';

export const ShiftIntroScreen: React.FC = () => {
  const { selectedRole, setScreen, startSoloShift, landingViewMode } = useGameStore();

  if (!selectedRole) {
    setScreen('role_pick');
    return null;
  }

  const handleStartShift = () => {
    startSoloShift();
  };

  const isWeb = landingViewMode === 'website';

  return (
    <div
      className={`w-full flex flex-col min-h-full ${
        isWeb
          ? 'max-w-4xl mx-auto py-10 px-8 bg-gradient-to-br from-[#5B25F5] via-[#481bcc] to-[#240c75] text-white rounded-[36px] shadow-2xl border-2 border-violet-400/30'
          : 'bg-gradient-to-b from-[#5B25F5] via-[#481bcc] to-[#240c75] text-white p-5 pb-8 justify-between min-h-full'
      }`}
    >
      <div>
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          {!isWeb && (
            <button
              type="button"
              onClick={() => setScreen('role_pick')}
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <span className="text-xs font-mono font-black text-[#18181B] bg-[#C8F932] px-3.5 py-1 rounded-full border border-[#b2e817] shadow-xs">
            MÔ PHỎNG CA TRỰC 24H
          </span>
          {isWeb && (
            <span className="text-xs font-bold text-violet-200">
              Bước 3 / Chuẩn bị nhận ca
            </span>
          )}
        </div>

        {/* Selected Role Header */}
        <div className="text-center my-6 relative">
          <div className="absolute right-6 top-0 hidden sm:block">
            <LimeSparkle className="w-6 h-6 text-[#C8F932]" />
          </div>
          <div className="mx-auto mb-4 flex justify-center">
            <RoleIconBadge roleId={selectedRole.id} size="xl" variant="gradient" showGlow />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {selectedRole.name}
          </h2>
          <p className="text-sm text-violet-100 max-w-md mx-auto mt-2 leading-relaxed font-normal">
            {selectedRole.desc}
          </p>
        </div>

        {/* 2 Starting Stats + 3 Survival Rules in Grid for Web */}
        <div className={`grid ${isWeb ? 'grid-cols-2 gap-6 my-6' : 'grid-cols-1 gap-4 mb-4'}`}>
          {/* Starting Stats Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-[28px] p-6 border border-white/15 flex flex-col justify-between">
            <div>
              <p className="text-xs font-black text-[#C8F932] uppercase tracking-wider mb-2">
                Chỉ số xuất phát điểm
              </p>
              <p className="text-xs text-violet-100 mb-4 leading-relaxed font-medium">
                Trong suốt ca làm việc, mọi quyết định bạn đưa ra đều tác động trực tiếp lên 2 chỉ số này:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8F932] text-[#18181B] flex items-center justify-center font-black">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-[11px] text-violet-200 font-bold uppercase tracking-wider">Năng lượng</p>
                  <p className="text-xl font-black text-white">10/10</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-[11px] text-violet-200 font-bold uppercase tracking-wider">Uy tín nghề</p>
                  <p className="text-xl font-black text-white">5/10</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Rules Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-[28px] p-6 border border-white/15 space-y-3 flex flex-col justify-between">
            <p className="text-xs font-black text-[#C8F932] uppercase tracking-wider mb-1">
              3 quy tắc sinh tồn trong ca trực
            </p>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-rose-500/30 text-rose-200 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                1
              </div>
              <p className="text-xs text-violet-50 leading-snug font-medium">
                <strong className="text-rose-300 font-bold">Năng lượng ≤ 0:</strong> Bạn sẽ kiệt sức (Burnout) và phải dừng ca giữa chừng.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-amber-500/30 text-amber-200 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                2
              </div>
              <p className="text-xs text-violet-50 leading-snug font-medium">
                <strong className="text-amber-300 font-bold">Uy tín ≤ 0:</strong> Bạn sẽ bị thôi việc vì gây bức xúc cho khách hàng & đồng nghiệp.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#C8F932]/30 text-[#C8F932] border border-[#C8F932]/40 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                3
              </div>
              <p className="text-xs text-violet-50 leading-snug font-medium">
                <strong className="text-[#C8F932] font-bold">Vượt qua 6 tình huống:</strong> Bạn nhận danh hiệu cùng Biểu đồ Radar 5 năng lực và Báo cáo AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-6 border-t border-white/15 flex items-center justify-between">
        <span className="hidden sm:inline text-xs text-violet-200 font-medium">
          Thời lượng ca trực: ~12-15 phút • Tự do dừng ca bất kỳ lúc nào
        </span>

        <RuangPillButton variant="lime" size="lg" className="w-full sm:w-auto" onClick={handleStartShift}>
          Bắt Đầu Vào Ca Trực 24h
        </RuangPillButton>
      </div>
    </div>
  );
};
