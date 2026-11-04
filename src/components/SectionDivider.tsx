"use client";

import { useScrollReveal } from "@/hooks/useAnimations";

/**
 * Elegant section divider with gold ornamental design
 */
export default function SectionDivider() {
  const ref = useScrollReveal({ y: 20, duration: 0.6 });

  return (
    <div
      ref={ref}
      className="relative w-full py-8 flex items-center justify-center"
      style={{
        background: `linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.03) 50%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Left line */}
        <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent to-gold/40" />
        
        {/* Decorative element */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-gold/40 rounded-full" />
          <div className="w-1.5 h-1.5 border border-gold/40 rotate-45" />
          <div className="w-1 h-1 bg-gold/40 rounded-full" />
        </div>
        
        {/* Right line */}
        <div className="w-16 h-[0.5px] bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    </div>
  );
}
