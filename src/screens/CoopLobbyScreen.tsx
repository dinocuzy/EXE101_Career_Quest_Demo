import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useGameStore } from '../store/gameStore';
import {
  ArrowLeft,
  Copy,
  Users,
  QrCode,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  CheckCircle2,
  Star,
  Check,
  Crown,
  BellRing,
  Compass,
  ClipboardCheck,
  UtensilsCrossed,
  Building2,
} from 'lucide-react';
import { Role } from '../types/game';
import { SkillChip } from '../components/SkillChip';

const ROLE_LUCIDE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  receptionist: BellRing,
  tour_guide: Compass,
  event_planner: ClipboardCheck,
  fb_manager: UtensilsCrossed,
};

export const CoopLobbyScreen: React.FC = () => {
  const {
    setScreen,
    coopRoomCode,
    coopPlayers,
    pack,
    coopSelectedRole,
    setCoopSelectedRole,
    startCoopGame,
    isFastDemoMode,
    toggleFastDemoMode,
    addToast,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');
  const [joinPin, setJoinPin] = useState(['', '', '', '', '', '']);

  const handleCopyPin = async () => {
    try {
      await navigator.clipboard.writeText(coopRoomCode);
      addToast(`Đã sao chép mã phòng PIN: ${coopRoomCode}`, 'success');
    } catch {
      addToast(coopRoomCode, 'info');
    }
  };

  const handleFakeQrScan = () => {
    addToast('Chức năng quét mã camera đang chuẩn bị. Bạn có thể nhập mã PIN trực tiếp!', 'info');
  };

  const isReadyToStart =
    coopPlayers.length === 4 &&
    new Set(coopPlayers.map((p) => p.role.id)).size === 4;

  const handleJoinPinInput = (idx: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const nextPin = [...joinPin];
    nextPin[idx] = val;
    setJoinPin(nextPin);

    // Auto focus next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`pin-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleConfirmJoin = () => {
    const fullPin = joinPin.join('');
    if (fullPin.length < 6) {
      addToast('Vui lòng nhập đủ 6 chữ số mã PIN!', 'warning');
      return;
    }
    addToast(`Đã vào phòng ${fullPin} thành công!`, 'success');
    setActiveTab('create');
  };

  return (
    <div className="w-full flex flex-col min-h-full p-4 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setScreen('mode_select')}
            className="w-10 h-10 rounded-2xl bg-white border border-[#E5DFFA] flex items-center justify-center text-[#18181B] shadow-2xs active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#18181B] leading-tight flex items-center gap-1.5">
              <span>Phòng Chờ Co-op 4 Người</span>
              <span className="text-[10px] bg-[#C8F932] text-[#18181B] px-2 py-0.5 rounded-full font-black">
                Mô Phỏng
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Hợp lực vận hành ca trực khách sạn</p>
          </div>
        </div>

        {/* Demo Mode Toggle Button */}
        <button
          type="button"
          onClick={toggleFastDemoMode}
          className={`px-3 py-1.5 rounded-xl border text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer ${
            isFastDemoMode
              ? 'bg-[#C8F932] text-[#18181B] border-black/10 shadow-xs'
              : 'bg-white text-slate-600 border-[#E5DFFA] hover:bg-slate-50'
          }`}
          title="Rút ngắn thời gian ca để trình diễn"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
          <span>{isFastDemoMode ? 'Demo 2 phút' : 'Ca 20 phút'}</span>
        </button>
      </div>

      {/* 2 Tabs: Tạo phòng / Nhập mã */}
      <div className="grid grid-cols-2 p-1.5 bg-[#E5DFFA]/60 rounded-2xl mb-4 text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setActiveTab('create')}
          className={`py-2 rounded-xl transition-all cursor-pointer font-black ${
            activeTab === 'create'
              ? 'bg-white text-[#18181B] shadow-xs'
              : 'hover:text-[#18181B]'
          }`}
        >
          Phòng của bạn (Host)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('join')}
          className={`py-2 rounded-xl transition-all cursor-pointer font-black ${
            activeTab === 'join'
              ? 'bg-white text-[#18181B] shadow-xs'
              : 'hover:text-[#18181B]'
          }`}
        >
          Nhập mã PIN phòng
        </button>
      </div>

      {activeTab === 'join' ? (
        /* Tab Nhập Mã PIN */
        <div className="bg-white rounded-[28px] p-6 border border-[#E5DFFA] shadow-xs text-center mb-4">
          <h3 className="text-sm font-black text-[#18181B] mb-1">
            Nhập Mã PIN 6 Chữ Số
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Hỏi người tạo phòng mã PIN hiển thị trên màn hình của họ
          </p>

          <div className="flex justify-center gap-2 mb-4">
            {joinPin.map((digit, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleJoinPinInput(i, e.target.value)}
                className="w-10 h-12 text-center text-lg font-black font-mono border-2 border-[#E5DFFA] rounded-xl focus:outline-none focus:border-[#5B25F5] focus:ring-2 focus:ring-[#5B25F5]/20"
              />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleConfirmJoin}
              className="w-full py-3 bg-[#5B25F5] hover:bg-[#4d1ed3] text-white text-xs font-black rounded-xl transition-all"
            >
              Vào phòng ngay
            </button>
            <button
              type="button"
              onClick={handleFakeQrScan}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#18181B] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Quét mã QR phòng</span>
            </button>
          </div>
        </div>
      ) : (
        /* Tab Tạo Phòng (Lobby) */
        <div className="space-y-3.5 mb-4">
          {/* Room PIN & QR Card */}
          <div className="bg-[#5B25F5] text-white rounded-[28px] p-5 shadow-md flex items-center justify-between border border-[#E5DFFA] relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-black text-[#C8F932] tracking-wider">
                Mã PIN Tham Gia
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-3xl font-black font-mono tracking-widest text-white">
                  {coopRoomCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPin}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                  title="Sao chép PIN"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-white/80 mt-1 font-medium">
                Quét mã hoặc chia sẻ PIN cho đồng đội
              </p>
            </div>

            {/* QR Box */}
            <div className="bg-white p-2.5 rounded-2xl shadow-sm shrink-0 border border-white/20 relative z-10">
              <QRCodeSVG
                value={`CAREERQUEST_COOP_ROOM_${coopRoomCode}`}
                size={68}
                level="M"
              />
            </div>
          </div>

          {/* 4 Player Slots */}
          <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#5B25F5]">
                Thành viên phòng ({coopPlayers.length}/4)
              </h3>
              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#5B25F5]" />
                {coopPlayers.length === 4 ? 'Đã đủ đội hình' : 'Đang đợi người vào...'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[0, 1, 2, 3].map((slotIdx) => {
                const player = coopPlayers[slotIdx];

                if (!player) {
                  return (
                    <div
                      key={slotIdx}
                      className="p-3 rounded-2xl border-2 border-dashed border-[#E5DFFA] flex items-center gap-2.5 text-slate-400 bg-[#F2EEF9]/30"
                    >
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs animate-pulse">
                        ⌛
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-400">Đang vào...</p>
                        <p className="text-[10px] text-slate-300">Slot trống</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={player.id}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${
                      player.isHuman
                        ? 'bg-[#F2EEF9] border-[#5B25F5] ring-2 ring-[#5B25F5]/30 shadow-xs'
                        : 'bg-white border-[#E5DFFA]'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-white border border-[#E5DFFA] flex items-center justify-center text-lg shadow-2xs">
                        {player.avatar}
                      </div>
                      {player.isHuman && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8F932] border border-black/10 rounded-full flex items-center justify-center text-[#18181B]">
                          <Crown className="w-2.5 h-2.5 fill-current" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-[#18181B] truncate">
                        {player.name}
                      </p>
                      <span className="text-[10px] font-bold text-[#5B25F5] block truncate">
                        {player.role.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Role Picker for Human Player */}
          <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#5B25F5] mb-3">
              Chọn vị trí của bạn trong ca trực
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {pack.roles.map((role) => {
                const isSelectedByHuman = coopSelectedRole?.id === role.id;
                const takenBot = coopPlayers.find(
                  (p) => !p.isHuman && p.role.id === role.id
                );
                const RoleIcon = ROLE_LUCIDE_ICONS[role.id] || Building2;

                return (
                  <div
                    key={role.id}
                    onClick={() => setCoopSelectedRole(role)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative select-none ${
                      isSelectedByHuman
                        ? 'bg-[#F2EEF9] border-[#5B25F5] shadow-xs'
                        : 'bg-white border-[#E5DFFA] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-[#5B25F5]/10 text-[#5B25F5] flex items-center justify-center">
                        <RoleIcon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      {isSelectedByHuman && (
                        <span className="w-4 h-4 rounded-full bg-[#5B25F5] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </span>
                      )}
                      {takenBot && !isSelectedByHuman && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-[#E5DFFA]">
                          <span>{takenBot.avatar}</span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-xs font-black text-[#18181B] leading-snug">
                      {role.name}
                    </h4>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {role.topSkills.map((sk) => (
                        <SkillChip key={sk} skill={sk} size="sm" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Start Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-[430px] mx-auto bg-gradient-to-t from-[#F2EEF9] via-[#F2EEF9]/95 to-transparent pt-6 pointer-events-none z-20">
        <button
          type="button"
          onClick={startCoopGame}
          disabled={!isReadyToStart}
          className={`w-full min-h-[52px] font-black rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer select-none pointer-events-auto ${
            isReadyToStart
              ? 'bg-[#C8F932] hover:bg-[#d5fc4e] active:scale-[0.97] text-[#18181B] border border-black/10'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>
            {isReadyToStart
              ? `Bắt đầu ca trực Co-op (${isFastDemoMode ? 'Demo 2p' : '20p'})`
              : 'Đang đợi đủ 4 vị trí...'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
