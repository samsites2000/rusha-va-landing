'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

type CursorProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Cursor({ className, style, children, ...props }: CursorProps) {
  return (
    <div className={cn('relative', className)} style={style} {...props}>
      {children}
    </div>
  );
}

export function CursorPointer({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cn('w-5 h-5', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
    </svg>
  );
}

export function CursorBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('ml-1 mt-1 rounded-md px-2 py-1 text-xs font-medium shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CursorName({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('font-semibold', className)} {...props}>
      {children}
    </span>
  );
}

export function CursorMessage({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-xs', className)} {...props}>
      {children}
    </div>
  );
}
