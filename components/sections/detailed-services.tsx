"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const DetailedServices = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            Detailed Service <span className="text-orange-500">Breakdown</span>
          </h2>
          <p className="text-base md:text-lg text-black max-w-3xl mx-auto leading-relaxed">
            Dive deep into our comprehensive service offerings and discover how we can transform your business
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((service, index) => (
            <ServiceDetailCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceDetailCardProps {
  service: {
    id: number;
    title: string;
    imgSrc: string;
    description: string;
    features: string[];
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const ServiceDetailCard = ({ service, index, isActive, onClick }: ServiceDetailCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full overflow-hidden rounded-xl border-2 border-black hover:border-orange-500 transition-colors duration-300">
        {/* Image Section */}
        <div className="relative h-64 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url('${service.imgSrc}')`,
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Title Badge - Positioned on image */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              {service.title}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6">
          <p className="text-black text-sm md:text-base leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Features List */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Key Features:
            </p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-black">
                  <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full px-6 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-orange-500 transition-colors duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const items = [
  {
    id: 1,
    title: "Business Support",
    imgSrc: "/images/services/man 1.jpg",
    description:
      "Comprehensive administrative support, data management, and project coordination. Streamline your operations and free up time for strategic growth with our expert UK-based team.",
    features: [
      "Calendar & email management",
      "Data entry & CRM maintenance",
      "Document preparation & formatting",
      "Meeting coordination & minutes"
    ]
  },
  {
    id: 2,
    title: "Digital Marketing",
    imgSrc: "/images/services/lady.jpg",
    description:
      "Data-driven digital marketing strategies that build your brand and drive measurable results. From social media management to SEO optimization, we help you reach your target audience effectively.",
    features: [
      "Social media content creation",
      "SEO optimization & analytics",
      "Email marketing campaigns",
      "Brand strategy development"
    ]
  },
  {
    id: 3,
    title: "Grant Consultancy",
    imgSrc: "/images/services/lady%203.jpg",
    description:
      "Expert grant application and funding consultancy services. We help secure the capital needed for business expansion through comprehensive research, professional applications, and ongoing support.",
    features: [
      "Grant research & identification",
      "Application writing & submission",
      "Compliance & reporting support",
      "Funding strategy consultation"
    ]
  },
  {
    id: 4,
    title: "Custom Solutions",
    imgSrc: "/images/services/lady%202.jpg",
    description:
      "Tailored virtual assistance solutions designed specifically for your unique business needs. From specialized workflows to industry-specific requirements, we create custom strategies for your success.",
    features: [
      "Bespoke workflow design",
      "Industry-specific solutions",
      "Dedicated account management",
      "Scalable support packages"
    ]
  },
];
