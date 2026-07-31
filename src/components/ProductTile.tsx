'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui';

export default function ProductTile({
  image,
  name,
  price,
  selected = false,
  aspect = 'aspect-[4/3]',
  onClick,
}: {
  image: string;
  name: string;
  price: number;
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
      className={`group relative block w-full overflow-hidden rounded-xl text-left transition-all duration-150 ${
        selected
          ? 'border border-mint-500 ring-2 ring-mint-500/40'
          : 'border border-border hover:border-gray-600'
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

        {/* Scrim — grows taller on hover/focus to reveal price */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-2.5 pt-8 transition-[padding] duration-300 ease-out group-hover:pt-12 group-focus-visible:pt-12">
          <div className="max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-8 group-focus-visible:max-h-8">
            <p className="text-sm font-medium text-mint-300">${price}/mo</p>
          </div>
          <p className="truncate text-sm font-semibold text-white">{name}</p>
        </div>
      </div>
    </button>
  );
}
