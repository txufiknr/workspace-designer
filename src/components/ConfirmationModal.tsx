'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getProduct } from '@/lib/products';
import AnimatedPrice from './AnimatedPrice';
import { Button, Dialog } from './ui';
import type { WorkspaceConfig } from '@/lib/types';

export default function ConfirmationModal({
  config,
  total,
  period,
  open,
  onClose,
}: {
  config: WorkspaceConfig;
  total: number;
  period: string;
  open: boolean;
  onClose: () => void;
}) {
  const selectedIds = [config.desk, config.chair, ...config.accessories].filter(
    Boolean,
  ) as string[];

  useEffect(() => {
    if (!open) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:1000;width:100vw;height:100vh;';
    document.body.appendChild(canvas);

    const fire = confetti.create(canvas, { resize: true });
    fire({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
    fire({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
    fire({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });

    const fadeTimer = setTimeout(() => {
      canvas.style.transition = 'opacity 800ms ease';
      canvas.style.opacity = '0';
    }, 2800);
    const removeTimer = setTimeout(() => canvas.remove(), 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      canvas.remove();
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} title="Workspace Rented! 🎉">
      <p className="mb-4 text-sm text-muted">
        Your setup has been submitted. Here&apos;s what you ordered:
      </p>

      <div className="mb-4 space-y-2">
        {selectedIds.map((id) => {
          const product = getProduct(id);
          if (!product) return null;
          return (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg bg-surface-elevated px-3 py-2 text-sm"
            >
              <span className="text-foreground">{product.name}</span>
              <span className="text-coral-600 dark:text-coral-400">
                <AnimatedPrice value={product.price} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="mb-6 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm text-muted">Total /{period}</span>
        <span className="text-xl font-bold text-coral-600 dark:text-coral-400">
          <AnimatedPrice value={total} />
        </span>
      </div>

      <Button onClick={onClose} size="lg" className="w-full">
        Done
      </Button>
    </Dialog>
  );
}
