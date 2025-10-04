'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Play } from 'lucide-react'

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-gradient-to-b from-orange-50 to-orange-100">
      <header>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#" title="" className="flex">
                <img
                  className="w-auto h-8"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/logo.svg"
                  alt="Rusha VA"
                />
              </a>
            </div>

            <button
              type="button"
              className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <a href="#services" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">
                Services
              </a>
              <a href="#about" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">
                About
              </a>
              <a href="#contact" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">
                Contact
              </a>
              <a href="#pricing" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">
                Pricing
              </a>

              <div className="w-px h-5 bg-black/20"></div>

              <a href="#contact" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">
                Get Quote
              </a>
              <a
                href="#contact"
                title=""
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"
                role="button"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
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

              <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                <a
                  href="#contact"
                  title=""
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
                  role="button"
                >
                  Start exploring
                </a>

                <a
                  href="#about"
                  title=""
                  className="inline-flex items-center mt-6 text-base font-semibold transition-all duration-200 sm:mt-0 hover:opacity-80"
                >
                  <div className="w-10 h-10 mr-3 flex items-center justify-center">
                    <Play className="w-6 h-6 fill-orange-500 text-orange-500" />
                  </div>
                  Watch video
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
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                alt="Virtual Assistant Services"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}