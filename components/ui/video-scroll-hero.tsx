"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
}

export function VideoScrollHero({
  videoSrc = "https://private-user-images.githubusercontent.com/235835933/497423862-6a85c6c0-e9c3-4249-a966-c8f8633cdfea.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTk1Njc5MzgsIm5iZiI6MTc1OTU2NzYzOCwicGF0aCI6Ii8yMzU4MzU5MzMvNDk3NDIzODYyLTZhODVjNmMwLWU5YzMtNDI0OS1hOTY2LWM4Zjg2MzNjZGZlYS5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAwNFQwODQ3MThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZjlkZWZlMzdmZjgzNWUzYTNlNzRiODExODRkZjQxZDczYWRjYjVhNmUyZmM1YWMwY2E2Y2E1ZDMxYjAxNDg5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.DqEdtU0REEcIOJm4oi_D5tXaRMcP_yd1Y6quYFZ7KvU",
  enableAnimations = true,
  className = "",
  startScale = 0.25,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress based on container position
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min(scrolled / maxScroll, 1);

      // Scale from startScale to full screen size
      const targetScale = 1.296; // Reduced by another 10% (1.44 * 0.9)
      const newScale = startScale + (progress * (targetScale - startScale));
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`relative ${className}`}>
      {/* Hero Section with Video */}
      <div
        ref={containerRef}
        className="relative h-[400vh]"
      >
        {/* Fixed Video Container */}
        <div className="sticky top-0 w-full h-screen flex items-center justify-center z-10">
          <div
            className="relative flex items-center justify-center will-change-transform"
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : 'scale(1)',
              transformOrigin: "center center",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[60vw] h-[70vh] object-cover shadow-2xl rounded-2xl relative z-0"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div>
        </div>
      </div>
    </div>
  );
}
