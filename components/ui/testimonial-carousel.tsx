import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number | string
  name: string
  avatar?: string
  icon?: React.ReactNode
  backgroundImage?: string
  description: string
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)
    const [swipeDirection, setSwipeDirection] = React.useState<'left' | 'right' | null>(null)

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)

        // Set swipe direction for feedback
        if (info.offset.x < 0) {
          setSwipeDirection('left')
        } else {
          setSwipeDirection('right')
        }

        setTimeout(() => {
          if (info.offset.x < 0) {
            // Swiped left - go to next card
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          } else {
            // Swiped right - go to previous card
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
          }
          setExitX(0)
          setSwipeDirection(null)
        }, 200)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "h-80 w-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative w-80 h-72">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                  testimonial.backgroundImage ? "bg-cover bg-center" : "bg-white",
                  "shadow-xl border border-gray-200",
                  isCurrentCard ? "shadow-2xl border-gray-300" : "shadow-lg border-gray-100",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                  backgroundImage: testimonial.backgroundImage ? `url(${testimonial.backgroundImage})` : undefined,
                  backgroundSize: testimonial.backgroundImage ? 'cover' : undefined,
                  backgroundPosition: testimonial.backgroundImage ? 'center' : undefined,
                  backgroundRepeat: testimonial.backgroundImage ? 'no-repeat' : undefined,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : 0,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4">
                    <span className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400">
                      &larr;
                    </span>
                    <span className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400">
                      &rarr;
                    </span>
                  </div>
                )}

                {/* Swipe feedback icons */}
                {isCurrentCard && swipeDirection && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-4 right-4 z-10"
                  >
                    {swipeDirection === 'right' ? (
                      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* "Swipe to see more" text on first card */}
                {isCurrentCard && currentIndex === 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/70 px-6 py-3 rounded-full">
                    <p className="text-white text-sm font-semibold whitespace-nowrap">
                      👉 Swipe to see more
                    </p>
                  </div>
                )}

                {testimonial.backgroundImage && (
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-2xl"></div>
                )}
                <div className="relative h-full flex flex-col justify-end p-4 pb-6">
                  {!testimonial.backgroundImage && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      {testimonial.icon ? (
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {testimonial.icon}
                        </div>
                      ) : testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : null}
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className={cn(
                      "text-base font-semibold mb-1",
                      testimonial.backgroundImage ? "text-white" : "text-gray-800"
                    )}>
                      {testimonial.name}
                    </h3>
                    <p className={cn(
                      "text-xs",
                      testimonial.backgroundImage ? "text-white" : "text-gray-600"
                    )}>
                      {testimonial.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-orange-500"
                      : "bg-gray-300",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial }