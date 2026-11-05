import { create } from 'zustand';
import {
  DecisionLog,
  GameOverReason,
  HospitalityPack,
  OptionFx,
  PlayerStats,
  PriceVariant,
  Role,
  Situation,
  SituationOption,
  AIReportData,
  CoopPhase,
  CoopPlayer,
  RippleNotification,
  CrisisVote,
  CrisisSituation,
  SkillKey,
  BadgeItem,
  AppThemeId,
} from '../types/game';
import hospitalityData from '../data/hospitality.cards.json';
import {
  applyEffects,
  buildSoloCardSequence,
  checkFailSafe,
  executeColleagueHelp,
  SHIFT_HOURS,
  clamp,
} from '../engine/soloEngine';
import { analytics } from '../services/analytics';
import { generateAIReport } from '../services/gemini';
import { calculateTitle } from '../engine/titles';
import {
  BOT_CANDIDATES,
  findTieBreakerPlayer,
  determineCoopTitle,
  getNextPlayerIndex,
} from '../engine/coopEngine';
import {
  playTap,
  playSuccessChime,
  playAlarmBeep,
  playLevelUpFanfare,
  setSoundEnabled as setAudioEngineSound,
} from '../engine/audio';

export interface ToastInfo {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const DEFAULT_BADGES: BadgeItem[] = [
  {
    id: 'first_step',
    name: 'Khởi Đầu Tự Tin',
    desc: 'Hoàn thành tình huống thử việc đầu tiên trong ca trực.',
    requirement: 'Giải quyết 1 tình huống bất kỳ',
    unlocked: true,
  },
  {
    id: 'calm_master',
    name: 'Bình Tĩnh Thép',
    desc: 'Giữ năng lượng và uy tín trên 7 điểm sau nửa ca trực.',
    requirement: 'Năng lượng & Uy tín ≥ 7 điểm',
    unlocked: true,
  },
  {
    id: 'comm_star',
    name: 'Bậc Thầy Giao Tiếp',
    desc: 'Đạt kỹ năng Giao tiếp (Communication) từ 8/10 trở lên.',
    requirement: 'Kỹ năng C ≥ 8 điểm',
    unlocked: false,
  },
  {
    id: 'solver_pro',
    name: 'Chiến Binh Xử Lý Sự Cố',
    desc: 'Giải quyết xuất sắc tình huống phàn nàn của khách khó tính.',
    requirement: 'Chọn phương án tối ưu khi khách cáu gắt',
    unlocked: false,
  },
  {
    id: 'team_hero',
    name: 'Đồng Đội Vàng',
    desc: 'Hỗ trợ đồng nghiệp hoặc phối hợp nhóm đạt kết quả trọn vẹn.',
    requirement: 'Hoàn thành phối hợp trong chế độ Co-op',
    unlocked: false,
  },
  {
    id: 'future_manager',
    name: 'Tố Chất Quản Lý',
    desc: 'Mở khóa báo cáo AI năng lực toàn diện và định hướng nghề 5 sao.',
    requirement: 'Nhận báo cáo năng lực chi tiết',
    unlocked: false,
  },
];

interface GameState {
  // Navigation & Screen
  screen:
    | 'landing'
    | 'mode_select'
    | 'role_pick'
    | 'shift_intro'
    | 'solo_play'
    | 'game_over'
    | 'solo_result'
    | 'admin_demo'
    | 'coop_lobby'
    | 'coop_play'
    | 'coop_summary'
    | 'school_dashboard';
  previousScreen: string | null;
  landingViewMode: 'mobile' | 'website';
  setLandingViewMode: (mode: 'mobile' | 'website') => void;

  // Theme & Visual Style System (Bộ Style)
  currentTheme: AppThemeId;
  setTheme: (theme: AppThemeId) => void;

  // Gamification & HUD
  xp: number;
  streakDays: number;
  combo: number;
  soundEnabled: boolean;
  isBadgeModalOpen: boolean;
  isSpeedSprintOpen: boolean;
  badges: BadgeItem[];
  toggleSound: () => void;
  addXp: (amount: number) => void;
  openBadgeModal: () => void;
  closeBadgeModal: () => void;
  openSpeedSprint: () => void;
  closeSpeedSprint: () => void;
  unlockBadge: (badgeId: string) => void;


  // Freemium & Pricing
  isPremium: boolean;
  priceVariant: PriceVariant;
  sessionCode: string;
  discountCode: string;
  discountPercent: number; // 0 or 20
  discountError: string | null;
  isPausedAtFreeLimit: boolean;

  // Pack data
  pack: HospitalityPack;
  selectedRole: Role | null;

  // Solo Play State
  soloCards: Situation[];
  cardIndex: number;
  stats: PlayerStats;
  colleagueHelpsLeft: number;
  shiftHour: string;
  history: DecisionLog[];

  // Pending Selection & Feedback
  selectedOptionKey: 'A' | 'B' | 'C' | null;
  feedbackSheetOpen: boolean;
  activeFeedback: {
    title: string;
    text: string;
    quality: 'good' | 'ok' | 'bad';
    fx: OptionFx;
    wasColleague: boolean;
  } | null;

  // Game Over
  gameOverReason: GameOverReason | null;

  // AI Report & Modals
  aiReport: AIReportData | null;
  isLoadingAiReport: boolean;
  isPaywallOpen: boolean;
  isQrModalOpen: boolean;
  isSupportSheetOpen: boolean;
  isInvoiceModalOpen: boolean;
  isWelcomePremiumOpen: boolean;

  // Toast & Admin Secret
  toasts: ToastInfo[];
  logoClicks: number;

  // --- CO-OP STATE ---
  coopPhase: CoopPhase;
  coopRoomCode: string;
  coopSpeed: 1 | 3 | 4;
  isFastDemoMode: boolean;
  coopClock: number; // in seconds (e.g. 1200 = 20:00, or 300 = 05:00)
  coopHealth: number; // 0 - 10, start 7
  coopBudget: number; // % 0 - 100, start 100
  coopPlayers: CoopPlayer[];
  coopSelectedRole: Role | null;
  coopCrisis: CrisisSituation | null;
  coopCrisisTimer: number; // 180s
  coopCrisisVotes: CrisisVote[];
  coopTieBreakerPlayerId: string | null;
  coopOvertimeUsed: boolean;
  coopOvertimeModalOpen: boolean;
  coopDualRolePrompt: {
    active: boolean;
    stakeholderName: string;
    stakeholderAvatar: string;
    line: string;
    forPlayerName: string;
    timeRemaining: number;
  } | null;
  coopRippleNotification: RippleNotification | null;
  coopStatsTracker: {
    situationsHandled: number;
    helpsGiven: number;
    backlogsPushed: number;
  };
  coopIsTokenModalOpen: boolean;

  // Actions
  setScreen: (screen: GameState['screen']) => void;
  selectRole: (role: Role) => void;
  startSoloShift: () => void;
  selectOption: (key: 'A' | 'B' | 'C') => void;
  confirmChoice: () => void;
  requestColleagueHelp: () => void;
  dismissFeedbackAndContinue: () => void;
  restartShift: () => void;
  openPaywall: () => void;
  closePaywall: () => void;
  openQrModal: () => void;
  closeQrModal: () => void;
  openSupportSheet: () => void;
  closeSupportSheet: () => void;
  openInvoiceModal: () => void;
  closeInvoiceModal: () => void;
  closeWelcomePremium: () => void;
  applyPromoCode: (code: string) => boolean;
  unlockPremium: () => void;
  pauseShiftAtFreeLimit: () => void;
  resumeShiftAfterPayment: () => void;
  addToast: (message: string, type?: ToastInfo['type']) => void;
  removeToast: (id: string) => void;
  incrementLogoClick: () => void;
  fetchAiReport: () => Promise<void>;
  rateAiReport: (rating: number, isHelpful?: boolean) => void;

  // --- CO-OP ACTIONS ---
  initCoopLobby: () => void;
  setCoopSelectedRole: (role: Role) => void;
  startCoopGame: () => void;
  setCoopSpeed: (speed: 1 | 3 | 4) => void;
  toggleFastDemoMode: () => void;
  coopTick: (deltaSeconds: number) => void;
  coopHumanResolveCard: (key: 'A' | 'B' | 'C') => void;
  openCoopTokenModal: () => void;
  closeCoopTokenModal: () => void;
  coopUseTokenOnPartner: (partnerId: string) => void;
  coopVoteCrisis: (optionKey: 'A' | 'B' | 'C') => void;
  dismissCoopDualRole: () => void;
  dismissCoopOvertime: () => void;
  restartCoop: () => void;
}

const INITIAL_STATS: PlayerStats = {
  energy: 10,
  rep: 5,
  skills: { C: 5, P: 5, A: 5, T: 5, E: 5 },
};

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'landing',
  previousScreen: null,
  landingViewMode: 'website',
  setLandingViewMode: (mode) => set({ landingViewMode: mode }),

  // Theme & Style System (Bộ Style Mặc Định: Ruang Edit - Violet & Neon Lime)
  currentTheme: 'ruang_edit',
  setTheme: (theme) => {
    set({ currentTheme: theme });
    analytics.logEvent('theme_changed', { theme });
    const themeNames: Record<string, string> = {
      ruang_edit: 'Bộ Style Ruang Edit (Violet & Neon Lime ⚡ Chuẩn Thiết Kế Mẫu)',
      neo_quest: 'Bộ Style Neo-Quest (Sky Cyan & Deep Indigo)',
      vibrant_editorial: 'Bộ Style Tạp chí (Vibrant Editorial)',
      cyber_arcade: 'Bộ Style Game Arcade (Cyber Neon)',
      warm_crafted: 'Bộ Style Tối Giản Ấm Áp (Warm Minimal)',
    };
    get().addToast(`Đã chuyển sang ${themeNames[theme] || theme}!`, 'info');
  },

  // Gamification & HUD
  xp: 320,
  streakDays: 3,
  combo: 2,
  soundEnabled: true,
  isBadgeModalOpen: false,
  isSpeedSprintOpen: false,
  badges: DEFAULT_BADGES,

  isPremium: false,
  priceVariant: analytics.getPriceVariant(),
  sessionCode: analytics.getSessionCode(),
  discountCode: '',
  discountPercent: 0,
  discountError: null,
  isPausedAtFreeLimit: false,

  pack: hospitalityData as unknown as HospitalityPack,
  selectedRole: null,

  soloCards: [],
  cardIndex: 0,
  stats: INITIAL_STATS,
  colleagueHelpsLeft: 2,
  shiftHour: SHIFT_HOURS[0],
  history: [],

  selectedOptionKey: null,
  feedbackSheetOpen: false,
  activeFeedback: null,

  gameOverReason: null,

  aiReport: null,
  isLoadingAiReport: false,
  isPaywallOpen: false,
  isQrModalOpen: false,
  isSupportSheetOpen: false,
  isInvoiceModalOpen: false,
  isWelcomePremiumOpen: false,

  toasts: [],
  logoClicks: 0,

  // --- CO-OP INITIAL STATE ---
  coopPhase: 'lobby',
  coopRoomCode: '839201',
  coopSpeed: 3,
  isFastDemoMode: false,
  coopClock: 1200, // 20:00
  coopHealth: 7,
  coopBudget: 100,
  coopPlayers: [],
  coopSelectedRole: null,
  coopCrisis: null,
  coopCrisisTimer: 180,
  coopCrisisVotes: [],
  coopTieBreakerPlayerId: null,
  coopOvertimeUsed: false,
  coopOvertimeModalOpen: false,
  coopDualRolePrompt: null,
  coopRippleNotification: null,
  coopStatsTracker: {
    situationsHandled: 0,
    helpsGiven: 0,
    backlogsPushed: 0,
  },
  coopIsTokenModalOpen: false,

  setScreen: (screen) => {
    set((state) => ({ screen, previousScreen: state.screen }));
  },

  selectRole: (role) => {
    set({ selectedRole: role });
  },

  startSoloShift: () => {
    const { pack, selectedRole } = get();
    if (!selectedRole) return;

    const cards = buildSoloCardSequence(pack, selectedRole.id);

    set({
      soloCards: cards,
      cardIndex: 0,
      stats: {
        energy: 10,
        rep: 5,
        skills: { C: 5, P: 5, A: 5, T: 5, E: 5 },
      },
      colleagueHelpsLeft: 2,
      shiftHour: SHIFT_HOURS[0],
      history: [],
      selectedOptionKey: null,
      feedbackSheetOpen: false,
      activeFeedback: null,
      gameOverReason: null,
      isPausedAtFreeLimit: false,
      screen: 'solo_play',
    });

    analytics.logEvent('shift_started', {
      roleId: selectedRole.id,
      roleName: selectedRole.name,
    });
  },

  selectOption: (key) => {
    playTap();
    set({ selectedOptionKey: key });
  },

  confirmChoice: () => {
    const { soloCards, cardIndex, selectedOptionKey, stats, history } = get();

    const currentCard = soloCards[cardIndex];
    if (!currentCard || !selectedOptionKey) return;

    const option = currentCard.options.find((o) => o.key === selectedOptionKey);
    if (!option) return;

    const updatedStats = applyEffects(stats, option.fx);

    const logEntry: DecisionLog = {
      situationId: currentCard.id,
      situationText: currentCard.text,
      stakeholderName: currentCard.stakeholder.name,
      chosenKey: selectedOptionKey,
      optionText: option.text,
      feedback: option.feedback,
      quality: option.quality,
      fx: option.fx,
      timestamp: Date.now(),
    };

    set({
      stats: updatedStats,
      history: [...history, logEntry],
      feedbackSheetOpen: true,
      activeFeedback: {
        title:
          option.quality === 'good'
            ? 'Xử lý xuất sắc'
            : option.quality === 'ok'
            ? 'Tạm ổn'
            : 'Hậu quả nặng nề',
        text: option.feedback,
        quality: option.quality,
        fx: option.fx,
        wasColleague: false,
      },
    });

    analytics.logEvent('card_decision', {
      cardId: currentCard.id,
      quality: option.quality,
      choiceKey: selectedOptionKey,
    });
  },

  requestColleagueHelp: () => {
    const { colleagueHelpsLeft, soloCards, cardIndex, stats, history } = get();

    if (colleagueHelpsLeft <= 0) {
      get().addToast('Bạn đã hết lượt nhờ đồng nghiệp ca này!', 'warning');
      return;
    }

    const currentCard = soloCards[cardIndex];
    if (!currentCard) return;

    const result = executeColleagueHelp(stats, currentCard);
    const newHelpsLeft = colleagueHelpsLeft - 1;

    if (result.success && result.autoGoodOption && result.appliedFx) {
      const logEntry: DecisionLog = {
        situationId: currentCard.id,
        situationText: currentCard.text,
        stakeholderName: currentCard.stakeholder.name,
        chosenKey: 'colleague',
        optionText: result.autoGoodOption.text,
        feedback: result.autoGoodOption.feedback,
        quality: 'good',
        fx: result.appliedFx,
        wasColleagueAssisted: true,
        timestamp: Date.now(),
      };

      set({
        stats: result.updatedStats,
        colleagueHelpsLeft: newHelpsLeft,
        history: [...history, logEntry],
        feedbackSheetOpen: true,
        activeFeedback: {
          title: 'May mắn! Đồng nghiệp hỗ trợ 🤝',
          text: `${result.message} ${result.autoGoodOption.feedback}`,
          quality: 'good',
          fx: result.appliedFx,
          wasColleague: true,
        },
      });

      get().addToast('Đồng nghiệp đã hỗ trợ thành công!', 'success');
    } else {
      set({
        stats: result.updatedStats,
        colleagueHelpsLeft: newHelpsLeft,
      });

      get().addToast(result.message, 'error');

      const failReason = checkFailSafe(result.updatedStats);
      if (failReason) {
        set({
          gameOverReason: failReason,
          screen: 'game_over',
        });
      }
    }

    analytics.logEvent('colleague_help_requested', {
      success: result.success,
      cardIndex,
    });
  },

  dismissFeedbackAndContinue: () => {
    const { stats, cardIndex, soloCards, selectedRole, isPremium } = get();

    const failReason = checkFailSafe(stats);
    if (failReason) {
      set({
        feedbackSheetOpen: false,
        activeFeedback: null,
        gameOverReason: failReason,
        screen: 'game_over',
      });
      analytics.logEvent('shift_failed', { reason: failReason, atCard: cardIndex });
      return;
    }

    const nextIndex = cardIndex + 1;

    if (nextIndex === 2 && !isPremium) {
      set({
        feedbackSheetOpen: false,
        activeFeedback: null,
        cardIndex: 2,
        shiftHour: SHIFT_HOURS[2] || '16:00',
        selectedOptionKey: null,
        isPaywallOpen: true,
      });
      analytics.logEvent('paywall_view', { cardIndex: 2, reason: 'freemium_gate' });
      return;
    }

    if (nextIndex >= soloCards.length) {
      set({
        feedbackSheetOpen: false,
        activeFeedback: null,
        cardIndex: nextIndex,
        shiftHour: SHIFT_HOURS[6],
        screen: 'solo_result',
      });

      analytics.logEvent('shift_completed', {
        roleId: selectedRole?.id,
        finalEnergy: stats.energy,
        finalRep: stats.rep,
      });

      if (get().isPremium) {
        get().fetchAiReport();
      }
      return;
    }

    set({
      feedbackSheetOpen: false,
      activeFeedback: null,
      cardIndex: nextIndex,
      shiftHour: SHIFT_HOURS[nextIndex] || SHIFT_HOURS[5],
      selectedOptionKey: null,
    });
  },

  restartShift: () => {
    get().startSoloShift();
  },

  openPaywall: () => {
    set({ isPaywallOpen: true });
    analytics.logEvent('paywall_view', { trigger: 'manual' });
  },

  closePaywall: () => {
    set({ isPaywallOpen: false });
  },

  openQrModal: () => {
    set({ isPaywallOpen: false, isQrModalOpen: true });
    analytics.logEvent('paywall_cta_click');
    analytics.logEvent('qr_click', {
      price: get().priceVariant * (1 - get().discountPercent / 100),
    });
  },

  closeQrModal: () => {
    set({ isQrModalOpen: false });
  },

  openSupportSheet: () => {
    set({ isSupportSheetOpen: true });
  },

  closeSupportSheet: () => {
    set({ isSupportSheetOpen: false });
  },

  openInvoiceModal: () => {
    set({ isInvoiceModalOpen: true });
  },

  closeInvoiceModal: () => {
    set({ isInvoiceModalOpen: false });
  },

  closeWelcomePremium: () => {
    set({ isWelcomePremiumOpen: false });
  },

  applyPromoCode: (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'NHOM3') {
      set({
        discountCode: 'NHOM3',
        discountPercent: 20,
        discountError: null,
      });
      get().addToast('Áp dụng mã NHOM3 thành công! Giảm ngay 20%.', 'success');
      return true;
    } else {
      set({
        discountError: 'Mã giảm giá không hợp lệ. Vui lòng thử lại!',
      });
      return false;
    }
  },

  unlockPremium: () => {
    set({
      isPremium: true,
      isQrModalOpen: false,
      isWelcomePremiumOpen: true,
      isPaywallOpen: false,
    });

    analytics.logEvent('payment_confirm_demo', {
      sessionCode: get().sessionCode,
      paidAmount: get().priceVariant * (1 - get().discountPercent / 100),
      discountApplied: get().discountPercent > 0,
    });

    if (get().screen === 'solo_result' && !get().aiReport) {
      get().fetchAiReport();
    }
  },

  pauseShiftAtFreeLimit: () => {
    set({
      isPaywallOpen: false,
      isPausedAtFreeLimit: true,
      screen: 'solo_result',
    });
  },

  resumeShiftAfterPayment: () => {
    set({
      isWelcomePremiumOpen: false,
      isPausedAtFreeLimit: false,
      screen: 'solo_play',
    });
  },

  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, 3200);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  incrementLogoClick: () => {
    const nextCount = get().logoClicks + 1;
    if (nextCount >= 5) {
      set({ screen: 'admin_demo', logoClicks: 0 });
      get().addToast('Đã mở bảng Admin & Analytics ngầm 🛠️', 'info');
    } else {
      set({ logoClicks: nextCount });
    }
  },

  fetchAiReport: async () => {
    const { selectedRole, stats, history } = get();
    if (!selectedRole) return;

    const titleInfo = calculateTitle(stats.rep, stats.energy);

    set({ isLoadingAiReport: true });
    try {
      const report = await generateAIReport(
        selectedRole.id,
        selectedRole.name,
        stats,
        titleInfo.title,
        history
      );
      set({ aiReport: report, isLoadingAiReport: false });
      get().unlockBadge('future_manager');
    } catch {
      set({ isLoadingAiReport: false });
    }
  },

  rateAiReport: (rating: number, isHelpful?: boolean) => {
    analytics.logEvent('ai_report_rating', { rating, isHelpful });
    get().addToast(`Cảm ơn bạn đã đánh giá ${rating}⭐ cho báo cáo AI!`, 'success');
  },

  // --- GAMIFICATION ACTIONS ---
  toggleSound: () => {
    const next = !get().soundEnabled;
    setAudioEngineSound(next);
    set({ soundEnabled: next });
    get().addToast(next ? 'Đã bật âm thanh hiệu ứng 🔊' : 'Đã tắt âm thanh 🔇', 'info');
  },

  addXp: (amount: number) => {
    const currentXp = get().xp;
    const newXp = currentXp + amount;
    const oldLevel = Math.floor(currentXp / 250) + 1;
    const newLevel = Math.floor(newXp / 250) + 1;

    set({ xp: newXp });

    if (newLevel > oldLevel) {
      playLevelUpFanfare();
      get().addToast(`🎉 CHÚC MỪNG! Bạn đã thăng cấp Lv.${newLevel}!`, 'success');
    }
  },

  openBadgeModal: () => {
    set({ isBadgeModalOpen: true });
  },

  closeBadgeModal: () => {
    set({ isBadgeModalOpen: false });
  },

  openSpeedSprint: () => {
    set({ isSpeedSprintOpen: true });
  },

  closeSpeedSprint: () => {
    set({ isSpeedSprintOpen: false });
  },

  unlockBadge: (badgeId: string) => {
    const { badges } = get();
    const target = badges.find((b) => b.id === badgeId);
    if (!target || target.unlocked) return;

    set({
      badges: badges.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b)),
    });
    playLevelUpFanfare();
    get().addToast(`🏆 Đã mở khóa huy hiệu mới: "${target.name}"!`, 'success');
  },

  // ==========================================
  // --- CO-OP ACTIONS IMPLEMENTATION ---
  // ==========================================

  initCoopLobby: () => {
    const { pack } = get();
    // Generate 6-digit random PIN
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();

    // Default human player
    const humanPlayer: CoopPlayer = {
      id: 'p1',
      name: 'Bạn (Host)',
      isHuman: true,
      role: pack.roles[0], // default LT
      avatar: '🌟',
      skills: { C: 5, P: 5, A: 5, T: 5, E: 5 },
      goodwill: 5,
      tokens: 2,
      queue: [],
      currentSituation: null,
      history: [],
      statusText: 'Đang chọn vị trí...',
    };

    set({
      coopPhase: 'lobby',
      coopRoomCode: randomPin,
      coopSpeed: 3,
      isFastDemoMode: false,
      coopClock: 1200,
      coopHealth: 7,
      coopBudget: 100,
      coopPlayers: [humanPlayer],
      coopSelectedRole: pack.roles[0],
      coopCrisis: null,
      coopCrisisTimer: 180,
      coopCrisisVotes: [],
      coopTieBreakerPlayerId: null,
      coopOvertimeUsed: false,
      coopOvertimeModalOpen: false,
      coopDualRolePrompt: null,
      coopRippleNotification: null,
      coopStatsTracker: {
        situationsHandled: 0,
        helpsGiven: 0,
        backlogsPushed: 0,
      },
      coopIsTokenModalOpen: false,
      screen: 'coop_lobby',
    });

    // Automatically have 3 bots join room every 1.2s
    let botIndex = 0;
    const botInterval = setInterval(() => {
      const currentPlayers = get().coopPlayers;
      if (currentPlayers.length >= 4) {
        clearInterval(botInterval);
        return;
      }

      const candidate = BOT_CANDIDATES[botIndex];
      const usedRoles = currentPlayers.map((p) => p.role.id);
      const remainingRole = pack.roles.find((r) => !usedRoles.includes(r.id)) || pack.roles[1];

      const newBot: CoopPlayer = {
        id: `p${currentPlayers.length + 1}`,
        name: candidate.name,
        isHuman: false,
        role: remainingRole,
        avatar: candidate.avatar,
        skills: { C: 5, P: 5, A: 5, T: 5, E: 5 },
        goodwill: 5,
        tokens: 2,
        queue: [],
        currentSituation: null,
        history: [],
        statusText: `Đã chọn ${remainingRole.name}`,
      };

      set((state) => ({
        coopPlayers: [...state.coopPlayers, newBot],
      }));

      get().addToast(`${candidate.name} (${remainingRole.name}) vừa vào phòng!`, 'info');
      botIndex++;
    }, 1200);
  },

  setCoopSelectedRole: (role: Role) => {
    const { coopPlayers, pack } = get();
    // Swap roles if another bot already has this role
    const updatedPlayers = coopPlayers.map((p) => {
      if (p.isHuman) {
        return { ...p, role, statusText: `Đã chọn ${role.name}` };
      }
      return p;
    });

    // If a bot had this role, reassign that bot to an unused role
    const takenByBot = updatedPlayers.find((p) => !p.isHuman && p.role.id === role.id);
    if (takenByBot) {
      const allChosenRoles = updatedPlayers.map((p) => p.role.id);
      const freeRole = pack.roles.find((r) => !allChosenRoles.includes(r.id)) || pack.roles[0];
      takenByBot.role = freeRole;
      takenByBot.statusText = `Đã đổi sang ${freeRole.name}`;
    }

    set({
      coopSelectedRole: role,
      coopPlayers: updatedPlayers,
    });
  },

  setCoopSpeed: (speed) => {
    set({ coopSpeed: speed });
  },

  toggleFastDemoMode: () => {
    const nextMode = !get().isFastDemoMode;
    set({
      isFastDemoMode: nextMode,
      coopClock: nextMode ? 120 : 1200, // 2 min vs 20 min
    });
    get().addToast(
      nextMode
        ? '⚡ Đã bật Chế độ Demo Nhanh: Ca 2 phút, tình huống dồn dập để trình diễn!'
        : 'Đã chuyển về tốc độ ca chuẩn 20 phút',
      'warning'
    );
  },

  startCoopGame: () => {
    const { coopPlayers, pack, isFastDemoMode } = get();
    if (coopPlayers.length < 4) {
      get().addToast('Cần đủ 4 người chơi để bắt đầu ca trực Co-op!', 'warning');
      return;
    }

    // Deal initial situation to human and bots
    const initializedPlayers = coopPlayers.map((player) => {
      const roleCards = pack.situations.filter((s) => s.role === player.role.id);
      const firstCard = roleCards[0] || pack.situations[0];
      return {
        ...player,
        currentSituation: firstCard,
        isHighDemand: Math.random() < 0.35,
        timeRemaining: Math.random() < 0.35 ? Math.round(firstCard.timeLimit * 0.7) : firstCard.timeLimit,
        statusText: 'Đang xử lý tình huống...',
      };
    });

    set({
      coopPhase: 'playing',
      coopClock: isFastDemoMode ? 120 : 1200,
      coopHealth: 7,
      coopBudget: 100,
      coopPlayers: initializedPlayers,
      screen: 'coop_play',
    });

    analytics.logEvent('coop_shift_started', {
      isFastDemo: isFastDemoMode,
      humanRole: get().coopSelectedRole?.id,
    });

    get().addToast('Ca trực Co-op 4 người chính thức bắt đầu!', 'success');
  },

  coopTick: (deltaSeconds) => {
    const {
      coopPhase,
      coopClock,
      coopSpeed,
      coopHealth,
      coopBudget,
      coopPlayers,
      pack,
      isFastDemoMode,
      coopCrisis,
      coopCrisisTimer,
      coopCrisisVotes,
      coopOvertimeUsed,
    } = get();

    if (coopPhase !== 'playing' && coopPhase !== 'crisis') return;

    // Multiply clock tick by coopSpeed
    const realDelta = deltaSeconds * coopSpeed;

    // 1. PHASE 3: CRISIS MODE TICK
    if (coopPhase === 'crisis') {
      const nextCrisisTimer = Math.max(0, coopCrisisTimer - realDelta);

      // Auto-simulate bot voting if not voted yet
      let updatedVotes = [...coopCrisisVotes];
      coopPlayers.forEach((p) => {
        if (!p.isHuman && !updatedVotes.some((v) => v.playerId === p.id)) {
          // Bots vote after random delay (simulated when timer drops)
          if (nextCrisisTimer < 165 - Math.random() * 40) {
            // 60% good (A), 25% ok (C), 15% bad (B)
            const rand = Math.random();
            const optionKey: 'A' | 'B' | 'C' = rand < 0.6 ? 'A' : rand < 0.85 ? 'C' : 'B';
            updatedVotes.push({
              playerId: p.id,
              playerName: p.name,
              avatar: p.avatar,
              optionKey,
            });
          }
        }
      });

      // If crisis timer reaches 0 or all 4 have voted
      if (nextCrisisTimer <= 0 || updatedVotes.length === 4) {
        // If human hasn't voted when time expires, pick randomly
        const human = coopPlayers.find((p) => p.isHuman);
        if (human && !updatedVotes.some((v) => v.playerId === human.id)) {
          updatedVotes.push({
            playerId: human.id,
            playerName: human.name,
            avatar: human.avatar,
            optionKey: 'A',
          });
        }

        // Tally votes
        const counts: Record<'A' | 'B' | 'C', number> = { A: 0, B: 0, C: 0 };
        updatedVotes.forEach((v) => {
          counts[v.optionKey] = (counts[v.optionKey] || 0) + 1;
        });

        // Determine winning option
        let winningKey: 'A' | 'B' | 'C' = 'A';
        const keys: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
        const sorted = keys.sort((a, b) => counts[b] - counts[a]);

        if (counts[sorted[0]] === counts[sorted[1]]) {
          // 2-2 Tie! Tie-breaker player decides
          const tieBreaker = findTieBreakerPlayer(coopCrisis?.id || 'K1', coopPlayers);
          const tieVote = updatedVotes.find((v) => v.playerId === tieBreaker.id);
          winningKey = tieVote?.optionKey || sorted[0];
          get().addToast(
            `Hòa phiếu! ${tieBreaker.name} giữ Quyền Quyết Định chốt phương án ${winningKey}!`,
            'warning'
          );
        } else {
          winningKey = sorted[0];
          get().addToast(`Tập thể đã đồng thuận chọn phương án ${winningKey}!`, 'success');
        }

        // Apply crisis fx
        const selectedOption = coopCrisis?.options.find((o) => o.key === winningKey);
        const fxHealth = selectedOption?.fx.health || 0;
        const fxBudget = selectedOption?.fx.budget || 0;

        const newHealth = clamp(coopHealth + fxHealth, 0, 10);
        const newBudget = clamp(coopBudget + fxBudget, 0, 100);

        set({
          coopPhase: 'playing',
          coopHealth: newHealth,
          coopBudget: newBudget,
          coopCrisis: null,
          coopCrisisTimer: 180,
          coopCrisisVotes: [],
        });

        playSuccessChime();

        // Check health after crisis
        if (newHealth <= 0) {
          if (!coopOvertimeUsed) {
            get().dismissCoopOvertime(); // trigger overtime
          } else {
            set({ coopPhase: 'summary', screen: 'coop_summary' });
          }
        }
        return;
      }

      set({
        coopCrisisTimer: nextCrisisTimer,
        coopCrisisVotes: updatedVotes,
      });
      return;
    }

    // 2. PHASE 2: REGULAR PLAYING TICK
    const nextClock = Math.max(0, coopClock - realDelta);

    // Crisis Trigger Check: Exactly at 10:00 (600s in normal, or 60s in 2-min fast demo)
    const crisisTriggerTime = isFastDemoMode ? 60 : 600;
    if (coopClock > crisisTriggerTime && nextClock <= crisisTriggerTime && !get().coopCrisis) {
      // Trigger Crisis!
      const randomCrisis = pack.crisis[Math.floor(Math.random() * pack.crisis.length)];
      const tieBreaker = findTieBreakerPlayer(randomCrisis.id, coopPlayers);

      playAlarmBeep();

      set({
        coopPhase: 'crisis',
        coopClock: crisisTriggerTime,
        coopCrisis: randomCrisis,
        coopCrisisTimer: 180,
        coopCrisisVotes: [],
        coopTieBreakerPlayerId: tieBreaker.id,
      });

      get().addToast('🚨 CẢNH BÁO: KHỦNG HOẢNG CHUNG BỘ PHẬN ĐÃ NỔ RA!', 'error');
      analytics.logEvent('coop_crisis_triggered', { crisisId: randomCrisis.id });
      return;
    }

    // End of Shift Check: clock reaches 0
    if (nextClock <= 0) {
      // Calculate titles for all 4 players
      const evaluatedPlayers = coopPlayers.map((p) => {
        const titleMeta = determineCoopTitle(p.skills);
        return {
          ...p,
          badgeTitle: titleMeta.title,
        };
      });

      set({
        coopPhase: 'summary',
        coopClock: 0,
        coopPlayers: evaluatedPlayers,
        screen: 'coop_summary',
      });

      analytics.logEvent('coop_shift_completed', {
        health: coopHealth,
        budget: coopBudget,
      });

      return;
    }

    // Handle bot decision simulations and card dealing
    let updatedHealth = coopHealth;
    let updatedBudget = coopBudget;
    let situationsAdded = 0;
    let helpsAdded = 0;
    let backlogsAdded = 0;

    const updatedPlayers = coopPlayers.map((player, pIdx) => {
      let p = { ...player };

      // Decrement player timer if currently resolving situation
      if (p.currentSituation) {
        p.timeRemaining = Math.max(0, (p.timeRemaining || 40) - realDelta);

        // If bot time ran out or reached trigger threshold, bot makes decision!
        if (!p.isHuman && p.timeRemaining <= (p.isHighDemand ? 10 : 18)) {
          // Bot decision probabilities: 55% good, 30% ok, 15% bad
          const rand = Math.random();
          const targetQuality: 'good' | 'ok' | 'bad' =
            rand < 0.55 ? 'good' : rand < 0.85 ? 'ok' : 'bad';

          const chosenOpt =
            p.currentSituation.options.find((o) => o.quality === targetQuality) ||
            p.currentSituation.options[0];

          // Apply fx
          updatedHealth = clamp(updatedHealth + (chosenOpt.fx.health || 0), 0, 10);
          updatedBudget = clamp(updatedBudget + (chosenOpt.fx.budget || 0), 0, 100);

          p.skills = {
            C: clamp(p.skills.C + (chosenOpt.fx.skills.C || 0)),
            P: clamp(p.skills.P + (chosenOpt.fx.skills.P || 0)),
            A: clamp(p.skills.A + (chosenOpt.fx.skills.A || 0)),
            T: clamp(p.skills.T + (chosenOpt.fx.skills.T || 0)),
            E: clamp(p.skills.E + (chosenOpt.fx.skills.E || 0)),
          };

          situationsAdded++;

          // Ripple Effect Check: if option has backlog: true (BL)
          if (chosenOpt.fx.backlog) {
            p.goodwill = Math.max(0, p.goodwill - 1);
            backlogsAdded++;

            // Target next player in circle
            const nextIdx = getNextPlayerIndex(pIdx, coopPlayers.length);
            const targetPlayer = coopPlayers[nextIdx];

            // Pick a situation from target player's role
            const targetPool = pack.situations.filter((s) => s.role === targetPlayer.role.id);
            const rippleCard = targetPool[Math.floor(Math.random() * targetPool.length)] || pack.situations[0];

            set({
              coopRippleNotification: {
                id: Math.random().toString(36).substring(2, 9),
                fromPlayerName: p.name,
                fromRoleName: p.role.name,
                toPlayerName: targetPlayer.name,
                toRoleName: targetPlayer.role.name,
                fromAvatar: p.avatar,
                toAvatar: targetPlayer.avatar,
                situationTitle: rippleCard.stakeholder.line,
                timestamp: Date.now(),
              },
            });

            get().addToast(
              `⚡ ${p.name} (${p.role.name}) đẩy việc sang ${targetPlayer.name} (${targetPlayer.role.name})!`,
              'warning'
            );
          }

          p.currentSituation = null;
          p.statusText = 'Chờ tình huống mới...';
        }
      } else {
        // If player has no active card, check if should deal next card (every 25-35s, or 6-10s in 2-min demo)
        const dealChance = (realDelta / (isFastDemoMode ? 8 : 28));
        if (Math.random() < dealChance) {
          const rolePool = pack.situations.filter((s) => s.role === p.role.id);
          const nextCard = rolePool[Math.floor(Math.random() * rolePool.length)] || pack.situations[0];
          const isHigh = Math.random() < 0.35;

          p.currentSituation = nextCard;
          p.isHighDemand = isHigh;
          p.timeRemaining = isHigh ? Math.round(nextCard.timeLimit * 0.7) : nextCard.timeLimit;
          p.statusText = isHigh ? '⚡ CAO ĐIỂM! Đang xử lý...' : 'Đang xử lý tình huống...';
        }
      }

      return p;
    });

    // Check Fail-safe for Health = 0
    if (updatedHealth <= 0) {
      if (!coopOvertimeUsed) {
        // Trigger Overtime
        set({
          coopPhase: 'overtime',
          coopOvertimeModalOpen: true,
          coopOvertimeUsed: true,
        });
        return;
      } else {
        // Game Over Crisis
        set({
          coopPhase: 'summary',
          screen: 'coop_summary',
        });
        return;
      }
    }

    set((state) => ({
      coopClock: nextClock,
      coopHealth: updatedHealth,
      coopBudget: updatedBudget,
      coopPlayers: updatedPlayers,
      coopStatsTracker: {
        situationsHandled: state.coopStatsTracker.situationsHandled + situationsAdded,
        helpsGiven: state.coopStatsTracker.helpsGiven + helpsAdded,
        backlogsPushed: state.coopStatsTracker.backlogsPushed + backlogsAdded,
      },
    }));
  },

  coopHumanResolveCard: (key) => {
    const { coopPlayers, coopHealth, coopBudget, pack } = get();
    const humanIndex = coopPlayers.findIndex((p) => p.isHuman);
    if (humanIndex === -1) return;

    const human = coopPlayers[humanIndex];
    if (!human.currentSituation) return;

    const option = human.currentSituation.options.find((o) => o.key === key);
    if (!option) return;

    // Check costly rule: if budget < 20% and costly = true
    if (option.fx.costly && coopBudget < 20) {
      get().addToast('Ngân sách dưới 20%, phương án tốn kém bị khóa!', 'error');
      return;
    }

    // Apply fx
    const newHealth = clamp(coopHealth + (option.fx.health || 0), 0, 10);
    const newBudget = clamp(coopBudget + (option.fx.budget || 0), 0, 100);

    const updatedSkills = {
      C: clamp(human.skills.C + (option.fx.skills.C || 0)),
      P: clamp(human.skills.P + (option.fx.skills.P || 0)),
      A: clamp(human.skills.A + (option.fx.skills.A || 0)),
      T: clamp(human.skills.T + (option.fx.skills.T || 0)),
      E: clamp(human.skills.E + (option.fx.skills.E || 0)),
    };

    let updatedGoodwill = human.goodwill;

    // Ripple Effect Check: if option has backlog: true (BL)
    if (option.fx.backlog) {
      updatedGoodwill = Math.max(0, updatedGoodwill - 1);
      const nextIdx = getNextPlayerIndex(humanIndex, coopPlayers.length);
      const targetPlayer = coopPlayers[nextIdx];

      const targetPool = pack.situations.filter((s) => s.role === targetPlayer.role.id);
      const rippleCard = targetPool[Math.floor(Math.random() * targetPool.length)] || pack.situations[0];

      set({
        coopRippleNotification: {
          id: Math.random().toString(36).substring(2, 9),
          fromPlayerName: human.name,
          fromRoleName: human.role.name,
          toPlayerName: targetPlayer.name,
          toRoleName: targetPlayer.role.name,
          fromAvatar: human.avatar,
          toAvatar: targetPlayer.avatar,
          situationTitle: rippleCard.stakeholder.line,
          timestamp: Date.now(),
        },
      });

      get().addToast(
        `⚡ Bạn đẩy việc sang ${targetPlayer.name} (${targetPlayer.role.name})! Thiện cảm -1 ❤️`,
        'warning'
      );
    }

    const updatedPlayers = [...coopPlayers];
    updatedPlayers[humanIndex] = {
      ...human,
      skills: updatedSkills,
      goodwill: updatedGoodwill,
      currentSituation: null,
      statusText: 'Đã giải quyết xong. Chờ tình huống mới...',
    };

    set((state) => ({
      coopHealth: newHealth,
      coopBudget: newBudget,
      coopPlayers: updatedPlayers,
      coopStatsTracker: {
        ...state.coopStatsTracker,
        situationsHandled: state.coopStatsTracker.situationsHandled + 1,
        backlogsPushed: state.coopStatsTracker.backlogsPushed + (option.fx.backlog ? 1 : 0),
      },
    }));

    get().addToast(
      option.quality === 'good'
        ? 'Xử lý xuất sắc! Vận hành ổn định.'
        : option.quality === 'ok'
        ? 'Giải quyết tạm ổn.'
        : 'Hậu quả phát sinh ảnh hưởng đến đội!',
      option.quality === 'good' ? 'success' : option.quality === 'ok' ? 'info' : 'error'
    );
  },

  openCoopTokenModal: () => {
    const human = get().coopPlayers.find((p) => p.isHuman);
    if (!human) return;

    if (human.tokens <= 0) {
      get().addToast('Bạn đã hết Token mời đồng đội!', 'warning');
      return;
    }
    if (human.goodwill <= 1) {
      get().addToast('Thiện cảm ≤ 1: Đồng đội đang mất niềm tin, không thể nhờ hỗ trợ!', 'error');
      return;
    }

    set({ coopIsTokenModalOpen: true });
  },

  closeCoopTokenModal: () => {
    set({ coopIsTokenModalOpen: false });
  },

  coopUseTokenOnPartner: (partnerId) => {
    const { coopPlayers, coopHealth, coopBudget } = get();
    const humanIdx = coopPlayers.findIndex((p) => p.isHuman);
    const partnerIdx = coopPlayers.findIndex((p) => p.id === partnerId);

    if (humanIdx === -1 || partnerIdx === -1) return;

    const human = coopPlayers[humanIdx];
    const partner = coopPlayers[partnerIdx];

    if (!human.currentSituation) {
      get().addToast('Bạn hiện không có tình huống nào cần xử lý!', 'info');
      set({ coopIsTokenModalOpen: false });
      return;
    }

    // Probability bot agrees based on human goodwill: goodwill/5 + 0.3, max 0.95
    const successProb = Math.min(0.95, (human.goodwill / 5) + 0.3);
    const isSuccess = Math.random() < successProb;

    set({ coopIsTokenModalOpen: false });

    if (isSuccess) {
      // Find good option
      const goodOpt =
        human.currentSituation.options.find((o) => o.quality === 'good') ||
        human.currentSituation.options[0];

      // Success: applies good fx, helper gains +1 goodwill, helper tokens +1 (max 3), human -1 token
      const newHealth = clamp(coopHealth + (goodOpt.fx.health || 0), 0, 10);
      const newBudget = clamp(coopBudget + (goodOpt.fx.budget || 0), 0, 100);

      const updatedPlayers = [...coopPlayers];
      // Human:
      updatedPlayers[humanIdx] = {
        ...human,
        tokens: Math.max(0, human.tokens - 1),
        currentSituation: null,
        statusText: 'Đã cùng đồng đội giải quyết xuất sắc!',
      };
      // Partner:
      updatedPlayers[partnerIdx] = {
        ...partner,
        goodwill: Math.min(5, partner.goodwill + 1),
        tokens: Math.min(3, partner.tokens + 1),
      };

      set((state) => ({
        coopHealth: newHealth,
        coopBudget: newBudget,
        coopPlayers: updatedPlayers,
        coopStatsTracker: {
          ...state.coopStatsTracker,
          helpsGiven: state.coopStatsTracker.helpsGiven + 1,
          situationsHandled: state.coopStatsTracker.situationsHandled + 1,
        },
      }));

      playSuccessChime();
      get().addToast(
        `🤝 ${partner.name} nhiệt tình đồng ý hỗ trợ! Tình huống đã được giải quyết hoàn hảo.`,
        'success'
      );
    } else {
      // Rejection
      const updatedPlayers = [...coopPlayers];
      updatedPlayers[humanIdx] = {
        ...human,
        tokens: Math.max(0, human.tokens - 1),
      };

      set({ coopPlayers: updatedPlayers });
      get().addToast(
        `❌ ${partner.name} đang quá bận và từ chối hỗ trợ. Bạn bị mất 1 Token!`,
        'error'
      );
    }
  },

  coopVoteCrisis: (optionKey) => {
    const { coopPlayers, coopCrisisVotes } = get();
    const human = coopPlayers.find((p) => p.isHuman);
    if (!human) return;

    if (coopCrisisVotes.some((v) => v.playerId === human.id)) return;

    const newVotes = [
      ...coopCrisisVotes,
      {
        playerId: human.id,
        playerName: human.name,
        avatar: human.avatar,
        optionKey,
      },
    ];

    set({ coopCrisisVotes: newVotes });
    get().addToast(`Bạn đã bỏ phiếu cho phương án ${optionKey}`, 'info');
  },

  dismissCoopDualRole: () => {
    set({ coopDualRolePrompt: null });
  },

  dismissCoopOvertime: () => {
    const { coopPlayers } = get();
    // "mỗi người mất 2 điểm ở kỹ năng cao nhất, health hồi 3/10, ca tiếp tục"
    const penalisedPlayers = coopPlayers.map((p) => {
      const skills = { ...p.skills };
      const keys: SkillKey[] = ['C', 'P', 'A', 'T', 'E'];
      let highestKey: SkillKey = 'P';
      let highestVal = -1;

      keys.forEach((k) => {
        if (skills[k] > highestVal) {
          highestVal = skills[k];
          highestKey = k;
        }
      });

      skills[highestKey] = Math.max(0, skills[highestKey] - 2);
      return { ...p, skills };
    });

    set({
      coopPhase: 'playing',
      coopOvertimeModalOpen: false,
      coopHealth: 3,
      coopPlayers: penalisedPlayers,
    });

    get().addToast('⚡ TĂNG CA KHẨN CẤP: Vận hành hồi sinh 3/10, ca trực tiếp tục!', 'warning');
  },

  restartCoop: () => {
    get().initCoopLobby();
  },
}));
