'use client';

import { useWorkspace } from '@/context/workspace-context';
import { getProduct } from '@/lib/products';
import { DEFAULT_RENTAL_PERIOD, MULTIPLIERS } from '@/lib/constants';

export default function ItemList() {
  const { config } = useWorkspace();
  const multiplier = MULTIPLIERS[DEFAULT_RENTAL_PERIOD];

  const selectedIds = [
    config.desk,
    config.chair,
    ...config.accessories,
  ].filter(Boolean) as string[];

  const total = selectedIds.reduce(
    (sum, id) => sum + (getProduct(id)?.price ?? 0) * multiplier,
    0,
  );

  if (selectedIds.length === 0) return null;

  return (
    <div className="mb-4 space-y-2">
      <h3 className="font-semibold">Your Setup</h3>
      {selectedIds.map((id) => {
        const product = getProduct(id);
        if (!product) return null;
        return (
          <div key={id} className="flex justify-between text-sm">
            <span className="text-gray-400">{product.name}</span>
            <span>${product.price * multiplier}</span>
          </div>
        );
      })}
      <div className="flex justify-between border-t border-gray-700 pt-2 font-semibold">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
