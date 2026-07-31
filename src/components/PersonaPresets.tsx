'use client';

import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import { useWorkspace } from '@/context/workspace-context';
import { PRESETS, type Preset } from '@/lib/presets';
import { getProduct } from '@/lib/products';
import { Card, ConfirmDialog, useToast } from './ui';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

export default function PersonaPresets() {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const { ref: confirmRef, confirm } = useConfirmDialog();
  const [pendingPreset, setPendingPreset] = useState<Preset | null>(null);

  const hasSelections = !!(config.desk || config.chair || config.accessories.length > 0);

  const handleClick = useCallback(
    async (presetId: string) => {
      const preset = PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      flushSync(() => setPendingPreset(preset));
      const ok = await confirm();
      setPendingPreset(null);
      if (!ok) return;
      dispatch({ type: 'LOAD_PRESET', config: preset.config, presetId: preset.id });
      toast(`${preset.name} preset loaded`, 'success');
    },
    [dispatch, toast, confirm],
  );

  const presetItems = pendingPreset
    ? [
        pendingPreset.config.desk,
        pendingPreset.config.chair,
        ...pendingPreset.config.accessories,
      ].filter((id): id is string => id != null)
    : [];

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
              <span className="text-sm font-medium text-foreground">
                {preset.name}
              </span>
              <span className="text-xs text-muted text-center line-clamp-2">
                {preset.description}
              </span>
            </Card>
          );
        })}
      </div>

      <ConfirmDialog
        ref={confirmRef}
        title={pendingPreset ? `Load ${pendingPreset.name} preset?` : 'Load Preset?'}
        description={
          hasSelections
            ? 'Loading this preset will replace your current selections.'
            : 'This will set up your workspace with the items below.'
        }
        confirmText={hasSelections ? 'Replace' : 'Confirm'}
        variant={hasSelections ? 'destructive' : 'default'}
      >
        {pendingPreset && (
          <ul className="space-y-1.5">
            {presetItems.map((id) => {
              const product = getProduct(id);
              if (!product) return null;
              return (
                <li
                  key={id}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-surface-elevated px-2.5 py-1.5"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={30}
                    className="h-8 w-10 shrink-0 rounded object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                    {product.name}
                  </span>
                  <span className="shrink-0 text-sm font-medium text-coral-600 dark:text-coral-400">
                    ${product.price}/mo
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </ConfirmDialog>
    </section>
  );
}
