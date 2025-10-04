'use client';

import { forwardRef, ReactNode, useEffect, useRef, RefObject } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineContentProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  animationNum: number;
  timelineRef: RefObject<HTMLElement>;
  customVariants?: any;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  ({
    children,
    as: Component = 'div',
    animationNum,
    timelineRef,
    customVariants,
    className,
    ...props
  }, ref) => {
    const controls = useAnimation();
    const isInView = useInView(timelineRef, {
      threshold: 0.1,
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
      if (isInView) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }, [isInView, controls]);

    return (
      <motion.div
        // @ts-ignore - Component prop handling
        as={Component}
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