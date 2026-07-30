'use client';

import Image from 'next/image';

export default function ProductIcon({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative mb-2 flex h-16 w-full items-center justify-center rounded-lg bg-gray-900/50">
      <Image
        src={image}
        alt={name}
        width={80}
        height={60}
        className="max-h-12 max-w-[80px] object-contain"
      />
    </div>
  );
}
