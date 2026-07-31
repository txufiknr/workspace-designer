'use client';

import { RotateCcw } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { Button, IconButton } from './ui';

export default function ResetButton({ collapsed }: { collapsed?: boolean }) {
  const { dispatch, config } = useWorkspace();
  const hasItems = config.desk || config.chair || config.accessories.length > 0;

  if (!hasItems) return null;

  if (collapsed) {
    return (
      <IconButton
        icon={<RotateCcw size={16} />}
        label="Clear all"
        onClick={() => dispatch({ type: 'RESET' })}
      />
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={() => dispatch({ type: 'RESET' })}
      className="w-full border border-border hover:border-coral-500/30 hover:text-coral-400"
    >
      Clear All Selections
    </Button>
  );
}
