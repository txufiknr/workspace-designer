'use client';

import { useState, useMemo } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { getProduct } from '@/lib/products';
import { MULTIPLIERS, type RentalPeriod } from '@/lib/constants';
import RentalPeriodToggle from './RentalPeriodToggle';
import AnimatedPrice from './AnimatedPrice';

export default function ItemList() {
  const { config } = useWorkspace();
  const [multiplier, setMultiplier] = useState(MULTIPLIERS['monthly']);
  const [period, setPeriod] = useState<RentalPeriod>('monthly');

  const selectedIds = [
    config.desk,
    config.chair,
    ...config.accessories,
  ].filter((id): id is string => id != null);

  const total = useMemo(
    () =>
      selectedIds.reduce(
        (sum, id) => sum + (getProduct(id)?.price ?? 0) * multiplier,
        0,
      ),
    [selectedIds, multiplier],
  );

  if (selectedIds.length === 0) return null;

  function handlePeriodChange(period: RentalPeriod, mult: number) {
    setPeriod(period);
    setMultiplier(mult);
  }

  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Your Setup</h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint-500/20 text-xs text-mint-400">
          {selectedIds.length}
        </span>
      </div>

      <RentalPeriodToggle onChange={handlePeriodChange} />

      <div className="space-y-1.5">
        {selectedIds.map((id) => {
          const product = getProduct(id);
          if (!product) return null;
          return (
            <div key={id} className="flex justify-between text-sm">
              <span className="text-gray-400">{product.name}</span>
              <AnimatedPrice value={product.price * multiplier} />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between border-t border-border pt-2 font-semibold">
        <span className="text-sm text-gray-400">
          Total{' '}
          <span className="text-xs text-gray-500">/{period}</span>
        </span>
        <span className="text-lg text-coral-400"><AnimatedPrice value={total} /></span>
      </div>
    </div>
  );
}
