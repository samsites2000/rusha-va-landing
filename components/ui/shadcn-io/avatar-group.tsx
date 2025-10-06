'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  variant?: 'stack' | 'grid';
  animate?: boolean;
  size?: number;
};

export function AvatarGroup({
  children,
  variant = 'stack',
  animate = false,
  size = 40,
  className,
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        'flex',
        variant === 'stack' && '-space-x-2',
        animate && 'transition-all duration-300',
        className
      )}
      {...props}
    >
      {childArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            'rounded-full border-2 border-white',
            animate && 'hover:scale-110 transition-transform'
          )}
          style={{ width: size, height: size, zIndex: childArray.length - index }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
