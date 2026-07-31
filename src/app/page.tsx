'use client';

import { useState } from 'react';
import { WorkspaceProvider } from '@/context/workspace-context';
import ProductPalette from '@/components/ProductPalette';
import WorkspacePreview from '@/components/WorkspacePreview';
import FloatingCart from '@/components/FloatingCart';
import CartDrawer from '@/components/CartDrawer';

function WorkspaceDesigner() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <ProductPalette
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <WorkspacePreview />
      </main>
      <FloatingCart onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <WorkspaceProvider>
      <WorkspaceDesigner />
    </WorkspaceProvider>
  );
}
