'use client';

import { useDraggable } from '@dnd-kit/core';
import { Trash2, Eye } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductTile from './ProductTile';
import { IconButton, useToast } from './ui';

function DraggableAccessoryCard({
  item,
  onView,
}: {
  item: Product;
  onView: (product: Product) => void;
}) {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const selected = config.accessories.includes(item.id);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `accessory-${item.id}`,
    data: { productId: item.id, source: 'sidebar' },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
    >
      <ProductTile
        image={item.image}
        name={item.name}
        price={item.price}
        selected={selected}
        onClick={() => {
          dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id });
          toast(
            selected ? `${item.name} removed` : `${item.name} added`,
            selected ? 'info' : 'success',
          );
        }}
      />
      <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
        <IconButton
          icon={<Eye size={12} />}
          label={`View ${item.name} details`}
          variant="solid"
          shape="circle"
          onClick={() => onView(item)}
          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
        />
        {selected && (
          <IconButton
            icon={<Trash2 size={12} />}
            label="Remove accessory"
            variant="danger"
            shape="circle"
            onClick={() => {
              dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id });
              toast(`${item.name} removed`, 'info');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function AccessoryGrid({
  products,
  onView,
}: {
  products?: Product[];
  onView?: (product: Product) => void;
}) {
  const accessories = products ?? PRODUCTS_BY_CATEGORY.accessory;

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        {accessories.map((item) => (
          <DraggableAccessoryCard key={item.id} item={item} onView={onView ?? (() => {})} />
        ))}
      </div>
      {accessories.length === 0 && (
        <p className="py-4 text-center text-sm text-gray-600">
          No accessories match your search
        </p>
      )}
    </section>
  );
}
