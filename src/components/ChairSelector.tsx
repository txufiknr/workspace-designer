'use client';

import { Trash2 } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import ProductIcon from './ProductIcon';
import { Card, IconButton } from './ui';

export default function ChairSelector() {
  const { config, dispatch } = useWorkspace();
  const chairs = PRODUCTS_BY_CATEGORY.chair;

  return (
    <section>
      <div className="space-y-2">
        {chairs.map((chair) => {
          const selected = config.chair === chair.id;
          return (
            <div key={chair.id} className="relative">
              <Card
                variant={selected ? 'selected' : 'default'}
                onClick={() =>
                  dispatch({ type: 'SELECT_CHAIR', id: chair.id })
                }
              >
                <ProductIcon image={chair.image} name={chair.name} />
                <p className="font-medium">{chair.name}</p>
                <p className="wd-price-text">${chair.price}/mo</p>
              </Card>
              {selected && (
                <IconButton
                  icon={<Trash2 size={14} />}
                  label="Remove chair"
                  variant="default"
                  onClick={() => dispatch({ type: 'DESELECT_CHAIR' })}
                  className="absolute right-2 top-2"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
