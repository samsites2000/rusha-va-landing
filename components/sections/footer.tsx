'use client'

import { motion } from 'framer-motion'
import { SocialLinks } from '@/components/ui/social-links'
const socialData = [
  {
    name: "LinkedIn",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
  },
  {
    name: "Twitter",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
  },
  {
    name: "Instagram",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
  }
]

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Get in Touch Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Ready to transform your business? Let's discuss how my virtual assistant services can help you achieve your goals.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-orange-500 text-white font-semibold shadow-lg transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h4 className="text-lg font-semibold mb-4 text-white">Connect With Me</h4>
          <SocialLinks socials={socialData} className="justify-center" />
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400">&copy; 2024 Rusha VA. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}