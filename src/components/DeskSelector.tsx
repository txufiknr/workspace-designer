'use client';

import { Trash2, Eye } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductTile from './ProductTile';
import { IconButton, useToast } from './ui';

export default function DeskSelector({
  products,
  onView,
}: {
  products?: Product[];
  onView?: (product: Product) => void;
}) {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const desks = products ?? PRODUCTS_BY_CATEGORY.desk;

  return (
    <section>
      <div className="space-y-2">
        {desks.map((desk) => {
          const selected = config.desk === desk.id;
          return (
            <div key={desk.id} className="group relative">
              <ProductTile
                image={desk.image}
                name={desk.name}
                price={desk.price}
                selected={selected}
                aspect="aspect-[16/9]"
                onClick={() => {
                  dispatch({ type: 'SELECT_DESK', id: desk.id });
                  toast(`${desk.name} selected`, 'success');
                }}
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <IconButton
                  icon={<Eye size={14} />}
                  label={`View ${desk.name} details`}
                  variant="solid"
                  shape="circle"
                  onClick={() => onView?.(desk)}
                  className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
                />
                {selected && (
                  <IconButton
                    icon={<Trash2 size={14} />}
                    label="Remove desk"
                    variant="danger"
                    shape="circle"
                    onClick={() => {
                      dispatch({ type: 'DESELECT_DESK' });
                      toast(`${desk.name} removed`, 'info');
                    }}
                  />
                )}
              </div>
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
