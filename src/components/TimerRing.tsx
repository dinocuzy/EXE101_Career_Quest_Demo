import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerRingProps {
  totalSeconds: number;
  onExpire: () => void;
  paused?: boolean;
  onTick?: (remaining: number) => void;
}

export const TimerRing: React.FC<TimerRingProps> = ({
  totalSeconds,
  onExpire,
  paused = false,
  onTick,
}) => {
  const [remaining, setRemaining] = useState<number>(totalSeconds);

  // Reset when totalSeconds changes (new card)
  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (paused) return;

    if (remaining <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (onTick) onTick(next);
        if (next <= 0) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, paused, onExpire, onTick]);

  const fraction = Math.max(0, remaining / totalSeconds);
  const isUrgent = remaining <= 10;
  const isWarning = remaining <= 20 && !isUrgent;

  // SVG parameters
  const size = 52;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - fraction);

  const strokeColor = isUrgent
    ? '#EF4444' // Red
    : isWarning
    ? '#F59E0B' // Amber
    : '#5B25F5'; // Ruang Edit Royal Violet

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div
        className={`absolute flex flex-col items-center justify-center text-center ${
          isUrgent ? 'animate-pulse text-rose-600' : 'text-slate-700'
        }`}
      >
        <span className="text-xs font-black font-mono leading-none">
          {remaining}s
        </span>
        <Clock className="w-2.5 h-2.5 mt-0.5 text-slate-400" />
      </div>
    </div>
  );
};
