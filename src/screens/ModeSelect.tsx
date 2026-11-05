import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, User, Users, Clock, CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';
import { LimeSparkle, CircleArrowButton, RuangPillButton } from '../components/RuangMotifs';

export const ModeSelectScreen: React.FC = () => {
  const { setScreen, initCoopLobby, landingViewMode } = useGameStore();

  const handleSelectSolo = () => {
    setScreen('role_pick');
  };

  const handleSelectCoop = () => {
    initCoopLobby();
  };

  const isWeb = landingViewMode === 'website';

  return (
    <div className={`w-full flex flex-col justify-center min-h-[calc(100vh-80px)] ${isWeb ? 'py-4 px-4 max-w-5xl mx-auto' : 'p-3 pb-8'}`}>
      {/* Header */}
      <div className={`flex items-center gap-3 mb-5 ${isWeb ? 'justify-between pb-3 border-b border-[#E5DFFA]' : ''}`}>
        <div className="flex items-center gap-3">
          {!isWeb && (
            <button
              type="button"
              onClick={() => setScreen('landing')}
              className="w-9 h-9 rounded-2xl bg-white border border-[#E5DFFA] flex items-center justify-center text-[#18181B] shadow-2xs active:scale-95 transition-transform cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`${isWeb ? 'text-2xl lg:text-3xl' : 'text-lg'} font-black text-[#18181B] leading-tight`}>
                Chọn Chế Độ Chơi
              </h2>
              <LimeSparkle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8F932]" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Khám phá năng lực qua trải nghiệm thực tập độc lập hoặc hợp lực nhóm 4 người
            </p>
          </div>
        </div>

        {isWeb && (
          <span className="text-xs font-black text-[#18181B] bg-[#C8F932] px-3.5 py-1.5 rounded-full border border-[#b2e817] shadow-xs shrink-0">
            Bước 01 / Chọn Hình Thức
          </span>
        )}
      </div>

      {/* Cards Layout: 2 Columns styled with Full-Bleed Imagery */}
      <div className={`grid ${isWeb ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
        {/* Solo Mode Card */}
        <div
          onClick={handleSelectSolo}
          className={`rounded-[28px] overflow-hidden border-2 border-[#E5DFFA] hover:border-[#5B25F5] bg-white shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col group ${
            isWeb ? 'hover:-translate-y-1' : 'active:scale-[0.98]'
          }`}
        >
          {/* Top Full-bleed Image */}
          <div className="relative h-44 sm:h-48 w-full overflow-hidden">
            <img
              src="/cards/solo_focus.jpg"
              alt="Solo Mode – Thực Tập Sinh 24h"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/90 text-[#5B25F5] backdrop-blur-sm flex items-center gap-1 shadow-xs">
                  <User className="w-3 h-3" />
                  <span>SOLO MODE</span>
                </span>
                <span className="text-[10px] font-bold text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  1 Người
                </span>
              </div>
              <CircleArrowButton variant="white" onClick={handleSelectSolo} />
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
              <span className="text-[10px] font-bold text-[#C8F932] uppercase tracking-wider block mb-0.5">
                Thử Việc Cá Nhân
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-[#C8F932] transition-colors leading-tight">
                Solo – Thực Tập Sinh 24h
              </h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Trực tiếp đối mặt 6 bước ngoặt ca trực. Đưa ra quyết định dưới áp lực thời gian, giữ vững Năng lượng & Uy tín nghề nghiệp để nhận Biểu đồ Năng lực AI.
            </p>

            {/* Features List */}
            <div className="space-y-1.5 py-3 my-3 border-y border-slate-100 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#5B25F5] shrink-0" />
                <span>Thời lượng: 12 – 15 phút (tiết tấu linh hoạt)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B25F5] shrink-0" />
                <span>Quyết định độc lập, bảo mật & cá nhân hóa hồ sơ</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#5B25F5] shrink-0" />
                <span>Radar 5 kỹ năng + Báo cáo phong cách làm việc Gemini AI</span>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                2 tình huống đầu miễn phí
              </span>
              <RuangPillButton variant="lime" size="sm" onClick={handleSelectSolo}>
                Vào ca ngay
              </RuangPillButton>
            </div>
          </div>
        </div>

        {/* Co-op Mode Card */}
        <div
          onClick={handleSelectCoop}
          className={`rounded-[28px] overflow-hidden border-2 border-[#5B25F5] bg-[#5B25F5] text-white shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 flex flex-col group ${
            isWeb ? 'hover:-translate-y-1' : 'active:scale-[0.98]'
          }`}
        >
          {/* Top Full-bleed Image */}
          <div className="relative h-44 sm:h-48 w-full overflow-hidden">
            <img
              src="/cards/team_coop.jpg"
              alt="Co-op Mode – Vận Hành Tập Thể"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#240c75]/95 via-[#5B25F5]/40 to-black/30" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#C8F932] text-[#18181B] flex items-center gap-1 shadow-xs">
                  <Users className="w-3 h-3" />
                  <span>CO-OP 4 NGƯỜI</span>
                </span>
                <span className="text-[10px] font-bold text-violet-200 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  1 Bạn + 3 Bot
                </span>
              </div>
              <CircleArrowButton variant="lime" onClick={handleSelectCoop} />
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
              <span className="text-[10px] font-bold text-[#C8F932] uppercase tracking-wider block mb-0.5">
                Phối Hợp Nhóm
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-[#C8F932] transition-colors leading-tight">
                Co-op – Vận Hành Tập Thể
              </h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 flex flex-col justify-between bg-[#5B25F5]">
            <p className="text-xs text-violet-100 leading-relaxed font-normal">
              Cùng 3 đồng nghiệp bot hợp tác vận hành trơn tru cả bộ phận. Biểu quyết vượt Khủng hoảng chung, trao đổi token trợ giúp và hóa giải hiệu ứng lan truyền công việc.
            </p>

            {/* Features List */}
            <div className="space-y-1.5 py-3 my-3 border-y border-violet-400/30 text-[11px] text-violet-100 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C8F932] shrink-0" />
                <span>Thời lượng: 20 phút (hỗ trợ chế độ Demo 2 phút)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8F932] shrink-0" />
                <span>Khủng hoảng chung theo kịch bản & Quyền Quyết Định</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C8F932] shrink-0" />
                <span>Đo lường năng lực phối hợp & tương trợ nhóm</span>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-bold text-[#C8F932] bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                ⚡ Tốc độ ×1 / ×3 / ×4
              </span>
              <RuangPillButton variant="lime" size="sm" onClick={handleSelectCoop}>
                Vào sảnh chờ
              </RuangPillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
