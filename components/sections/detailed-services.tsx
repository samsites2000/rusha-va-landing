"use client";

import React from "react";
import { motion } from "framer-motion";

export const DetailedServices = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((service, index) => (
            <ServiceDetailCard
              key={service.id}
              service={service}
              index={index}
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
}

const ServiceDetailCard = ({ service, index }: ServiceDetailCardProps) => {
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
      className="group relative bg-white border border-gray-300 rounded-lg overflow-hidden max-w-[540px] mx-auto"
      style={{ height: '399px' }}
    >
      {/* Image Section */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${service.imgSrc}')`,
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col h-[199px]">
        {/* Title */}
        <h3 className="text-lg font-bold text-black mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-tight mb-4 flex-grow">
          {service.description}
        </p>

        {/* CTA Button - Fixed size 224x84 */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-lg bg-black text-white font-semibold text-sm hover:bg-orange-500 transition-all duration-300"
          style={{ width: '224px', height: '84px' }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

const items = [
  {
    id: 1,
    title: "Business Support",
    imgSrc: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_33AM.png?raw=true",
    description:
      "Give yourself the gift of streamlined operations and productive workflows. Comprehensive administrative support that transforms your daily business tasks into smooth, efficient processes.",
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
    imgSrc: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_30AM.png?raw=true",
    description:
      "Give your brand the visibility it deserves. Data-driven digital marketing strategies that connect you with your audience and deliver real, measurable growth for your business.",
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
    imgSrc: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_29AM.png?raw=true",
    description:
      "Give your business the financial foundation for growth. Expert grant application services that unlock funding opportunities and secure the capital you need to expand.",
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
    imgSrc: "https://github.com/samsites2000/rusha-va-landing/blob/main/Generated%20Image%20October%2006,%202025%20-%204_27AM.png?raw=true",
    description:
      "Give your unique business needs the attention they deserve. Tailored virtual assistance solutions designed specifically for your industry, your workflow, and your success.",
    features: [
      "Bespoke workflow design",
      "Industry-specific solutions",
      "Dedicated account management",
      "Scalable support packages"
    ]
  },
];
