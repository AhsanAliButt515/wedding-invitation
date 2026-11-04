"use client";

import { useState, useEffect } from "react";
import { useInvitationOpen } from "@/hooks/useAnimations";
import InvitationCover from "@/components/InvitationCover";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import ThankYouSection from "@/components/ThankYouSection";
import CountdownSection from "@/components/CountdownSection";
import MusicButton from "@/components/MusicButton";

export default function Home() {
  const {
    isOpen,
    coverRef,
    leftFlapRef,
    rightFlapRef,
    ribbonRef,
    contentRef,
  } = useInvitationOpen();

  const [domainType, setDomainType] = useState<"all" | "hamna" | "waleed">("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Check query parameter preview fallback first (useful for testing)
      const params = new URLSearchParams(window.location.search);
      const preview = params.get("preview")?.toLowerCase();

      if (preview === "hamna" || preview === "waleed" || preview === "all") {
        setDomainType(preview as any);
        return;
      }

      // 2. Check hostname subdomains
      const hostname = window.location.hostname.toLowerCase();
      if (hostname.startsWith("hamna.")) {
        setDomainType("hamna");
      } else if (hostname.startsWith("waleed.")) {
        setDomainType("waleed");
      } else {
        setDomainType("all");
      }
    }
  }, []);

  return (
    <main className="relative bg-ivory" id="main-content">
      {/* Invitation cover overlay */}
      <InvitationCover
        coverRef={coverRef}
        leftFlapRef={leftFlapRef}
        rightFlapRef={rightFlapRef}
        ribbonRef={ribbonRef}
      />

      {/* Snap scroll container — each child section is one "page" */}
      <div ref={contentRef} className="snap-container" style={{ opacity: 0 }}>
        {/* Page 1: Hero */}
        <HeroSection />

        {/* Pages 2-4: Events (each is its own snap page) */}
        <EventsSection domainType={domainType} />

        {/* Page 5: Thank You */}
        <ThankYouSection />

        {/* Page 6: Countdown */}
        <CountdownSection domainType={domainType} />
      </div>

      {/* Music toggle */}
      <MusicButton isVisible={isOpen} />
    </main>
  );
}
