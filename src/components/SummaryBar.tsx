'use client';

import { useWorkspace } from '@/context/workspace-context';
import ItemList from './ItemList';
import RentButton from './RentButton';

export default function SummaryBar() {
  const { config } = useWorkspace();
  const hasItems =
    config.desk || config.chair || config.accessories.length > 0;

  if (!hasItems) return null;

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-xl p-4 lg:relative lg:w-80 lg:shrink-0 lg:rounded-2xl lg:border lg:bg-surface lg:p-6 lg:backdrop-blur-none">
      <ItemList />
      <RentButton />
    </aside>
  );
}
