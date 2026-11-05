import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { SkillsState, SkillKey } from '../types/game';
import { SKILL_METADATA } from './SkillChip';

interface RadarResultProps {
  skills: SkillsState;
}

export const RadarResult: React.FC<RadarResultProps> = ({ skills }) => {
  const chartData = [
    {
      skill: 'Giao tiếp (C)',
      value: skills.C,
      benchmark: 5,
      fullMark: 10,
    },
    {
      skill: 'Giải quyết VĐ (P)',
      value: skills.P,
      benchmark: 5,
      fullMark: 10,
    },
    {
      skill: 'Thích ứng (A)',
      value: skills.A,
      benchmark: 5,
      fullMark: 10,
    },
    {
      skill: 'Làm việc nhóm (T)',
      value: skills.T,
      benchmark: 5,
      fullMark: 10,
    },
    {
      skill: 'Đạo đức & TN (E)',
      value: skills.E,
      benchmark: 5,
      fullMark: 10,
    },
  ];

  const skillKeys: SkillKey[] = ['C', 'P', 'A', 'T', 'E'];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Chart Container */}
      <div className="w-full bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-extrabold text-[#18181B] tracking-tight">
            Biểu đồ Năng lực Thực tế
          </h4>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B25F5] ring-2 ring-[#C8F932]" /> Điểm của bạn
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 border-b-2 border-dashed border-slate-400" /> Chuẩn (5/10)
            </span>
          </div>
        </div>

        <div className="w-full h-64 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
              <PolarGrid stroke="#E5DFFA" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: '#18181B', fontSize: 11, fontWeight: 700 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                tickCount={6}
                stroke="#CBD5E1"
                tick={{ fontSize: 9, fill: '#94A3B8' }}
              />
              {/* Benchmark 5/10 Line */}
              <Radar
                name="Điểm chuẩn"
                dataKey="benchmark"
                stroke="#94A3B8"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                fill="none"
              />
              {/* Player Radar */}
              <Radar
                name="Điểm của bạn"
                dataKey="value"
                stroke="#5B25F5"
                strokeWidth={2.5}
                fill="#5B25F5"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full bg-white rounded-[28px] p-5 border border-[#E5DFFA] shadow-xs">
        <h4 className="text-xs font-black text-[#5B25F5] uppercase tracking-wider mb-3">
          Chi tiết 5 nhóm năng lực
        </h4>
        <div className="space-y-2.5">
          {skillKeys.map((key) => {
            const meta = SKILL_METADATA[key];
            const score = skills[key];
            const diff = score - 5;

            return (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F2EEF9]/50 border border-[#E5DFFA]"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${meta.bg} ${meta.border} ${meta.color} border flex items-center justify-center shrink-0 shadow-2xs`}>
                    {meta.icon}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#18181B]">{meta.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{meta.short}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      diff > 0
                        ? 'bg-[#C8F932] text-[#18181B]'
                        : diff < 0
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {score}/10
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 w-10 text-right">
                    {diff > 0 ? `+${diff}` : diff === 0 ? '±0' : `${diff}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
