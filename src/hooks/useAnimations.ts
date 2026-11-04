"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/**
 * Hook to manage the invitation opening animation sequence.
 * Handles: ribbon fade → flaps open → content reveal → enable scroll
 */
export function useInvitationOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const ribbonRef = useRef<HTMLDivElement>(null);
  const leftFlapRef = useRef<HTMLDivElement>(null);
  const rightFlapRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll — simple overflow hidden on html (mobile-safe)
    document.documentElement.classList.add("no-scroll");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
        setIsAnimating(false);

        // Unlock scroll
        document.documentElement.classList.remove("no-scroll");

        // Fade out the entire cover
        if (coverRef.current) {
          gsap.to(coverRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              if (coverRef.current) {
                coverRef.current.style.display = "none";
              }
            },
          });
        }
      },
    });

    timelineRef.current = tl;

    // Phase 1: Initial pause (let user see the cover)
    tl.to({}, { duration: 1.5 });

    // Phase 2: Ribbon fade out
    if (ribbonRef.current) {
      tl.to(ribbonRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.inOut",
      });
    }

    // Phase 3: Small pause
    tl.to({}, { duration: 0.3 });

    // Phase 4: Flaps open
    if (leftFlapRef.current) {
      tl.to(
        leftFlapRef.current,
        {
          x: "-100%",
          duration: 2,
          ease: "power3.inOut",
        },
        "flaps"
      );
    }

    if (rightFlapRef.current) {
      tl.to(
        rightFlapRef.current,
        {
          x: "100%",
          duration: 2,
          ease: "power3.inOut",
        },
        "flaps"
      );
    }

    // Phase 5: Content reveal (starts slightly before flaps finish)
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1"
      );
    }

    return () => {
      tl.kill();
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);

  return {
    isOpen,
    isAnimating,
    ribbonRef,
    leftFlapRef,
    rightFlapRef,
    coverRef,
    contentRef,
  };
}

/**
 * Hook for scroll-triggered fade-in animations.
 * Elements fade in and slide up when they enter the viewport.
 */
export function useScrollReveal(options?: {
  threshold?: number;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      threshold = 0.2,
      delay = 0,
      y = 40,
      duration = 0.8,
      stagger = 0.15,
    } = optionsRef.current || {};

    // Set initial state
    gsap.set(el, { opacity: 0, y });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check for staggered children
            const children = el.querySelectorAll("[data-stagger]");

            if (children.length > 0) {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease: "power2.out",
              });

              gsap.fromTo(
                children,
                { opacity: 0, y: y * 0.6 },
                {
                  opacity: 1,
                  y: 0,
                  duration: duration * 0.8,
                  delay: delay + 0.2,
                  stagger,
                  ease: "power2.out",
                }
              );
            } else {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease: "power2.out",
              });
            }

            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Hook for background music control.
 */
export function useBackgroundMusic(src?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const playAudio = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeListeners();
        })
        .catch((err) => {
          console.log("Autoplay blocked, waiting for interaction:", err);
        });
    };

    const removeListeners = () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("mousedown", playAudio);
    };

    // Try playing immediately
    playAudio();

    // Fallback: play on first user interaction
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("scroll", playAudio);
    window.addEventListener("mousedown", playAudio);

    return () => {
      audio.pause();
      audio.src = "";
      removeListeners();
    };
  }, [src]);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Play failed:", err);
        });
    }
  }, [isPlaying]);

  return { isPlaying, toggle };
}
