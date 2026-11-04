"use client";

import { useScrollReveal } from "@/hooks/useAnimations";

export default function ThankYouSection() {
  const contentRef = useScrollReveal({ y: 40, duration: 1, stagger: 0.15 });

  return (
    <section
      id="thankyou-section"
      className="snap-section paper-texture "
      style={{
        background: `linear-gradient(180deg, var(--ivory) 0%, var(--blush-light) 40%, var(--champagne-light) 70%, var(--ivory) 100%)`,
      }}
    >
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-8  max-w-sm mx-auto">
        {/* Top ornament */}
        <div className="ornament mb-6" data-stagger>✦</div>



        {/* Thank you heading */}
        <h2 className="font-great-vibes text-5xl text-shimmer mb-6" data-stagger>
          Thank You
        </h2>

        {/* Decorative line */}
        <div className="gold-line-wide mb-5" data-stagger />

        {/* Main message */}
        <p className="font-cormorant text-lg font-light text-charcoal leading-relaxed mb-6 mt-8" data-stagger>
          Your presence on our special day
          <br />
          means the world to us.
        </p>

        <p className="font-cormorant text-base font-light text-charcoal-light leading-relaxed italic mb-16" data-stagger>
          We are truly blessed to have
          <br />
          family and friends who fill our lives
          <br />
          with so much love and joy.
        </p>

        {/* Diamond */}
        <div className="diamond-ornament my-5" data-stagger />

        {/* Dua / prayer */}
        <p className="font-cormorant text-sm text-warm-gray leading-relaxed mb-4 mt-3" data-stagger>
          We humbly request your prayers
          <br />
          for a blessed and beautiful
          <br />
          journey together.
        </p>

        <div className="gold-line mb-5" data-stagger />

        {/* Names */}
        <p className="font-pinyon text-3xl text-gold mb-1 mt-4" data-stagger>
          Ahsan &amp; Saman
        </p>

        {/* Families */}
        <p className="font-josefin text-[9px] tracking-[3px] uppercase text-warm-gray mb-5" data-stagger>
          and both families
        </p>

        {/* Final ornament */}
        <div className="ornament mb-4" data-stagger>✦</div>

        {/* Footer */}
        <p className="font-josefin text-[7px] tracking-[2px] uppercase text-warm-gray/40" data-stagger>
          November 2026 • Faisalabad, Pakistan
        </p>
      </div>
    </section>
  );
}
