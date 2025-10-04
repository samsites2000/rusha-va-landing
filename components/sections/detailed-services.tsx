"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export const DetailedServices = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="p-4 bg-white text-black dark:bg-black dark:text-white w-full h-full">
      <div className="max-w-6xl mx-auto mb-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Detailed Service Breakdown
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive deep into our comprehensive service offerings and discover how we can transform your business
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
        {items.map((item) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

interface PanelProps {
  open: number;
  setOpen: Dispatch<SetStateAction<number>>;
  id: number;
  title: string;
  imgSrc: string;
  description: string;
}

const Panel = ({
  open,
  setOpen,
  id,
  title,
  imgSrc,
  description,
}: PanelProps) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900 transition-colors p-3 border-r-[1px] border-b-[1px] border-gray-200 dark:border-gray-800 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180 text-black dark:text-white"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light text-black dark:text-white">{title}</span>
        <span
          className="w-4 h-4 bg-white group-hover:bg-gray-100 dark:bg-black dark:group-hover:bg-gray-900 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-gray-200 dark:border-gray-800 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
},
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

const items = [
  {
    id: 1,
    title: "Business Support",
    imgSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop&crop=faces",
    description:
      "Comprehensive administrative support, data management, and project coordination. Streamline your operations and free up time for strategic growth with our expert UK-based team.",
  },
  {
    id: 2,
    title: "Digital Marketing",
    imgSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=faces",
    description:
      "Data-driven digital marketing strategies that build your brand and drive measurable results. From social media management to SEO optimization, we help you reach your target audience effectively.",
  },
  {
    id: 3,
    title: "Grant Consultancy",
    imgSrc:
      "https://images.unsplash.com/photo-1594736797933-d0fce9cf86a0?w=800&h=600&fit=crop&crop=faces",
    description:
      "Expert grant application and funding consultancy services. We help secure the capital needed for business expansion through comprehensive research, professional applications, and ongoing support.",
  },
  {
    id: 4,
    title: "Custom Solutions",
    imgSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop&crop=faces",
    description:
      "Tailored virtual assistance solutions designed specifically for your unique business needs. From specialized workflows to industry-specific requirements, we create custom strategies for your success.",
  },
];