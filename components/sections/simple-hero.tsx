'use client'

import { HeroScrollAnimation } from '@/components/ui/hero-scroll-animation'

export function SimpleHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/workspace-hero.png"
          alt="Rusha VA - Professional Workspace"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Glassmorphism effect in lower portion */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/30 via-white/20 to-transparent backdrop-blur-md"></div>
      </div>

      {/* Animated Cards - Lower Right */}
      <div className="absolute bottom-16 right-8 z-30 w-80 h-20">
        <HeroScrollAnimation velocity={2} />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-end h-full pl-8 pr-8 pb-16">
        <div className="max-w-2xl text-left">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg text-left">
            Professional Virtual Assistant Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md text-left">
            Streamline your business operations with expert UK-based virtual assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 rounded-lg shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-colors duration-200 rounded-lg"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}