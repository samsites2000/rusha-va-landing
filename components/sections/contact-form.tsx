'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Building,
  User,
  MessageSquare,
  Shield,
  Award,
  Zap
} from 'lucide-react'

import { contactFormSchema, serviceOptions, budgetOptions, type ContactFormData } from '@/lib/validations/contact'
import { analytics } from '@/lib/analytics'

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

const trustIndicators = [
  { icon: Shield, text: 'SSL Secured' },
  { icon: Award, text: 'ISO Certified' },
  { icon: Zap, text: 'Fast Response' },
  { icon: CheckCircle, text: 'Satisfaction Guaranteed' }
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  })


  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Track form completion
    analytics.contactFormCompleted({
      service: data.service,
      budget: data.budget,
      hasPhone: !!data.phone,
      hasCompany: !!data.company
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Form submitted successfully:', result)

      setSubmitStatus('success')
      analytics.track('Contact Form Success', {
        email_ids: result.emailIds
      })
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      analytics.contactFormFailed(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
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

              <div className="flex flex-col gap-3">
                <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg">
                  CONTACT US NOW
                </button>
                <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-md font-medium transition-all duration-300 hover:bg-gray-200 hover:shadow-lg border border-gray-300">
                  BOOK A CONSULTATION
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}