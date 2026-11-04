"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useAnimations";

// ——— WEDDING DATES FOR SUBDOMAINS ———
const EVENT_DATES = {
  all: new Date("2026-11-06T20:00:00+05:00"),    // Mehndi: 6 Nov 2026, 8 PM PKT
  hamna: new Date("2026-11-09T20:00:00+05:00"),  // Barat: 9 Nov 2026, 8 PM PKT
  waleed: new Date("2026-11-11T20:00:00+05:00"), // Valima: 11 Nov 2026, 8 PM PKT
};

const EVENT_DATE_LABELS = {
  all: "13 November 2026",
  hamna: "9 November 2026",
  waleed: "11 November 2026",
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Number box with gold glass effect */}
      <div className="countdown-unit-box">
        <span className="font-playfair text-3xl font-bold text-shimmer leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-josefin text-[8px] tracking-[3px] uppercase text-warm-gray mt-2">
        {label}
      </span>
    </div>
  );
}

interface CountdownSectionProps {
  domainType?: "all" | "hamna" | "waleed";
}

export default function CountdownSection({ domainType = "all" }: CountdownSectionProps) {
  const targetDate = EVENT_DATES[domainType];
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollReveal({ delay: 0.1, y: 30 });
  const counterRef = useScrollReveal({ delay: 0.3, y: 20 });
  const imageRef = useScrollReveal({ delay: 0.5, y: 40 });

  useEffect(() => {
    setMounted(true);
    // Update immediately when targetDate changes
    setTimeLeft(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    const el = sectionRef.current;
    let observer: IntersectionObserver | null = null;

    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisited(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    }

    return () => {
      clearInterval(interval);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [targetDate]);

  // Prevent hydration mismatch — render zeros on server, real values on client
  const display = mounted ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section
      ref={sectionRef}
      id="countdown-section"
      className="snap-section paper-texture"
      style={{
        background: `linear-gradient(180deg, var(--ivory) 0%, var(--champagne-light) 30%, var(--blush-light) 60%, var(--ivory) 100%)`,
      }}
    >
      {/* Subtle radial glow behind the counter */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        
        {/* Header text */}
        <div ref={headerRef} className="text-center mb-6">
          <p className="font-josefin text-[9px] tracking-[5px] uppercase text-warm-gray mb-2">
            Save the Date
          </p>
          <h2
            className="font-great-vibes text-4xl text-shimmer mb-1"
            style={{ animationPlayState: isVisited ? "running" : "paused" }}
          >
            Counting the Days
          </h2>
          <div className="gold-line-wide mx-auto mt-2" />
        </div>

        {/* Couple illustration — the cute couple image */}
        <div ref={imageRef} className="relative w-48 h-48 mb-6">
          <Image
            src="/assets/counter-couple.png"
            alt="Couple illustration"
            fill
            className="object-contain drop-shadow-lg"
            sizes="192px"
          />
        </div>

        {/* Heart with initials overlaid */}
        <div className="relative w-36 h-28 mb-6 ">
          <Image
            src="/assets/counter-name-heart.png"
            alt="Intertwined hearts"
            fill
            className="object-contain"
            style={{
              opacity: 0.35,
              filter: "brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7460%) hue-rotate(358deg) brightness(101%) contrast(112%)"
            }}
            sizes="144px"
          />
          {/* Initials centered inside the hearts */}
          <div className="absolute inset-0 flex items-center justify-center rotate-330">
            <span className="font-great-vibes text-2xl text-red-600/45 font-bold tracking-[10px]  ">
              W  H
            </span>
          </div>
        </div>

        {/* Countdown boxes */}
        <div ref={counterRef} className="flex items-center gap-3 mb-8">
          <CountdownUnit value={display.days} label="Days" />

          {/* Separator */}
          <span className="font-playfair text-xl text-gold/50 mt-[-14px]">:</span>

          <CountdownUnit value={display.hours} label="Hours" />

          <span className="font-playfair text-xl text-gold/50 mt-[-14px]">:</span>

          <CountdownUnit value={display.minutes} label="Minutes" />

          <span className="font-playfair text-xl text-gold/50 mt-[-14px]">:</span>

          <CountdownUnit value={display.seconds} label="Seconds" />
        </div>

        {/* Bottom message */}
        <p className="font-cormorant text-sm italic text-charcoal-light tracking-wide text-center leading-relaxed">
          Until we begin our forever
        </p>

        {/* Tiny date reminder */}
        <p className="font-josefin text-[8px] tracking-[3px] uppercase text-warm-gray/60 mt-3">
          {EVENT_DATE_LABELS[domainType]}
        </p>

        {/* Credit */}
        <a
          href="https://dotpunksolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-josefin text-[8px] tracking-[2px] uppercase text-warm-gray/30 mt-8 hover:text-warm-gray/50 transition-colors duration-300"
        >
          Crafted by dotpunksolutions.com
        </a>
      </div>
    </section>
  );
}
