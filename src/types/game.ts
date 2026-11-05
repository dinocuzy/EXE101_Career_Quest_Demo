export type SkillKey = 'C' | 'P' | 'A' | 'T' | 'E';

export interface SkillDeltas {
  C?: number;
  P?: number;
  A?: number;
  T?: number;
  E?: number;
}

export type OptionQuality = 'good' | 'ok' | 'bad';

export interface OptionFx {
  energy: number;
  rep: number;
  skills: SkillDeltas;
  health?: number;
  budget?: number;
  backlog?: boolean;
  costly?: boolean;
}

export interface SituationOption {
  key: 'A' | 'B' | 'C';
  text: string;
  fx: OptionFx;
  feedback: string;
  quality: OptionQuality;
}

export interface Stakeholder {
  name: string;
  type: 'Khách' | 'Sếp' | 'Đồng nghiệp' | 'Đối tác';
  avatar: string;
  line: string;
}

export interface Situation {
  id: string;
  role: 'LT' | 'HD' | 'DP' | 'PV' | 'ALL';
  stakeholder: Stakeholder;
  text: string;
  timeLimit: number;
  options: SituationOption[];
}

export interface Role {
  id: 'LT' | 'HD' | 'DP' | 'PV';
  name: string;
  icon: string;
  desc: string;
  topSkills: SkillKey[];
}

export interface CrisisOption {
  key: 'A' | 'B' | 'C';
  text: string;
  fx: OptionFx;
  feedback: string;
}

export interface CrisisSituation {
  id: string;
  title: string;
  text: string;
  timeLimit: number;
  options: CrisisOption[];
}

export interface HospitalityPack {
  industry: string;
  industryName: string;
  roles: Role[];
  situations: Situation[];
  stakeholders?: Stakeholder[];
  crisis: CrisisSituation[];
}

export interface SkillsState {
  C: number;
  P: number;
  A: number;
  T: number;
  E: number;
}

export interface PlayerStats {
  energy: number; // 0 - 10
  rep: number;    // 0 - 10
  skills: SkillsState;
}

export type GameScreen =
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

export type CoopPhase = 'lobby' | 'playing' | 'crisis' | 'overtime' | 'summary';

export interface CoopPlayer {
  id: string; // 'p1' (human), 'p2', 'p3', 'p4' (bots)
  name: string;
  isHuman: boolean;
  role: Role;
  avatar: string;
  skills: SkillsState;
  goodwill: number; // 0 - 5 (hearts)
  tokens: number;   // 0 - 3
  queue: Situation[];
  currentSituation: Situation | null;
  isHighDemand?: boolean;
  timeRemaining?: number;
  history: DecisionLog[];
  statusText?: string;
  badgeTitle?: string;
}

export interface RippleNotification {
  id: string;
  fromPlayerName: string;
  fromRoleName: string;
  toPlayerName: string;
  toRoleName: string;
  fromAvatar: string;
  toAvatar: string;
  situationTitle: string;
  timestamp: number;
}

export interface CrisisVote {
  playerId: string;
  playerName: string;
  avatar: string;
  optionKey: 'A' | 'B' | 'C';
}

export type GameOverReason = 'burnout' | 'fired';

export interface DecisionLog {
  situationId: string;
  situationText: string;
  stakeholderName: string;
  chosenKey: 'A' | 'B' | 'C' | 'colleague';
  optionText: string;
  feedback: string;
  quality: OptionQuality;
  fx: OptionFx;
  wasColleagueAssisted?: boolean;
  timestamp: number;
}

export interface AnalyticsEvent {
  eventName: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

export interface PlayerTitle {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  bgGradient: string;
  textColor: string;
}

export type PriceVariant = 49000 | 79000 | 119000;

export interface StrengthItem {
  title: string;
  evidence: string;
  skill: string;
}

export interface ImprovementItem {
  title: string;
  advice: string;
  skill: string;
}

export interface SuggestedRoleItem {
  role: string;
  matchPercent: number;
  reason: string;
}

export interface SubjectComboItem {
  name: string;
  reason: string;
}

export interface AIReportData {
  workStyleSummary: string;
  strengths: StrengthItem[];
  improvements: ImprovementItem[];
  suggestedRoles: SuggestedRoleItem[];
  subjectCombos: SubjectComboItem[];
  nextSteps: string[];
  isFallback?: boolean;
}

export interface BadgeItem {
  id: string;
  name: string;
  desc: string;
  requirement: string;
  unlocked: boolean;
}

export type AppThemeId = 'ruang_edit' | 'neo_quest' | 'vibrant_editorial' | 'cyber_arcade' | 'warm_crafted';

export interface ThemeConfig {
  id: AppThemeId;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  badgeBg: string;
  isDefault?: boolean;
}

export interface InvoiceData {
  invoiceId: string;
  sessionCode: string;
  date: string;
  amount: number;
  originalAmount: number;
  discountPercent: number;
  packageName: string;
  payerName: string;
  recipientName: string;
  paymentMethod: string;
  status: 'SUCCESS';
}

