'use client'

import { motion } from 'framer-motion'

export function HeroSection() {

  return (
    <div className="relative bg-gradient-to-b from-orange-50 to-orange-100">
      <header>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-center lg:justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#" title="" className="flex">
                <img
                  className="w-auto h-16"
                  src="/images/logo.png"
                  alt="Rusha VA"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-4 sm:py-6 lg:py-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                Streamline Your Business with
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#F97316]"></span>
                  <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">Rusha VA.</h1>
                </div>
              </h1>

              <p className="mt-8 text-base text-black sm:text-xl">
                From business support to digital marketing and grant consultancy - we handle the details so you can focus on growth. Expert UK-based virtual assistant services.
              </p>

              <div className="mt-10 flex justify-center lg:justify-start sm:items-center sm:space-x-8">
                <a
                  href="#contact"
                  title=""
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
                  role="button"
                >
                  Start exploring
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                className="w-full"
                src="/images/hero-professional.png"
                alt="Rusha VA - Professional Virtual Assistant Services"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* White transparent gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
    </div>
  )
}