import { AnimatedMarqueeHero } from '@/components/sections/animated-marquee-hero'
import { ServicesOverview } from '@/components/sections/services-overview'
import { VideoScrollHero } from '@/components/ui/video-scroll-hero'
import { ServicesParallax } from '@/components/sections/services-parallax'
import { BrandStoryVideo } from '@/components/sections/brand-story-video'
import { DetailedServices } from '@/components/sections/detailed-services'
import { ContactForm } from '@/components/sections/contact-form'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  const heroImages = [
    'https://github.com/samsites2000/video-assets/blob/main/blue%20jumper%203.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/Generated%20Image%20October%2005,%202025%20-%205_41AM.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/blue%20jumper%201.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/Generated%20Image%20October%2005,%202025%20-%206_50AM.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/blue%20jumper%205.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/Generated%20Image%20October%2005,%202025%20-%205_38AM.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/blue%20jumper%202.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/Generated%20Image%20October%2005,%202025%20-%205_43AM.png?raw=true',
    'https://github.com/samsites2000/video-assets/blob/main/blue%20jumper%204.png?raw=true',
  ];

  return (
    <main className="min-h-screen">
      <AnimatedMarqueeHero
        tagline="Expert Virtual Assistant Services"
        title="Rusha VA Transforms Your Business"
        description="From business support to digital marketing and grant consultancy, I provide comprehensive virtual assistant services that drive measurable growth for UK businesses."
        ctaText="Get Started Today"
        images={heroImages}
      />
      <ServicesOverview />
      <VideoScrollHero
        videoSrc="/videos/version2.mp4"
        enableAnimations={true}
        startScale={0.4}
      />
      <ServicesParallax />
      <DetailedServices />
      <BrandStoryVideo />
      <ContactForm />
      <Footer />
    </main>
  )
}