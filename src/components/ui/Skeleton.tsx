interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'image';
}

const variantClasses = {
  text: 'h-4 w-24 rounded',
  card: 'h-32 w-full rounded-xl',
  image: 'h-16 w-full rounded-lg',
};

export default function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-surface-hover ${variantClasses[variant]} ${className}`}
    />
  );
}
