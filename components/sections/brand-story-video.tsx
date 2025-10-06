'use client';

import * as React from 'react';
import { TestimonialCarousel, Testimonial } from '@/components/ui/testimonial-carousel';
import { AvatarGroup } from '@/components/ui/shadcn-io/avatar-group';
import {
  Cursor,
  CursorBody,
  CursorMessage,
  CursorName,
  CursorPointer,
} from '@/components/ui/shadcn-io/cursor';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

// Team users for the cursor animation
const users = [
  {
    id: 1,
    name: 'Rusha',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    id: 2,
    name: 'Team Member',
    avatar: 'https://github.com/shadcn.png',
    message: 'Working on your project',
  },
  {
    id: 3,
    name: 'Support',
    avatar: 'https://github.com/leerob.png',
  },
];

const colors = [
  {
    foreground: 'text-orange-800',
    background: 'bg-orange-50',
  },
  {
    foreground: 'text-rose-800',
    background: 'bg-rose-50',
  },
  {
    foreground: 'text-sky-800',
    background: 'bg-sky-50',
  },
];

// Helper function to generate random position
const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 70) + 15, // Keep within 15-85% range
  y: Math.floor(Math.random() * 70) + 15, // Keep within 15-85% range
});

function CursorAnimation() {
  const [user1Position, setUser1Position] = useState({
    x: 20,
    y: 20,
  });
  const [user2Position, setUser2Position] = useState({
    x: 50,
    y: 50,
  });
  const [user3Position, setUser3Position] = useState({
    x: 70,
    y: 30,
  });

  const userPositions = [user1Position, user2Position, user3Position];

  useEffect(() => {
    const interval = setInterval(
      () => {
        setUser1Position(getRandomPosition());
      },
      Math.random() * 3000 + 2000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setUser2Position(getRandomPosition());
      },
      Math.random() * 4000 + 3000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setUser3Position(getRandomPosition());
      },
      Math.random() * 2500 + 1500
    );
    return () => clearInterval(interval);
  }, []);

  const usersWithPositions = users.map((user, index) => ({
    ...user,
    position: userPositions[index],
  }));

  return (
    <div className="relative w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)]" style={{ backgroundSize: '16px 16px' }}>
      {usersWithPositions.map((user, index) => (
        <Cursor
          className="absolute transition-all duration-1000"
          key={user.id}
          style={{
            top: `${user.position.y}%`,
            left: `${user.position.x}%`,
          }}
        >
          <CursorPointer
            className={cn(colors[index % colors.length].foreground)}
          />
          <CursorBody
            className={cn(
              colors[index % colors.length].background,
              colors[index % colors.length].foreground,
              'gap-1 px-3 py-2'
            )}
          >
            <div className="flex items-center gap-2 !opacity-100">
              <div
                className="size-4 rounded-full"
                style={{
                  backgroundColor: index === 0 ? '#f97316' : index === 1 ? '#3b82f6' : '#ef4444'
                }}
              />
              <CursorName>{user.name}</CursorName>
            </div>
            {user.message && <CursorMessage>{user.message}</CursorMessage>}
          </CursorBody>
        </Cursor>
      ))}
    </div>
  );
}

export function BrandStoryVideo() {
  return (
    <div className="bg-white dark:bg-gray-900 font-sans">
      <div className="px-[5%]">
        <div className="max-w-7xl mx-auto">
          <section className="py-24 md:py-32">
            {/* Section Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">
              Let's get to <span className="text-orange-500">work</span>
            </h2>

            {/* Mobile: Stacked layout, Desktop: Centered cursor only */}
            <div className="flex flex-col md:flex-row md:justify-center items-center gap-8">
              {/* Testimonial Carousel - Mobile only */}
              <div className="w-full h-[300px] md:hidden">
                <TestimonialCarousel
                  testimonials={serviceTestimonials}
                  showArrows={false}
                  showDots={true}
                  className="w-full h-full"
                />
              </div>

              {/* Cursor Animation - Mobile full width, Desktop centered with reduced height */}
              <div className="w-full md:w-[600px] h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <CursorAnimation />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
