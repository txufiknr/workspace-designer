'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';

export default function ChairSelector() {
  const { config, dispatch } = useWorkspace();
  const chairs = PRODUCTS_BY_CATEGORY.chair;

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Chair</h2>
      <div className="space-y-2">
        {chairs.map((chair) => {
          const selected = config.chair === chair.id;
          return (
            <button
              key={chair.id}
              onClick={() => dispatch({ type: 'SELECT_CHAIR', id: chair.id })}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? 'border-prime-100 bg-prime-100/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <p className="font-medium">{chair.name}</p>
              <p className="text-sm text-gray-400">${chair.price}/mo</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
