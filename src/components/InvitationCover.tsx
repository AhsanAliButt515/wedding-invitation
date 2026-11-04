"use client";

import Image from "next/image";

interface InvitationCoverProps {
  coverRef: React.RefObject<HTMLDivElement | null>;
  leftFlapRef: React.RefObject<HTMLDivElement | null>;
  rightFlapRef: React.RefObject<HTMLDivElement | null>;
  ribbonRef: React.RefObject<HTMLDivElement | null>;
}

export default function InvitationCover({
  coverRef,
  leftFlapRef,
  rightFlapRef,
  ribbonRef,
}: InvitationCoverProps) {
  return (
    <div ref={coverRef} className="invitation-cover" id="invitation-cover">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 z-[51]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Left flap */}
      <div ref={leftFlapRef} className="cover-flap cover-flap-left">
        <Image
          src="/assets/flap_left.png"
          alt="Left invitation flap"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Right flap */}
      <div ref={rightFlapRef} className="cover-flap cover-flap-right">
        <Image
          src="/assets/flap_right.png"
          alt="Right invitation flap"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Center ribbon / seam decoration */}
      <div
        ref={ribbonRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-[55] h-full w-[3px]"
      >
        {/* Vertical gold line seam */}
        <div className="w-full h-full bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

        {/* Center bow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="relative w-16 h-16">
            {/* Bow loops */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[120%] -translate-y-1/2 w-8 h-5 border-2 border-gold/60 rounded-full rotate-[-20deg]" />
            <div className="absolute top-1/2 left-1/2 translate-x-[20%] -translate-y-1/2 w-8 h-5 border-2 border-gold/60 rounded-full rotate-[20deg]" />
            {/* Center knot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold/50 rounded-full" />
            {/* Trailing ribbons */}
            <div className="absolute top-[60%] left-1/2 -translate-x-[60%] w-[2px] h-10 bg-gradient-to-b from-gold/50 to-transparent rotate-[-8deg]" />
            <div className="absolute top-[60%] left-1/2 -translate-x-[40%] w-[2px] h-12 bg-gradient-to-b from-gold/50 to-transparent rotate-[8deg]" />
          </div>
        </div>
      </div>

      {/* Soft corner vignette */}
      <div
        className="absolute inset-0 z-[53] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />
    </div>
  );
}
