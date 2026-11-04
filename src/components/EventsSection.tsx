"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useAnimations";

interface WeddingEvent {
  id: string;
  name: string;
  urduName: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  address: string[];
  floralImage: string;
  bgGradient: string;
  // --- ADDED FOR DYNAMIC SPACING ---
  // Use Tailwind margin classes like 'mt-0', 'mt-10', '-mt-8' to shift the text up or down
  textOffsetTop: string; 
}

const events: WeddingEvent[] = [
  // {
  //   id: "mehndi",
  //   name: "Mehndi",
  //   urduName: "مہندی",
  //   date: "6 November 2026",
  //   day: "Friday",
  //   time: "8:00 PM — 12:00 AM",
  //   venue: "Hoorbai Hajiani Banquet",
  //   address: ["Yaqoob Khan Road", "Near Raja Mansion, Karachi"],
  //   floralImage: "/assets/watercolour-flower.png",
  //   bgGradient: "linear-gradient(180deg, var(--ivory) 0%, #f5f0e0 50%, var(--ivory) 100%)",
  //   textOffsetTop: "mt-12", // Adjust this value to move text down (mt-12) or up (-mt-4)
  // },
  {
    id: "barat",
    name: "Barat",
    urduName: "بارات",
    date: "13 November 2026",
    day: "Friday",
    time: "7:00 PM — 10:00 PM",
    venue: "Paradise crystal Marquee",
    address: ["Main sheikhupura Road", "Faisalabad"],
    floralImage: "/assets/frame-wreaths.png",
    bgGradient: "linear-gradient(180deg, var(--ivory) 0%, var(--champagne-light) 50%, var(--ivory) 100%)",
    textOffsetTop: "mt-0", // Adjust this value to move text down or up
  },
  {
    id: "valima",
    name: "Valima",
    urduName: "ولیمہ",
    date: "14 November 2026",
    day: "Saturday",
    time: "7:00 PM — 10:00 PM",
    venue: "Paradise Gold Marquee",
    address: ["West Canal road near Habbits opposite green avenue canal road", "Faisalabad Pakistan"],
    floralImage: "/assets/floral-circles.png",
    bgGradient: "linear-gradient(180deg, var(--ivory) 0%, var(--blush-light) 50%, var(--ivory) 100%)",
    textOffsetTop: "mt-0", // Adjust this value to move text down or up

  },
];

function EventPage({ event, index }: { event: WeddingEvent; index: number }) {
  const contentRef = useScrollReveal({
    delay: 0.1,
    y: 30,
    duration: 0.9,
    stagger: 0.12,
  });

  return (
    <section
      id={`event-${event.id}`}
      className="snap-section paper-texture"
      style={{ background: event.bgGradient, padding: 0, margin: 0 }}
    >
      {/* Content container — zero padding/margin */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center w-full h-full" style={{ padding: 0, margin: 0 }}>

        {/* Couple name at the very top */}
        <p
          className="font-pinyon pb-1 text-4xl text-gold"
          style={{ textShadow: "0 1px 4px rgba(201,168,76,0.15)", margin: 0 }}
          data-stagger
        >
          Ahsan &amp; Saman
        </p>

        {/* Ornament line */}
        <div className="gold-line-wide my-2" data-stagger />

        {/* Event name — prominent, different typography */}
        <h2
          className="font-playfair pt-6 text-3xl font-semibold tracking-[8px] uppercase"
          style={{ color: "var(--charcoal)", margin: 0 }}
          data-stagger
        >
          {event.name}
        </h2>

        {/* Day */}
        <p className="font-josefin pt-2 text-[10px] tracking-[4px] uppercase text-warm-gray mt-1 mb-2" data-stagger>
          {event.day}
        </p>

        {/* Floral image with details inside — large, fills screen */}
        <div className="relative flex items-center justify-center flex-1 w-full max-h-[60vh]" data-stagger style={{ margin: 0, padding: 0 }}>
          {/* Floral image — large, stretched slightly vertically */}
          <div className="relative w-[120vw] h-full max-w-[500px]" style={{ minHeight: "300px" }}>
            <Image
              src={event.floralImage}
              alt=""
              fill
              className="object-contain"
              style={{ opacity: 0.85 }}
              sizes="60vw"
            />
          </div>

          {/* Details overlaid inside the floral circle */}
          {/* We apply the dynamic textOffsetTop here to push the whole text block up or down */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-12 ${event.textOffsetTop}`}>
            <p className="text-[15px] text-gold/85 font-medium tracking-wider" style={{ fontFamily: 'var(--font-cormorant), system-ui' }}>
              إن شاء الله
            </p>
            <p className="font-cormorant text-lg font-semibold text-charcoal mb-1">
              {event.date}
            </p>

            <div className="gold-line mb-2 mt-1" />

            <p className="font-josefin text-xs tracking-[2px] text-gold font-medium mb- mt-1">
              {event.time}
            </p>

            <p className="font-cormorant mt-2 mb-1 text-md font-semibold text-charcoal-light leading-snug">
              {event.venue}
            </p>
            {event.address.map((line, i) => (
              <p key={i} className="font-josefin text-[10px] font-light text-warm-gray tracking-wider">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom invitation line */}
        <p className="font-cormorant text-sm italic text-warm-gray mt-2" data-stagger>
          Your gracious presence is requested
        </p>

        {/* Bottom ornament */}
        <div className="ornament my-2" data-stagger>✦</div>
      </div>
    </section>
  );
}

interface EventsSectionProps {
  domainType?: "all" | "hamna" | "waleed";
}

export default function EventsSection({ domainType = "all" }: EventsSectionProps) {
  const filteredEvents = events.filter((event) => {
    if (domainType === "hamna") {
      return event.id === "barat" || event.id === "valima";
    }
    if (domainType === "waleed") {
      return event.id === "valima";
    }
    return true; // "all"
  });

  return (
    <>
      {filteredEvents.map((event, index) => (
        <EventPage key={event.id} event={event} index={index} />
      ))}
    </>
  );
}
