"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage?: string;
}

interface ServicesOverviewProps {
  className?: string;
}

const ServiceCard = ({ service, index }: { service: ServiceCard; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="w-full overflow-hidden rounded-xl">
        {/* Image Row */}
        <div
          className="h-48 w-full"
          style={service.backgroundImage ? {
            backgroundImage: `url('${service.backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          } : {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        ></div>
        {/* Text Row */}
        <div className="bg-white p-0 flex flex-col justify-start items-start">
          <div className="border-l border-r border-b border-black rounded-b-xl px-4 py-3 w-full">
            <h3 className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-2">{service.title}</h3>
            <p className="text-black text-sm leading-tight text-left w-full">{service.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ className }) => {
  const services: ServiceCard[] = [
    {
      title: "Business Support",
      description: "Comprehensive administrative and operational support to streamline your business processes, manage communications, and handle day-to-day tasks efficiently.",
      backgroundImage: "https://github.com/samsites2000/video-assets/blob/main/orange%20jumper.png%2010.png?raw=true",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions including social media management, content creation, SEO optimization, and online campaign development to grow your digital presence.",
      backgroundImage: "https://github.com/samsites2000/video-assets/blob/main/orange%20jumper.png%209.png?raw=true",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
    },
    {
      title: "Grant Consultancy",
      description: "Expert guidance in identifying, applying for, and managing grants. From proposal writing to compliance management, maximizing your funding opportunities.",
      backgroundImage: "https://github.com/samsites2000/video-assets/blob/main/orange%20jumper.png%208.png?raw=true",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Header - Outside container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-4 md:mb-8 px-4 pt-16 md:pt-0"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">
          Our <span className="text-orange-500">Services</span>
        </h2>
        <p className="text-base text-black max-w-2xl leading-relaxed mx-auto">
          Comprehensive virtual assistant services tailored to drive your business growth
        </p>
      </motion.div>

      {/* Background Image Container - Alone */}
      <section
        className={cn(
          "relative min-h-0 md:min-h-[80vh] flex items-center justify-center py-4 md:py-8 px-4 overflow-hidden bg-white md:[background-image:url('https://raw.githubusercontent.com/samsites2000/video-assets/52d38d85f09054e07b82ef69470c796a5700b8b1/back.svg')] md:bg-cover md:bg-center md:bg-no-repeat",
          className
        )}
      >
        {/* Light overlay for subtle contrast */}
        <div className="hidden md:block absolute inset-0 bg-black/5" />

        {/* Top white gradient blend */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 via-white/20 to-transparent z-5" />

        {/* Bottom white gradient blend */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 via-white/20 to-transparent z-5" />

        {/* Floating elements for visual interest */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl"
        />
      </section>

      {/* Service Cards Grid - Outside container, below */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-20 -mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};