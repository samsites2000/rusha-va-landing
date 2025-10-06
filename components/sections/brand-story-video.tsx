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
import { CursorProvider, CursorFollow } from '@/components/ui/cursor';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Service testimonials data
const serviceTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Grant Consultancy",
    backgroundImage: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_51AM.png?raw=true",
    description: "Expert grant application services that unlock funding opportunities"
  },
  {
    id: 2,
    name: "Custom Solutions",
    backgroundImage: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_50AM.png?raw=true",
    description: "Tailored virtual assistance designed for your unique business needs"
  },
  {
    id: 3,
    name: "Business Support",
    backgroundImage: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_53AM.png?raw=true",
    description: "Comprehensive administrative support that transforms your daily operations"
  },
  {
    id: 4,
    name: "Digital Marketing",
    backgroundImage: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_52AM.png?raw=true",
    description: "Data-driven marketing strategies that deliver real, measurable growth"
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
    <CursorProvider>
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

              {/* Custom Orange Cursor - Desktop only */}
              <CursorFollow
                align="bottom-right"
                sideOffset={20}
                className="hidden md:block px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full shadow-lg"
              >
                Virtual Assistant
              </CursorFollow>
            </section>
          </div>
        </div>
      </div>
    </CursorProvider>
  );
}
