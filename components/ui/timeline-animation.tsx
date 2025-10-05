'use client';

import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineContentProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: any;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  ({
    children,
    as: Component = 'div',
    animationNum,
    timelineRef,
    customVariants,
    className,
    ...props
  }, ref) => {
    const [mounted, setMounted] = useState(false);
    const controls = useAnimation();
    const isInView = useInView(timelineRef, {
      once: true
    });

    const defaultVariants = {
      hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.6,
          delay: animationNum * 0.1,
          ease: "easeOut"
        }
      }
    };

    const variants = customVariants || defaultVariants;

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (mounted && isInView) {
        controls.start('visible');
      } else if (mounted) {
        controls.start('hidden');
      }
    }, [isInView, controls, mounted]);

    if (!mounted) {
      return (
        <div className={cn(className)} {...props}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        custom={animationNum}
        initial="hidden"
        animate={controls}
        variants={variants}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

TimelineContent.displayName = 'TimelineContent';