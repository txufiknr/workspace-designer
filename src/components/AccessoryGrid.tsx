'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';

export default function AccessoryGrid() {
  const { config, dispatch } = useWorkspace();
  const accessories = PRODUCTS_BY_CATEGORY.accessory;

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Accessories</h2>
      <div className="grid grid-cols-2 gap-2">
        {accessories.map((item) => {
          const selected = config.accessories.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() =>
                dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id })
              }
              className={`rounded-xl border p-3 text-center transition-colors ${
                selected
                  ? 'border-prime-100 bg-prime-100/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">${item.price}/mo</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
