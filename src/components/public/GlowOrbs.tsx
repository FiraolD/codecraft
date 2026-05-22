import { useEffect, useState } from 'react';

export function GlowOrbs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Primary Orbs */}
      <div className="glow-orb glow-orb-indigo w-96 h-96 -top-48 -left-48 animate-float" />
      <div className="glow-orb glow-orb-violet w-80 h-80 top-1/2 -right-40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="glow-orb glow-orb-cyan w-64 h-64 bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }} />

      {/* Secondary Orbs */}
      <div className="glow-orb glow-orb-indigo w-32 h-32 top-1/3 right-1/4 opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="glow-orb glow-orb-violet w-40 h-40 bottom-1/3 -left-20 opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}