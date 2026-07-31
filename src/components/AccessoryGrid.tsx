'use client';

import { useDraggable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductIcon from './ProductIcon';
import { Card, IconButton, useToast } from './ui';

function DraggableAccessoryCard({ item }: { item: Product }) {
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
      className={`relative ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card
        variant={selected ? 'accessory-selected' : 'accessory'}
        className="h-full"
        onClick={() => {
          dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id });
          toast(
            selected ? `${item.name} removed` : `${item.name} added`,
            selected ? 'info' : 'success',
          );
        }}
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
          onClick={() => {
            dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id });
            toast(`${item.name} removed`, 'info');
          }}
          className="absolute right-1 top-1"
        />
      )}
    </div>
  );
}

export default function AccessoryGrid({
  products,
}: {
  products?: Product[];
}) {
  const accessories = products ?? PRODUCTS_BY_CATEGORY.accessory;

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        {accessories.map((item) => (
          <DraggableAccessoryCard key={item.id} item={item} />
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
