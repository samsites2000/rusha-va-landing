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
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h4 className="text-lg font-semibold mb-4 text-black">Connect With Me</h4>
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
          <p className="text-black">&copy; 2024 Rusha VA. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}