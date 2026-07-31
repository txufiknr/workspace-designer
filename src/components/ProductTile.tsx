'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui';

export default function ProductTile({
  image,
  name,
  price,
  description,
  selected = false,
  aspect = 'aspect-[4/3]',
  onClick,
}: {
  image: string;
  name: string;
  price?: number;
  description?: string;
  selected?: boolean;
  aspect?: string;
  onClick: () => void;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative block w-full overflow-hidden cursor-pointer rounded-xl text-left transition-all duration-150 ${
        selected
          ? 'border border-mint-500 ring-2 ring-mint-500/40'
          : 'border border-border hover:border-muted'
      }`}
    >
      <div className={`relative w-full overflow-hidden bg-surface-elevated ${aspect}`}>
        {loading && (
          <Skeleton variant="image" className="absolute inset-0 h-full w-full" />
        )}
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
      <div className="flex flex-col gap-0.5 px-2 py-1.5">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        {description ? (
          <p className="line-clamp-2 text-xs text-muted">{description}</p>
        ) : (
          <p className="text-xs font-medium text-coral-600 dark:text-coral-400">
            ${price}
            <span className="text-muted">/mo</span>
          </p>
        )}
      </div>
    </button>
  );
}
