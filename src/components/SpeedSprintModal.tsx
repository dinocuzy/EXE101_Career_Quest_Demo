import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Clock, CheckCircle2, AlertTriangle, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { playSuccessChime, playWarning, playTap, playLevelUpFanfare } from '../engine/audio';
import { fireCelebrationConfetti } from './Confetti';

interface SprintQuestion {
  id: number;
  scenario: string;
  context: string;
  options: {
    key: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    xp: number;
  }[];
}

const SPRINT_QUESTIONS: SprintQuestion[] = [
  {
    id: 1,
    scenario: 'Khách VIP hét lớn giữa sảnh: "Dịch vụ quá tệ! Tôi muốn gặp Giám đốc ngay!"',
    context: 'Sảnh Lễ Tân • Giờ cao điểm có nhiều khách đang check-in',
    options: [
      {
        key: 'A',
        text: 'Lắng nghe bình tĩnh, mời khách vào phòng VIP riêng, phục vụ trà mát và liên hệ Quản lý ca trực.',
        isOptimal: true,
        feedback: 'Xuất sắc! Xoa dịu tâm lý và không để ảnh hưởng đến các khách hàng khác ở sảnh.',
        xp: 50,
      },
      {
        key: 'B',
        text: 'Giải thích to tiếng để khách hiểu nhân viên đã làm đúng quy trình khách sạn.',
        isOptimal: false,
        feedback: 'Nguy hiểm! Cãi tay đôi với khách trước đám đông làm tổn hại nghiêm trọng uy tín.',
        xp: 10,
      },
      {
        key: 'C',
        text: 'Né tránh và chuyển cho nhân viên thực tập mới vào trực giải quyết thay.',
        isOptimal: false,
        feedback: 'Thiếu trách nhiệm! Đùn đẩy trách nhiệm làm bùng phát mâu thuẫn lớn hơn.',
        xp: 5,
      },
    ],
  },
  {
    id: 2,
    scenario: 'Bếp trưởng phát hiện chảo dầu bắt lửa bốc khói đen lúc 19:30 giờ cao điểm!',
    context: 'Khu vực Bếp F&B • Khách kín bàn chờ món',
    options: [
      {
        key: 'A',
        text: 'Hô hoán và tạt ngay một chậu nước lạnh vào chảo dầu đang cháy.',
        isOptimal: false,
        feedback: 'Cực kỳ nguy hiểm! Tạt nước vào chảo dầu đang sôi sẽ gây nổ cầu lửa lan toàn bếp!',
        xp: 0,
      },
      {
        key: 'B',
        text: 'Ngắt bếp gas, dùng chăn dập lửa chuyên dụng (hoặc nắp kim loại) chụp kín chảo, dùng bình bọt.',
        isOptimal: true,
        feedback: 'Chuẩn xác an toàn lao động! Cắt nguồn oxy ngay lập tức dập tắt ngọn lửa an toàn.',
        xp: 50,
      },
      {
        key: 'C',
        text: 'Bỏ bếp chạy ra sảnh hô to báo động toàn bộ thực khách sơ tán khẩn cấp.',
        isOptimal: false,
        feedback: 'Quá hoảng loạn! Đám cháy nhỏ chưa kiểm soát quy trình đã gây náo loạn toàn nhà hàng.',
        xp: 10,
      },
    ],
  },
  {
    id: 3,
    scenario: 'Đoàn khách 30 người đến sớm 3 tiếng so với giờ nhận phòng, hành lý chất đầy sảnh!',
    context: 'Điều hành Tour & Quầy Lễ Tân',
    options: [
      {
        key: 'A',
        text: 'Từ chối thẳng thừng và yêu cầu đoàn tự đi dạo phố đến đúng 14:00 mới được quay lại.',
        isOptimal: false,
        feedback: 'Khách hàng mệt mỏi sau chuyến đi dài sẽ đánh giá 1 sao ngay lập tức.',
        xp: 10,
      },
      {
        key: 'B',
        text: 'Tiếp nhận gửi hành lý an toàn, mời trà chào mừng, tư vấn voucher cafe/bể bơi và ưu tiên dọn phòng sớm.',
        isOptimal: true,
        feedback: 'Trải nghiệm 5 sao! Khách hài lòng, thư giãn trong khi bộ phận buồng phòng được hỗ trợ kịp thời.',
        xp: 50,
      },
      {
        key: 'C',
        text: 'Ép bộ phận buồng phòng dọn ẩu trong 10 phút để giao phòng bừa bãi.',
        isOptimal: false,
        feedback: 'Giao phòng bẩn chưa vệ sinh kỹ sẽ nhận vô số khiếu nại về sau.',
        xp: 15,
      },
    ],
  },
];

export const SpeedSprintModal: React.FC = () => {
  const { isSpeedSprintOpen, closeSpeedSprint, addXp, addToast } = useGameStore();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!isSpeedSprintOpen || isFinished) return;

    if (timeLeft <= 0) {
      setIsFinished(true);
      playWarning();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSpeedSprintOpen, timeLeft, isFinished]);

  if (!isSpeedSprintOpen) return null;

  const currentQ = SPRINT_QUESTIONS[currentIdx];

  const handleSelectOption = (opt: SprintQuestion['options'][0]) => {
    if (selectedKey) return; // prevent double tap
    setSelectedKey(opt.key);
    setFeedback(opt.feedback);

    if (opt.isOptimal) {
      playSuccessChime();
      setScore((s) => s + opt.xp);
    } else {
      playWarning();
      setScore((s) => s + opt.xp);
    }

    // Auto advance after 1.4s
    setTimeout(() => {
      if (currentIdx < SPRINT_QUESTIONS.length - 1) {
        setCurrentIdx((i) => i + 1);
        setSelectedKey(null);
        setFeedback(null);
      } else {
        setIsFinished(true);
        playLevelUpFanfare();
        fireCelebrationConfetti();
        addXp(score + opt.xp + 50); // bonus 50 XP
        addToast(`🔥 Hoàn thành Thử thách 60s! +${score + opt.xp + 50} XP!`, 'success');
      }
    }, 1400);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setTimeLeft(60);
    setScore(0);
    setSelectedKey(null);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* Top Timer Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Thử Thách Phản Xạ 60s
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  3 tình huống chớp nhoáng • Tích lũy XP thần tốc
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Countdown badge */}
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black font-mono transition-colors ${
                  timeLeft <= 15
                    ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>

              <button
                type="button"
                onClick={closeSpeedSprint}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isFinished && currentQ ? (
            <div className="my-5 flex flex-col gap-4">
              {/* Question Index & Scenario */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Câu {currentIdx + 1} / {SPRINT_QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-amber-600">
                    Điểm hiện tại: {score} XP
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {currentQ.scenario}
                </h4>
                <p className="text-xs text-slate-500 mt-1 italic">
                  Bối cảnh: {currentQ.context}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedKey === opt.key;
                  let btnColor = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (selectedKey) {
                    if (opt.isOptimal) {
                      btnColor = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200';
                    } else if (isSelected) {
                      btnColor = 'bg-rose-50 border-rose-500 text-rose-900';
                    } else {
                      btnColor = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={!!selectedKey}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${btnColor}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {opt.key}
                      </span>
                      <p className="text-xs font-medium leading-relaxed flex-1">
                        {opt.text}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Instant feedback box */}
              {feedback && (
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 animate-in fade-in">
                  <strong className="text-slate-900">Nhận xét nhanh:</strong> {feedback}
                </div>
              )}
            </div>
          ) : (
            /* Victory / Finish Screen */
            <div className="my-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 shadow-md animate-bounce border border-amber-200">
                <Trophy className="w-8 h-8 text-amber-600 fill-amber-400 stroke-[2.2]" />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-1">
                Hoàn Thành Thử Thách Phản Xạ!
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Bạn đã xử lý gọn gàng 3 tình huống khẩn cấp trong ca trực
              </p>

              <div className="w-full max-w-xs p-4 rounded-2xl bg-[#F2EEF9] border border-[#E5DFFA] mb-5">
                <span className="text-xs text-[#5B25F5] font-black block">Tổng điểm đạt được</span>
                <span className="text-3xl font-black text-[#5B25F5] mt-1 block">
                  +{score + 50} XP
                </span>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  (Bao gồm +50 XP thưởng hoàn thành tốc độ)
                </span>
              </div>

              <div className="flex items-center gap-3 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex-1 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thử lại</span>
                </button>

                <button
                  type="button"
                  onClick={closeSpeedSprint}
                  className="flex-1 min-h-[44px] bg-[#C8F932] hover:bg-[#d5fc4e] text-[#18181B] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer border border-black/10"
                >
                  <span>Nhận thưởng</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
