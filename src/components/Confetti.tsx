import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  // Burst from left and right
  const count = 120;
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 9999,
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.5),
    spread: 60,
    origin: { x: 0.2, y: 0.6 },
    colors: ['#5B25F5', '#C8F932', '#7C3AED', '#F59E0B', '#18181B'],
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.5),
    spread: 60,
    origin: { x: 0.8, y: 0.6 },
    colors: ['#5B25F5', '#C8F932', '#7C3AED', '#F59E0B', '#18181B'],
  });
}
