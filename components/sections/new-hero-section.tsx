"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function NewHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section className="py-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2  text-xl">
              <span className="text-orange-500 animate-spin">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600"
              >
                WHO WE ARE
              </TimelineContent>
            </div>
            <div className="flex gap-4">
              <TimelineContent
                as="a"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100  rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/facebook.svg" alt="fb" width={24} height={24} />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/instagram.svg" alt="insta" width={24} height={24} />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/linkedin.svg" alt="linkedin" width={24} height={24} />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/youtube.svg" alt="youtube" width={24} height={24} />
              </TimelineContent>
            </div>
          </div>

          <div className="relative group w-full h-96">
            <div className="w-full h-full relative overflow-hidden rounded-3xl">
              <img
                src="/images/rusha-portrait.png"
                alt="Rusha - Professional Virtual Assistant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-orange-500 font-bold">5+</span>
                <span className="text-gray-600">years of experience</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-orange-500 font-bold">250+</span>
                <span className="text-gray-600">projects completed</span>
              </div>
            </div>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <div className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2">
                <span className="text-orange-500 font-semibold">150+</span>
                <span className="text-gray-600 uppercase">clients</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-orange-500 font-bold">50%</span>
                <span className="text-gray-600">efficiency increase</span>
                <span className="text-gray-300 lg:hidden block">|</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.5,
                }}
              >
                Expert Virtual Assistant Services That Transform Your Business.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8 text-gray-600"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  From business support to digital marketing and grant consultancy,
                  I provide comprehensive virtual assistant services that streamline
                  your operations and drive measurable growth for UK businesses.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  Every business has unique needs, and I specialize in delivering
                  tailored solutions with precision and expertise. Let me handle the
                  details so you can focus on what matters most - growing your business.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-orange-500 text-2xl font-bold mb-2"
              >
                RUSHA
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 text-sm mb-8"
              >
                Virtual Assistant | Business Support Specialist
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-gray-900 font-medium mb-4">
                  Ready to streamline your business operations and accelerate growth?
                </p>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
              >
                LET'S WORK TOGETHER <ArrowRight className="" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}