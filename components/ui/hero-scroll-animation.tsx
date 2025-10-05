"use client"

import * as React from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, wrap } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroScrollAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  velocity?: number
  movable?: boolean
  clamp?: boolean
}

const HeroScrollAnimation = React.forwardRef<HTMLDivElement, HeroScrollAnimationProps>(
  ({ velocity = 3, movable = true, clamp = false, className, ...props }, ref) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    })

    const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`)

    const directionFactor = React.useRef<number>(1)
    const scrollThreshold = React.useRef<number>(5)

    useAnimationFrame((t, delta) => {
      if (movable) {
        move(delta)
      } else {
        if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
          move(delta)
        }
      }
    })

    function move(delta: number) {
      let moveBy = directionFactor.current * velocity * (delta / 1000)
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
    }

    // Create visual cards without text
    const cards = Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="flex-shrink-0 w-24 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg mx-2 opacity-80"
      />
    ))

    return (
      <div
        ref={ref}
        className={cn("relative m-0 flex flex-nowrap overflow-hidden", className)}
        {...props}
      >
        <motion.div
          className="flex flex-row flex-nowrap"
          style={{ x }}
        >
          {cards}
          {cards} {/* Duplicate for seamless loop */}
        </motion.div>
      </div>
    )
  }
)
HeroScrollAnimation.displayName = "HeroScrollAnimation"

export { HeroScrollAnimation }