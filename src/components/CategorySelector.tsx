'use client';

import { Trash2, Eye } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import type { Product, ProductCategory } from '@/lib/types';
import ProductTile from './ProductTile';
import { IconButton, useToast } from './ui';

type SingleSelectCategory = Extract<ProductCategory, 'desk' | 'chair'>;

export default function CategorySelector({
  category,
  products,
  onView,
}: {
  category: SingleSelectCategory;
  products?: Product[];
  onView?: (product: Product) => void;
}) {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const items = products ?? PRODUCTS_BY_CATEGORY[category];
  const selectedId = config[category];

  function handleSelect(id: string) {
    if (category === 'desk') {
      dispatch({ type: 'SELECT_DESK', id });
    } else {
      dispatch({ type: 'SELECT_CHAIR', id });
    }
  }

  function handleDeselect() {
    dispatch({ type: category === 'desk' ? 'DESELECT_DESK' : 'DESELECT_CHAIR' });
  }

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const selected = selectedId === item.id;
          return (
            <div key={item.id} className="group relative">
              <ProductTile
                image={item.image}
                name={item.name}
                price={item.price}
                selected={selected}
                onClick={() => {
                  handleSelect(item.id);
                  toast(`${item.name} selected`, 'success');
                }}
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <IconButton
                  icon={<Eye size={14} />}
                  label={`View ${item.name} details`}
                  variant="solid"
                  shape="circle"
                  onClick={() => onView?.(item)}
                  className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
                />
                {selected && (
                  <IconButton
                    icon={<Trash2 size={14} />}
                    label={`Remove ${category}`}
                    variant="danger"
                    shape="circle"
                    onClick={() => {
                      handleDeselect();
                      toast(`${item.name} removed`, 'info');
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {items.length === 0 && (
        <p className="py-4 text-center text-sm text-gray-600">
          No {category}s match your search
        </p>
      )}
    </section>
  );
}
