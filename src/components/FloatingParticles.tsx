"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle floating gold particles for luxury ambiance.
 * Rendered with CSS animations for performance.
 */
export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 15 + 20;

      particle.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(201,168,76,0.4), transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${duration}s ${delay}s linear infinite;
      `;

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
      aria-hidden="true"
    />
  );
}
