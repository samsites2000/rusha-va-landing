'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MessageSquare,
  FileText,
  Phone,
  BarChart3,
  DollarSign,
  TrendingUp,
  Monitor,
  ClipboardCheck,
  Megaphone,
  Users,
  Lightbulb
} from 'lucide-react';

// Interface for the props of each individual icon.
interface IconProps {
  id: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  backgroundImage?: string; // Path to background image
  standaloneImage?: string; // Path to standalone image
  className?: string; // Used for custom positioning of the icon.
  position?: { x: number; y: number }; // Exact pixel positioning
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
}

// A single icon component with its own motion logic
const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
  isDragMode,
  onPositionChange,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
  isDragMode?: boolean;
  onPositionChange?: (id: number, position: { x: number; y: number }) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    // Don't apply mouse repulsion if we have a fixed position
    if (iconData.position) {
      return;
    }

    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, repel the icon
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          // The closer the cursor, the stronger the repulsion
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          // Return to original position when cursor is away
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY, iconData.position]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={iconData.position ? {
        left: `${iconData.position.x}px`,
        top: `${iconData.position.y}px`,
      } : {
        x: isDragMode ? 0 : springX,
        y: isDragMode ? 0 : springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className, isDragMode && 'cursor-move border-2 border-dashed border-blue-500')}
      drag={isDragMode}
      dragMomentum={false}
      onDragEnd={(event, info) => {
        if (isDragMode && onPositionChange && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const parentRect = ref.current.parentElement?.getBoundingClientRect();
          if (parentRect) {
            const relativeX = rect.left - parentRect.left;
            const relativeY = rect.top - parentRect.top;
            onPositionChange(iconData.id, { x: relativeX, y: relativeY });
          }
        }
      }}
    >
      {/* Inner wrapper for the continuous floating animation */}
      {iconData.standaloneImage ? (
        <motion.img
          src={iconData.standaloneImage}
          alt="Virtual Agent"
          className="w-44 h-44 md:w-56 md:h-56 object-cover"
          style={{
            clipPath: 'circle(48% at 50% 50%)',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          animate={!isDragMode ? {
            y: [0, -8, 0, 8, 0],
            x: [0, 6, 0, -6, 0],
            rotate: [0, 5, 0, -5, 0],
          } : {}}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ) : (
        <motion.div
          className={`flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-3xl relative overflow-hidden ${
            iconData.backgroundImage ? 'shadow-xl' : 'p-6 bg-card/80 backdrop-blur-md border border-border/10 shadow-xl'
          }`}
          animate={!isDragMode ? {
            y: [0, -8, 0, 8, 0],
            x: [0, 6, 0, -6, 0],
            rotate: [0, 5, 0, -5, 0],
          } : {}}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={iconData.backgroundImage ? {
            backgroundImage: `url(${iconData.backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(1.2) brightness(1.1)',
          } : {}}
        >
          {!iconData.backgroundImage && iconData.icon && (
            <iconData.icon className="w-16 h-16 md:w-20 md:h-20 relative z-10 text-foreground" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps & { isDragMode?: boolean }
>(({ className, title, subtitle, ctaText, ctaHref, icons, isDragMode, ...props }, ref) => {
  // Refs to track the raw mouse position
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);
  const [positions, setPositions] = React.useState<Record<number, { x: number; y: number }>>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragMode) {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    }
  };

  const handlePositionChange = (id: number, position: { x: number; y: number }) => {
    setPositions(prev => ({ ...prev, [id]: position }));
    console.log(`Icon ${id} position:`, position);
  };

  const exportPositions = () => {
    console.log('All positions:', positions);
    alert('Check console for position data');
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background',
        className
      )}
      {...props}
    >
      {/* Container for the background floating icons */}
      <div className="absolute inset-0 w-full h-full">
        {icons.map((iconData, index) => (
          <Icon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
            isDragMode={isDragMode}
            onPositionChange={handlePositionChange}
          />
        ))}
      </div>

      {/* Drag mode controls */}
      {isDragMode && (
        <div className="absolute top-4 right-4 z-20 space-y-2">
          <Button onClick={exportPositions} variant="secondary" size="sm">
            Export Positions
          </Button>
          <div className="text-xs text-muted-foreground bg-background/80 p-2 rounded">
            Drag mode: Active<br />
            Drag icons to reposition<br />
            Check console for coordinates
          </div>
        </div>
      )}

      {/* Container for the foreground content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="px-8 py-6 text-base font-semibold">
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

// Default VA-related icons and content
export function RushaVAFloatingHero() {
  const [isDragMode, setIsDragMode] = React.useState(false);

  const vaIcons: IconProps[] = [
    { id: 6, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/1.png?raw=true&v=2', position: { x: 350, y: 90 } },
    { id: 13, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/2.png?raw=true&v=2', position: { x: 850, y: 110 } },
    { id: 14, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/3.png?raw=true&v=2', position: { x: 240, y: 320 } },
    { id: 15, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/4.png?raw=true&v=2', position: { x: 550, y: 290 } },
    { id: 16, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/5.png?raw=true&v=2', position: { x: 90, y: 280 } },
    { id: 17, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/6.png?raw=true&v=3', position: { x: 1050, y: 250 } },
    { id: 18, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/7.png?raw=true&v=3', position: { x: 50, y: 90 } },
    { id: 19, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/8.png?raw=true&v=3', position: { x: 780, y: 350 } },
    { id: 20, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/9.png?raw=true&v=3', position: { x: 450, y: 350 } },
    { id: 21, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/10.png?raw=true&v=3', position: { x: 680, y: 130 } },
    { id: 22, standaloneImage: 'https://github.com/samsites2000/video-assets/blob/main/11.png?raw=true&v=3', position: { x: 1100, y: 380 } },
  ];

  return (
    <div className="relative">
      {/* Drag mode toggle */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsDragMode(!isDragMode)}
          variant={isDragMode ? "destructive" : "default"}
          size="sm"
        >
          {isDragMode ? "Exit Drag Mode" : "Enable Drag Mode"}
        </Button>
      </div>

      <FloatingIconsHero
        title="Streamline Your Business"
        subtitle="Expert virtual assistant services from business support to digital marketing and grant consultancy. Let us handle the details while you focus on growth."
        ctaText="Get Started Today"
        ctaHref="#contact"
        icons={vaIcons}
        isDragMode={isDragMode}
      />
    </div>
  );
}

export { FloatingIconsHero };