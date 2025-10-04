import { HeroSection } from '@/components/sections/hero-section'
import { VideoScrollHero } from '@/components/ui/video-scroll-hero'
import { ServicesParallax } from '@/components/sections/services-parallax'
import { BrandStoryVideo } from '@/components/sections/brand-story-video'
import { DetailedServices } from '@/components/sections/detailed-services'
import { ContactForm } from '@/components/sections/contact-form'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VideoScrollHero
        videoSrc="/videos/version2.mp4"
        enableAnimations={true}
        startScale={0.4}
      />
      <ServicesParallax />
      <BrandStoryVideo />
      <DetailedServices />
      <ContactForm />
      <Footer />
    </main>
  )
}