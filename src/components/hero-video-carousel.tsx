"use client";

import { useState, useEffect, useRef } from "react";

export type VideoClip = {
  src: string;
  alt?: string;
};

type HeroVideoCarouselProps = {
  /** List of video sources (paths in /public or URLs). */
  clips: VideoClip[];
  /** Seconds to show each clip before advancing. */
  intervalSeconds?: number;
  /** Whether each clip should loop while it's active. */
  loopClips?: boolean;
};

export function HeroVideoCarousel({
  clips,
  intervalSeconds = 6,
  loopClips = false,
}: HeroVideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // When looping, advance on a timer; when not looping, advance only when video ends (onEnded)
  useEffect(() => {
    if (clips.length <= 1 || !loopClips) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clips.length);
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [clips.length, intervalSeconds, loopClips]);

  const goToNext = () => {
    if (clips.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % clips.length);
  };

  // When the active index changes, play the new video and pause the others
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === currentIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentIndex]);

  if (clips.length === 0) return null;

  return (
    <div className="relative h-full w-full bg-black">
      {clips.map((clip, index) => (
        <div
          key={clip.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={clip.src}
            className="h-full w-full object-cover opacity-80"
            autoPlay={index === currentIndex}
            muted
            playsInline
            preload="auto"
            loop={loopClips}
            aria-label={clip.alt ?? `Hero video ${index + 1}`}
            onLoadedMetadata={(e) => {
              if (index === currentIndex) {
                e.currentTarget.play().catch(() => {});
              }
            }}
            onEnded={!loopClips ? goToNext : undefined}
          />
        </div>
      ))}
    </div>
  );
}
