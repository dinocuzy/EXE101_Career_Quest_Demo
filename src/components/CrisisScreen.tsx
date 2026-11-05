import React from 'react';
import { useGameStore } from '../store/gameStore';
import { AlertOctagon, Clock, ShieldAlert, Award, Check } from 'lucide-react';
import { CRISIS_MAIN_SKILL, findTieBreakerPlayer } from '../engine/coopEngine';
import { SKILL_METADATA } from './SkillChip';

export const CrisisScreen: React.FC = () => {
  const {
    coopCrisis,
    coopCrisisTimer,
    coopCrisisVotes,
    coopVoteCrisis,
    coopPlayers,
  } = useGameStore();

  if (!coopCrisis) return null;

  const human = coopPlayers.find((p) => p.isHuman);
  const myVote = coopCrisisVotes.find((v) => v.playerId === human?.id);

  // Tie breaker info
  const tieBreaker = findTieBreakerPlayer(coopCrisis.id, coopPlayers);
  const mainSkillKey = CRISIS_MAIN_SKILL[coopCrisis.id] || 'P';
  const mainSkillMeta = SKILL_METADATA[mainSkillKey];

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col min-h-full p-4 pb-20 bg-rose-950 text-white relative ring-4 ring-rose-500 animate-pulse">
      {/* Red Alert Banner */}
      <div className="text-center pt-2 pb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black uppercase tracking-wider mb-2 shadow-md">
          <AlertOctagon className="w-4 h-4" /> KHỦNG HOẢNG CHUNG BỘ PHẬN
        </div>

        <h2 className="text-xl font-black text-rose-100 leading-tight">
          {coopCrisis.title}
        </h2>

        {/* 3:00 Discussion Timer */}
        <div className="inline-flex items-center gap-1.5 bg-rose-900/80 border border-rose-400/40 px-3 py-1 rounded-full text-xs font-mono font-bold text-rose-200 mt-2">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>Thời gian thảo luận: {formatTimer(coopCrisisTimer)}</span>
        </div>
      </div>

      {/* Tie Breaker Decision Badge */}
      <div className="bg-rose-900/60 border border-rose-500/50 rounded-2xl p-3 mb-3 text-xs text-rose-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white">Quyền Quyết Định nếu hòa phiếu:</span>
            <p className="text-[11px] text-rose-300">
              Gắn kỹ năng {mainSkillMeta.name} ({mainSkillKey}) → <strong>{tieBreaker.name}</strong> ({tieBreaker.skills[mainSkillKey]}/10)
            </p>
          </div>
        </div>
        <span className="text-xl">{tieBreaker.avatar}</span>
      </div>

      {/* Crisis Description */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-xs text-rose-100 mb-4 leading-relaxed">
        {coopCrisis.text}
      </div>

      {/* 3 Options to Vote */}
      <div className="space-y-3 mb-4">
        <p className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
          Chọn phương án ứng phó của đội (Bỏ phiếu tập thể):
        </p>

        {coopCrisis.options.map((opt) => {
          const isSelected = myVote?.optionKey === opt.key;
          const votersForThis = coopCrisisVotes.filter((v) => v.optionKey === opt.key);

          return (
            <div
              key={opt.key}
              onClick={() => !myVote && coopVoteCrisis(opt.key)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-rose-900/90 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-rose-900/40 border-rose-800 hover:border-rose-600'
              } ${myVote ? 'cursor-default' : 'active:scale-[0.98]'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-amber-400 text-amber-950' : 'bg-rose-800 text-rose-200'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="text-xs font-bold text-white">Phương án {opt.key}</span>
                </div>

                {/* Expected impact */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                  {opt.fx.health && opt.fx.health !== 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        opt.fx.health > 0 ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-800 text-rose-300'
                      }`}
                    >
                      VH {opt.fx.health > 0 ? `+${opt.fx.health}` : opt.fx.health}
                    </span>
                  )}
                  {opt.fx.budget && opt.fx.budget !== 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        opt.fx.budget > 0 ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                      }`}
                    >
                      NS {opt.fx.budget > 0 ? `+${opt.fx.budget}` : opt.fx.budget}%
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-rose-100 leading-snug mb-2">{opt.text}</p>

              {/* Voter avatars who voted for this option */}
              <div className="flex items-center justify-between pt-2 border-t border-rose-800/80 text-[10px]">
                <span className="text-rose-300 font-medium">
                  {votersForThis.length} phiếu bầu
                </span>
                <div className="flex items-center -space-x-1">
                  {votersForThis.map((v) => (
                    <div
                      key={v.playerId}
                      className="w-5 h-5 rounded-full bg-slate-800 border border-white flex items-center justify-center text-xs shadow-xs"
                      title={v.playerName}
                    >
                      {v.avatar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {myVote ? (
        <div className="flex items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/10 text-xs text-emerald-300 font-bold border border-white/10">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Bạn đã bỏ phiếu cho Phương án {myVote.optionKey}. Đang đợi các thành viên còn lại...</span>
        </div>
      ) : (
        <p className="text-center text-[11px] text-rose-300 italic">
          Bấm vào 1 phương án ở trên để bỏ phiếu cho đội của bạn
        </p>
      )}
    </div>
  );
};
