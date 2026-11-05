import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { AIReportData } from '../types/game';
import {
  Sparkles,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Info,
} from 'lucide-react';

interface ReportViewProps {
  report: AIReportData | null;
  isLoading: boolean;
  playerTitle: string;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  isLoading,
  playerTitle,
}) => {
  const { rateAiReport, addToast } = useGameStore();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    summary: true,
    strengths: true,
    improvements: true,
    roles: true,
    combos: true,
    nextSteps: true,
  });

  const [ratedStar, setRatedStar] = useState<number | null>(null);
  const [thumb, setThumb] = useState<'up' | 'down' | null>(null);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRateStar = (star: number) => {
    setRatedStar(star);
    rateAiReport(star, thumb === 'up');
  };

  const handleThumb = (t: 'up' | 'down') => {
    setThumb(t);
    rateAiReport(ratedStar || 5, t === 'up');
    addToast(
      t === 'up'
        ? 'Cảm ơn phản hồi tích cực của bạn!'
        : 'Cảm ơn góp ý, chúng tôi sẽ cải thiện chất lượng AI!',
      'info'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareSummary = async () => {
    if (!report) return;
    const text = `🌟 Báo cáo Hướng nghiệp AI Career Quest:\n• Danh hiệu: ${playerTitle}\n• Tóm tắt: ${report.workStyleSummary}\n• Vị trí phù hợp nhất: ${report.suggestedRoles[0]?.role} (${report.suggestedRoles[0]?.matchPercent}%)\n• Tổ hợp THPT gợi ý: ${report.subjectCombos[0]?.name}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Báo cáo Career Quest', text });
        return;
      }
      await navigator.clipboard.writeText(text);
      addToast('Đã sao chép tóm tắt báo cáo vào bộ nhớ tạm!', 'success');
    } catch {
      addToast('Không thể chia sẻ báo cáo.', 'error');
    }
  };

  // Skeleton Loading State
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-[28px] p-6 border border-[#E5DFFA] shadow-xs flex flex-col items-center justify-center text-center py-12">
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-[24px] bg-[#F2EEF9] border-2 border-[#5B25F5] flex items-center justify-center text-[#5B25F5] animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute -inset-1 rounded-[26px] border border-[#C8F932] animate-ping" />
        </div>

        <h3 className="text-base font-black text-[#18181B] mb-1">
          AI đang phân tích 6 quyết định của bạn…
        </h3>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Đang xâu chuỗi dữ liệu phản ứng dưới áp lực, đo lường 5 nhóm kỹ năng và đối chiếu mô hình nghề nghiệp...
        </p>

        {/* Shimmer placeholders */}
        <div className="w-full space-y-3 mt-6">
          <div className="h-4 bg-[#F2EEF9] rounded-full animate-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-[#F2EEF9] rounded-full animate-pulse w-5/6 mx-auto" />
          <div className="h-4 bg-[#F2EEF9] rounded-full animate-pulse w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!report) return null;

  const currentDate = new Date().toLocaleDateString('vi-VN');

  return (
    <div id="career-quest-report" className="w-full flex flex-col gap-3.5 print:p-0">
      {/* Report Header Card */}
      <div className="bg-[#5B25F5] text-white rounded-[28px] p-6 shadow-md border border-[#E5DFFA] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#C8F932]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-2 mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#C8F932] text-[#18181B] flex items-center justify-center font-black shadow-sm">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Báo Cáo Năng Lực & Hướng Nghiệp AI
                </h3>
              </div>
              <p className="text-[11px] text-white/80 font-medium flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#C8F932]" /> {playerTitle}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C8F932]" /> {currentDate}
                </span>
              </p>
            </div>
          </div>

          {report.isFallback && (
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#C8F932] text-[#18181B] shrink-0">
              Báo cáo mẫu
            </span>
          )}
        </div>

        {/* Action Buttons for PDF & Share */}
        <div className="flex gap-2.5 pt-3 border-t border-white/20 print:hidden relative z-10">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải PDF / In</span>
          </button>
          <button
            type="button"
            onClick={handleShareSummary}
            className="flex-1 py-2.5 px-3 bg-[#C8F932] hover:bg-[#d6ff47] active:scale-95 text-[#18181B] rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>

      {/* Accordion 1: Work Style Summary */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-wider text-[#5B25F5] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B25F5] ring-2 ring-[#C8F932]" />
            Tóm tắt phong cách làm việc
          </span>
          {openSections.summary ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
        {openSections.summary && (
          <p className="text-xs text-[#18181B] leading-relaxed font-medium mt-3 pt-3 border-t border-[#E5DFFA]/70">
            {report.workStyleSummary}
          </p>
        )}
      </div>

      {/* Accordion 2: Strengths (with decision evidence citations) */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('strengths')}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#5B25F5]" />
            3 Điểm mạnh nổi trội (Kèm bằng chứng)
          </span>
          {openSections.strengths ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
        {openSections.strengths && (
          <div className="mt-3 pt-3 border-t border-[#E5DFFA]/70 space-y-3">
            {report.strengths.map((item, idx) => (
              <div key={idx} className="bg-[#F2EEF9]/60 p-3.5 rounded-2xl border border-[#E5DFFA] text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-extrabold text-[#18181B]">{item.title}</h4>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#C8F932] text-[#18181B]">
                    {item.skill}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  <strong className="text-[#5B25F5]">Bằng chứng: </strong>
                  {item.evidence}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 3: Improvements (with advice citations) */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('improvements')}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            3 Điểm cần cải thiện & Lời khuyên
          </span>
          {openSections.improvements ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
        {openSections.improvements && (
          <div className="mt-3 pt-3 border-t border-[#E5DFFA]/70 space-y-3">
            {report.improvements.map((item, idx) => (
              <div key={idx} className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/70 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-extrabold text-[#18181B]">{item.title}</h4>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    {item.skill}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  <strong className="text-amber-800">Lời khuyên: </strong>
                  {item.advice}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 4: Suggested Roles with % match bar */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('roles')}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-wider text-[#5B25F5] flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#5B25F5]" />
            Vị trí nghề nghiệp gợi ý (Hospitality)
          </span>
          {openSections.roles ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
        {openSections.roles && (
          <div className="mt-3 pt-3 border-t border-[#E5DFFA]/70 space-y-3">
            {report.suggestedRoles.map((roleItem, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F2EEF9]/50 border border-[#E5DFFA] text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-extrabold text-[#18181B]">{roleItem.role}</h4>
                  <span className="font-black text-[#5B25F5] text-xs">
                    {roleItem.matchPercent}% phù hợp
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#5B25F5] to-[#C8F932] rounded-full"
                    style={{ width: `${roleItem.matchPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {roleItem.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 5: Subject Combos */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('combos')}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-wider text-[#5B25F5] flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#5B25F5]" />
            Tổ hợp môn THPT phù hợp
          </span>
          {openSections.combos ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
        {openSections.combos && (
          <div className="mt-3 pt-3 border-t border-[#E5DFFA]/70 space-y-2.5">
            {report.subjectCombos.map((combo, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F2EEF9]/60 border border-[#E5DFFA] text-xs">
                <h4 className="font-extrabold text-[#18181B] mb-1">{combo.name}</h4>
                <p className="text-[11px] text-slate-600 leading-snug">{combo.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 6: Next Steps */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('nextSteps')}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
            <ArrowRight className="w-4 h-4 text-[#5B25F5]" />
            3 Bước hành động tiếp theo
          </span>
          {openSections.nextSteps ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
        {openSections.nextSteps && (
          <div className="mt-3 pt-3 border-t border-[#E5DFFA]/70 space-y-2">
            {report.nextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                <span className="w-5 h-5 rounded-full bg-[#C8F932] text-[#18181B] flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-800">{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Rating Feedback (Measuring H5) */}
      <div className="bg-white rounded-[28px] p-5 border border-[#E5DFFA] text-center print:hidden shadow-xs">
        <p className="text-xs font-bold text-slate-800 mb-1.5">
          Báo cáo này có hữu ích với bạn không?
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRateStar(star)}
              className={`text-xl p-1 transition-transform hover:scale-125 cursor-pointer ${
                ratedStar && ratedStar >= star ? 'scale-110' : 'opacity-60'
              }`}
              title={`${star} sao`}
            >
              ⭐
            </button>
          ))}
        </div>

        {/* Thumbs Up / Down */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleThumb('up')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              thumb === 'up'
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Hữu ích</span>
          </button>

          <button
            type="button"
            onClick={() => handleThumb('down')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              thumb === 'down'
                ? 'bg-rose-100 border-rose-300 text-rose-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Chưa hài lòng</span>
          </button>
        </div>
      </div>
    </div>
  );
};
