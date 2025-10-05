'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageSquare, Check, Users, Calendar } from 'lucide-react';

export interface ProfessionalHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  // Props interface for the professional hero component
}

const ProfessionalHero = React.forwardRef<HTMLDivElement, ProfessionalHeroProps>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-50',
          className
        )}
        {...props}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 w-full h-full">
          {/* Top left chat bubble */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-20 left-8 z-10"
          >
            <div className="bg-white rounded-full p-4 shadow-lg border">
              <MessageSquare className="w-6 h-6 text-orange-500" />
            </div>
          </motion.div>

          {/* Top right curved line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute top-16 right-16 w-32 h-16"
          >
            <svg viewBox="0 0 120 60" className="w-full h-full">
              <path
                d="M10 30 Q60 10 110 30"
                stroke="#f97316"
                strokeWidth="3"
                fill="none"
                className="drop-shadow-sm"
              />
            </svg>
          </motion.div>

          {/* Right side decorative shape */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute right-12 top-1/3 w-8 h-8 bg-orange-500 rounded-full"
          />

          {/* Bottom left curved line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute bottom-1/4 left-8 w-40 h-20"
          >
            <svg viewBox="0 0 150 80" className="w-full h-full">
              <path
                d="M10 40 Q75 10 140 40"
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Bottom right dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-20 right-20 grid grid-cols-3 gap-2"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
            ))}
          </motion.div>
        </div>

        {/* Main content area */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content and UI mockups */}
          <div className="space-y-8">
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Professional
                <br />
                <span className="text-orange-500">Virtual Assistant</span>
                <br />
                Services
              </h1>
            </motion.div>

            {/* Chat mockup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded mb-1"></div>
                  <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                </div>
              </div>
              <div className="bg-gray-900 text-white p-3 rounded-lg text-sm">
                Hey Rusha, can you move this button on the right side? I think that would look better.
              </div>
            </motion.div>

            {/* Task list mockup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-4 max-w-xs"
            >
              <div className="space-y-3">
                {[
                  { completed: true, text: "Update website content" },
                  { completed: true, text: "Schedule social media posts" },
                  { completed: false, text: "Prepare monthly report" },
                  { completed: false, text: "Client follow-up calls" }
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task.completed ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                    }`}>
                      {task.completed && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className={`h-2 rounded flex-1 ${
                      task.completed ? 'bg-gray-200' : 'bg-gray-100'
                    }`}></div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              >
                Get Started Today
              </Button>
            </motion.div>
          </div>

          {/* Right side - Professional photo with interface elements */}
          <div className="relative">
            {/* Main photo container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              {/* Background shape */}
              <div className="absolute -top-8 -right-8 w-80 h-96 bg-orange-500 rounded-lg -z-10 transform rotate-3"></div>

              {/* Professional photo */}
              <div className="relative w-72 h-80 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/images/rusha-professional.jpg"
                  alt="Rusha - Professional Virtual Assistant"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                        <div class="text-center">
                          <div class="w-24 h-24 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Users class="w-12 h-12 text-white" />
                          </div>
                          <p class="text-gray-600 font-medium">Rusha</p>
                          <p class="text-gray-500 text-sm">Virtual Assistant</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Profile badge overlay */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-white rounded-full p-3 shadow-lg border">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Notification badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="absolute -right-6 top-1/4"
              >
                <div className="bg-white rounded-full p-3 shadow-lg border">
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -right-8 bottom-1/4"
              >
                <div className="bg-orange-500 text-white rounded-lg p-3 shadow-lg text-sm max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium">Available</span>
                  </div>
                  <p>Ready to help with your business needs</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

ProfessionalHero.displayName = 'ProfessionalHero';

export { ProfessionalHero };