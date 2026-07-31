'use client';

import { Trash2 } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import ProductIcon from './ProductIcon';
import { Card, IconButton } from './ui';

export default function AccessoryGrid() {
  const { config, dispatch } = useWorkspace();
  const accessories = PRODUCTS_BY_CATEGORY.accessory;

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        {accessories.map((item) => {
          const selected = config.accessories.includes(item.id);
          return (
            <div key={item.id} className="relative">
              <Card
                variant={selected ? 'accessory-selected' : 'accessory'}
                className="h-full"
                onClick={() =>
                  dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id })
                }
              >
                <ProductIcon image={item.image} name={item.name} />
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="wd-price-text">${item.price}/mo</p>
              </Card>
              {selected && (
                <IconButton
                  icon={<Trash2 size={12} />}
                  label="Remove accessory"
                  variant="default"
                  onClick={() =>
                    dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id })
                  }
                  className="absolute right-1 top-1"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
