import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Building2, TrendingUp, Code2, Palette, CheckCircle2, Lock, ChevronRight, Sparkles, GraduationCap, DollarSign } from 'lucide-react';

interface CareerStation {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'active' | 'locked';
  unlockLevel: number;
  entranceExams: string; // Khối xét tuyển đại học
  startingSalary: string;
  description: string;
  rolesCount: number;
  accentColor: string;
}

const CAREER_STATIONS: CareerStation[] = [
  {
    id: 'hospitality',
    title: 'Quản Trị Khách Sạn & Du Lịch',
    category: 'Dịch vụ cao cấp',
    icon: Building2,
    status: 'active',
    unlockLevel: 1,
    entranceExams: 'D01 (Toán, Văn, Anh) • A00 • C00',
    startingSalary: '9 – 22 triệu/tháng',
    description: 'Trực tiếp đối mặt bài toán vận hành ca trực, xoa dịu khách VIP khó tính và điều phối sự cố đột xuất.',
    rolesCount: 4,
    accentColor: '#5B25F5',
  },
  {
    id: 'finance',
    title: 'Tài Chính & Phân Tích Kinh Doanh',
    category: 'Kinh tế & Đầu tư',
    icon: TrendingUp,
    status: 'locked',
    unlockLevel: 3,
    entranceExams: 'A00 (Toán, Lý, Hóa) • A01 • D01 • D07',
    startingSalary: '12 – 30 triệu/tháng',
    description: 'Thẩm định hồ sơ tín dụng, đọc báo cáo tài chính doanh nghiệp và đưa ra quyết định giải ngân triệu đô.',
    rolesCount: 4,
    accentColor: '#F59E0B',
  },
  {
    id: 'tech',
    title: 'Công Nghệ Thông Tin & Kỹ Sư AI',
    category: 'Khoa học công nghệ',
    icon: Code2,
    status: 'locked',
    unlockLevel: 4,
    entranceExams: 'A00 • A01 (Toán, Lý, Anh) • D07',
    startingSalary: '15 – 35 triệu/tháng',
    description: 'Xử lý sự cố sập server giờ cao điểm, tối ưu mô hình học máy (Machine Learning) và bảo mật dữ liệu.',
    rolesCount: 4,
    accentColor: '#3B82F6',
  },
  {
    id: 'media',
    title: 'Truyền Thông Số & Sáng Tạo Nội Dung',
    category: 'Nghệ thuật & Quảng cáo',
    icon: Palette,
    status: 'locked',
    unlockLevel: 5,
    entranceExams: 'D01 • D14 • C00 (Văn, Sử, Địa)',
    startingSalary: '10 – 25 triệu/tháng',
    description: 'Xử lý khủng hoảng truyền thông mạng xã hội, lên ý tưởng chiến dịch triệu view cho nhãn hàng trẻ.',
    rolesCount: 4,
    accentColor: '#EC4899',
  },
];

interface CareerRoadmapProps {
  onExploreCareer?: () => void;
}

export const CareerRoadmapSection: React.FC<CareerRoadmapProps> = ({ onExploreCareer }) => {
  const { setScreen, xp, addToast } = useGameStore();
  const [selectedStation, setSelectedStation] = useState<CareerStation>(CAREER_STATIONS[0]);

  const level = Math.floor(xp / 250) + 1;

  const handleStationClick = (station: CareerStation) => {
    setSelectedStation(station);
    if (station.status === 'locked') {
      addToast(`Trạm "${station.title}" sẽ mở khóa khi bạn đạt Cấp ${station.unlockLevel} (hiện tại: Cấp ${level})!`, 'info');
    }
  };

  const handleStartHospitality = () => {
    if (onExploreCareer) {
      onExploreCareer();
    } else {
      setScreen('mode_select');
    }
  };

  return (
    <section className="w-full bg-white rounded-[28px] p-6 sm:p-8 border border-[#E5DFFA] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#E5DFFA]">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#5B25F5] bg-[#F2EEF9] px-3.5 py-1 rounded-full border border-[#E5DFFA]">
            Bản đồ hướng nghiệp
          </span>
          <h3 className="text-2xl font-black text-[#18181B] tracking-tight mt-2">
            Hành Trình Thám Hiểm 4 Nhóm Ngành
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Mỗi trạm nghề nghiệp giúp bạn hiểu rõ khối thi đại học, tính chất công việc và mức lương khởi điểm
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-[#F2EEF9] px-3.5 py-1.5 rounded-2xl border border-[#E5DFFA] self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-[#5B25F5]" />
          <span>Cấp độ hiện tại của bạn: <strong className="text-[#5B25F5]">Lv.{level}</strong></span>
        </div>
      </div>

      {/* 4 Stations Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {CAREER_STATIONS.map((st) => {
          const isSelected = selectedStation.id === st.id;
          const isActive = st.status === 'active';

          return (
            <div
              key={st.id}
              onClick={() => handleStationClick(st)}
              className={`p-5 rounded-[24px] border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'border-[#5B25F5] bg-[#F2EEF9]/60 shadow-md ring-4 ring-[#5B25F5]/15'
                  : 'border-[#E5DFFA] hover:border-slate-300 bg-white shadow-2xs hover:-translate-y-1'
              } ${!isActive ? 'opacity-85' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs border"
                    style={{
                      backgroundColor: `${st.accentColor}18`,
                      borderColor: `${st.accentColor}30`,
                      color: st.accentColor,
                    }}
                  >
                    <st.icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  {isActive ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đang Mở
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" /> Cấp {st.unlockLevel}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {st.title}
                </h4>
                <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                  {st.category}
                </span>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <span className="text-teal-700 font-semibold">{st.rolesCount} vị trí nghề nghiệp</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Station Deep-Dive Detail Card */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xs border"
              style={{
                backgroundColor: `${selectedStation.accentColor}20`,
                borderColor: `${selectedStation.accentColor}35`,
                color: selectedStation.accentColor,
              }}
            >
              <selectedStation.icon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              {selectedStation.title}
            </h4>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              ({selectedStation.category})
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {selectedStation.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5 text-[#5B25F5] bg-white px-3 py-1 rounded-xl border border-[#E5DFFA]">
              <GraduationCap className="w-4 h-4 text-[#5B25F5]" />
              <span>Khối thi THPT: <strong>{selectedStation.entranceExams}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800 bg-white px-3 py-1 rounded-xl border border-slate-200">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Khởi điểm: <strong>{selectedStation.startingSalary}</strong></span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {selectedStation.status === 'active' ? (
            <button
              type="button"
              onClick={handleStartHospitality}
              className="w-full md:w-auto min-h-[50px] px-8 bg-[#C8F932] hover:bg-[#d5fc4e] text-[#18181B] font-black rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer border border-black/10"
            >
              <span>Thử việc ngay trạm này</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <div className="px-5 py-3 rounded-2xl bg-slate-200/80 text-slate-500 text-xs font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Đạt Cấp {selectedStation.unlockLevel} để mở khóa</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
