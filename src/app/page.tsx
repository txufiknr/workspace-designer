'use client';

import { useState, Suspense } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Image from 'next/image';
import { WorkspaceProvider, useWorkspace } from '@/context/workspace-context';
import { ToastProvider, useToast } from '@/components/ui';
import { getProduct } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductPalette from '@/components/ProductPalette';
import WorkspacePreview from '@/components/WorkspacePreview';
import FloatingCart from '@/components/FloatingCart';
import CartDrawer from '@/components/CartDrawer';
import ConfirmationModal from '@/components/ConfirmationModal';
import { DEFAULT_RENTAL_PERIOD } from '@/lib/constants';

function WorkspaceDesigner() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [rentedTotal, setRentedTotal] = useState<number | null>(null);
  const [activeDrag, setActiveDrag] = useState<Product | null>(null);
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent) {
    const activeId = String(event.active.id);
    let productId: string | undefined;
    if (activeId.startsWith('accessory-')) {
      productId = event.active.data.current?.productId as string | undefined;
    } else if (activeId.startsWith('preview-')) {
      productId = config.accessories.find((id) => `preview-${id}` === activeId);
    }
    if (!productId) return;
    setActiveDrag(getProduct(productId) ?? null);
  }

  function handleDragCancel() {
    setActiveDrag(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDrag(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith('accessory-')) {
      const productId = active.data.current?.productId as string | undefined;
      if (!productId) return;
      const product = getProduct(productId);
      if (config.accessories.includes(productId)) {
        toast(`${product?.name ?? 'Item'} is already in your workspace`, 'info');
      } else {
        let index = config.accessories.length;
        if (overId.startsWith('preview-')) {
          const hoveredIndex = config.accessories.findIndex(
            (id) => `preview-${id}` === overId,
          );
          if (hoveredIndex >= 0) index = hoveredIndex;
        }
        dispatch({ type: 'ADD_ACCESSORY_AT', id: productId, index });
        toast(`${product?.name ?? 'Item'} added`, 'success');
      }
    } else if (activeId.startsWith('preview-')) {
      if (!overId.startsWith('preview-')) return;
      const from = config.accessories.findIndex((id) => `preview-${id}` === activeId);
      const to = config.accessories.findIndex((id) => `preview-${id}` === overId);
      if (from >= 0 && to >= 0 && from !== to) {
        dispatch({ type: 'REORDER_ACCESSORIES', from, to });
      }
    }
  }

  function handleRented(total: number) {
    setRentedTotal(total);
  }

  function handleCloseSuccess() {
    setRentedTotal(null);
    dispatch({ type: 'RESET' });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-screen overflow-hidden bg-gray-950">
        <ProductPalette
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Suspense fallback={null}>
            <WorkspacePreview />
          </Suspense>
        </main>
        <FloatingCart onClick={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onRented={handleRented} />
        <ConfirmationModal
          config={config}
          total={rentedTotal ?? 0}
          period={DEFAULT_RENTAL_PERIOD}
          open={rentedTotal !== null}
          onClose={handleCloseSuccess}
        />
      </div>

      <DragOverlay>
        {activeDrag && (
          <div className="flex flex-col items-center gap-1 rounded-xl border border-mint-500/50 bg-surface p-3 shadow-2xl">
            <Image
              src={activeDrag.image}
              alt={activeDrag.name}
              width={60}
              height={50}
              className="max-h-12 object-contain"
            />
            <p className="text-xs font-medium text-gray-200">{activeDrag.name}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <WorkspaceProvider>
        <WorkspaceDesigner />
      </WorkspaceProvider>
    </ToastProvider>
  );
}
