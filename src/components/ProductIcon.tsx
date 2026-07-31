'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui';

export default function ProductIcon({ image, name }: { image: string; name: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative mb-2 flex h-16 w-full items-center justify-center rounded-lg bg-gray-900/50">
      {loading && <Skeleton variant="image" className="absolute inset-0 h-full w-full" />}
      <Image
        src={image}
        alt={name}
        width={80}
        height={60}
        className="max-h-12 max-w-[80px] object-contain"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}
