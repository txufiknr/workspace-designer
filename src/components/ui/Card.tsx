'use client';

import type { ReactNode, ButtonHTMLAttributes, ElementType } from 'react';

type CardVariant = 'default' | 'selected' | 'accessory' | 'accessory-selected';

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CardVariant;
  as?: ElementType;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'w-full rounded-xl border border-border bg-surface text-left hover:cursor-pointer hover:border-muted hover:bg-surface-hover',
  selected: 'w-full rounded-xl border border-mint-500 bg-mint-500/10 text-left',
  accessory: 'flex w-full min-w-0 flex-col items-center gap-1 rounded-xl border border-border bg-surface text-center hover:cursor-pointer hover:border-muted hover:bg-surface-hover',
  'accessory-selected': 'flex w-full min-w-0 flex-col items-center gap-1 rounded-xl border border-mint-500 bg-mint-500/10 text-center',
};

export default function Card({
  variant = 'default',
  as: Tag = 'button',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={`p-3 transition-all duration-150 ${variantClasses[variant]} ${className}`}
      {...(Tag === 'button' ? { type: 'button' as const } : {})}
      {...props}
    >
      {children}
    </Tag>
  );
}
