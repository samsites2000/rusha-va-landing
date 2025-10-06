"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn
import { CursorProvider, CursorFollow } from "@/components/ui/cursor";
import { FlipWords } from "@/components/ui/shadcn-io/flip-words";

// Props interface for the component
interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  className?: string;
}

// Reusable Button component styled like in the image
const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-12 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold shadow-lg transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
  >
    {children}
  </motion.button>
);

// The main hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <CursorProvider>
      <section
        className={cn(
          "relative w-full h-screen md:h-auto overflow-hidden md:overflow-visible bg-background flex flex-col items-center text-center px-4",
          className
        )}
      >
      <div className="z-10 flex flex-col items-center pt-24 md:pt-32 pb-[40vh] md:pb-16">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0 }}
          className="mb-4 inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="text-3xl md:text-7xl font-bold tracking-tight leading-tight text-foreground"
        >
          <span className="text-orange-500">Rusha VA</span>{' '}
          <FlipWords
            words={['Transforms', 'Elevates', 'Empowers', 'Streamlines']}
            duration={2500}
            className="text-orange-500 font-bold"
          />{' '}
          Your Business
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
        >
          <ActionButton>{ctaText}</ActionButton>
        </motion.div>
      </div>

      {/* Animated Image Marquee - Mobile only (inside hero) */}
      <div className="md:hidden absolute bottom-0 left-0 w-full h-1/3 z-30 overflow-hidden">
        <motion.div
          className="flex gap-4"
          style={{ width: 'max-content' }}
          animate={{
            x: [0, -(192 + 16) * images.length], // Move exactly one set: (image_width + gap) * number_of_images
          }}
          transition={{
            x: {
              ease: "linear",
              duration: images.length * 3, // 3 seconds per image
              repeat: Infinity,
            },
          }}
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] w-48 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
              }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Custom Cursor */}
      <CursorFollow
        align="bottom-right"
        sideOffset={20}
        className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full shadow-lg"
      >
        Virtual Assistant
      </CursorFollow>
      </section>

      {/* Animated Image Marquee - Desktop only (separate container) */}
      <div className="hidden md:block w-full py-16 overflow-hidden bg-background">
        <motion.div
          className="flex gap-4"
          style={{ width: 'max-content' }}
          animate={{
            x: [0, -(256 + 16) * images.length], // Move exactly one set: (image_width + gap) * number_of_images
          }}
          transition={{
            x: {
              ease: "linear",
              duration: images.length * 3, // 3 seconds per image
              repeat: Infinity,
            },
          }}
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] w-64 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
              }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </CursorProvider>
  );
};