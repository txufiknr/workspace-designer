'use client';

import Image from 'next/image';
import { useWorkspace } from '@/context/workspace-context';
import type { Product } from '@/lib/types';
import { Button, Dialog, useToast } from './ui';

const categoryLabels: Record<Product['category'], string> = {
  desk: 'Desk',
  chair: 'Chair',
  accessory: 'Accessory',
};

export default function ProductInfoModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();

  const isSelected = product
    ? product.category === 'desk'
      ? config.desk === product.id
      : product.category === 'chair'
        ? config.chair === product.id
        : config.accessories.includes(product.id)
    : false;

  function handleToggle() {
    if (!product) return;
    if (product.category === 'desk') {
      dispatch(
        isSelected
          ? { type: 'DESELECT_DESK' }
          : { type: 'SELECT_DESK', id: product.id },
      );
    } else if (product.category === 'chair') {
      dispatch(
        isSelected
          ? { type: 'DESELECT_CHAIR' }
          : { type: 'SELECT_CHAIR', id: product.id },
      );
    } else {
      dispatch({ type: 'TOGGLE_ACCESSORY', id: product.id });
    }
    toast(
      isSelected ? `${product.name} removed` : `${product.name} added`,
      isSelected ? 'info' : 'success',
    );
    onClose();
  }

  return (
    <Dialog open={product != null} onClose={onClose} title={product?.name}>
      {product && (
        <div className="space-y-4">
          <div className="flex h-44 items-center justify-center rounded-xl border border-border bg-gray-900/50">
            <Image
              src={product.image}
              alt={product.name}
              width={220}
              height={150}
              className="max-h-36 w-auto object-contain"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-full bg-mint-500/20 px-3 py-1 text-xs font-medium text-mint-400">
              {categoryLabels[product.category]}
            </span>
            <span className="text-lg font-semibold text-coral-400">
              ${product.price}
              <span className="text-sm font-normal text-gray-500">/mo</span>
            </span>
          </div>

          {product.description && (
            <p className="text-sm leading-relaxed text-gray-400">
              {product.description}
            </p>
          )}

          <Button
            onClick={handleToggle}
            variant={isSelected ? 'danger' : 'primary'}
            size="md"
            className="w-full"
          >
            {isSelected ? 'Remove from setup' : 'Add to setup'}
          </Button>
        </div>
      )}
    </Dialog>
  );
}
