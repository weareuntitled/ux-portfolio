'use client';

import { useEffect, useState } from 'react';

/**
 * A subtle glow that follows the mouse. Renders only on client; pointer-events-none so it doesn't block clicks.
 */
export function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Outer soft glow */}
      <div
        className="pointer-events-none fixed -z-[2] h-96 w-96 rounded-full opacity-[0.12] blur-3xl transition-all duration-300 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      {/* Inner smaller highlight */}
      <div
        className="pointer-events-none fixed -z-[2] h-48 w-48 rounded-full opacity-[0.08] blur-2xl transition-all duration-200 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)',
        }}
        aria-hidden
      />
    </>
  );
}
