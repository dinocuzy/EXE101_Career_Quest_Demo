import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { ProgressStepper } from '../components/ProgressStepper';
import { StatBar } from '../components/StatBar';
import { StakeholderCard } from '../components/StakeholderCard';
import { SituationCard } from '../components/SituationCard';
import { ChoiceButton } from '../components/ChoiceButton';
import { FeedbackSheet } from '../components/FeedbackSheet';
import { SkillScoreboardHUD } from '../components/SkillScoreboardHUD';
import { Users2, Check, ArrowRight, Sparkles, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

export const SoloPlayScreen: React.FC = () => {
  const {
    soloCards,
    cardIndex,
    stats,
    shiftHour,
    selectedOptionKey,
    selectOption,
    confirmChoice,
    requestColleagueHelp,
    colleagueHelpsLeft,
    feedbackSheetOpen,
    activeFeedback,
    dismissFeedbackAndContinue,
    addToast,
    isPremium,
    isPaywallOpen,
    openPaywall,
    landingViewMode,
  } = useGameStore();

  const [isUrgent, setIsUrgent] = useState(false);
  const currentCard = soloCards[cardIndex];
  const isWeb = landingViewMode === 'website';

  // Enforce Freemium gating: card 3+ (index 2+) requires premium
  useEffect(() => {
    if (cardIndex >= 2 && !isPremium && !isPaywallOpen && !feedbackSheetOpen) {
      openPaywall();
    }
  }, [cardIndex, isPremium, isPaywallOpen, feedbackSheetOpen, openPaywall]);

  if (!currentCard) {
    return null;
  }

  // Handle timer expire
  const handleTimerExpire = () => {
    if (feedbackSheetOpen || isPaywallOpen) return;

    addToast('Hết giờ! Tình huống đã bị dồn ứ giải quyết bị động.', 'error');

    const badOption =
      currentCard.options.find((o) => o.quality === 'bad') ||
      currentCard.options[currentCard.options.length - 1];
    selectOption(badOption.key);

    setTimeout(() => {
      confirmChoice();
    }, 250);
  };

  const handleTick = (remaining: number) => {
    setIsUrgent(remaining <= 10 && remaining > 0);
  };

  const isLastCard = cardIndex === soloCards.length - 1;
  const isBlurred = cardIndex >= 2 && !isPremium;

  // ==========================================
  // WEBSITE DESKTOP VIEW (SPLIT-SCREEN 5:7)
  // ==========================================
  if (isWeb) {
    return (
      <div
        className={`w-full max-w-7xl mx-auto py-4 transition-all ${
          isUrgent && !isBlurred ? 'ring-4 ring-rose-500/80 rounded-3xl p-2 animate-pulse' : ''
        }`}
      >
        <div
          className={`grid grid-cols-12 gap-6 items-start ${
            isBlurred ? 'filter blur-sm select-none pointer-events-none opacity-50' : ''
          }`}
        >
          {/* CỘT TRÁI (5 / 12 = ~42%): Bảng chỉ số, Điểm kỹ năng & Phản hồi nghiệp vụ */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3 sticky top-16">
            {/* 1. Header HUD & Progress Bar */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E5DFFA] shadow-2xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#18181B] bg-[#C8F932] px-2.5 py-0.5 rounded-full border border-[#b2e817]">
                  Tiến độ ca trực
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{shiftHour}</span>
                </span>
              </div>
              <ProgressStepper
                currentIndex={cardIndex}
                totalCards={soloCards.length}
                shiftHour={shiftHour}
              />
              <div className="pt-1.5 border-t border-slate-100">
                <StatBar energy={stats.energy} rep={stats.rep} />
              </div>
            </div>

            {/* 2. Real-time Skill Scoreboard (Bảng Điểm Kỹ Năng) */}
            <SkillScoreboardHUD
              skills={stats.skills}
              recentGain={activeFeedback?.fx.skills}
            />

            {/* 3. KHU VỰC PHẢN HỒI NGHIỆP VỤ ĐẶT NGAY DƯỚI ĐIỂM KỸ NĂNG */}
            {feedbackSheetOpen && activeFeedback ? (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#5B25F5] shadow-lg animate-in fade-in slide-in-from-top-3 duration-300 flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeFeedback.quality === 'good' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Xử lý tối ưu
                      </span>
                    )}
                    {activeFeedback.quality === 'ok' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Chấp nhận được
                      </span>
                    )}
                    {activeFeedback.quality === 'bad' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        Cần cải thiện
                      </span>
                    )}
                    {activeFeedback.wasColleague && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Đã tham vấn đồng nghiệp
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400">
                    Phản hồi nghiệp vụ
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1 leading-tight">
                    {activeFeedback.title}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {activeFeedback.text}
                  </p>
                </div>

                {/* Score Effects HUD */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-medium block">Năng lượng</span>
                    <span
                      className={`text-xs font-black ${
                        activeFeedback.fx.energy >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {activeFeedback.fx.energy >= 0
                        ? `+${activeFeedback.fx.energy}`
                        : activeFeedback.fx.energy}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-medium block">Uy tín ca trực</span>
                    <span
                      className={`text-xs font-black ${
                        activeFeedback.fx.rep >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {activeFeedback.fx.rep >= 0
                        ? `+${activeFeedback.fx.rep}`
                        : activeFeedback.fx.rep}
                    </span>
                  </div>
                  {activeFeedback.fx.skills &&
                    Object.entries(activeFeedback.fx.skills).map(([sk, val]) => (
                      <div
                        key={sk}
                        className="p-2 rounded-xl bg-[#F2EEF9] border border-[#E5DFFA] text-center"
                      >
                        <span className="text-[10px] text-[#5B25F5] font-black block">
                          Kỹ năng ({sk})
                        </span>
                        <span className="text-xs font-black text-[#18181B]">
                          {val >= 0 ? `+${val}` : val}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Continue CTA */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={dismissFeedbackAndContinue}
                    className="w-full min-h-[44px] px-6 bg-[#C8F932] hover:bg-[#bbf01f] text-[#18181B] font-black rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-[#b2e817]"
                  >
                    <span>{isLastCard ? 'Xem kết quả ca trực' : 'Tiếp tục tình huống kế tiếp'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ) : (
              /* Colleague Help Card khi chưa mở phản hồi */
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Trợ giúp từ đồng nghiệp
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Gợi ý 50/50 • Còn {colleagueHelpsLeft} lần
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={requestColleagueHelp}
                  disabled={colleagueHelpsLeft <= 0 || feedbackSheetOpen || isBlurred}
                  className={`min-h-[38px] px-3.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    colleagueHelpsLeft > 0
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 active:scale-95'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Sử dụng</span>
                </button>
              </div>
            )}
          </div>

          {/* CỘT PHẢI (7 / 12 = ~58%): Tác nhân + Tình huống ở trên, Phương án lựa chọn ở dưới */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-2.5">
            {/* 1. Tác Nhân (Stakeholder) đặt ngay phía trên */}
            <StakeholderCard stakeholder={currentCard.stakeholder} />

            {/* 2. Tình Huống Ca Trực (Situation + Timer) đặt ngay phía trên */}
            <SituationCard
              situation={currentCard}
              onTimerExpire={handleTimerExpire}
              paused={feedbackSheetOpen || isBlurred}
              onTick={handleTick}
            />

            {/* 3. Các Phần Chọn Lựa (Choices A, B, C) */}
            <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E5DFFA] shadow-2xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#5B25F5] uppercase tracking-wider block">
                    Quyết định của bạn
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-[#18181B] mt-0.5">
                    Bạn sẽ giải quyết tình huống này thế nào?
                  </h3>
                </div>
                {selectedOptionKey && !feedbackSheetOpen && (
                  <span className="text-[10px] font-black text-[#18181B] bg-[#C8F932] px-2 py-0.5 rounded-full border border-[#b2e817]">
                    Phương án {selectedOptionKey}
                  </span>
                )}
              </div>

              {/* Options A, B, C */}
              <div className="flex flex-col gap-1.5">
                {currentCard.options.map((option) => (
                  <ChoiceButton
                    key={option.key}
                    option={option}
                    isSelected={selectedOptionKey === option.key}
                    onSelect={() => selectOption(option.key)}
                    disabled={feedbackSheetOpen || isBlurred}
                  />
                ))}
              </div>

              {/* Bottom Actions: Colleague Help Shortcut & Confirm Button */}
              {!feedbackSheetOpen && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 truncate">
                    {selectedOptionKey
                      ? 'Nhấn Xác nhận để xem kết quả và điểm năng lực'
                      : 'Chọn 1 phương án phía trên để xác nhận'}
                  </span>

                  {/* Confirm Button */}
                  <button
                    type="button"
                    onClick={confirmChoice}
                    disabled={!selectedOptionKey || isBlurred}
                    className={`min-h-[40px] px-6 rounded-full font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer select-none shadow-md shrink-0 ${
                      selectedOptionKey && !isBlurred
                        ? 'bg-[#C8F932] hover:bg-[#d5fc4e] text-[#18181B] active:scale-95 border border-black/10'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Xác nhận lựa chọn</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MOBILE APP VIEW (VERTICAL STACK)
  // ==========================================
  return (
    <div
      className={`w-full flex flex-col min-h-full p-4 pb-28 transition-all relative ${
        isUrgent && !isBlurred ? 'ring-4 ring-rose-500/80 animate-pulse' : ''
      }`}
    >
      {/* 1. Fixed Top HUD */}
      <div className="sticky top-0 z-30 bg-[#F2EEF9]/95 backdrop-blur-md pt-1 pb-2 -mx-4 px-4 border-b border-[#E5DFFA] shadow-2xs">
        <ProgressStepper
          currentIndex={cardIndex}
          totalCards={soloCards.length}
          shiftHour={shiftHour}
        />
        <div className="mt-1.5">
          <StatBar energy={stats.energy} rep={stats.rep} />
        </div>
        {/* Compact Mobile Skill Scoreboard */}
        <div className="mt-1.5 pt-1.5 border-t border-violet-200/50">
          <SkillScoreboardHUD
            skills={stats.skills}
            recentGain={activeFeedback?.fx.skills}
            compact={true}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col gap-3.5 mt-3 transition-all duration-300 ${
          isBlurred ? 'filter blur-sm select-none pointer-events-none opacity-50' : ''
        }`}
      >
        {/* 2. Stakeholder Card */}
        <StakeholderCard stakeholder={currentCard.stakeholder} />

        {/* 3. Situation Context + Timer */}
        <SituationCard
          situation={currentCard}
          onTimerExpire={handleTimerExpire}
          paused={feedbackSheetOpen || isBlurred}
          onTick={handleTick}
        />

        {/* 4. Choice Buttons A / B / C */}
        <div className="flex flex-col gap-1.5 mt-0.5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Bạn sẽ giải quyết thế nào?
          </p>

          {currentCard.options.map((option) => (
            <ChoiceButton
              key={option.key}
              option={option}
              isSelected={selectedOptionKey === option.key}
              onSelect={() => selectOption(option.key)}
              disabled={feedbackSheetOpen || isBlurred}
            />
          ))}
        </div>
      </div>

      {/* 5. Sticky Bottom Control Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 max-w-[430px] mx-auto bg-gradient-to-t from-white via-white/95 to-transparent pt-6 pointer-events-none z-20 transition-all ${
          isBlurred ? 'opacity-30 pointer-events-none' : ''
        }`}
      >
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Nút Nhờ đồng nghiệp */}
          <button
            type="button"
            onClick={requestColleagueHelp}
            disabled={colleagueHelpsLeft <= 0 || feedbackSheetOpen || isBlurred}
            className={`flex-1 min-h-[50px] py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] cursor-pointer select-none ${
              colleagueHelpsLeft > 0
                ? 'bg-amber-50 hover:bg-amber-100/80 border-amber-300 text-amber-800 shadow-2xs'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Users2 className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="text-left leading-tight">
              <span>Nhờ đồng nghiệp</span>
              <span className="block text-[10px] text-amber-600/90 font-medium">
                50/50 • còn {colleagueHelpsLeft} lần
              </span>
            </div>
          </button>

          {/* Nút Xác nhận lựa chọn */}
          <button
            type="button"
            onClick={confirmChoice}
            disabled={!selectedOptionKey || feedbackSheetOpen || isBlurred}
            className={`min-h-[50px] py-2.5 px-6 rounded-full font-black text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.97] cursor-pointer select-none shadow-md ${
              selectedOptionKey && !feedbackSheetOpen && !isBlurred
                ? 'bg-[#C8F932] hover:bg-[#bbf01f] text-[#18181B] border border-[#b2e817] shadow-lg shadow-[#C8F932]/30'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Xác nhận</span>
          </button>
        </div>
      </div>

      {/* 6. Feedback Sheet (Mobile) */}
      {activeFeedback && (
        <FeedbackSheet
          isOpen={feedbackSheetOpen}
          title={activeFeedback.title}
          text={activeFeedback.text}
          quality={activeFeedback.quality}
          fx={activeFeedback.fx}
          wasColleague={activeFeedback.wasColleague}
          onContinue={dismissFeedbackAndContinue}
          isLastCard={isLastCard}
        />
      )}
    </div>
  );
};
