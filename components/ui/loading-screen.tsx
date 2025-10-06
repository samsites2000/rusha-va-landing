"use client"

import { Typewriter } from "./typewriter"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Typewriter
        text="Loading..."
        className="text-6xl md:text-8xl font-bold text-orange-500"
        speed={100}
        loop={true}
        showCursor={true}
        cursorChar="|"
        cursorClassName="text-orange-500"
      />
    </div>
  )
}
