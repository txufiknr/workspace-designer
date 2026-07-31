'use client';

import { Trash2 } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductIcon from './ProductIcon';
import { Card, IconButton } from './ui';

export default function DeskSelector({
  products,
}: {
  products?: Product[];
}) {
  const { config, dispatch } = useWorkspace();
  const desks = products ?? PRODUCTS_BY_CATEGORY.desk;

  return (
    <section>
      <div className="space-y-2">
        {desks.map((desk) => {
          const selected = config.desk === desk.id;
          return (
            <div key={desk.id} className="relative">
              <Card
                variant={selected ? 'selected' : 'default'}
                onClick={() =>
                  dispatch({ type: 'SELECT_DESK', id: desk.id })
                }
              >
                <ProductIcon image={desk.image} name={desk.name} />
                <p className="font-medium">{desk.name}</p>
                <p className="wd-price-text">${desk.price}/mo</p>
              </Card>
              {selected && (
                <IconButton
                  icon={<Trash2 size={14} />}
                  label="Remove desk"
                  variant="default"
                  onClick={() => dispatch({ type: 'DESELECT_DESK' })}
                  className="absolute right-2 top-2"
                />
              )}
            </div>
          );
        })}
      </div>
      {desks.length === 0 && (
        <p className="py-4 text-center text-sm text-gray-600">No desks match your search</p>
      )}
    </section>
  );
}
