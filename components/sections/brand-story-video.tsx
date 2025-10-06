'use client';

import * as React from 'react';
import { TestimonialCarousel, Testimonial } from '@/components/ui/testimonial-carousel';

// Service testimonials data
const serviceTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Swipe to see how we can help you",
    backgroundImage: "/images/testimonials/lee.jpg",
    description: "Discover our comprehensive virtual assistant services tailored to your business needs"
  },
  {
    id: 2,
    name: "Expert Business Support",
    backgroundImage: "/images/testimonials/auntie.jpg",
    description: "Comprehensive administrative support, data management, and project coordination in real time. Every task handled with precision by our UK-based team."
  },
  {
    id: 3,
    name: "Data-Driven Marketing",
    backgroundImage: "/images/testimonials/john.jpg",
    description: "Every marketing campaign includes detailed analytics and performance tracking. See real results with full transparency on ROI and engagement metrics."
  },
  {
    id: 4,
    name: "Focused Grant Success",
    backgroundImage: "/images/testimonials/random.jpg",
    description: "Target specific funding opportunities effortlessly with our grant consultancy expertise. We research, apply, and manage applications for maximum success rates."
  },
  {
    id: 5,
    name: "Seamless Communication",
    backgroundImage: "/images/testimonials/tony.jpg",
    description: "Transform your business communications into streamlined operations. From customer service to internal coordination, we make every interaction count."
  }
];

export function BrandStoryVideo() {
  return (
    <div className="bg-white dark:bg-gray-900 font-sans">
      <div className="px-[5%]">
        <div className="max-w-7xl mx-auto">
          <section className="py-24 md:py-48 flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
              {/* Testimonial Carousel */}
              <TestimonialCarousel
                testimonials={serviceTestimonials}
                showArrows={false}
                showDots={true}
                className="w-full"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}