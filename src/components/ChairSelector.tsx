'use client';

import { Trash2, Eye } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductTile from './ProductTile';
import { IconButton, useToast } from './ui';

export default function ChairSelector({
  products,
  onView,
}: {
  products?: Product[];
  onView?: (product: Product) => void;
}) {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const chairs = products ?? PRODUCTS_BY_CATEGORY.chair;

  return (
    <section>
      <div className="space-y-2">
        {chairs.map((chair) => {
          const selected = config.chair === chair.id;
          return (
            <div key={chair.id} className="group relative">
              <ProductTile
                image={chair.image}
                name={chair.name}
                price={chair.price}
                selected={selected}
                aspect="aspect-[16/9]"
                onClick={() => {
                  dispatch({ type: 'SELECT_CHAIR', id: chair.id });
                  toast(`${chair.name} selected`, 'success');
                }}
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <IconButton
                  icon={<Eye size={14} />}
                  label={`View ${chair.name} details`}
                  variant="solid"
                  shape="circle"
                  onClick={() => onView?.(chair)}
                  className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
                />
                {selected && (
                  <IconButton
                    icon={<Trash2 size={14} />}
                    label="Remove chair"
                    variant="danger"
                    shape="circle"
                    onClick={() => {
                      dispatch({ type: 'DESELECT_CHAIR' });
                      toast(`${chair.name} removed`, 'info');
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {chairs.length === 0 && (
        <p className="py-4 text-center text-sm text-gray-600">No chairs match your search</p>
      )}
    </section>
  );
}
