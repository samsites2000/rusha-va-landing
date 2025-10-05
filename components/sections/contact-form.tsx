'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@rushava.co.uk', 'support@rushava.co.uk'],
    color: 'blue-500'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+44 20 7123 4567', 'Mon-Fri 9AM-6PM GMT'],
    color: 'orange-500'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['London, United Kingdom', 'Remote services available'],
    color: 'orange-500'
  },
  {
    icon: Clock,
    title: 'Response Time',
    details: ['< 2 hours response', '24/7 emergency support'],
    color: 'purple-500'
  }
]

export function ContactForm() {

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Centered Vertical Marquee Section */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-md w-full"
          >
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                Get in Touch
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed text-center">
                Ready to transform your business? We're here to help you succeed.
              </p>

              {/* Vertical Marquee */}
              <div className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                <div className="relative w-full h-full">
                  <div
                    className="group flex flex-col overflow-hidden h-full"
                    style={{ "--duration": "20s" } as React.CSSProperties}
                  >
                    <div className="flex shrink-0 flex-col animate-marquee-vertical">
                      {contactInfo.flatMap(info => info.details).map((item, idx) => (
                        <div
                          key={idx}
                          className="text-lg font-normal tracking-tight py-6 marquee-item text-center text-gray-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex shrink-0 flex-col animate-marquee-vertical" aria-hidden="true">
                      {contactInfo.flatMap(info => info.details).map((item, idx) => (
                        <div
                          key={idx}
                          className="text-lg font-normal tracking-tight py-6 marquee-item text-center text-gray-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top vignette */}
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 via-gray-50/50 to-transparent z-10"></div>

                  {/* Bottom vignette */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent z-10"></div>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <button className="inline-flex items-center justify-center px-4 py-4 text-sm font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 w-48">
                  CONTACT ME NOW
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}