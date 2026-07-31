'use client';

import { RotateCcw } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { Button, IconButton, ConfirmDialog, useToast } from './ui';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

export default function ResetButton({ collapsed, className }: { collapsed?: boolean; className?: string }) {
  const { dispatch, config } = useWorkspace();
  const { toast } = useToast();
  const { ref: confirmRef, confirm } = useConfirmDialog();
  const hasItems = config.desk || config.chair || config.accessories.length > 0;

  if (!hasItems) return null;

  async function handleReset() {
    const ok = await confirm();
    if (!ok) return;
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
    <>
      <Button
        variant="ghost"
        onClick={handleReset}
        className={`border border-border hover:border-coral-500/30 hover:text-coral-400 ${
          className ?? 'w-full'
        }`}
        icon={<RotateCcw size={16} />}
      >
        Clear All Selections
      </Button>

      <ConfirmDialog
        ref={confirmRef}
        title="Clear All Selections?"
        description="This will remove your desk, chair, and accessories from the workspace."
        confirmText="Clear All"
        variant="destructive"
      />
    </>
  );
}
