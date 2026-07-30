'use client';

import DeskSelector from './DeskSelector';
import ChairSelector from './ChairSelector';
import AccessoryGrid from './AccessoryGrid';
import PersonaPresets from './PersonaPresets';
import ResetButton from './ResetButton';

export default function ProductPalette() {
  return (
    <aside className="lg:w-80 shrink-0 space-y-6">
      <PersonaPresets />
      <DeskSelector />
      <ChairSelector />
      <AccessoryGrid />
      <ResetButton />
    </aside>
  );
}
