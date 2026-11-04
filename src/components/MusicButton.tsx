"use client";

import { useRef, useEffect, useState } from "react";

interface MusicButtonProps {
  isVisible: boolean;
}

export default function MusicButton({ isVisible }: MusicButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      if (!audio) return;
      
      // If it's already playing, clean up the listeners and exit
      if (!audio.paused) {
        setIsPlaying(true);
        removeListeners();
        return;
      }

      audio.play()
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
      window.removeEventListener("mousedown", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    // Try playing immediately
    playAudio();

    // Fallback: play on the very first user interaction
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("mousedown", playAudio);
    window.addEventListener("keydown", playAudio);

    return () => {
      removeListeners();
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling to window
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Play failed:", err);
        });
    }
  };

  return (
    <>
      {/* Native HTML5 Audio tag for highest mobile compatibility */}
      <audio ref={audioRef} src="/assets/music.mp3" loop />

      {/* Music toggle button, hidden visually until cover is opened */}
      <button
        id="music-toggle"
        className={`music-btn ${isPlaying ? "playing" : ""} ${
          !isVisible ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        style={{
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="flex items-end gap-[2px] h-4">
          <span className="bar" style={{ height: isPlaying ? undefined : "4px" }} />
          <span className="bar" style={{ height: isPlaying ? undefined : "8px" }} />
          <span className="bar" style={{ height: isPlaying ? undefined : "4px" }} />
          <span className="bar" style={{ height: isPlaying ? undefined : "6px" }} />
        </div>
      </button>
    </>
  );
}
