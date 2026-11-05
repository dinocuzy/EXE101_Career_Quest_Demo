import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { evaluateCoopTeam, determineCoopTitle } from '../engine/coopEngine';
import { RadarResult } from '../components/RadarResult';
import { fireCelebrationConfetti } from '../components/Confetti';
import {
  RotateCcw,
  Home,
  Award,
  Users,
  Activity,
  DollarSign,
  HeartHandshake,
  Send,
  CheckCircle2,
  Puzzle,
  MessageSquare,
  Compass,
  Anchor,
  ShieldCheck,
} from 'lucide-react';

const COOP_TITLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'The Strategist': Puzzle,
  'The Diplomat': MessageSquare,
  'The Innovator': Compass,
  'The Anchor': Anchor,
  'The Guardian': ShieldCheck,
};

export const CoopSummaryScreen: React.FC = () => {
  const {
    coopHealth,
    coopBudget,
    coopPlayers,
    coopStatsTracker,
    restartCoop,
    setScreen,
  } = useGameStore();

  const [activePlayerIdx, setActivePlayerIdx] = useState(0);

  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  const teamEval = evaluateCoopTeam(coopHealth, coopBudget);
  const currentPlayer = coopPlayers[activePlayerIdx] || coopPlayers[0];
  const playerTitle = currentPlayer ? determineCoopTitle(currentPlayer.skills) : null;

  return (
    <div className="w-full flex flex-col min-h-full p-4 pb-24 gap-4">
      {/* Team Evaluation Badge */}
      <div className={`rounded-3xl p-5 text-center border-2 shadow-sm ${teamEval.bg}`}>
        <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 inline-block mb-2 shadow-2xs">
          Xếp Loại Hoạt Động Ca Trực Co-op
        </span>

        <h2 className={`text-2xl font-black ${teamEval.color} mb-1`}>
          Đội Ngũ {teamEval.rating}
        </h2>

        <p className="text-xs text-slate-700 leading-relaxed max-w-xs mx-auto">
          {teamEval.desc}
        </p>

        {/* Global End Indicators */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/80 text-xs">
          <div className="bg-white/90 p-2.5 rounded-2xl flex items-center justify-between border border-slate-100 shadow-2xs">
            <span className="text-slate-500 font-medium">Vận hành cuối:</span>
            <span className="font-black text-slate-900 font-mono">{coopHealth}/10</span>
          </div>
          <div className="bg-white/90 p-2.5 rounded-2xl flex items-center justify-between border border-slate-100 shadow-2xs">
            <span className="text-slate-500 font-medium">Ngân sách còn:</span>
            <span className="font-black text-[#5B25F5] font-mono">{coopBudget}%</span>
          </div>
        </div>
      </div>

      {/* Team Cooperation Stats Card */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#5B25F5] mb-3 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#5B25F5]" />
          Thống Kê Vận Hành Toàn Đội
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <span className="text-lg font-black text-slate-900">
              {coopStatsTracker.situationsHandled}
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Tình huống xử lý</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <span className="text-lg font-black text-emerald-600">
              {coopStatsTracker.helpsGiven}
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Lượt giúp đỡ</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <span className="text-lg font-black text-amber-600">
              {coopStatsTracker.backlogsPushed}
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">Backlog đã đẩy</p>
          </div>
        </div>
      </div>

      {/* Carousel Selector for 4 Players' Radar Charts */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Biểu Đồ Năng Lực Từng Thành Viên
        </h3>

        {/* 4 Tabs for 4 Players */}
        <div className="grid grid-cols-4 gap-1.5 mb-3 bg-slate-100 p-1 rounded-2xl">
          {coopPlayers.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePlayerIdx(idx)}
              className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center cursor-pointer ${
                activePlayerIdx === idx
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-sm">{p.avatar}</span>
              <span className="text-[10px] truncate w-full text-center">
                {p.name.replace(' (Host)', '')}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Player Title & Role Badge */}
        {currentPlayer && playerTitle && (
          <div className="bg-[#F2EEF9] border border-[#E5DFFA] rounded-2xl p-3.5 mb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-[#5B25F5] uppercase tracking-wider">
                Danh hiệu Co-op ({currentPlayer.role.name})
              </span>
              <h4 className="text-sm font-black text-[#18181B] flex items-center gap-1.5 mt-0.5">
                <div className="w-5 h-5 rounded-md bg-[#C8F932] flex items-center justify-center text-[#18181B]">
                  {React.createElement(COOP_TITLE_ICONS[playerTitle.title] || Award, { className: 'w-3.5 h-3.5 stroke-[2.2]' })}
                </div>
                <span>{playerTitle.title}</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                {playerTitle.desc}
              </p>
            </div>
            <span className="text-2xl">{currentPlayer.avatar}</span>
          </div>
        )}

        {/* Radar Chart */}
        {currentPlayer && <RadarResult skills={currentPlayer.skills} />}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 mt-2">
        <button
          type="button"
          onClick={restartCoop}
          className="w-full min-h-[50px] bg-[#C8F932] hover:bg-[#d5fc4e] active:scale-[0.97] text-[#18181B] font-black rounded-2xl shadow-sm text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-black/10"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Tạo ca trực Co-op mới</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('landing')}
          className="w-full min-h-[46px] bg-white hover:bg-slate-50 text-[#18181B] font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-[#E5DFFA]"
        >
          <Home className="w-4 h-4" />
          <span>Quay lại trang chủ</span>
        </button>
      </div>
    </div>
  );
};
