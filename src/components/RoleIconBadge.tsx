import React from 'react';
import {
  ConciergeBell,
  Compass,
  CalendarCheck2,
  UtensilsCrossed,
  LucideIcon
} from 'lucide-react';

export type RoleId = 'LT' | 'HD' | 'DP' | 'PV' | string;

interface RoleIconBadgeProps {
  roleId: RoleId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gradient' | 'glass' | 'flat';
  className?: string;
  showGlow?: boolean;
}

const ROLE_CONFIG: Record<
  string,
  {
    name: string;
    icon: LucideIcon;
    gradient: string;
    glowColor: string;
    iconColor: string;
    borderColor: string;
    bgGlass: string;
    accentEmoji?: string;
  }
> = {
  LT: {
    name: 'Lễ Tân Khách Sạn',
    icon: ConciergeBell,
    gradient: 'from-[#F59E0B] via-[#EA580C] to-[#C2410C]',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-400/30',
    bgGlass: 'bg-amber-500/10 text-amber-600',
  },
  HD: {
    name: 'Hướng Dẫn Viên',
    icon: Compass,
    gradient: 'from-[#10B981] via-[#0D9488] to-[#047857]',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    iconColor: 'text-emerald-500',
    borderColor: 'border-emerald-400/30',
    bgGlass: 'bg-emerald-500/10 text-emerald-600',
  },
  DP: {
    name: 'Điều Phối Sự Kiện',
    icon: CalendarCheck2,
    gradient: 'from-[#8B5CF6] via-[#6D28D9] to-[#4C1D95]',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-400/30',
    bgGlass: 'bg-purple-500/10 text-purple-600',
  },
  PV: {
    name: 'Phục Vụ Nhà Hàng',
    icon: UtensilsCrossed,
    gradient: 'from-[#F43F5E] via-[#E11D48] to-[#BE123C]',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    iconColor: 'text-rose-500',
    borderColor: 'border-rose-400/30',
    bgGlass: 'bg-rose-500/10 text-rose-600',
  },
};

const DEFAULT_CONFIG = {
  name: 'Nghề Nghiệp',
  icon: ConciergeBell,
  gradient: 'from-[#5B25F5] to-[#3B82F6]',
  glowColor: 'rgba(91, 37, 245, 0.35)',
  iconColor: 'text-[#5B25F5]',
  borderColor: 'border-violet-400/30',
  bgGlass: 'bg-violet-500/10 text-violet-600',
};

const SIZE_MAP = {
  xs: {
    box: 'w-6 h-6 rounded-lg',
    icon: 'w-3.5 h-3.5',
  },
  sm: {
    box: 'w-8 h-8 rounded-xl',
    icon: 'w-4 h-4',
  },
  md: {
    box: 'w-10 h-10 rounded-2xl',
    icon: 'w-5 h-5',
  },
  lg: {
    box: 'w-12 h-12 rounded-2xl',
    icon: 'w-6 h-6',
  },
  xl: {
    box: 'w-14 h-14 rounded-3xl',
    icon: 'w-7 h-7',
  },
};

export const RoleIconBadge: React.FC<RoleIconBadgeProps> = ({
  roleId,
  size = 'md',
  variant = 'gradient',
  className = '',
  showGlow = false,
}) => {
  const config = ROLE_CONFIG[roleId] || DEFAULT_CONFIG;
  const sizeStyles = SIZE_MAP[size];
  const IconComponent = config.icon;

  if (variant === 'glass') {
    return (
      <div
        className={`relative inline-flex items-center justify-center backdrop-blur-md border shadow-xs transition-transform ${sizeStyles.box} ${config.bgGlass} ${config.borderColor} ${className}`}
        style={showGlow ? { boxShadow: `0 4px 14px ${config.glowColor}` } : undefined}
      >
        <IconComponent className={`${sizeStyles.icon} stroke-[2.2]`} />
      </div>
    );
  }

  if (variant === 'flat') {
    return (
      <div
        className={`relative inline-flex items-center justify-center bg-white border border-slate-200/80 shadow-xs text-slate-800 transition-transform ${sizeStyles.box} ${className}`}
      >
        <IconComponent className={`${sizeStyles.icon} ${config.iconColor} stroke-[2.2]`} />
      </div>
    );
  }

  // Default: modern vibrant gradient (like modern web apps)
  return (
    <div
      className={`relative inline-flex items-center justify-center text-white bg-gradient-to-br shadow-md border border-white/20 transition-all duration-300 ${sizeStyles.box} ${config.gradient} ${className}`}
      style={
        showGlow
          ? {
              boxShadow: `0 6px 18px ${config.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.4)`,
            }
          : {
              boxShadow: `inset 0 1px 1px rgba(255, 255, 255, 0.4)`,
            }
      }
    >
      <IconComponent className={`${sizeStyles.icon} stroke-[2.2] filter drop-shadow-xs`} />
    </div>
  );
};

