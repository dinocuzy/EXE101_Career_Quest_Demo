import {
  CoopPlayer,
  CrisisSituation,
  CrisisVote,
  HospitalityPack,
  OptionFx,
  Role,
  Situation,
  SkillsState,
  SkillKey,
} from '../types/game';
import { clamp } from './soloEngine';

export const BOT_CANDIDATES = [
  { name: 'Minh Anh', avatar: '👩🏻‍💼' },
  { name: 'Gia Bảo', avatar: '👨🏻‍💻' },
  { name: 'Thu Hà', avatar: '👩🏻‍🎨' },
];

export const CRISIS_MAIN_SKILL: Record<string, SkillKey> = {
  K1: 'P',
  K2: 'A',
  K3: 'E',
};

export const SKILL_COOP_TITLES: Record<SkillKey, { title: string; desc: string; badge: string }> = {
  P: { title: 'The Strategist', desc: 'Tư duy chiến lược, giải quyết vấn đề xuất sắc', badge: '🧩' },
  C: { title: 'The Diplomat', desc: 'Bậc thầy giao tiếp, gắn kết tập thể', badge: '💬' },
  A: { title: 'The Innovator', desc: 'Thích ứng linh hoạt, khai mở hướng đi mới', badge: '🌊' },
  T: { title: 'The Anchor', desc: 'Chỗ dựa đồng đội kiên định, hỗ trợ hết lòng', badge: '⚓' },
  E: { title: 'The Guardian', desc: 'Người bảo hộ chuẩn mực đạo đức & trách nhiệm', badge: '🛡️' },
};

export function determineCoopTitle(skills: SkillsState): { title: string; desc: string; badge: string } {
  // Tie-breaker order: P, C, A, T, E
  const priority: SkillKey[] = ['P', 'C', 'A', 'T', 'E'];
  let highestKey: SkillKey = 'P';
  let highestVal = -1;

  for (const k of priority) {
    if (skills[k] > highestVal) {
      highestVal = skills[k];
      highestKey = k;
    }
  }

  return SKILL_COOP_TITLES[highestKey];
}

export function evaluateCoopTeam(health: number, budget: number): {
  rating: 'Xuất sắc' | 'Sóng gió' | 'Khủng hoảng';
  color: string;
  bg: string;
  desc: string;
} {
  let baseRating: 'Xuất sắc' | 'Sóng gió' | 'Khủng hoảng';
  if (health >= 7) {
    baseRating = 'Xuất sắc';
  } else if (health >= 4) {
    baseRating = 'Sóng gió';
  } else {
    baseRating = 'Khủng hoảng';
  }

  // Downgrade 1 level if budget < 20%
  if (budget < 20) {
    if (baseRating === 'Xuất sắc') baseRating = 'Sóng gió';
    else if (baseRating === 'Sóng gió') baseRating = 'Khủng hoảng';
  }

  if (baseRating === 'Xuất sắc') {
    return {
      rating: 'Xuất sắc',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-300',
      desc: 'Bộ phận vận hành trơn tru như bộ máy Thụy Sĩ! Cả 4 thành viên hỗ trợ nhau mẫu mực và kiểm soát rủi ro tuyệt hảo.',
    };
  } else if (baseRating === 'Sóng gió') {
    return {
      rating: 'Sóng gió',
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-300',
      desc: 'Ca trực nhiều thăng trầm, có những lúc suýt vỡ trận nhưng cả đội đã kịp thời gồng gánh nhau vượt qua khó khăn.',
    };
  } else {
    return {
      rating: 'Khủng hoảng',
      color: 'text-rose-700',
      bg: 'bg-rose-50 border-rose-300',
      desc: 'Khách sạn chịu tổn thất nặng nề do nhiều mắt xích bị quá tải và đùn đẩy việc; cần rèn luyện thêm kỹ năng ứng biến khẩn cấp.',
    };
  }
}

export function getNextPlayerIndex(currentIndex: number, total: number = 4): number {
  return (currentIndex + 1) % total;
}

export function findTieBreakerPlayer(
  crisisId: string,
  players: CoopPlayer[]
): CoopPlayer {
  const mainSkill = CRISIS_MAIN_SKILL[crisisId] || 'P';
  let bestPlayer = players[0];
  let bestScore = -1;

  for (const p of players) {
    const score = p.skills[mainSkill] || 0;
    if (score > bestScore) {
      bestScore = score;
      bestPlayer = p;
    }
  }

  return bestPlayer;
}
