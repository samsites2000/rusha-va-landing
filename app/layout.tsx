import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rusha VA | Virtual Assistant & Business Consultancy London',
  description: 'Expert business support, digital marketing, and grant consultancy for startups and social enterprises in London, UK. Value-driven, not task-driven.',
  keywords: ['virtual assistant', 'business consultancy', 'London', 'grant consultancy', 'digital marketing', 'business support'],
  authors: [{ name: 'Phylisia Rushá' }],
  openGraph: {
    title: 'Rusha VA | Virtual Assistant & Business Consultancy',
    description: 'Expert business support, digital marketing, and grant consultancy for startups and social enterprises.',
    url: 'https://rusha-va.co.uk',
    siteName: 'Rusha VA',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusha VA | Virtual Assistant & Business Consultancy',
    description: 'Expert business support, digital marketing, and grant consultancy for startups and social enterprises.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}