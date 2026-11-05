import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowLeft,
  Filter,
  Key,
  ShieldCheck,
  Calendar,
  AlertCircle,
  BarChart3,
  BookOpen,
  Building2,
} from 'lucide-react';

interface StudentAtRisk {
  id: string;
  name: string;
  grade: string;
  className: string;
  lowestSkill: string;
  score: number;
  recommendation: string;
}

const MOCK_AT_RISK_STUDENTS: StudentAtRisk[] = [
  { id: 'HS01', name: 'Nguyễn Hoàng Long', grade: '11', className: '11A1', lowestSkill: 'Giao tiếp (C)', score: 3.2, recommendation: 'Cần tham gia CLB tranh biện / MC' },
  { id: 'HS02', name: 'Trần Thảo My', grade: '11', className: '11A2', lowestSkill: 'Giải quyết VĐ (P)', score: 3.5, recommendation: 'Giao bài tập tình huống thực tế' },
  { id: 'HS03', name: 'Lê Minh Quân', grade: '12', className: '12A1', lowestSkill: 'Đạo đức & TN (E)', score: 3.0, recommendation: 'Tư vấn hướng nghiệp 1-1' },
  { id: 'HS04', name: 'Phạm Thu Trang', grade: '11', className: '11A3', lowestSkill: 'Thích ứng (A)', score: 3.8, recommendation: 'Khuyến khích tham gia ngoại khóa' },
  { id: 'HS05', name: 'Vũ Đức Duy', grade: '12', className: '12A2', lowestSkill: 'Làm việc nhóm (T)', score: 3.4, recommendation: 'Giao vai trò nhóm phó sự kiện' },
];

const MOCK_CAREER_TRENDS = [
  { className: '11A1', 'Lễ tân': 18, 'Hướng dẫn viên': 28, 'Sự kiện': 34, 'Phục vụ': 20 },
  { className: '11A2', 'Lễ tân': 22, 'Hướng dẫn viên': 35, 'Sự kiện': 25, 'Phục vụ': 18 },
  { className: '11A3', 'Lễ tân': 15, 'Hướng dẫn viên': 30, 'Sự kiện': 32, 'Phục vụ': 23 },
  { className: '12A1', 'Lễ tân': 20, 'Hướng dẫn viên': 40, 'Sự kiện': 28, 'Phục vụ': 12 },
  { className: '12A2', 'Lễ tân': 25, 'Hướng dẫn viên': 38, 'Sự kiện': 24, 'Phục vụ': 13 },
];

const MOCK_SCHOOL_RADAR = [
  { skill: 'Giao tiếp (C)', value: 6.2, benchmark: 5.0 },
  { skill: 'Giải quyết VĐ (P)', value: 5.8, benchmark: 5.0 },
  { skill: 'Thích ứng (A)', value: 6.0, benchmark: 5.0 },
  { skill: 'Làm việc nhóm (T)', value: 5.4, benchmark: 5.0 },
  { skill: 'Đạo đức & TN (E)', value: 5.6, benchmark: 5.0 },
];

export const SchoolDashboard: React.FC = () => {
  const { setScreen, addToast } = useGameStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'students' | 'trends' | 'license'>('overview');
  const [selectedGrade, setSelectedGrade] = useState<'all' | '11' | '12'>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const filteredStudents = MOCK_AT_RISK_STUDENTS.filter((st) => {
    if (selectedGrade !== 'all' && st.grade !== selectedGrade) return false;
    if (selectedClass !== 'all' && st.className !== selectedClass) return false;
    return true;
  });

  const handleRenewLicense = () => {
    addToast('Yêu cầu gia hạn School License (300 tài khoản) đã được gửi tới Biztech Team!', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800 antialiased">
      {/* Sidebar 240px */}
      <aside className="w-full md:w-60 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center font-bold border border-[#E5DFFA]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-tight">Career Quest</h1>
              <span className="text-[10px] text-[#5B25F5] font-black bg-[#C8F932] px-2 py-0.5 rounded-full">
                School Dashboard
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#F2EEF9] text-[#5B25F5] font-black border border-[#E5DFFA]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Tổng quan</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classes')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'classes'
                  ? 'bg-[#F2EEF9] text-[#5B25F5] font-black border border-[#E5DFFA]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Lớp học</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-[#F2EEF9] text-[#5B25F5] font-black border border-[#E5DFFA]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Học sinh</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('trends')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'trends'
                  ? 'bg-[#F2EEF9] text-[#5B25F5] font-black border border-[#E5DFFA]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Báo cáo xu hướng</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('license')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'license'
                  ? 'bg-[#F2EEF9] text-[#5B25F5] font-black border border-[#E5DFFA]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Gói bản quyền</span>
            </button>
          </nav>
        </div>

        {/* Return to Game App Button */}
        <div className="pt-4 mt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setScreen('landing')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Game Mobile</span>
          </button>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Mô phỏng trường THPT FPT
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Hệ Thống Quản Lý Hướng Nghiệp Trường THPT
            </h2>
            <p className="text-xs text-slate-500">
              Dữ liệu phân tích thực nghiệm từ các ca thử việc của học sinh
            </p>
          </div>

          <span className="text-[11px] font-bold px-3 py-1 bg-amber-100 text-amber-800 border border-amber-200 rounded-full self-start">
            Dữ liệu minh họa
          </span>
        </div>

        {/* Tab 1: TỔNG QUAN */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-semibold">Số học sinh đã chơi</span>
                <p className="text-2xl font-black text-slate-900 mt-1">248</p>
                <span className="text-[10px] text-emerald-600 font-bold">↑ 18 học sinh tuần này</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E5DFFA] shadow-2xs">
                <span className="text-xs text-slate-500 font-semibold">Tỷ lệ hoàn thành ca</span>
                <p className="text-2xl font-black text-[#5B25F5] mt-1">74%</p>
                <span className="text-[10px] text-slate-400">184/248 ca thành công</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E5DFFA] shadow-2xs">
                <span className="text-xs text-slate-500 font-semibold">Điểm kỹ năng TB</span>
                <p className="text-2xl font-black text-[#5B25F5] mt-1">5.8 / 10</p>
                <span className="text-[10px] text-emerald-600 font-bold">Vượt chuẩn khởi điểm (+0.8)</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E5DFFA] shadow-2xs">
                <span className="text-xs text-slate-500 font-semibold">Vị trí quan tâm nhất</span>
                <p className="text-lg font-black text-[#18181B] mt-1 truncate">Hướng dẫn viên</p>
                <span className="text-[10px] text-slate-400">38% tổng lượt chọn</span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* BarChart Xu hướng nghề theo lớp */}
              <div className="bg-white p-4 rounded-[24px] border border-[#E5DFFA] shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#5B25F5] mb-3">
                  Xu hướng chọn nghề theo lớp (%)
                </h3>
                <div className="w-full h-64 text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_CAREER_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="className" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="Lễ tân" fill="#5B25F5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Hướng dẫn viên" fill="#C8F932" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Sự kiện" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Phục vụ" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RadarChart Toàn khối */}
              <div className="bg-white p-4 rounded-[24px] border border-[#E5DFFA] shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#5B25F5] mb-3">
                  Radar Năng Lực Trung Bình Toàn Khối
                </h3>
                <div className="w-full h-64 text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={MOCK_SCHOOL_RADAR}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#475569', fontSize: 10 }} />
                      <PolarRadiusAxis domain={[0, 10]} stroke="#cbd5e1" />
                      <Radar name="Điểm TB khối" dataKey="value" stroke="#5B25F5" fill="#5B25F5" fillOpacity={0.35} />
                      <Radar name="Chuẩn khởi điểm" dataKey="benchmark" stroke="#94a3b8" strokeDasharray="3 3" fill="none" />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bảng Học sinh cần hỗ trợ */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Danh Sách Học Sinh Cần Hỗ Trợ Kỹ Năng
                  </h3>
                  <p className="text-xs text-slate-500">Các em có điểm kỹ năng thấp cần thầy cô tư vấn thêm</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value as any)}
                    className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
                  >
                    <option value="all">Tất cả khối</option>
                    <option value="11">Khối 11</option>
                    <option value="12">Khối 12</option>
                  </select>

                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
                  >
                    <option value="all">Tất cả lớp</option>
                    <option value="11A1">11A1</option>
                    <option value="11A2">11A2</option>
                    <option value="11A3">11A3</option>
                    <option value="12A1">12A1</option>
                    <option value="12A2">12A2</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Mã HS</th>
                      <th className="py-2.5 px-3">Họ và tên</th>
                      <th className="py-2.5 px-3">Lớp</th>
                      <th className="py-2.5 px-3">Kỹ năng thấp nhất</th>
                      <th className="py-2.5 px-3">Điểm</th>
                      <th className="py-2.5 px-3">Gợi ý hỗ trợ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2 px-3 font-mono text-slate-400">{st.id}</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{st.name}</td>
                        <td className="py-2 px-3 font-semibold text-slate-600">{st.className}</td>
                        <td className="py-2 px-3 text-rose-600 font-semibold">{st.lowestSkill}</td>
                        <td className="py-2 px-3 font-black text-rose-600">{st.score}</td>
                        <td className="py-2 px-3 text-slate-600">{st.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: LỚP HỌC */}
        {activeTab === 'classes' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Danh Sách Lớp Học Triển Khai</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {['11A1 (38 HS)', '11A2 (40 HS)', '11A3 (36 HS)', '12A1 (42 HS)', '12A2 (40 HS)'].map((cls, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{cls}</span>
                  <span className="text-emerald-600 font-bold">100% đã trải nghiệm</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: HỌC SINH */}
        {activeTab === 'students' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Cơ Sở Dữ Liệu 248 Học Sinh</h3>
            <p className="text-xs text-slate-500">Mỗi học sinh đều có hồ sơ năng lực 5 kỹ năng lưu trữ.</p>
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đã đồng bộ với hệ thống học bạ số và danh sách phân lớp của nhà trường.</span>
            </div>
          </div>
        )}

        {/* Tab 4: BÁO CÁO XU HƯỚNG */}
        {activeTab === 'trends' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Báo Cáo Dự Báo Ngành Nghề 2026 - 2030</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Học sinh khối 11 và 12 có xu hướng quan tâm cao tới các ngành dịch vụ trải nghiệm (Du lịch, Sự kiện, Quản trị Dịch vụ ăn uống). Kỹ năng thích ứng linh hoạt (Adaptability) và Giao tiếp (Communication) là 2 điểm sáng lớn nhất của học sinh toàn trường.
            </p>
          </div>
        )}

        {/* Tab 5: GÓI BẢN QUYỀN */}
        {activeTab === 'license' && (
          <div className="bg-white p-6 rounded-[28px] border border-[#E5DFFA] shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F2EEF9] text-[#5B25F5] flex items-center justify-center font-bold border border-[#E5DFFA]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Gói Bản Quyền Nhà Trường (School License)</h3>
                <p className="text-xs text-slate-500">Dành riêng cho các trường THPT đối tác của Biztech – Đại học FPT</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#F2EEF9]/60 p-3.5 rounded-xl border border-[#E5DFFA]">
                <span className="text-slate-500 font-medium">Hạn mức tài khoản:</span>
                <p className="text-lg font-black text-[#18181B] mt-1">300 tài khoản</p>
                <span className="text-[10px] text-[#5B25F5] font-black">Đã dùng: 248/300</span>
              </div>

              <div className="bg-[#F2EEF9]/60 p-3.5 rounded-xl border border-[#E5DFFA]">
                <span className="text-slate-500 font-medium">Ngày hết hạn bản quyền:</span>
                <p className="text-lg font-black text-[#18181B] mt-1">31/12/2026</p>
                <span className="text-[10px] text-emerald-600 font-bold">Đang hoạt động</span>
              </div>

              <div className="bg-[#F2EEF9]/60 p-3.5 rounded-xl border border-[#E5DFFA]">
                <span className="text-slate-500 font-medium">Loại giấy phép:</span>
                <p className="text-lg font-black text-[#5B25F5] mt-1">Enterprise Edu</p>
                <span className="text-[10px] text-slate-500">Đầy đủ tính năng Co-op & AI</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRenewLicense}
              className="py-3 px-6 bg-[#C8F932] hover:bg-[#d5fc4e] active:scale-95 text-[#18181B] font-black text-xs rounded-full transition-all cursor-pointer shadow-sm border border-black/10"
            >
              Gia hạn gói bản quyền (Demo)
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
