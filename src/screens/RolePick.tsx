import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Role } from '../types/game';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Building2,
  TrendingUp,
  RotateCw,
  Check,
  Sparkles,
  Flame,
  BrainCircuit,
  MessageSquare,
  ShieldAlert,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { GENSHIN_ROLE_CARDS } from '../data/genshinRoleCards';
import { RuangPillButton, LimeSparkle } from '../components/RuangMotifs';
import { RoleFlipCardModal } from '../components/RoleFlipCardModal';
import { RoleIconBadge } from '../components/RoleIconBadge';

const ROLE_IMAGES: Record<string, string> = {
  LT: '/cards/receptionist_real.jpg',
  HD: '/cards/tour_guide_real.jpg',
  DP: '/cards/event_coordinator_real.jpg',
  PV: '/cards/restaurant_server_real.jpg',
};

const SKILL_ICONS: Record<string, React.ReactNode> = {
  C: <MessageSquare className="w-3.5 h-3.5 text-blue-400" />,
  P: <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />,
  A: <Compass className="w-3.5 h-3.5 text-emerald-400" />,
  T: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
  E: <Flame className="w-3.5 h-3.5 text-rose-400" />,
};

export const RolePickScreen: React.FC = () => {
  const { pack, selectedRole, selectRole, setScreen, addToast, landingViewMode } = useGameStore();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [inspectingRole, setInspectingRole] = useState<Role | null>(null);

  const toggleFlip = (roleId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [roleId]: !prev[roleId],
    }));
  };

  const handleSelectRole = (role: Role) => {
    selectRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      addToast('Vui lòng chọn 1 vị trí để thử việc!', 'warning');
      return;
    }
    setScreen('shift_intro');
  };

  const isWeb = landingViewMode === 'website';

  return (
    <div className={`w-full flex flex-col min-h-full ${isWeb ? 'py-8 px-4 max-w-6xl mx-auto' : 'p-4 pb-28'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between mb-8 ${isWeb ? 'pb-4 border-b border-[#E5DFFA]' : ''}`}>
        <div className="flex items-center gap-3">
          {!isWeb && (
            <button
              type="button"
              onClick={() => setScreen('mode_select')}
              className="w-10 h-10 rounded-2xl bg-white border border-[#E5DFFA] flex items-center justify-center text-[#18181B] shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`${isWeb ? 'text-3xl' : 'text-xl'} font-black text-[#18181B] leading-tight`}>
                Chọn Vị Trí Thử Việc
              </h2>
              <LimeSparkle className="w-5 h-5 text-[#C8F932]" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Nhấp vào thẻ để chọn vị trí. Lật mặt sau để xem chi tiết mô tả nghiệp vụ và kỹ năng cần có!
            </p>
          </div>
        </div>

        {/* Industry Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8F932] text-[#18181B] text-xs font-black shadow-xs border border-[#b2e817]">
          <Building2 className="w-4 h-4" />
          <span>Ngành: {pack.industryName}</span>
        </div>
      </div>

      {/* Grid: 4 columns on Web, 1 or 2 columns on Mobile */}
      <div className={`grid ${isWeb ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8' : 'grid-cols-1 sm:grid-cols-2 gap-4 mb-6'}`}>
        {pack.roles.map((role) => {
          const isSelected = selectedRole?.id === role.id;
          const isFlipped = !!flippedCards[role.id];
          const detailedData = GENSHIN_ROLE_CARDS[role.id];
          const imageSrc = ROLE_IMAGES[role.id] || detailedData?.characterImg || '/cards/receptionist_real.jpg';

          return (
            <div
              key={role.id}
              className={`w-full ${isWeb ? 'h-[520px]' : 'h-[490px]'} select-none`}
              style={{ perspective: '1200px' }}
            >
              {/* Flip Card Container */}
              <div
                onClick={() => handleSelectRole(role)}
                className="relative w-full h-full cursor-pointer transition-transform duration-500 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* ======================================================== */}
                {/* MẶT ĐẦU TIÊN (FRONT FACE): ẢNH FULL-BLEED + TÊN VAI TRÒ  */}
                {/* ======================================================== */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-[28px] overflow-hidden border-2 transition-all duration-300 flex flex-col ${
                    isSelected
                      ? 'border-[#5B25F5] shadow-2xl ring-4 ring-[#C8F932]/40 -translate-y-1'
                      : 'border-[#E5DFFA] hover:border-[#5B25F5]/60 shadow-md hover:shadow-2xl hover:-translate-y-1'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* ---- Full-bleed image top (takes ~65% of card) ---- */}
                  <div className="relative flex-1 overflow-hidden group">
                    <img
                      src={imageSrc}
                      alt={role.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top-to-mid soft overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

                    {/* Top bar: Role code badge + flip button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span
                        className={`text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-sm ${
                          isSelected
                            ? 'bg-[#C8F932] text-[#18181B]'
                            : 'bg-white/85 text-[#5B25F5]'
                        }`}
                      >
                        <RoleIconBadge roleId={role.id} size="xs" variant="gradient" />
                        <span>VỊ TRÍ #{role.id}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[3] text-[#18181B]" />}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleFlip(role.id, e)}
                        title="Lật xem mô tả & kỹ năng"
                        className="bg-black/40 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer hover:bg-black/60"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Mặt sau</span>
                      </button>
                    </div>

                    {/* Role SVG Icon badge floating */}
                    <div className="absolute top-11 left-3 z-10 mt-1">
                      <RoleIconBadge roleId={role.id} size="md" variant="gradient" showGlow />
                    </div>

                    {/* Bottom of image: role name + EN title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <span className="inline-block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-0.5">
                        {detailedData?.titleEn || 'Professional Role'}
                      </span>
                      <h3 className="text-xl font-black text-white leading-tight drop-shadow-sm">
                        {role.name}
                      </h3>
                    </div>
                  </div>

                  {/* ---- Bottom info panel (takes ~35% of card) ---- */}
                  <div className={`px-4 py-3.5 flex flex-col gap-2.5 ${
                    isSelected ? 'bg-[#5B25F5]' : 'bg-white'
                  }`}>
                    {/* Short description */}
                    <p className={`text-xs leading-relaxed line-clamp-2 font-medium ${
                      isSelected ? 'text-violet-100' : 'text-slate-600'
                    }`}>
                      {role.desc}
                    </p>

                    {/* Key skills chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {role.topSkills?.slice(0, 2).map((sk) => (
                        <span
                          key={sk}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? 'bg-white/15 text-white border-white/25'
                              : 'bg-violet-50 text-[#5B25F5] border-violet-200'
                          }`}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {/* Footer: select status + flip to skills */}
                    <div className={`flex items-center justify-between pt-2 border-t ${
                      isSelected ? 'border-violet-400/30' : 'border-slate-100'
                    }`}>
                      {isSelected ? (
                        <span className="text-xs font-black text-[#C8F932] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã chọn
                        </span>
                      ) : (
                        <span className={`text-xs font-bold ${isSelected ? 'text-violet-200' : 'text-slate-400'}`}>
                          Nhấp để chọn
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => toggleFlip(role.id, e)}
                        className={`text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-[#C8F932] text-[#18181B] border-[#b2e817] hover:bg-[#bbf028]'
                            : 'bg-violet-50 text-[#5B25F5] border-violet-200 hover:bg-violet-100'
                        }`}
                      >
                        <span>Xem kỹ năng</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* MẶT SAU (BACK FACE): MÔ TẢ VAI TRÒ & YÊU CẦU KỸ NĂNG     */}
                {/* ======================================================== */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-[28px] p-5 border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-[#481bcc] text-white border-[#5B25F5] shadow-2xl ring-4 ring-[#C8F932]/35 -translate-y-1'
                      : 'bg-[#FAFAFD] border-[#E5DFFA] hover:border-[#5B25F5]/50 text-[#18181B] shadow-md hover:shadow-xl hover:-translate-y-1'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Top Bar: Role Header & Flip Back */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/10">
                    <div className="flex items-center gap-2.5">
                      <RoleIconBadge roleId={role.id} size="md" variant="gradient" showGlow />
                      <div>
                        <h4 className={`text-sm font-black leading-tight ${isSelected ? 'text-white' : 'text-[#18181B]'}`}>
                          {role.name}
                        </h4>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-violet-200' : 'text-slate-500'}`}>
                          Mô Tả & Kỹ Năng Cốt Lõi
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleFlip(role.id, e)}
                      title="Lật lại mặt trước"
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer border shadow-2xs ${
                        isSelected
                          ? 'bg-[#C8F932] text-[#18181B] border-[#b2e817] hover:bg-[#bbf028]'
                          : 'bg-[#5B25F5] text-white border-[#5B25F5] hover:bg-[#481bcc]'
                      }`}
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Mặt trước</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto pr-1 my-2.5 space-y-3.5 scrollbar-thin">
                    {/* Role Description Quote */}
                    <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                      isSelected
                        ? 'bg-white/10 border-white/20 text-violet-100'
                        : 'bg-white border-violet-100 text-slate-700 shadow-2xs'
                    }`}>
                      <p className="font-medium italic">
                        "{detailedData?.quote || role.desc}"
                      </p>
                    </div>

                    {/* Required Skills Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                          isSelected ? 'text-[#C8F932]' : 'text-[#5B25F5]'
                        }`}>
                          <BrainCircuit className="w-3.5 h-3.5" />
                          Yêu cầu kỹ năng
                        </span>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-violet-300' : 'text-slate-400'}`}>
                          Mức độ trọng tâm
                        </span>
                      </div>

                      <div className="space-y-2">
                        {detailedData?.requiredSkills?.slice(0, 4).map((sk) => (
                          <div key={sk.key} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className={`font-bold flex items-center gap-1.5 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                {SKILL_ICONS[sk.key] || <Sparkles className="w-3.5 h-3.5 text-violet-400" />}
                                <span>{sk.name}</span>
                              </span>
                              <span className={`text-[10px] font-extrabold ${isSelected ? 'text-[#C8F932]' : 'text-[#5B25F5]'}`}>
                                {sk.level * 20}%
                              </span>
                            </div>
                            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-white/20' : 'bg-slate-200'}`}>
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isSelected ? 'bg-[#C8F932]' : 'bg-[#5B25F5]'
                                }`}
                                style={{ width: `${sk.level * 20}%` }}
                              />
                            </div>
                          </div>
                        )) || (
                          <div className="flex flex-wrap gap-1.5">
                            {role.topSkills.map((sk) => (
                              <span
                                key={sk}
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                                  isSelected
                                    ? 'bg-white/15 text-white border-white/20'
                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Workplace Key Stats */}
                    {detailedData?.stats && (
                      <div className={`grid grid-cols-3 gap-1.5 p-2 rounded-xl border text-center ${
                        isSelected ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60'
                      }`}>
                        <div>
                          <div className={`text-[9px] font-bold uppercase ${isSelected ? 'text-violet-300' : 'text-slate-400'}`}>
                            Độ khó
                          </div>
                          <div className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {detailedData.stats.difficulty}/5
                          </div>
                        </div>
                        <div>
                          <div className={`text-[9px] font-bold uppercase ${isSelected ? 'text-violet-300' : 'text-slate-400'}`}>
                            Áp lực
                          </div>
                          <div className={`text-xs font-black text-amber-400`}>
                            {detailedData.stats.stressLevel}/5
                          </div>
                        </div>
                        <div>
                          <div className={`text-[9px] font-bold uppercase ${isSelected ? 'text-violet-300' : 'text-slate-400'}`}>
                            Tương tác
                          </div>
                          <div className={`text-xs font-black text-emerald-400`}>
                            {detailedData.stats.customerInteraction}/5
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Select Role Button on Back Face */}
                  <div className={`pt-3 border-t flex items-center justify-between ${
                    isSelected ? 'border-violet-400/30' : 'border-slate-200'
                  }`}>
                    <button
                      type="button"
                      onClick={() => handleSelectRole(role)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                        isSelected
                          ? 'bg-[#C8F932] text-[#18181B] hover:bg-[#bbf028]'
                          : 'bg-[#5B25F5] text-white hover:bg-[#481bcc]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Đang Chọn Vị Trí Này</span>
                        </>
                      ) : (
                        <>
                          <span>Nhấp Chọn Vị Trí Này</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Locked Industry Card */}
      <div className="bg-white/80 rounded-[28px] p-5 sm:p-6 border border-dashed border-[#E5DFFA] text-slate-500 flex items-center justify-between mb-8 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 border border-white/20">
            <TrendingUp className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#18181B]">
              Ngành Tài chính – Kinh doanh (Business & Finance)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Chuyên viên phân tích dữ liệu, Tư vấn tín dụng doanh nghiệp, Quản trị tài sản
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1.5 shrink-0">
          <Lock className="w-3.5 h-3.5" /> Sắp ra mắt
        </span>
      </div>

      {/* Action Button */}
      <div
        className={`${
          isWeb
            ? 'flex items-center justify-between bg-white p-5 rounded-[28px] border border-[#E5DFFA] shadow-sm'
            : 'fixed bottom-0 left-0 right-0 p-4 max-w-[430px] mx-auto bg-gradient-to-t from-[#F2EEF9] via-[#F2EEF9]/95 to-transparent pt-6 pointer-events-none z-30'
        }`}
      >
        {isWeb && (
          <div className="text-xs text-slate-600 font-medium">
            {selectedRole ? (
              <span>
                Đã chọn vị trí: <strong className="text-[#5B25F5] font-black">{selectedRole.name}</strong> • Sẵn sàng bắt đầu ca trực 24h
              </span>
            ) : (
              <span>Nhấp chọn 1 vị trí nghề nghiệp phía trên để bắt đầu thử việc</span>
            )}
          </div>
        )}

        <div className="pointer-events-auto w-full sm:w-auto">
          <RuangPillButton
            variant="lime"
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleContinue}
            disabled={!selectedRole}
          >
            {selectedRole ? `Nhận Vị Trí ${selectedRole.name}` : 'Chọn 1 Vị Trí Để Tiếp Tục'}
          </RuangPillButton>
        </div>
      </div>

      {/* Optional Fullscreen Modal if user wants extra inspection */}
      {inspectingRole && (
        <RoleFlipCardModal
          role={inspectingRole}
          isOpen={!!inspectingRole}
          onClose={() => setInspectingRole(null)}
          onSelectRole={(r) => {
            handleSelectRole(r);
            setInspectingRole(null);
          }}
          allRoles={pack.roles}
          onSwitchRole={(r) => {
            setInspectingRole(r);
            handleSelectRole(r);
          }}
        />
      )}
    </div>
  );
};
