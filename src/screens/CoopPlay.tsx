import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import {
  Heart,
  Coins,
  Lock,
  ArrowRight,
  Zap,
  Activity,
  DollarSign,
  AlertTriangle,
  Send,
  Users2,
  Coffee,
} from 'lucide-react';
import { PlayerStrip } from '../components/PlayerStrip';
import { StakeholderCard } from '../components/StakeholderCard';
import { CrisisScreen } from '../components/CrisisScreen';
import { CoopTokenModal } from '../components/CoopTokenModal';
import { CoopOvertimeModal } from '../components/CoopOvertimeModal';

export const CoopPlayScreen: React.FC = () => {
  const {
    coopPhase,
    coopClock,
    coopSpeed,
    setCoopSpeed,
    coopHealth,
    coopBudget,
    coopPlayers,
    coopTick,
    coopHumanResolveCard,
    openCoopTokenModal,
    coopRippleNotification,
    isFastDemoMode,
  } = useGameStore();

  // Master Clock ticker
  useEffect(() => {
    const interval = setInterval(() => {
      coopTick(1);
    }, 1000);
    return () => clearInterval(interval);
  }, [coopTick]);

  // If in Crisis Phase, render CrisisScreen
  if (coopPhase === 'crisis') {
    return <CrisisScreen />;
  }

  const human = coopPlayers.find((p) => p.isHuman);
  const currentCard = human?.currentSituation;

  const formatClock = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isCostlyLocked = coopBudget < 20;
  const isGoodwillLow = (human?.goodwill || 0) <= 1;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col min-h-full p-3 sm:p-4 pb-28 relative">
      {/* HUD TẦNG 1: CHỈ SỐ CHUNG BỘ PHẬN */}
      <div className="bg-slate-900 text-white rounded-3xl p-3.5 shadow-md -mx-1 mb-2.5">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
              Thời Gian Ca Trực Co-op
            </span>
            <div className="text-xl font-black font-mono text-white tracking-wider flex items-center gap-2">
              <span>{formatClock(coopClock)}</span>
              {isFastDemoMode && (
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-sans font-bold">
                  Demo
                </span>
              )}
            </div>
          </div>

          {/* Speed Buttons: x1, x3, x4 */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            {([1, 3, 4] as const).map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setCoopSpeed(spd)}
                className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  coopSpeed === spd
                    ? 'bg-[#5B25F5] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Tốc độ ×${spd}`}
              >
                ×{spd}
              </button>
            ))}
          </div>
        </div>

        {/* Global Health (Vận hành) and Budget (Ngân sách) */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Health */}
          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-300 flex items-center gap-1 text-[11px]">
                <Activity className="w-3.5 h-3.5 text-[#C8F932]" /> Vận hành
              </span>
              <span
                className={`font-black font-mono text-xs ${
                  coopHealth <= 3 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                }`}
              >
                {coopHealth}/10
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  coopHealth <= 3 ? 'bg-rose-500' : 'bg-[#5B25F5]'
                }`}
                style={{ width: `${(coopHealth / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Budget */}
          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-300 flex items-center gap-1 text-[11px]">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Ngân sách
              </span>
              <span
                className={`font-black font-mono text-xs ${
                  isCostlyLocked ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                }`}
              >
                {coopBudget}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isCostlyLocked ? 'bg-rose-500' : 'bg-amber-400'
                }`}
                style={{ width: `${coopBudget}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* HUD TẦNG 2: CHỈ SỐ CÁ NHÂN */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2 mb-3">
        {/* Goodwill (5 Hearts) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-500">Thiện cảm:</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((heartIdx) => (
              <Heart
                key={heartIdx}
                className={`w-3.5 h-3.5 ${
                  heartIdx <= (human?.goodwill || 0)
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-slate-300 fill-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tokens & Use Button */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
            <Coins className="w-3 h-3 text-amber-500" />
            <span>Token ×{human?.tokens || 0}</span>
          </span>

          <button
            type="button"
            onClick={openCoopTokenModal}
            disabled={(human?.tokens || 0) <= 0 || isGoodwillLow}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              (human?.tokens || 0) > 0 && !isGoodwillLow
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-2xs active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
            title={isGoodwillLow ? 'Thiện cảm ≤ 1: Bị khóa hỗ trợ' : 'Mời đồng đội hỗ trợ'}
          >
            <Users2 className="w-3 h-3" />
            <span>Dùng Token</span>
          </button>
        </div>
      </div>

      {/* Ripple Effect Toast / Notification */}
      {coopRippleNotification && (
        <div className="bg-amber-100/95 border-2 border-amber-400 text-amber-950 p-2.5 rounded-2xl mb-3 text-xs shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="text-base">{coopRippleNotification.fromAvatar}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-base">{coopRippleNotification.toAvatar}</span>
            <span className="font-semibold text-[11px]">
              {coopRippleNotification.fromPlayerName} đẩy việc sang {coopRippleNotification.toPlayerName}!
            </span>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded">
            Phát sinh!
          </span>
        </div>
      )}

      {/* HUMAN SITUATION PLAY AREA */}
      {currentCard ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              {human?.isHighDemand ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>CAO ĐIỂM (Rút 70% thời gian)</span>
                </>
              ) : (
                <span>Tình huống ca trực</span>
              )}
            </span>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              {Math.round(human?.timeRemaining || 0)}s
            </span>
          </div>

          <StakeholderCard stakeholder={currentCard.stakeholder} />

          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs">
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {currentCard.text}
            </p>
          </div>

          {/* 3 Choice Buttons */}
          <div className="space-y-2 mt-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Bạn xử lý thế nào?
            </p>

            {currentCard.options.map((option) => {
              const isLocked = isCostlyLocked && option.fx.costly;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => !isLocked && coopHumanResolveCard(option.key)}
                  disabled={isLocked}
                  className={`w-full min-h-[54px] p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 active:scale-[0.98] cursor-pointer ${
                    isLocked
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-white border-[#E5DFFA] hover:border-[#5B25F5] shadow-2xs'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {option.key}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {option.text}
                    </p>
                    {isLocked && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-500 mt-1">
                        <Lock className="w-3 h-3" /> Tốn ngân sách (Khóa khi NS &lt; 20%)
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Idle waiting state */
        <div className="bg-white rounded-[28px] p-8 border border-[#E5DFFA] shadow-xs text-center my-6 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center mb-3 shadow-2xs border border-[#E5DFFA]">
            <Coffee className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            Bạn đã giải quyết xong tình huống!
          </h3>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            Hệ thống đang điều phối sự cố tiếp theo. Hãy quan sát đồng đội ở dải bên dưới để hỗ trợ kịp thời!
          </p>
        </div>
      )}

      {/* FIXED BOTTOM PLAYER STRIP */}
      <div className="fixed bottom-0 left-0 right-0 p-3 max-w-xl mx-auto bg-gradient-to-t from-white via-white/95 to-transparent pt-4 z-20">
        <PlayerStrip players={coopPlayers} />
      </div>

      {/* Global Modals */}
      <CoopTokenModal />
      <CoopOvertimeModal />
    </div>
  );
};
