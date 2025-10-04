// Landing page types
export interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  budget?: string
}

export interface NavItem {
  title: string
  href: string
}

// Component props
export interface HeroSectionProps {
  className?: string
}

export interface ServicesSectionProps {
  className?: string
  services: Service[]
}

export interface ContactSectionProps {
  className?: string
}