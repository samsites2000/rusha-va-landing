import { Navigation } from '@/components/sections/navigation'
import { AnimatedMarqueeHero } from '@/components/sections/animated-marquee-hero'
import { ServicesOverview } from '@/components/sections/services-overview'
import { VideoScrollHero } from '@/components/ui/video-scroll-hero'
import { BrandStoryVideo } from '@/components/sections/brand-story-video'
import { DetailedServices } from '@/components/sections/detailed-services'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  const heroImages = [
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_53AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_52AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_51AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_50AM.png?raw=true',
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      <div id="home" className="md:contents">
        <div className="mb-0">
          <AnimatedMarqueeHero
            tagline="Expert Virtual Assistant Services"
            title="Rusha VA Transforms Your Business"
            description="From business support to digital marketing and grant consultancy, I provide comprehensive virtual assistant services that drive measurable growth for UK businesses."
            ctaText="Get Started Today"
            images={heroImages}
          />
        </div>
        <div id="services">
          <ServicesOverview />
        </div>
      </div>
      <div id="about">
        <VideoScrollHero
          videoSrc="/videos/version2.mp4"
          enableAnimations={true}
          startScale={0.4}
        />
        <DetailedServices />
        <BrandStoryVideo />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </main>
  )
}