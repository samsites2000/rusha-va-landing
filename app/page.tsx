'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/sections/navigation'
import { AnimatedMarqueeHero } from '@/components/sections/animated-marquee-hero'
import { ServicesOverview } from '@/components/sections/services-overview'
import { VideoScrollHero } from '@/components/ui/video-scroll-hero'
import { BrandStoryVideo } from '@/components/sections/brand-story-video'
import { DetailedServices } from '@/components/sections/detailed-services'
import { Footer } from '@/components/sections/footer'
import { LoadingScreen } from '@/components/ui/loading-screen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

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

  const serviceImages = [
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_53AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_52AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_51AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_50AM.png?raw=true',
  ];

  const detailedServiceImages = [
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_33AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_30AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_29AM.png?raw=true',
    'https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_27AM.png?raw=true',
  ];

  const allImages = [...heroImages, ...serviceImages, ...detailedServiceImages];

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = allImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
