'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';

export default function DeskSelector() {
  const { config, dispatch } = useWorkspace();
  const desks = PRODUCTS_BY_CATEGORY.desk;

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Desk</h2>
      <div className="space-y-2">
        {desks.map((desk) => {
          const selected = config.desk === desk.id;
          return (
            <button
              key={desk.id}
              onClick={() => dispatch({ type: 'SELECT_DESK', id: desk.id })}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? 'border-prime-100 bg-prime-100/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <p className="font-medium">{desk.name}</p>
              <p className="text-sm text-gray-400">${desk.price}/mo</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
