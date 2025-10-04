// Shared TypeScript types

export interface ServiceType {
  id: string
  title: string
  description: string
  icon: string
  category: 'BUSINESS_SUPPORT' | 'DIGITAL_MARKETING' | 'GRANT_CONSULTANCY'
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  quote: string
  image?: string
}

export interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  serviceInterest: 'BUSINESS_SUPPORT' | 'DIGITAL_MARKETING' | 'GRANT_CONSULTANCY' | 'MULTIPLE_SERVICES' | 'NOT_SURE'
  message: string
  consent: boolean
}