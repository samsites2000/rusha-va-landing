"use client"

import { GooeyMarquee } from "./gooey-marquee"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <GooeyMarquee
        text="Loading"
        className="text-orange-500"
        speed={3}
      />
    </div>
  )
}
