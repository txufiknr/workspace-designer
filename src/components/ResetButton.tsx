'use client';

import { RotateCcw } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { Button, IconButton, useToast } from './ui';

export default function ResetButton({ collapsed }: { collapsed?: boolean }) {
  const { dispatch, config } = useWorkspace();
  const { toast } = useToast();
  const hasItems = config.desk || config.chair || config.accessories.length > 0;

  if (!hasItems) return null;

  function handleReset() {
    dispatch({ type: 'RESET' });
    toast('Selections cleared', 'info');
  }

  if (collapsed) {
    return (
      <IconButton
        icon={<RotateCcw size={16} />}
        label="Clear all"
        onClick={handleReset}
      />
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={handleReset}
      className="w-full border border-border hover:border-coral-500/30 hover:text-coral-400"
    >
      Clear All Selections
    </Button>
  );
}
