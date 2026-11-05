import React, { useState } from 'react';
import { Role, SkillKey } from '../types/game';
import { 
  RotateCw, 
  CheckCircle2, 
  X, 
  Building2, 
  AlertTriangle, 
  Sparkles, 
  Briefcase,
  Layers,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface RoleDetailInfo {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  industry: string;
  realImage: string;
  tagline: string;
  workplace: string;
  shiftHours: string;
  typicalCrisis: string;
  roleSummary: string;
  dailyDuties: string[];
  requiredSkills: {
    key: SkillKey;
    name: string;
    levelName: string;
    percent: number;
    description: string;
    color: string;
  }[];
}

export const ROLE_CARD_DETAILS: Record<string, RoleDetailInfo> = {
  LT: {
    id: 'LT',
    code: 'CQ-HOSP-01',
    name: 'Lễ Tân Khách Sạn',
    nameEn: 'Front Office Receptionist',
    industry: 'Khách Sạn & Nghỉ Dưỡng 4-5 Sao',
    realImage: '/cards/receptionist_real.jpg',
    tagline: 'Gương mặt đại diện thương hiệu — Giữ nụ cười chuẩn mực và cái đầu lạnh lúc nửa đêm.',
    workplace: 'Quầy tiền sảnh (Front Desk) khách sạn cao cấp',
    shiftHours: 'Xoay ca 8h (Sáng 06:00-14:00 | Chiều 14:00-22:00 | Đêm 22:00-06:00)',
    typicalCrisis: 'Quá phòng (Overbooking), khách VIP nhận phòng trễ, hóa đơn minibar sai lệch.',
    roleSummary: 'Chịu trách nhiệm đón tiếp, làm thủ tục Check-in/Check-out, phân phối phòng và đóng vai trò cầu nối giải quyết mọi thắc mắc, khiếu nại của khách lưu trú trong suốt kỳ nghỉ.',
    dailyDuties: [
      'Tiếp đón khách, xác thực thông tin hộ chiếu và phân buồng trên phần mềm PMS.',
      'Điều phối yêu cầu khách hàng với bộ phận Buồng phòng (Housekeeping) và Kỹ thuật.',
      'Xử lý tình huống phàn nàn về dịch vụ và kiểm soát hóa đơn thanh toán trước khi khách rời đi.'
    ],
    requiredSkills: [
      { key: 'C', name: 'Giao Tiếp & Xoa Dịu', levelName: 'Rất quan trọng', percent: 95, description: 'Lắng nghe chân thành, dùng ngôn từ lịch thiệp xoa dịu khách VIP bức xúc.', color: 'bg-blue-600' },
      { key: 'E', name: 'Tư Duy Dịch Vụ Chuẩn Mực', levelName: 'Rất quan trọng', percent: 90, description: 'Đặt trải nghiệm của khách làm trung tâm trong khuôn khổ quy chuẩn khách sạn.', color: 'bg-rose-600' },
      { key: 'P', name: 'Xử Lý Sự Cố Tiền Sảnh', levelName: 'Quan trọng', percent: 85, description: 'Phản xạ nhanh trước sự cố quá phòng, lỗi hệ thống đặt phòng hoặc phòng chưa dọn.', color: 'bg-purple-600' },
      { key: 'A', name: 'Thích Ứng Áp Lực Ca Đêm', levelName: 'Cần thiết', percent: 80, description: 'Giữ tỉnh táo, cẩn trọng khi trực đêm một mình và đối mặt khách say xỉn.', color: 'bg-amber-600' },
      { key: 'T', name: 'Phối Hợp Buồng Phòng & Bảo Vệ', levelName: 'Cần thiết', percent: 75, description: 'Kết nối nhịp nhàng với buồng phòng khi khách nhận phòng gấp.', color: 'bg-emerald-600' }
    ]
  },
  HD: {
    id: 'HD',
    code: 'CQ-HOSP-02',
    name: 'Hướng Dẫn Viên Du Lịch',
    nameEn: 'International Tour Guide',
    industry: 'Lữ Hành & Dịch Vụ Du Lịch',
    realImage: '/cards/tour_guide_real.jpg',
    tagline: 'Đại sứ văn hóa thực địa — Dẫn dắt hành trình, gắn kết du khách và làm chủ mọi địa hình.',
    workplace: 'Tuyến điểm du lịch, trên xe tour, khách sạn và danh lam thắng cảnh',
    shiftHours: 'Theo đoàn tour (12h - 16h/ngày, di chuyển liên tục)',
    typicalCrisis: 'Sạt lở đèo trễ giờ, khách lạc tại chợ đêm, mâu thuẫn tranh cãi chỗ ngồi trong đoàn.',
    roleSummary: 'Tổ chức, dẫn dắt và thuyết minh cho đoàn khách du lịch; chăm lo ăn uống, nghỉ ngơi, lịch trình và đảm bảo an toàn tuyệt đối cho du khách trước mọi biến cố thực tế.',
    dailyDuties: [
      'Kiểm đếm quân số, phổ biến nội quy an toàn và thuyết minh văn hóa, lịch sử điểm đến.',
      'Điều phối dịch vụ ăn uống, khách sạn và làm việc chặt chẽ với tài xế trên từng cung đường.',
      'Xử lý tình huống khẩn cấp về y tế, thời tiết xấu hoặc thất lạc hành lý, tư trang.'
    ],
    requiredSkills: [
      { key: 'C', name: 'Hoạt Ngôn & Truyền Cảm Hứng', levelName: 'Rất quan trọng', percent: 95, description: 'Kể chuyện lôi cuốn, tạo tiếng cười và giữ lửa tinh thần cho đoàn khách 30 người.', color: 'bg-blue-600' },
      { key: 'A', name: 'Ứng Biến Thời Tiết & Cung Đường', levelName: 'Rất quan trọng', percent: 95, description: 'Linh hoạt đổi phương án khi gặp sạt lở đèo, mưa bão hoặc hoãn hủy chuyến.', color: 'bg-amber-600' },
      { key: 'E', name: 'Tận Tâm & Chăm Sóc Đa Lứa Tuổi', levelName: 'Quan trọng', percent: 85, description: 'Thấu hiểu tâm lý từ trẻ em hiếu động đến người cao tuổi cần hỗ trợ sức khỏe.', color: 'bg-rose-600' },
      { key: 'P', name: 'Xử Lý Lạc Đoàn & Sơ Cứu', levelName: 'Quan trọng', percent: 80, description: 'Bình tĩnh tìm kiếm du khách lạc và xử lý các vấn đề say xe, dị ứng thực địa.', color: 'bg-purple-600' },
      { key: 'T', name: 'Phối Hợp Tài Xế & Điểm Đến', levelName: 'Cần thiết', percent: 80, description: 'Làm việc ăn ý với bác tài và nhà hàng địa phương để chuyến đi trơn tru.', color: 'bg-emerald-600' }
    ]
  },
  DP: {
    id: 'DP',
    code: 'CQ-HOSP-03',
    name: 'Điều Phối Sự Kiện',
    nameEn: 'Event Operations Coordinator',
    industry: 'Sự Kiện & Sản Xuất Truyền Thông',
    realImage: '/cards/event_coordinator_real.jpg',
    tagline: 'Tổng công trình sư hậu trường — Kiểm soát timeline từng giây khi ánh đèn sân khấu bừng sáng.',
    workplace: 'Trung tâm hội nghị, trung tâm tiệc cưới, sân khấu biểu diễn trực tiếp',
    shiftHours: 'Theo đợt setup sự kiện (Có thể làm xuyên đêm trước ngày chạy show)',
    typicalCrisis: 'MC chính vắng mặt, micro hỏng phút chót, khách phát sinh vượt 20% số ghế chuẩn bị.',
    roleSummary: 'Chỉ huy và kết nối toàn bộ các mắt xích hậu cần (âm thanh, ánh sáng, MC, khánh tiết, quà tặng, an ninh) đảm bảo chương trình diễn ra chuẩn xác theo kịch bản timeline chi tiết.',
    dailyDuties: [
      'Kiểm tra kỹ thuật sân khấu (màn hình LED, micro, cue ánh sáng) trước giờ mở màn.',
      'Điều phối nhân sự PG, bảo vệ, điều hướng đón tiếp khách mời VIP vào đúng vị trí.',
      'Trực bộ đàm liên tục để ứng biến với các sự cố phát sinh ngoài kịch bản.'
    ],
    requiredSkills: [
      { key: 'T', name: 'Chỉ Huy Bộ Đàm Đa Bộ Phận', levelName: 'Rất quan trọng', percent: 95, description: 'Đồng bộ nhịp nhàng âm thanh, ánh sáng, khâu khánh tiết và đạo diễn sự kiện.', color: 'bg-emerald-600' },
      { key: 'P', name: 'Xử Lý Sự Cố Kỹ Thuật Phút Chót', levelName: 'Rất quan trọng', percent: 95, description: 'Kích hoạt Kế hoạch B ngay khi micro rè, MC hủy show hoặc thiếu thiết bị.', color: 'bg-purple-600' },
      { key: 'A', name: 'Chịu Áp Lực Căng Thẳng Cao Độ', levelName: 'Rất quan trọng', percent: 90, description: 'Giữ cái đầu lạnh trước áp lực hàng trăm khách VIP và sếp lớn đang quan sát.', color: 'bg-amber-600' },
      { key: 'C', name: 'Đàm Phán & Thúc Ép Nhà Cung Cấp', levelName: 'Quan trọng', percent: 80, description: 'Kiểm soát chặt chẽ đối tác in ấn backdrop, hoa tươi giao đúng thời hạn cam kết.', color: 'bg-blue-600' },
      { key: 'E', name: 'Tỉ Mỉ & Trải Nghiệm Khách Mời', levelName: 'Cần thiết', percent: 80, description: 'Chăm chút từ bảng tên, góc chụp ảnh check-in đến món tráng miệng tiệc trà.', color: 'bg-rose-600' }
    ]
  },
  PV: {
    id: 'PV',
    code: 'CQ-HOSP-04',
    name: 'Phục Vụ Nhà Hàng Cao Cấp',
    nameEn: 'Fine Dining Server',
    industry: 'Ẩm Thực & Dịch Vụ Đẳng Cấp',
    realImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    tagline: 'Nghệ thuật phục vụ bàn tiệc — Cầu nối thăng hoa cảm xúc ẩm thực của từng thực khách.',
    workplace: 'Nhà hàng món Âu cao cấp, khách sạn 5 sao, quầy tiệc VIP',
    shiftHours: 'Theo ca dịch vụ (Ca trưa 10:00-14:00 | Ca tối 17:00-22:00)',
    typicalCrisis: 'Bưng bê đổ rượu lên áo khách, khách dị ứng món ăn, bếp ra món chậm 30 phút.',
    roleSummary: 'Chăm sóc và phục vụ thực khách theo quy chuẩn ẩm thực cao cấp; set-up bàn tiệc chuẩn quốc tế, giới thiệu thực đơn món ăn, tư vấn rượu vang và xử lý sự cố phát sinh trên bàn ăn.',
    dailyDuties: [
      'Set-up bàn ăn chuẩn xác từng cm (dao, nĩa, ly rượu vang, khăn ăn gấp nghệ thuật).',
      'Giới thiệu thực đơn, ghi order và tư vấn kết hợp món ăn kèm thức uống.',
      'Quan sát tinh tế nhu cầu thực khách để châm rượu, dọn đĩa trống và thanh toán chu đáo.'
    ],
    requiredSkills: [
      { key: 'E', name: 'Tinh Tế & Chăm Sóc Khách Hàng', levelName: 'Rất quan trọng', percent: 95, description: 'Nắm bắt ánh mắt cử chỉ của khách để phục vụ trước khi khách phải lên tiếng yêu cầu.', color: 'bg-rose-600' },
      { key: 'A', name: 'Giữ Bình Tĩnh Giờ Cao Điểm', levelName: 'Rất quan trọng', percent: 90, description: 'Giữ phong thái thanh lịch, không cuống quýt dù nhà hàng kín bàn 100%.', color: 'bg-amber-600' },
      { key: 'P', name: 'Xử Lý Đổ Vỡ & Dị Ứng Thực Phẩm', levelName: 'Quan trọng', percent: 80, description: 'Khéo léo xử lý khi làm đổ rượu hoặc khi thực khách phản ánh món ăn có vấn đề.', color: 'bg-purple-600' },
      { key: 'C', name: 'Giới Thiệu Ẩm Thực & Rượu Vang', levelName: 'Quan trọng', percent: 80, description: 'Truyền tải câu chuyện món ăn và khéo léo Upsell món tráng miệng, rượu vang.', color: 'bg-blue-600' },
      { key: 'T', name: 'Phối Hợp Nhịp Nhàng Bếp & Bar', levelName: 'Cần thiết', percent: 80, description: 'Liên tục cập nhật với Bếp trưởng để điều tiết thời gian ra món chuẩn xác.', color: 'bg-emerald-600' }
    ]
  }
};

interface RoleFlipCardModalProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: Role) => void;
  allRoles: Role[];
  onSwitchRole: (role: Role) => void;
}

export const RoleFlipCardModal: React.FC<RoleFlipCardModalProps> = ({
  role,
  isOpen,
  onClose,
  onSelectRole,
  allRoles,
  onSwitchRole,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const details = ROLE_CARD_DETAILS[role.id] || ROLE_CARD_DETAILS.LT;

  if (!isOpen) return null;

  const handleSelectAndStart = () => {
    onSelectRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      {/* Outer Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#F8FAFC] rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Hồ Sơ Vị Trí Nghề Nghiệp • Thẻ Thử Việc 2 Mặt
            </span>
          </div>

          {/* Role Tabs */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {allRoles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  onSwitchRole(r);
                  setIsFlipped(false);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                  r.id === role.id 
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {/* Card Presentation Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 3D Flip Card Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Card Container with Perspective */}
              <div 
                className="w-full max-w-[320px] aspect-[1/1.44] relative cursor-pointer select-none group"
                style={{ perspective: '1200px' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Inner Flip Wrapper with 3D Transform */}
                <div 
                  className="w-full h-full duration-700 transition-transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  
                  {/* ==================== MẶT TRƯỚC (FRONT FACE: TÊN ROLE & NHẬN DIỆN) ==================== */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden shadow-2xl border-2 border-amber-300/40 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-6 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                    
                    {/* Top Card Info */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-black tracking-wider uppercase">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Mặt Trước • Tên Vị Trí</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {details.code}
                      </span>
                    </div>

                    {/* Middle: Big Role Name & Icon */}
                    <div className="relative z-10 text-center my-auto py-6">
                      <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400/20 via-white/5 to-transparent border border-amber-400/40 flex items-center justify-center text-5xl shadow-inner mb-5">
                        {role.icon}
                      </div>

                      <span className="text-[11px] font-bold text-amber-400/90 tracking-widest uppercase block mb-1">
                        Vị Trí Thử Việc Ca Trực
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                        {details.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 mt-1">
                        {details.nameEn}
                      </p>

                      <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mt-4 mb-4"></div>

                      <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 font-medium px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                        <Building2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>{details.industry}</span>
                      </div>
                    </div>

                    {/* Bottom Card Footer */}
                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">
                        Career Request • FPT University
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black animate-pulse">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Chạm để xem Mặt Sau</span>
                      </div>
                    </div>
                  </div>

                  {/* ==================== MẶT SAU (BACK FACE: ẢNH NHÂN VẬT THỰC TẾ & THÔNG TIN) ==================== */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden shadow-2xl border-2 border-slate-300 bg-white text-slate-900 p-5 flex flex-col justify-between"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* Top: Portrait & Basic Specs */}
                    <div>
                      {/* Photo Container */}
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 relative mb-3 bg-slate-100 shadow-inner">
                        <img 
                          src={details.realImage} 
                          alt={details.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold">
                          Chân Dung Nghề Nghiệp Thực Tế
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900">
                          {details.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          Mã #{role.id}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed mb-3">
                        {details.roleSummary}
                      </p>
                    </div>

                    {/* Middle: 3 Quick Stats */}
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 grid grid-cols-2 gap-2 text-[10px] mb-2">
                      <div>
                        <span className="text-slate-400 block font-bold">Nơi làm việc:</span>
                        <span className="font-semibold text-slate-700 line-clamp-1">{details.workplace}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Thời gian ca:</span>
                        <span className="font-semibold text-slate-700 line-clamp-1">{details.shiftHours}</span>
                      </div>
                    </div>

                    {/* Bottom: Skills Summary Teaser */}
                    <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-black text-slate-800">
                        Kỹ Năng Trọng Tâm:
                      </span>
                      <div className="flex gap-1">
                        {details.requiredSkills.slice(0, 3).map((sk) => (
                          <span key={sk.key} className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {sk.name.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <span className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
                        <RotateCw className="w-3 h-3 text-slate-500" /> Nhấn để lật lại mặt trước
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Flip Button Toggle */}
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-black shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
                <span>{isFlipped ? '← Xem Mặt Trước (Tên Vị Trí)' : '→ Lật Xem Mặt Sau (Ảnh Thật & Kỹ Năng)'}</span>
              </button>
            </div>

            {/* Right Column: Detailed Job Information & Required Skills (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Block 1: Role Overview & Tagline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black mb-3">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Hồ Sơ Chi Tiết Nghề Nghiệp</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {details.name}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  Tên tiếng Anh: <strong className="text-slate-700">{details.nameEn}</strong> • Ngành: <strong className="text-slate-700">{details.industry}</strong>
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 mt-3 text-xs text-amber-950 font-medium leading-relaxed italic">
                  "{details.tagline}"
                </div>
              </div>

              {/* Block 2: Daily Mission & Real-World Reality */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Nhiệm Vụ Thực Tế Trong Ca Làm Việc</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {details.dailyDuties.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-rose-700 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                  <span><strong>Áp lực công việc điển hình:</strong> {details.typicalCrisis}</span>
                </div>
              </div>

              {/* Block 3: Required Skills (Kỹ năng cần có) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bộ Kỹ Năng Đo Lường & Yêu Cầu Của Vị Trí</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 font-bold">Thang đo năng lực 100%</span>
                </div>

                <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  {details.requiredSkills.map((sk) => (
                    <div key={sk.key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          {sk.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-500">{sk.levelName}</span>
                          <span className="font-mono font-black text-slate-900">{sk.percent}%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${sk.color} transition-all duration-700`}
                          style={{ width: `${sk.percent}%` }}
                        ></div>
                      </div>

                      <p className="text-[10px] text-slate-500 font-normal pl-3">
                        {sk.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSelectAndStart}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#5B25F5] hover:bg-[#481bcc] text-white text-sm font-black shadow-lg shadow-violet-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Chọn Vị Trí Này & Bắt Đầu Thử Việc</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Đóng & Chọn Lại
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
