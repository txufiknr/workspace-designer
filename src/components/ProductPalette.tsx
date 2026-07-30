'use client';

import DeskSelector from './DeskSelector';
import ChairSelector from './ChairSelector';
import AccessoryGrid from './AccessoryGrid';

export default function ProductPalette() {
  return (
    <aside className="lg:w-80 shrink-0 space-y-6">
      <DeskSelector />
      <ChairSelector />
      <AccessoryGrid />
    </aside>
  );
}
