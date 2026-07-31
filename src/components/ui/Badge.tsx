interface BadgeProps {
  count: number;
  variant?: 'mint' | 'coral';
}

const variantClasses = {
  mint: 'bg-mint-500/20 text-mint-600 dark:text-mint-400',
  coral: 'bg-coral-500 text-white',
};

export default function Badge({ count, variant = 'mint' }: BadgeProps) {
  return (
    <span
      className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${variantClasses[variant]}`}
    >
      {count}
    </span>
  );
}
