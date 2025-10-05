"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto">
        <Header />
        <div className="">
          <div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
            {firstRow.map((product) => (
              <div key={product.title} className="h-96 w-[30rem] relative flex-shrink-0">
                <Image
                  src={product.thumbnail}
                  height="600"
                  width="600"
                  className="object-cover object-left-top absolute h-full w-full inset-0"
                  alt={product.title}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row mb-20 space-x-20">
            {secondRow.map((product) => (
              <div key={product.title} className="h-96 w-[30rem] relative flex-shrink-0">
                <Image
                  src={product.thumbnail}
                  height="600"
                  width="600"
                  className="object-cover object-left-top absolute h-full w-full inset-0"
                  alt={product.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <HeroParallaxContent products={products} />;
};

const HeroParallaxContent = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-16 md:py-32 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> Virtual Assistant
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        I provide expert virtual assistant services with the latest tools and frameworks.
        I am a passionate professional that loves to help businesses grow
        and succeed.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};

// Default component for compatibility
export function ServicesParallax() {
  const products = [
    {
      title: "Business Support",
      link: "#business-support",
      thumbnail: "/images/grey hands.png",
    },
    {
      title: "Digital Marketing",
      link: "#digital-marketing",
      thumbnail: "/images/Rusha working.png",
    },
    {
      title: "Grant Consultancy",
      link: "#grant-consultancy",
      thumbnail: "/images/blue hands.png",
    },
    {
      title: "Project Management",
      link: "#project-management",
      thumbnail: "/images/blue.png",
    },
    {
      title: "Customer Service",
      link: "#customer-service",
      thumbnail: "/images/green.png",
    },
    {
      title: "Social Media Management",
      link: "#social-media",
      thumbnail: "/images/grey.png",
    },
    {
      title: "Content Creation",
      link: "#content-creation",
      thumbnail: "/images/mustard.png",
    },
    {
      title: "SEO Optimization",
      link: "#seo",
      thumbnail: "/images/mustard hands.png",
    },
    {
      title: "Email Marketing",
      link: "#email-marketing",
      thumbnail: "/images/green.png",
    },
    {
      title: "Data Entry",
      link: "#data-entry",
      thumbnail: "/images/blue copy.png",
    },
    {
      title: "Research Services",
      link: "#research",
      thumbnail: "/images/grey hands copy.png",
    },
    {
      title: "Administrative Support",
      link: "#admin-support",
      thumbnail: "/images/grey hands.png",
    },
    {
      title: "Lead Generation",
      link: "#lead-generation",
      thumbnail: "/images/blue.png",
    },
    {
      title: "Financial Planning",
      link: "#financial-planning",
      thumbnail: "/images/mustard.png",
    },
    {
      title: "Strategy Consulting",
      link: "#strategy",
      thumbnail: "/images/green.png",
    },
  ];

  return <HeroParallax products={products} />;
}