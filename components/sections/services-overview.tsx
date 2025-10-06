"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage?: string;
  details: string[];
}

interface ServicesOverviewProps {
  className?: string;
}

const AccordionServiceCard = ({ service, index, isOpen, onToggle }: {
  service: ServiceCard;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="w-full overflow-hidden rounded-xl border border-black">
        {/* Header - Always Visible */}
        <button
          onClick={onToggle}
          className="w-full text-left bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4 flex-1">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                {service.icon}
              </div>
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-black">
                {service.title}
              </h3>
            </div>
            {/* Chevron */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 ml-4"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-orange-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-black"
            >
              <div className="p-4 md:p-6 bg-white">
                {/* Image */}
                {service.backgroundImage && (
                  <div
                    className="h-48 md:h-64 w-full rounded-lg mb-4 md:mb-6"
                    style={{
                      backgroundImage: `url('${service.backgroundImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}

                {/* Description */}
                <p className="text-sm md:text-base text-black leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Details List */}
                <div className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base text-black">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const services: ServiceCard[] = [
    {
      title: "Business Support",
      description: "Comprehensive administrative and operational support to streamline your business processes, manage communications, and handle day-to-day tasks efficiently.",
      backgroundImage: "https://github.com/samsites2000/video-assets/blob/main/orange%20jumper.png%2010.png?raw=true",
      icon: (
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      details: [
        "Email and calendar management",
        "Document preparation and data entry",
        "Customer service and client communications",
        "Project coordination and task management",
        "Research and reporting"
      ]
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions including social media management, content creation, SEO optimization, and online campaign development to grow your digital presence.",
      backgroundImage: "https://github.com/samsites2000/video-assets/blob/main/orange%20jumper.png%209.png?raw=true",
      icon: (
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      details: [
        "Social media content creation and scheduling",
        "SEO optimization and keyword research",
        "Email marketing campaigns",
        "Analytics and performance tracking",
        "Brand strategy and content planning"
      ]
    },
    {
      title: "Grant Consultancy",
      description: "Expert guidance in identifying, applying for, and managing grants. From proposal writing to compliance management, maximizing your funding opportunities.",
      backgroundImage: "https://github.com/samsites2000/video-assets/blob/main/orange%20jumper.png%208.png?raw=true",
      icon: (
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      details: [
        "Grant research and opportunity identification",
        "Proposal writing and application preparation",
        "Budget development and financial planning",
        "Compliance and reporting management",
        "Post-award grant administration"
      ]
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Header - Outside container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-6 md:mb-16 px-4 pt-24 md:pt-32"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">
          My <span className="text-orange-500">Services</span>
        </h2>
        <p className="text-base text-black max-w-2xl leading-relaxed mx-auto">
          Comprehensive virtual assistant services tailored to drive your business growth
        </p>
      </motion.div>

      {/* Background Image Container */}
      <section
        className={cn(
          "relative min-h-0 md:min-h-[60vh] flex items-center justify-center py-8 md:py-16 px-4 overflow-hidden bg-white md:[background-image:url('https://raw.githubusercontent.com/samsites2000/video-assets/52d38d85f09054e07b82ef69470c796a5700b8b1/back.svg')] md:bg-cover md:bg-center md:bg-no-repeat",
          className
        )}
      >
        {/* Top white gradient blend */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/40 to-transparent z-5" />

        {/* Bottom white gradient blend */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent z-5" />

        {/* Floating elements for visual interest - Desktop only */}
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
          className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"
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
          className="hidden md:block absolute bottom-20 right-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl"
        />
      </section>

      {/* Accordion Services */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-12 md:pb-20">
        <div className="space-y-4 md:space-y-6">
          {services.map((service, index) => (
            <AccordionServiceCard
              key={service.title}
              service={service}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
