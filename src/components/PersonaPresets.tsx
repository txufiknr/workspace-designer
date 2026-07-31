'use client';

import { useCallback } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { PRESETS } from '@/lib/presets';
import { Card, ConfirmDialog, useToast } from './ui';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

export default function PersonaPresets() {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const { ref: confirmRef, confirm } = useConfirmDialog();

  const hasSelections = !!(config.desk || config.chair || config.accessories.length > 0);

  const handleClick = useCallback(
    async (presetId: string) => {
      if (hasSelections) {
        const ok = await confirm();
        if (!ok) return;
      }
      const preset = PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      dispatch({ type: 'LOAD_PRESET', config: preset.config, presetId: preset.id });
      toast(`${preset.name} preset loaded`, 'success');
    },
    [hasSelections, dispatch, toast, confirm],
  );

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => {
          const isActive = config.activePreset === preset.id;
          return (
            <Card
              key={preset.id}
              variant={isActive ? 'selected' : 'default'}
              onClick={() => handleClick(preset.id)}
              className="flex flex-col items-center gap-1 p-3 text-center"
            >
              <span className="text-xl">{preset.icon}</span>
              <span className="text-sm font-medium text-gray-200">
                {preset.name}
              </span>
              <span className="text-xs text-gray-500">
                {preset.description}
              </span>
            </Card>
          );
        })}
      </div>

      <ConfirmDialog
        ref={confirmRef}
        title="Replace Current Setup?"
        description="Loading this preset will replace your current selections."
        confirmText="Replace"
        variant="destructive"
      />
    </section>
  );
}
