import { PlayerTitle } from '../types/game';

export function calculateTitle(rep: number, energy: number): PlayerTitle {
  if (rep > 8 && energy > 4) {
    return {
      id: 'future_star',
      title: 'Ngôi Sao Tương Lai',
      badge: '🌟',
      tagline: 'Bản lĩnh vượt trội & Tràn đầy năng lượng',
      description: 'Bạn sở hữu sự điềm tĩnh phi thường, giải quyết khủng hoảng xuất sắc mà vẫn bảo toàn năng lượng bền bỉ suốt ca trực.',
      bgGradient: 'from-amber-400 via-orange-400 to-teal-500',
      textColor: 'text-amber-800'
    };
  }

  if (rep < 4 && energy > 7) {
    return {
      id: 'survivor',
      title: 'Kẻ Sống Sót Nhạt Nhòa',
      badge: '🛡️',
      tagline: 'An toàn trên hết & Giữ mình',
      description: 'Bạn giữ được năng lượng dồi dào nhưng còn ngại va chạm và chưa tạo được dấu ấn tin cậy với khách hàng và cấp trên.',
      bgGradient: 'from-slate-400 via-zinc-500 to-slate-600',
      textColor: 'text-slate-800'
    };
  }

  return {
    id: 'promising_intern',
    title: 'Thực Tập Sinh Tiềm Năng',
    badge: '🚀',
    tagline: 'Cầu tiến, linh hoạt & Đầy hứa hẹn',
    description: 'Bạn đã hoàn thành xuất sắc ca thử việc thực tế đầu đời, biết cân bằng các tình huống khó và sẵn sàng bứt phá.',
    bgGradient: 'from-teal-500 via-emerald-400 to-cyan-500',
    textColor: 'text-teal-900'
  };
}
