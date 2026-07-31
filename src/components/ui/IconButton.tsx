'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: 'default' | 'solid' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  shape?: 'square' | 'circle';
}

const variantClasses = {
  default: 'bg-coral-500/20 text-coral-400 hover:bg-coral-500/40',
  solid: 'border border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800 hover:text-white',
  danger: 'bg-coral-500 text-white hover:bg-coral-600 shadow-lg',
  ghost: 'text-gray-500 hover:text-gray-300 hover:bg-surface-hover',
};

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
};

const shapeClasses = {
  square: 'rounded',
  circle: 'rounded-full',
};

export default function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'sm',
  shape = 'square',
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
      title={label}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}
