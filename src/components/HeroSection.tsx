
"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function HeroSection() {
  const titleRef = useScrollReveal({ delay: 0.2, y: 30, stagger: 0.25 });
  const subtitleRef = useScrollReveal({ delay: 0.6, y: 20 });

  return (
    <section
      id="hero-section"
      className="snap-section paper-texture pt-16"
      style={{
        background: `linear-gradient(180deg, var(--ivory) 0%, var(--champagne-light) 50%, var(--ivory) 100%)`,
      }}
    >
      {/* Background frame image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/assets/bg-with-flower.png"
          alt="Floral frame"
          fill
          className="object-contain"
          style={{ opacity: 1 }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-[340px] mx-auto">
        {/* Bismillah */}
        <div ref={subtitleRef}>
          <p
            className="text-xl text-gold mb-3 font-medium tracking-wider drop-shadow-sm mt-10"
            style={{ fontFamily: "var(--font-cormorant), system-ui" }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          <p className="font-cormorant text-[10px] font-light text-warm-gray/60 tracking-[1.5px] uppercase italic mt-8">
            Mr. & Mrs. Tariq Javed
          </p>

          <p className="font-josefin text-[9px] font-light tracking-[4px] uppercase text-warm-gray mt-4 mb-4">
            Together with their families
          </p>
        </div>

        {/* Names */}
        <div ref={titleRef}>
          <h1
            className="font-great-vibes text-[2.6rem] leading-tight mb-0.5 text-shimmer"
            style={{ textShadow: "0 2px 8px rgba(201,168,76,0.15)" }}
            data-stagger
          >
            Ahsan Ali Butt
          </h1>

          <p
            className="font-cormorant text-[11px] font-light text-warm-gray/60 tracking-wider mb-2 italic"
            data-stagger
          >
            (S/o Mr. & Mrs. Tariq Javed)
          </p>

          <div className="my-2 flex items-center justify-center gap-3" data-stagger>
            <div className="gold-line w-8" />
            <span
              className="font-pinyon text-2xl text-gold"
              style={{ textShadow: "0 1px 4px rgba(201,168,76,0.2)" }}
            >
              &amp;
            </span>
            <div className="gold-line w-8" />
          </div>

          <h1
            className="font-great-vibes text-[2.6rem] leading-tight mb-0.5 text-shimmer"
            style={{ textShadow: "0 2px 8px rgba(201,168,76,0.15)" }}
            data-stagger
          >
            Saman Shehzadi
          </h1>

          <p
            className="font-cormorant text-[11px] font-light text-warm-gray/60 tracking-wider mb-5 italic"
            data-stagger
          >
            (D/o Mr. & Mrs. Iftikhaar Butt)
          </p>
        </div>

        {/* Decorative diamond */}
        <div className="diamond-ornament mb-4" />

        {/* Invitation text */}
        <p className="font-cormorant mt-3 text-sm font-light text-charcoal-light leading-relaxed tracking-wide italic mb-4">
          invite you to celebrate
          <br />
          their wedding festivities
        </p>

        <p className="font-josefin text-[8px] font-light tracking-[3px] uppercase text-warm-gray mt-3">
          November 2026 · Faisalabad, Pakistan
        </p>

        {/* Scroll hint */}
        <div className="mt-6 flex flex-col items-center gap-1 animate-bounce opacity-50">
          <p className="font-josefin text-[8px] tracking-[3px] uppercase text-warm-gray">
            Swipe up
          </p>

          <svg
            width="14"
            height="20"
            viewBox="0 0 16 24"
            fill="none"
            className="text-gold"
          >
            <path
              d="M8 0V20M8 20L1 13M8 20L15 13"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
