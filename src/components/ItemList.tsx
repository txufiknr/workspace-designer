'use client';

import { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { getProduct } from '@/lib/products';
import { MULTIPLIERS, type RentalPeriod } from '@/lib/constants';
import RentalPeriodToggle from './RentalPeriodToggle';
import AnimatedPrice from './AnimatedPrice';
import { Badge, IconButton, useToast } from './ui';

export default function ItemList() {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
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

  function handleRemove(id: string) {
    const product = getProduct(id);
    if (!product) return;
    toast(`${product.name} removed`, 'info');
    if (product.category === 'desk') {
      dispatch({ type: 'DESELECT_DESK' });
    } else if (product.category === 'chair') {
      dispatch({ type: 'DESELECT_CHAIR' });
    } else {
      dispatch({ type: 'TOGGLE_ACCESSORY', id });
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Choose rent period</h3>
        <Badge count={selectedIds.length} />
      </div>

      <RentalPeriodToggle onChange={handlePeriodChange} />

      <div className="space-y-1.5">
        {selectedIds.map((id) => {
          const product = getProduct(id);
          if (!product) return null;
          return (
            <div
              key={id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-400">{product.name}</span>
              <div className="flex items-center gap-2">
                <AnimatedPrice value={product.price * multiplier} />
                <IconButton
                  icon={<Trash2 size={14} />}
                  label={`Remove ${product.name}`}
                  onClick={() => handleRemove(id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between border-t border-border pt-2 font-semibold">
        <span className="text-sm text-gray-400">
          Total{' '}
          <span className="text-xs text-gray-500">/{period}</span>
        </span>
        <span className="text-lg text-coral-400">
          <AnimatedPrice value={total} />
        </span>
      </div>
    </div>
  );
}
