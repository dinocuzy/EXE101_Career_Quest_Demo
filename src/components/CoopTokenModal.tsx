import React from 'react';
import { useGameStore } from '../store/gameStore';
import { X, Users, Sparkles, Heart } from 'lucide-react';

export const CoopTokenModal: React.FC = () => {
  const {
    coopIsTokenModalOpen,
    closeCoopTokenModal,
    coopPlayers,
    coopUseTokenOnPartner,
  } = useGameStore();

  if (!coopIsTokenModalOpen) return null;

  const human = coopPlayers.find((p) => p.isHuman);
  const bots = coopPlayers.filter((p) => !p.isHuman);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={closeCoopTokenModal}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 border border-amber-200 shadow-2xs">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900">
            Dùng Token Mời Đồng Đội Hỗ Trợ
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Bạn đang có <strong className="text-amber-600">{human?.tokens} Token</strong> • Thiện cảm hiện tại: {human?.goodwill}/5 ❤️
          </p>
        </div>

        <p className="text-xs text-slate-600 mb-3 text-center">
          Chọn 1 đồng đội để cùng giải quyết tình huống (tỷ lệ đồng ý phụ thuộc vào điểm Thiện cảm):
        </p>

        <div className="space-y-2.5 mb-4">
          {bots.map((bot) => (
            <div
              key={bot.id}
              onClick={() => coopUseTokenOnPartner(bot.id)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/90 hover:border-amber-300 transition-all flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                  {bot.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{bot.name}</h4>
                  <p className="text-[11px] text-[#5B25F5] font-black">{bot.role.name}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1 justify-end">
                  <Sparkles className="w-3.5 h-3.5" /> Mời hỗ trợ
                </span>
                <span className="text-[10px] text-slate-400">
                  {bot.currentSituation ? 'Đang bận' : 'Sẵn sàng'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={closeCoopTokenModal}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};
