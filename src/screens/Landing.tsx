import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { analytics } from '../services/analytics';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  Zap,
  Building2,
  Users,
  Shield,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  LimeAsterisk,
  LimeSparkle,
  InlineArrowPill,
  RuangPillButton,
  CircleArrowButton,
  RuangHeroCards,
} from '../components/RuangMotifs';
import { RoleIconBadge } from '../components/RoleIconBadge';

export const LandingScreen: React.FC = () => {
  const { setScreen, addToast, incrementLogoClick, landingViewMode, pack, selectRole } = useGameStore();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Monitor Hero visibility for Sticky CTA
  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [landingViewMode]);

  const handleVaoCa = () => {
    analytics.logEvent('click_vao_ca');
    setScreen('mode_select');
  };

  const handleStartRole = (roleIndex: number) => {
    const role = pack.roles[roleIndex] || pack.roles[0];
    selectRole(role);
    setScreen('shift_intro');
  };

  // ==========================================
  // WEBSITE DESKTOP VIEW (RUANG EDIT DESIGN)
  // ==========================================
  if (landingViewMode === 'website') {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#F2EEF9] text-[#18181B] antialiased">
        {/* 1. TOP NAVBAR (Matching Ruang Edit Top Bar) */}
        <header className="w-full bg-[#F2EEF9] border-b border-[#E5DFFA]/80 sticky top-0 z-40 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Left Nav Links */}
            <nav className="flex items-center gap-7 text-sm font-bold text-slate-700">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[#5B25F5] transition-colors cursor-pointer"
              >
                Trang chủ
              </button>
              <a href="#roles" className="hover:text-[#5B25F5] transition-colors">
                Khám phá vị trí
              </a>
              <a href="#about" className="hover:text-[#5B25F5] transition-colors">
                Về Career Quest
              </a>
            </nav>

            {/* Center Brand Logo (Like "Ruang Edit") */}
            <button
              type="button"
              onClick={incrementLogoClick}
              className="flex items-center gap-2.5 cursor-pointer select-none active:scale-95 transition-transform text-left group"
              title="Nhấp 5 lần để mở Admin Demo"
            >
              <div className="w-8 h-8 rounded-xl bg-[#5B25F5] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#101010" />

                  <circle
                    cx="18"
                    cy="18"
                    r="12"
                    stroke="#E2F97D"
                    stroke-width="3"
                    opacity="0.8"
                  />

                  <path
                    d="M 16 16 L 28 20 L 37 37 Z"
                    fill="#C8F932"
                  />

                  <path
                    d="M 16 16 L 20 28 L 37 37 Z"
                    fill="#E2F97D"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight text-[#18181B] block">
                Career Quest
              </span>
            </button>

            {/* Right Nav Links + Contact/Join CTA */}
            <div className="flex items-center gap-6 pr-40 sm:pr-48">
              <button
                type="button"
                onClick={() => setScreen('school_dashboard')}
                className="text-xs font-bold text-slate-600 hover:text-[#5B25F5] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Dành cho trường học</span>
              </button>

              <RuangPillButton variant="lime" size="sm" onClick={handleVaoCa}>
                Vào ca ngay
              </RuangPillButton>
            </div>
          </div>
        </header>

        {/* 2. HERO HEADLINE SECTION */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <section ref={heroRef} className="relative pt-6 pb-12 flex flex-col items-center">
            {/* Top Row: Lime Asterisk on Left, Lime Sparkle on Right */}
            <div className="w-full flex items-center justify-between px-4 sm:px-12 pointer-events-none mb-2">
              <LimeAsterisk className="w-12 h-12 lg:w-16 lg:h-16 text-[#C8F932]" />
              <LimeSparkle className="w-9 h-9 lg:w-12 lg:h-12 text-[#C8F932]" />
            </div>

            {/* Big Headline matching "Level Up Your Design -> with Our Design Class" */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight text-center leading-[1.18] max-w-4xl mx-auto mb-8">
              Nâng Tầm Định Hướng
              <br />
              Nghề Nghiệp
              <InlineArrowPill className="transform -translate-y-1" />
              Với Trải Nghiệm
              <br />
              Thử Việc Ảo
            </h1>

            {/* Two Side Stats & CTA (like "With more than 2K+ MEMBERS..." and "Join Us ↗") */}
            <div className="w-full max-w-4xl flex items-center justify-between px-4 sm:px-8 mb-6">
              {/* Left Stats */}
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  Đồng hành cùng
                </span>
                <span className="text-base sm:text-lg font-black text-[#18181B] block leading-tight">
                  2,000+ HỌC SINH THPT
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#5B25F5] block">
                  100+ TÌNH HUỐNG THỰC TẾ
                </span>
              </div>

              {/* Right CTA */}
              <div>
                <RuangPillButton variant="lime" size="md" onClick={handleVaoCa}>
                  Tham Gia Ngay
                </RuangPillButton>
              </div>
            </div>

            {/* 3. 5-CARD SHOWCASE (Center visual matching screenshot!) */}
            <RuangHeroCards />
          </section>

          {/* 4. "OUR CLASSES" CONTAINER (Large White Card Container from Screenshot) */}
          <section id="roles" className="mt-8 bg-white rounded-[36px] border border-[#E5DFFA] p-8 sm:p-12 shadow-sm">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8 border-b border-slate-100">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#5B25F5] bg-violet-50 px-3 py-1 rounded-full border border-violet-200 inline-block mb-2">
                  Ngành Khách Sạn & Dịch Vụ
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#18181B] tracking-tight">
                  Các Vị Trí Thử Việc
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-medium leading-relaxed">
                Khám phá các vị trí thử việc mô phỏng thực tế. Bạn sẽ trực tiếp đối mặt các tình huống phát sinh, đưa ra lựa chọn và nhận biểu đồ đánh giá năng lực từ AI.
              </p>
            </div>

            {/* 3 Cards – Full-bleed image style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* CARD 1: Lễ Tân Khách Sạn – Light */}
              <div
                onClick={() => handleStartRole(0)}
                className="rounded-[28px] overflow-hidden border-2 border-slate-200/80 hover:border-[#5B25F5]/60 hover:shadow-2xl transition-all duration-300 bg-white group cursor-pointer"
              >
                {/* Full-bleed image top */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="/cards/hotel_lobby_real.jpg"
                    alt="Lễ Tân Khách Sạn"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Chips on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#5B25F5] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      #LT · Vị Trí 01
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      Ca 08:00 – 16:00
                    </span>
                  </div>
                  {/* Role name on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-xl font-black text-white leading-tight drop-shadow-sm">
                      Lễ Tân Khách Sạn
                    </h3>
                    <p className="text-xs text-white/80 font-medium mt-0.5">Front Office Receptionist</p>
                  </div>
                </div>

                {/* Text body below image */}
                <div className="p-5">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Dành cho những bạn muốn rèn luyện kỹ năng giao tiếp ngoại ngữ và giải quyết phàn nàn của khách VIP.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {['Giao tiếp', 'Thích ứng'].map(sk => (
                        <span key={sk} className="text-[10px] font-bold bg-violet-50 text-[#5B25F5] border border-violet-200 px-2 py-0.5 rounded-full">{sk}</span>
                      ))}
                    </div>
                    <CircleArrowButton variant="violet" onClick={() => handleStartRole(0)} />
                  </div>
                </div>
              </div>

              {/* CARD 2: Quản Lý Ẩm Thực – Purple Highlight */}
              <div
                onClick={() => handleStartRole(1)}
                className="rounded-[28px] overflow-hidden border-2 border-[#5B25F5] shadow-2xl group cursor-pointer transform md:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Full-bleed image top */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="/cards/restaurant_ambiance.jpg"
                    alt="Quản Lý Ẩm Thực"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240c75]/90 via-[#5B25F5]/30 to-transparent" />
                  {/* Chips on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="bg-[#C8F932] text-[#18181B] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      ✦ HOT ROLE
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-black/50 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
                      Áp lực cao
                    </span>
                  </div>
                  {/* Role name on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-xl font-black text-white leading-tight drop-shadow-sm">
                      Quản Lý Ẩm Thực (F&B)
                    </h3>
                    <p className="text-xs text-violet-200 font-medium mt-0.5">Food & Beverage Manager</p>
                  </div>
                </div>

                {/* Text body – dark purple */}
                <div className="p-5 bg-[#5B25F5]">
                  <p className="text-xs text-violet-200 font-medium leading-relaxed mb-4">
                    Dành cho những bạn yêu thích điều phối đội ngũ bếp - bàn và xử lý khủng hoảng giờ cao điểm.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {['Xử lý sự cố', 'Đạo đức'].map(sk => (
                        <span key={sk} className="text-[10px] font-bold bg-white/15 text-white border border-white/25 px-2 py-0.5 rounded-full">{sk}</span>
                      ))}
                    </div>
                    <CircleArrowButton variant="lime" onClick={() => handleStartRole(1)} />
                  </div>
                </div>
              </div>

              {/* CARD 3: Tổ Chức Sự Kiện – Light */}
              <div
                onClick={() => handleStartRole(2)}
                className="rounded-[28px] overflow-hidden border-2 border-slate-200/80 hover:border-[#5B25F5]/60 hover:shadow-2xl transition-all duration-300 bg-white group cursor-pointer"
              >
                {/* Full-bleed image top */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src="/cards/event_gala.jpg"
                    alt="Tổ Chức Sự Kiện"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Chips on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#5B25F5] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      #DP · Vị Trí 03
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      Gala Dinner
                    </span>
                  </div>
                  {/* Role name on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-xl font-black text-white leading-tight drop-shadow-sm">
                      Tổ Chức Sự Kiện
                    </h3>
                    <p className="text-xs text-white/80 font-medium mt-0.5">Event Coordinator</p>
                  </div>
                </div>

                {/* Text body below image */}
                <div className="p-5">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Dành cho những bạn năng động, muốn thử sức với điều phối sân khấu, âm thanh và tiến độ khắt khe.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {['Làm việc nhóm', 'Thích ứng'].map(sk => (
                        <span key={sk} className="text-[10px] font-bold bg-violet-50 text-[#5B25F5] border border-violet-200 px-2 py-0.5 rounded-full">{sk}</span>
                      ))}
                    </div>
                    <CircleArrowButton variant="violet" onClick={() => handleStartRole(2)} />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. QUOTE SECTION (Matching screenshot bottom quote: "Keep creating until you find your own audience.") */}
            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center text-center relative max-w-2xl mx-auto">
              <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2">
                <LimeSparkle className="w-8 h-8 text-[#C8F932]" />
              </div>
              <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2">
                <LimeAsterisk className="w-9 h-9 text-[#C8F932]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#18181B] leading-snug">
                Không ngừng{' '}
                <span className="dotted-capsule border-dashed border-[#5B25F5] bg-violet-50/50">
                  trải nghiệm
                </span>{' '}
                cho đến khi bạn tìm thấy{' '}
                <span className="text-[#5B25F5]">bản sắc</span> của riêng mình.
              </h3>

              <div className="mt-4 text-xs text-slate-500 font-medium">
                <p className="font-bold text-[#18181B] text-sm">Career Quest • Trải Nghiệm Nghề Nghiệp THPT</p>
                <p className="mt-0.5">Dự án nghiên cứu hướng nghiệp công nghệ – Đại học FPT</p>
              </div>

              <div className="mt-6">
                <RuangPillButton variant="lime" size="md" onClick={handleVaoCa}>
                  Bắt Đầu Ca Thử Việc
                </RuangPillButton>
              </div>
            </div>
          </section>
        </main>

        {/* 6. SUBTLE FOOTER */}
        <footer className="w-full bg-[#E5DFFA]/40 py-8 border-t border-[#E5DFFA] text-xs text-slate-500 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Copyright © 2026 Career Quest Production. All rights reserved.</p>
            <p className="font-semibold text-slate-600">FPT Edu</p>
          </div>
        </footer>

        {/* 7. STICKY BOTTOM BAR */}
        <AnimatePresence>
          {showStickyCta && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5DFFA] shadow-2xl py-3 px-6"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#5B25F5] text-[#C8F932] flex items-center justify-center font-black">
                    ✦
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#18181B] block leading-tight">
                      Sẵn sàng khám phá năng lực nghề nghiệp?
                    </span>
                    <span className="text-xs text-slate-500">
                      15 phút thử việc • 6 tình huống thực tế • Nhận báo cáo AI
                    </span>
                  </div>
                </div>

                <RuangPillButton variant="lime" size="md" onClick={handleVaoCa}>
                  Vào ca ngay
                </RuangPillButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ==========================================
  // MOBILE APP VIEW (RUANG EDIT DESIGN)
  // ==========================================
  return (
    <div className="w-full flex flex-col min-h-full pb-16 bg-[#F2EEF9] text-[#18181B] p-4">
      {/* 1. Mobile Header */}
      <div className="flex items-center justify-between pt-2 pb-4 border-b border-[#E5DFFA]/80 mb-4">
        <button
          type="button"
          onClick={incrementLogoClick}
          className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-[#5B25F5] flex items-center justify-center text-white shadow-xs">
            <svg viewBox="0 0 40 40" className="w-5 h-5">
              <path d="M 10 30 L 25 10 L 32 20 Z" fill="#C8F932" />
              <path d="M 8 30 L 20 12 L 14 30 Z" fill="#E2F97D" opacity="0.8" />
            </svg>
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-[#18181B] block leading-none">
              Career Quest
            </span>
          </div>
        </button>

        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C8F932] text-[#18181B] border border-[#bbf01f]">
          Thử việc ảo
        </span>
      </div>

      {/* 2. Headline with Motifs */}
      <div ref={heroRef} className="text-center py-4 relative">
        <div className="flex items-center justify-between px-2 mb-2">
          <LimeAsterisk className="w-8 h-8 text-[#C8F932]" />
          <LimeSparkle className="w-6 h-6 text-[#C8F932]" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#18181B] leading-tight mb-3">
          Nâng Tầm Định Hướng
          <br />
          Nghề Nghiệp
          <InlineArrowPill className="transform -translate-y-0.5" />
          <br />
          Với Thử Việc Ảo
        </h1>

        <div className="flex items-center justify-between text-xs px-2 my-4">
          <div className="text-left font-bold text-slate-600">
            <span>2K+ Học sinh THPT</span>
            <span className="block text-[11px] text-[#5B25F5]">100+ Tình huống</span>
          </div>
          <RuangPillButton variant="lime" size="sm" onClick={handleVaoCa}>
            Tham Gia
          </RuangPillButton>
        </div>

        {/* 3. Hero Visual Carousel */}
        <div className="my-4">
          <RuangHeroCards />
        </div>
      </div>

      {/* 4. Class Cards (Our Classes on Mobile) */}
      <div className="bg-white rounded-[28px] border border-[#E5DFFA] p-5 shadow-xs mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-[#18181B]">Các Vị Trí Thử Việc</h2>
          <span className="text-[10px] font-bold text-[#5B25F5] bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
            Ngành Khách Sạn
          </span>
        </div>

        <div className="space-y-4">
          {/* Card 1: Lễ Tân */}
          <div
            onClick={() => handleStartRole(0)}
            className="p-4 rounded-2xl border border-slate-200 hover:border-[#5B25F5] transition-all bg-white shadow-2xs cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-black text-sm text-[#18181B]">Lễ Tân Khách Sạn</h3>
              <CircleArrowButton variant="violet" />
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Rèn luyện phản xạ giao tiếp và giải quyết phàn nàn của khách hàng.
            </p>
            <div className="h-28 rounded-xl overflow-hidden relative shadow-xs border border-slate-200">
              <img
                src="/cards/receptionist_real.jpg"
                alt="Lễ Tân Khách Sạn"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-bold flex items-center gap-1">
                Front Desk 5 Sao
              </span>
            </div>
          </div>

          {/* Card 2: F&B Manager (Purple Highlight) */}
          <div
            onClick={() => handleStartRole(1)}
            className="p-4 rounded-2xl bg-[#5B25F5] text-white shadow-md cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-black text-sm text-white">Quản Lý Ẩm Thực (F&B)</h3>
              <CircleArrowButton variant="lime" />
            </div>
            <p className="text-xs text-violet-200 mb-3">
              Xử lý mâu thuẫn bếp - bàn và quản lý chất lượng giờ cao điểm.
            </p>
            <div className="h-28 rounded-xl overflow-hidden relative shadow-xs border border-violet-400/40">
              <img
                src="/cards/restaurant_server_real.jpg"
                alt="Quản Lý Ẩm Thực"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-bold flex items-center gap-1">
                Quản Lý Ẩm Thực
              </span>
            </div>
          </div>

          {/* Card 3: Sự Kiện */}
          <div
            onClick={() => handleStartRole(2)}
            className="p-4 rounded-2xl border border-slate-200 hover:border-[#5B25F5] transition-all bg-white shadow-2xs cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-black text-sm text-[#18181B]">Tổ Chức Sự Kiện</h3>
              <CircleArrowButton variant="violet" />
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Chạy deadline sự kiện gala và điều phối âm thanh ánh sáng.
            </p>
            <div className="h-28 rounded-xl overflow-hidden relative shadow-xs border border-slate-200">
              <img
                src="/cards/event_coordinator_real.jpg"
                alt="Tổ Chức Sự Kiện"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-bold flex items-center gap-1">
                Event Coordinator
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Mobile Quote Section */}
      <div className="text-center py-6 px-3 bg-white/70 rounded-2xl border border-[#E5DFFA]/60 mb-6">
        <h3 className="text-base font-black text-[#18181B] leading-snug">
          Không ngừng <span className="dotted-capsule border-dashed border-[#5B25F5]">trải nghiệm</span> cho đến khi bạn tìm thấy <span className="text-[#5B25F5]">bản sắc</span> của riêng mình.
        </h3>
        <p className="text-[11px] text-slate-500 mt-2">Career Quest • Đại học FPT</p>
      </div>

      {/* 6. Sticky CTA on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-[430px] mx-auto bg-gradient-to-t from-[#F2EEF9] via-[#F2EEF9]/95 to-transparent pt-6 pointer-events-none z-30">
        <div className="pointer-events-auto">
          <RuangPillButton variant="lime" size="lg" className="w-full shadow-xl" onClick={handleVaoCa}>
            Vào Ca Thử Việc Ngay
          </RuangPillButton>
        </div>
      </div>
    </div>
  );
};
