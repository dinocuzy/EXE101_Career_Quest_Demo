import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { generateLessonsLearned } from '../engine/soloEngine';
import { RotateCcw, ArrowLeft, BookOpen, ChevronDown, ChevronUp, AlertOctagon, HeartCrack } from 'lucide-react';

export const GameOverScreen: React.FC = () => {
  const { gameOverReason, history, restartShift, setScreen, landingViewMode } = useGameStore();
  const [showLessons, setShowLessons] = useState(true);

  const isBurnout = gameOverReason === 'burnout';
  const lessons = generateLessonsLearned(gameOverReason || 'burnout', history);
  const isWeb = landingViewMode === 'website';

  return (
    <div className={`w-full flex flex-col min-h-full ${isWeb ? 'max-w-3xl mx-auto py-8 px-4' : 'p-5 pb-10'} justify-between`}>
      <div>
        {/* Banner Card */}
        <div
          className={`rounded-3xl p-6 sm:p-8 text-center border-2 mb-6 ${
            isBurnout
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 shadow-md ${
              isBurnout
                ? 'bg-amber-200 text-amber-800'
                : 'bg-rose-200 text-rose-800'
            }`}
          >
            {isBurnout ? <HeartCrack className="w-10 h-10" /> : <AlertOctagon className="w-10 h-10" />}
          </div>

          <span
            className={`text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider ${
              isBurnout
                ? 'bg-amber-200 text-amber-900'
                : 'bg-rose-200 text-rose-900'
            }`}
          >
            {isBurnout ? 'Dừng ca khẩn cấp' : 'Chấm dứt hợp đồng'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black mt-3 mb-2">
            {isBurnout ? 'Bạn Đã Kiệt Sức! (Burnout)' : 'Bạn Đã Bị Sa Thải!'}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {isBurnout
              ? 'Năng lượng của bạn đã chạm mốc 0. Cơ thể và tinh thần bạn không thể tiếp tục chịu đựng thêm áp lực ca trực.'
              : 'Điểm uy tín nghề của bạn đã tụt xuống 0 sau hàng loạt phàn nàn gay gắt từ khách hàng và khiển trách từ quản lý.'}
          </p>
        </div>

        {/* Lessons Learned Accordion */}
        <div className="bg-white rounded-[28px] p-6 border border-[#E5DFFA] shadow-xs mb-6">
          <button
            type="button"
            onClick={() => setShowLessons(!showLessons)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#5B25F5]" />
              <h3 className="text-base font-black text-[#18181B]">
                3 Bài Học Rút Ra Từ Ca Trực Này
              </h3>
            </div>
            {showLessons ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showLessons && (
            <div className="mt-4 pt-4 border-t border-[#E5DFFA]/70 space-y-3">
              {lessons.map((lesson, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#C8F932] text-[#18181B] flex items-center justify-center shrink-0 font-black text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800">{lesson}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex flex-col sm:flex-row gap-3 ${isWeb ? 'justify-center max-w-md mx-auto w-full' : ''}`}>
        <button
          type="button"
          onClick={restartShift}
          className="flex-1 min-h-[50px] bg-[#5B25F5] hover:bg-[#4d1ed3] active:scale-[0.97] text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer select-none"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5] text-[#C8F932]" />
          <span>Thử lại ca trực</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('role_pick')}
          className="flex-1 min-h-[50px] bg-white hover:bg-slate-50 active:scale-[0.97] text-[#18181B] font-extrabold rounded-2xl border border-[#E5DFFA] transition-all flex items-center justify-center gap-1.5 text-sm cursor-pointer select-none shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Đổi vị trí khác</span>
        </button>
      </div>
    </div>
  );
};
