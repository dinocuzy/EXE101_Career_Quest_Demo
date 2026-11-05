export interface GenshinSkillEffect {
  title: string;
  subtitle: string;
  description: string;
  usageLimit?: string;
}

export interface GenshinCardAbility {
  badge: string;
  name: string;
  diceCost: { type: 'normal' | 'special' | 'energy'; count: number }[];
  description: string;
  subEffect?: GenshinSkillEffect;
}

export interface GenshinRoleCardData {
  id: 'LT' | 'HD' | 'DP' | 'PV';
  titleBadge: string;
  name: string;
  titleEn: string;
  industry: string;
  element: string;
  elementColor: string;
  characterImg: string;
  cardTheme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  quote: string;
  stats: {
    difficulty: number; // 1-5
    stressLevel: number; // 1-5
    customerInteraction: number; // 1-5
  };
  requiredSkills: {
    key: 'C' | 'P' | 'A' | 'T' | 'E';
    name: string;
    level: number; // 1-5
    description: string;
  }[];
  abilities: GenshinCardAbility[];
}

export const GENSHIN_ROLE_CARDS: Record<string, GenshinRoleCardData> = {
  LT: {
    id: 'LT',
    titleBadge: 'Thẻ Nghề Nghiệp • Tiền Sảnh',
    name: 'Lễ Tân Khách Sạn',
    titleEn: 'Front Office Agent',
    industry: 'Hospitality & Luxury Hotels',
    element: 'Tiền Sảnh 5 Sao',
    elementColor: '#D97706',
    characterImg: '/cards/receptionist_real.jpg',
    cardTheme: {
      primary: '#9A3412',
      secondary: '#C2410C',
      accent: '#F59E0B',
      gradient: 'from-[#F59E0B] via-[#EA580C] to-[#9A3412]',
    },
    quote: 'Nụ cười chuyên nghiệp và cái đầu lạnh lúc nửa đêm là chìa khóa giữ trọn uy tín 5 sao.',
    stats: {
      difficulty: 4,
      stressLevel: 5,
      customerInteraction: 5,
    },
    requiredSkills: [
      { key: 'C', name: 'Giao Tiếp & Xoa Dịu', level: 5, description: 'Lắng nghe và dùng từ ngữ lịch thiệp xoa dịu khách VIP phàn nàn.' },
      { key: 'P', name: 'Xử Lý Sự Cố Tiền Sảnh', level: 4, description: 'Phản xạ giải quyết nhanh tình trạng quá phòng (Overbooking) và lỗi đặt phòng.' },
      { key: 'E', name: 'Tư Duy Dịch Vụ Chuẩn Mực', level: 5, description: 'Đảm bảo sự hài lòng tuyệt đối của khách trong khuôn khổ quy trình khách sạn.' },
      { key: 'A', name: 'Thích Ứng Ca Đêm', level: 4, description: 'Giữ tỉnh táo và kiên nhẫn trong các ca trực xuyên đêm 23:00 - 07:00.' },
      { key: 'T', name: 'Phối Hợp Buồng Phòng & Bảo Vệ', level: 3, description: 'Kết nối nhịp nhàng với bộ phận Housekeeping khi khách nhận phòng trễ.' },
    ],
    abilities: [
      {
        badge: 'Nhiệm Vụ Thường Nhật',
        name: 'Check-in Tiền Sảnh & Phân Buồng',
        diceCost: [
          { type: 'normal', count: 1 },
          { type: 'special', count: 2 },
        ],
        description: 'Thực hiện thủ tục nhận phòng cho khách: Đón tiếp niềm nở, kiểm tra hộ chiếu, cấp khóa phòng và cập nhật hệ thống PMS trong 3 phút đầu tiên.',
      },
      {
        badge: 'Kỹ Năng Nghiệp Vụ Cốt Lõi',
        name: 'Xoa Dịu Khách VIP (De-escalation)',
        diceCost: [
          { type: 'special', count: 3 },
        ],
        description: 'Khi đối mặt khách hàng tức giận vì phòng chưa dọn: Tăng +2 Điểm Dịch Vụ Khách Hàng, kích hoạt trạng thái Kiểm Soát Áp Lực.',
        subEffect: {
          title: 'Kiểm Soát Áp Lực',
          subtitle: 'Trạng thái nghiệp vụ',
          description: 'Khi phát sinh sự cố quá phòng: Giảm 1 tiêu hao Năng Lượng, đồng thời +1 Danh Tiếng khách sạn.',
          usageLimit: 'Số lần khả dụng: 2',
        },
      },
      {
        badge: 'Tuyệt Kỹ Xử Lý Khủng Hoảng',
        name: 'Nâng Hạng Phòng & Tối Ưu Doanh Thu',
        diceCost: [
          { type: 'special', count: 3 },
          { type: 'energy', count: 2 },
        ],
        description: 'Xử lý dứt điểm khiếu nại nghiêm trọng: Nâng hạng phòng Suite khéo léo kết hợp tặng voucher minibar, tạo ra hiệu ứng Tiền Sảnh 5 Sao.',
        subEffect: {
          title: 'Tiền Sảnh 5 Sao',
          subtitle: 'Hiệu Ứng Xuất Sắc',
          description: 'Cuối ca trực: Nhận thêm +15% Điểm Báo Cáo AI Career Analysis và danh hiệu "Gương Mặt Đại Diện Khách Sạn".',
          usageLimit: 'Số lần khả dụng: 1',
        },
      },
    ],
  },

  HD: {
    id: 'HD',
    titleBadge: 'Thẻ Nghề Nghiệp • Lữ Hành',
    name: 'Hướng Dẫn Viên Du Lịch',
    titleEn: 'Tour Guide',
    industry: 'Tourism & Travel Operations',
    element: 'Lữ Hành Thực Địa',
    elementColor: '#059669',
    characterImg: '/cards/tour_guide_real.jpg',
    cardTheme: {
      primary: '#065F46',
      secondary: '#047857',
      accent: '#10B981',
      gradient: 'from-[#10B981] via-[#059669] to-[#065F46]',
    },
    quote: 'Chuyến đi có thể trắc trở vì bão tuyết sạt lở, nhưng nụ cười của du khách nằm ở sự dẫn dắt của bạn.',
    stats: {
      difficulty: 4,
      stressLevel: 4,
      customerInteraction: 5,
    },
    requiredSkills: [
      { key: 'C', name: 'Hoạt Ngôn & Truyền Cảm Hứng', level: 5, description: 'Thuyết minh lôi cuốn, kể chuyện văn hóa và giữ lửa tinh thần cho đoàn khách 30 người.' },
      { key: 'A', name: 'Ứng Biến Thời Tiết & Lịch Trình', level: 5, description: 'Linh hoạt đổi phương án khi gặp sạt lở đèo, bão lũ hoặc hoãn chuyến bay.' },
      { key: 'P', name: 'Xử Lý Lạc Đoàn & Y Tế', level: 4, description: 'Bình tĩnh tìm kiếm du khách thất lạc tại chợ đêm và sơ cứu y tế cơ bản.' },
      { key: 'T', name: 'Phối Hợp Tài Xế & Điểm Đến', level: 4, description: 'Làm việc ăn ý với bác tài và nhà hàng địa phương để đảm bảo an toàn tuyệt đối.' },
      { key: 'E', name: 'Tận Tâm & Chăm Sóc Đa Lứa Tuổi', level: 4, description: 'Thấu hiểu tâm lý trẻ nhỏ và người cao tuổi trong suốt chuyến hành trình.' },
    ],
    abilities: [
      {
        badge: 'Nhiệm Vụ Thường Nhật',
        name: 'Dẫn Đoàn & Thuyết Minh Di Sản',
        diceCost: [
          { type: 'normal', count: 1 },
          { type: 'special', count: 2 },
        ],
        description: 'Kiểm đếm quân số đoàn 30 người, điều phối thời gian ăn uống và truyền đạt thông điệp văn hóa điểm đến sinh động.',
      },
      {
        badge: 'Kỹ Năng Nghiệp Vụ Cốt Lõi',
        name: 'Xoay Chuyển Lịch Trình Khẩn Cấp',
        diceCost: [
          { type: 'special', count: 3 },
        ],
        description: 'Khi tuyến đường đèo sạt lở: Nhanh chóng đưa đoàn về điểm nghỉ chân an toàn, kích hoạt trạng thái Bản Lĩnh Đường Trường.',
        subEffect: {
          title: 'Bản Lĩnh Đường Trường',
          subtitle: 'Trạng thái nghiệp vụ',
          description: 'Hóa giải mọi bức xúc về trễ giờ của đoàn, tăng +2 Điểm Thích Ứng Linh Hoạt.',
          usageLimit: 'Số lần khả dụng: 2',
        },
      },
      {
        badge: 'Tuyệt Kỹ Xử Lý Khủng Hoảng',
        name: 'Hòa Giải Mâu Thuẫn Đoàn Tour',
        diceCost: [
          { type: 'special', count: 3 },
          { type: 'energy', count: 2 },
        ],
        description: 'Hóa giải xung đột gay gắt giữa 2 nhóm khách về chỗ ngồi, kết nối đoàn thành một tập thể gắn kết, tạo hiệu ứng Kỷ Niệm Khó Phai.',
        subEffect: {
          title: 'Kỷ Niệm Khó Phai',
          subtitle: 'Hiệu Ứng Xuất Sắc',
          description: 'Đoàn khách đồng lòng chấm điểm 5 sao cho công ty lữ hành, nhận danh hiệu "Đại Sứ Văn Hóa Du Lịch".',
          usageLimit: 'Số lần khả dụng: 1',
        },
      },
    ],
  },

  DP: {
    id: 'DP',
    titleBadge: 'Thẻ Nghề Nghiệp • Sự Kiện',
    name: 'Điều Phối Sự Kiện',
    titleEn: 'Event Coordinator',
    industry: 'Events & Media Production',
    element: 'Sân Khấu & Hậu Trường',
    elementColor: '#7C3AED',
    characterImg: '/cards/event_coordinator_real.jpg',
    cardTheme: {
      primary: '#5B21B6',
      secondary: '#6D28D9',
      accent: '#8B5CF6',
      gradient: 'from-[#8B5CF6] via-[#6D28D9] to-[#5B21B6]',
    },
    quote: 'Khi ánh đèn sân khấu bừng sáng, mọi sự cố hậu trường đều phải được giải quyết trong im lặng tuyệt đối.',
    stats: {
      difficulty: 5,
      stressLevel: 5,
      customerInteraction: 4,
    },
    requiredSkills: [
      { key: 'T', name: 'Chỉ Huy Bộ Đàm Đa Bộ Phận', level: 5, description: 'Đồng bộ âm thanh, ánh sáng, MC, khánh tiết và an ninh theo đúng từng giây timeline.' },
      { key: 'P', name: 'Phản Xạ Xử Lý Sự Cố Kỹ Thuật', level: 5, description: 'Xử lý ngay lập tức khi chập điện, cháy timeline hoặc MC vắng mặt phút chót.' },
      { key: 'A', name: 'Chịu Áp Lực Căng Thẳng Cao Độ', level: 5, description: 'Giữ bình tĩnh điều phối khi sự kiện có 500 khách VIP phát sinh ngoài dự kiến.' },
      { key: 'C', name: 'Đàm Phán & Thúc Ép Nhà Cung Cấp', level: 4, description: 'Kiểm soát chặt chẽ đối tác in ấn, backdrop, hoa tươi giao đúng hẹn.' },
      { key: 'E', name: 'Tỉ Mỉ & Trải Nghiệm Khách Mời', level: 4, description: 'Chăm chút từ bảng tên, quà tặng đến vị trí đón tiếp đại biểu.' },
    ],
    abilities: [
      {
        badge: 'Nhiệm Vụ Thường Nhật',
        name: 'Chạy Timeline & Điều Phối Hậu Trường',
        diceCost: [
          { type: 'normal', count: 1 },
          { type: 'special', count: 2 },
        ],
        description: 'Kiểm tra mic, màn hình LED, điều động PG khánh tiết và kiểm soát luồng di chuyển của 500 khách mời.',
      },
      {
        badge: 'Kỹ Năng Nghiệp Vụ Cốt Lõi',
        name: 'Kích Hoạt Kế Hoạch B (Contingency Plan)',
        diceCost: [
          { type: 'special', count: 3 },
        ],
        description: 'Khi MC chính hủy show trước 30 phút: Điều phối MC dự phòng lên thay thế mượt mà, kích hoạt trạng thái Sân Khấu Không Khoảng Lặng.',
        subEffect: {
          title: 'Sân Khấu Không Khoảng Lặng',
          subtitle: 'Trạng thái nghiệp vụ',
          description: 'Khán phòng không hề nhận ra sự cố, tăng +2 Điểm Làm Việc Nhóm và +1 Điểm Giải Quyết Vấn Đề.',
          usageLimit: 'Số lần khả dụng: 2',
        },
      },
      {
        badge: 'Tuyệt Kỹ Xử Lý Khủng Hoảng',
        name: 'Đồng Bộ Khủng Hoảng Âm Thanh',
        diceCost: [
          { type: 'special', count: 3 },
          { type: 'energy', count: 2 },
        ],
        description: 'Xử lý sự cố micro rè và mất nhạc mở màn trong 10 giây: Chuyển sang mic backup và hiệu ứng nhạc dự phòng, tạo hiệu ứng Show Diễn Hoàn Hảo.',
        subEffect: {
          title: 'Show Diễn Hoàn Hảo',
          subtitle: 'Hiệu Ứng Xuất Sắc',
          description: 'Sự kiện thành công rực rỡ, khách hàng ký hợp đồng tổ chức mùa tiếp theo, nhận danh hiệu "Bậc Thầy Sân Khấu".',
          usageLimit: 'Số lần khả dụng: 1',
        },
      },
    ],
  },

  PV: {
    id: 'PV',
    titleBadge: 'Thẻ Nghề Nghiệp • Ẩm Thực',
    name: 'Phục Vụ Nhà Hàng Cao Cấp',
    titleEn: 'Fine Dining Server',
    industry: 'Food & Beverage Operations',
    element: 'Nghệ Thuật Ẩm Thực',
    elementColor: '#BE123C',
    characterImg: '/cards/restaurant_server_real.jpg',
    cardTheme: {
      primary: '#881337',
      secondary: '#9F1239',
      accent: '#E11D48',
      gradient: 'from-[#E11D48] via-[#BE123C] to-[#881337]',
    },
    quote: 'Mỗi món ăn là một tác phẩm nghệ thuật, và người phục vụ là nhịp cầu thăng hoa cảm xúc của thực khách.',
    stats: {
      difficulty: 3,
      stressLevel: 4,
      customerInteraction: 5,
    },
    requiredSkills: [
      { key: 'E', name: 'Tinh Tế & Chăm Sóc Khách Hàng', level: 5, description: 'Quan sát ánh mắt và cử chỉ của thực khách để đáp ứng nhu cầu trước khi họ lên tiếng.' },
      { key: 'A', name: 'Giữ Bình Tĩnh Giờ Cao Điểm', level: 5, description: 'Duy trì bước chân thanh thoát và phong thái nhã nhặn dù nhà hàng kín bàn 100%.' },
      { key: 'C', name: 'Giới Thiệu Ẩm Thực & Rượu Vang', level: 4, description: 'Tư vấn món ăn kèm rượu chuẩn vị, khéo léo Upsell món tráng miệng.' },
      { key: 'P', name: 'Xử Lý Đổ Vỡ & Dị Ứng Thực Phẩm', level: 4, description: 'Bảo vệ an toàn tính mạng thực khách dị ứng và dọn dẹp sự cố bàn ăn trong 60 giây.' },
      { key: 'T', name: 'Kết Nối Nhịp Nhàng Bếp & Bar', level: 4, description: 'Phối hợp với Bếp trưởng để điều tiết thời gian ra món khai vị và món chính hoàn hảo.' },
    ],
    abilities: [
      {
        badge: 'Nhiệm Vụ Thường Nhật',
        name: 'Set-up Bàn Tiệc & Phục Vụ Chuẩn Âu',
        diceCost: [
          { type: 'normal', count: 1 },
          { type: 'special', count: 2 },
        ],
        description: 'Sắp xếp dao nĩa chuẩn khoảng cách 2cm từ mép bàn, rót rượu vang đúng nhiệt độ và phục vụ theo chiều kim đồng hồ.',
      },
      {
        badge: 'Kỹ Năng Nghiệp Vụ Cốt Lõi',
        name: 'Xử Lý Sự Cố Đổ Rượu Lên Áo Khách',
        diceCost: [
          { type: 'special', count: 3 },
        ],
        description: 'Khi xảy ra va chạm làm bẩn áo khách: Ngay lập tức xin lỗi lịch thiệp, cung cấp khăn lạnh tẩy khẩn cấp và miễn phí món chính, kích hoạt trạng thái Xoa Dịu Tinh Tế.',
        subEffect: {
          title: 'Xoa Dịu Tinh Tế',
          subtitle: 'Trạng thái nghiệp vụ',
          description: 'Khách hàng ấn tượng với phong thái xử lý văn minh, tăng +2 Điểm Tư Duy Dịch Vụ.',
          usageLimit: 'Số lần khả dụng: 2',
        },
      },
      {
        badge: 'Tuyệt Kỹ Xử Lý Khủng Hoảng',
        name: 'Điều Tiết Căng Thẳng Bếp Ra Món Chậm',
        diceCost: [
          { type: 'special', count: 3 },
          { type: 'energy', count: 2 },
        ],
        description: 'Khi bếp quá tải làm trễ món 30 phút: Tặng món ăn nhẹ từ Bếp trưởng kèm lời giải thích chân thành, tạo hiệu ứng Bữa Tiệc Đáng Nhớ.',
        subEffect: {
          title: 'Bữa Tiệc Đáng Nhớ',
          subtitle: 'Hiệu Ứng Xuất Sắc',
          description: 'Bàn tiệc chuyển từ phàn nàn sang khen ngợi và để lại tiền tip hậu hĩnh, nhận danh hiệu "Nghệ Sĩ Phục Vụ 5 Sao".',
          usageLimit: 'Số lần khả dụng: 1',
        },
      },
    ],
  },
};

