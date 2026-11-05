import {
  DecisionLog,
  GameOverReason,
  HospitalityPack,
  OptionFx,
  PlayerStats,
  Role,
  Situation,
  SituationOption,
  SkillsState,
} from '../types/game';

export const SHIFT_HOURS = [
  '08:00',
  '12:00',
  '16:00',
  '20:00',
  '00:00',
  '04:00',
  '08:00 (Hết ca)',
];

export function buildSoloCardSequence(
  pack: HospitalityPack,
  roleId: Role['id']
): Situation[] {
  const roleCards = pack.situations.filter((s) => s.role === roleId);
  const sharedCards = pack.situations.filter((s) => s.role === 'ALL');

  const r1 = roleCards[0];
  const r2 = roleCards[1];
  const r3 = roleCards[2];
  const r4 = roleCards[3];

  const s1 = sharedCards[0];
  const s2 = sharedCards[1];

  // Sequence: [Role1, Role2, ALL1, Role3, Role4, ALL2]
  return [r1, r2, s1, r3, r4, s2].filter(Boolean);
}

export function clamp(val: number, min: number = 0, max: number = 10): number {
  return Math.max(min, Math.min(max, val));
}

export function applyEffects(
  prevStats: PlayerStats,
  fx: OptionFx
): PlayerStats {
  const newSkills: SkillsState = {
    C: clamp(prevStats.skills.C + (fx.skills.C ?? 0)),
    P: clamp(prevStats.skills.P + (fx.skills.P ?? 0)),
    A: clamp(prevStats.skills.A + (fx.skills.A ?? 0)),
    T: clamp(prevStats.skills.T + (fx.skills.T ?? 0)),
    E: clamp(prevStats.skills.E + (fx.skills.E ?? 0)),
  };

  return {
    energy: clamp(prevStats.energy + fx.energy),
    rep: clamp(prevStats.rep + fx.rep),
    skills: newSkills,
  };
}

export function checkFailSafe(stats: PlayerStats): GameOverReason | null {
  if (stats.energy <= 0) return 'burnout';
  if (stats.rep <= 0) return 'fired';
  return null;
}

export function executeColleagueHelp(
  currentStats: PlayerStats,
  situation: Situation
): {
  success: boolean;
  message: string;
  autoGoodOption?: SituationOption;
  appliedFx?: OptionFx;
  updatedStats: PlayerStats;
} {
  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    // Find good option
    const goodOption = situation.options.find((o) => o.quality === 'good') || situation.options[0];
    
    // "nhưng energy bớt -1 (tối thiểu 0 thay đổi)"
    // e.g. If normal energy is -2, it becomes -1. If -1, becomes 0. If 0, stays 0.
    const mitigatedEnergy = Math.min(0, goodOption.fx.energy + 1);

    const mitigatedFx: OptionFx = {
      ...goodOption.fx,
      energy: mitigatedEnergy,
    };

    const newStats = applyEffects(currentStats, mitigatedFx);

    return {
      success: true,
      message: 'May mắn! Đồng nghiệp thân thiện đã hỗ trợ giải quyết xuất sắc.',
      autoGoodOption: goodOption,
      appliedFx: mitigatedFx,
      updatedStats: newStats,
    };
  } else {
    // "Xui (50%): bị trừ thêm 1 Năng lượng, vẫn phải tự chọn A/B/C"
    const penaltyStats: PlayerStats = {
      ...currentStats,
      energy: clamp(currentStats.energy - 1),
    };

    return {
      success: false,
      message: 'Không may! Đồng nghiệp cũng đang quá tải, bạn mất thêm 1 Năng lượng và phải tự xử lý.',
      updatedStats: penaltyStats,
    };
  }
}

export function generateLessonsLearned(
  reason: GameOverReason,
  history: DecisionLog[]
): string[] {
  if (reason === 'burnout') {
    return [
      'Biết cách đặt ranh giới: Đừng cố ôm đồm một mình mọi công việc khi cơ thể đã phát tín hiệu quá tải.',
      'Tận dụng sức mạnh đồng đội: Chủ động nhờ sự trợ giúp hoặc phối hợp liên bộ phận thay vì tự gánh vác.',
      'Bảo toàn sức bền: Trong ngành dịch vụ ca kíp, giữ vững năng lượng thể chất là điều kiện tiên quyết để phục vụ khách tốt.'
    ];
  }

  // Reason: fired
  const badChoicesCount = history.filter((h) => h.quality === 'bad').length;
  if (badChoicesCount > 0) {
    return [
      'Đặt sự an toàn và minh bạch lên hàng đầu: Không bao giờ được che giấu sự cố hay làm tắt quy trình.',
      'Giao tiếp thấu cảm: Lắng nghe và xin lỗi chân thành luôn làm dịu căng thẳng tốt hơn việc tranh cãi hoặc đổ lỗi.',
      'Báo cáo cấp trên đúng lúc: Khi sự cố vượt thẩm quyền, việc xin ý kiến quản lý sẽ bảo vệ chính bạn và tổ chức.'
    ];
  }

  return [
    'Học cách cân bằng giữa sự hài lòng của khách hàng và uy tín dịch vụ chuyên nghiệp.',
    'Trau dồi thêm kỹ năng ứng biến linh hoạt khi tình huống bất ngờ xảy ra.',
    'Mỗi sai lầm trong ca trực ảo là một kinh nghiệm quý giá cho con đường sự nghiệp thực tế.'
  ];
}
