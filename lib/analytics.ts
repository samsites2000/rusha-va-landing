'use client'

import posthog from 'posthog-js'

class Analytics {
  private initialized = false

  init() {
    if (typeof window === 'undefined' || this.initialized) return

    // Disable PostHog in development if not configured
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!posthogKey || posthogKey === 'your_posthog_key_here') {
      if (process.env.NODE_ENV === 'development') {
        console.log('PostHog disabled in development (not configured)')
      }
      return
    }

    posthog.init(posthogKey, {
      api_host: posthogHost || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // We'll manually capture pageviews
      capture_pageleave: true,
      loaded: () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded in development mode')
        }
      }
    })

    this.initialized = true
  }

  // Page tracking
  pageview(path?: string) {
    if (!this.initialized) return
    posthog.capture('$pageview', {
      $current_url: path || window.location.href
    })
  }

  // Contact form events
  contactFormStarted() {
    this.track('Contact Form Started')
  }

  contactFormCompleted(data: {
    service: string
    budget?: string
    hasPhone: boolean
    hasCompany: boolean
  }) {
    this.track('Contact Form Completed', {
      service_type: data.service,
      budget_range: data.budget,
      provided_phone: data.hasPhone,
      provided_company: data.hasCompany
    })
  }

  contactFormFailed(error: string) {
    this.track('Contact Form Failed', {
      error_message: error
    })
  }

  // Service interactions
  serviceCardExpanded(serviceName: string) {
    this.track('Service Card Expanded', {
      service_name: serviceName
    })
  }

  serviceCardCollapsed(serviceName: string) {
    this.track('Service Card Collapsed', {
      service_name: serviceName
    })
  }

  serviceCTAClicked(serviceName: string, location: string) {
    this.track('Service CTA Clicked', {
      service_name: serviceName,
      cta_location: location
    })
  }

  // Video interactions
  brandVideoPlayed() {
    this.track('Brand Video Play Attempted')
  }

  // General CTA tracking
  ctaClicked(ctaText: string, location: string) {
    this.track('CTA Clicked', {
      cta_text: ctaText,
      cta_location: location
    })
  }

  // Consultation booking
  consultationBooked(source: string) {
    this.track('Consultation Booking Started', {
      booking_source: source
    })
  }

  // Scroll depth tracking
  scrollDepth(percentage: number) {
    this.track('Scroll Depth', {
      scroll_percentage: percentage
    })
  }

  // User identification
  identify(userId: string, properties?: Record<string, any>) {
    if (!this.initialized) return
    posthog.identify(userId, properties)
  }

  // Generic event tracking
  track(eventName: string, properties?: Record<string, any>) {
    if (!this.initialized) return
    posthog.capture(eventName, properties)
  }

  // Reset user (for privacy)
  reset() {
    if (!this.initialized) return
    posthog.reset()
  }
}

// Create singleton instance
export const analytics = new Analytics()

// Auto-initialize on client side
if (typeof window !== 'undefined') {
  analytics.init()
}