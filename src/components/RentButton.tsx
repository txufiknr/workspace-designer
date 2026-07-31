'use client';

import { useState, useMemo } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { getProduct } from '@/lib/products';
import { DEFAULT_RENTAL_PERIOD, MULTIPLIERS } from '@/lib/constants';
import { rentWorkspace } from '@/lib/actions';
import { Button, ConfirmDialog, useToast } from './ui';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

export default function RentButton({
  onClose,
  onRented,
}: {
  onClose?: () => void;
  onRented?: (total: number) => void;
}) {
  const { config } = useWorkspace();
  const { toast } = useToast();
  const { ref: confirmRef, confirm } = useConfirmDialog();
  const [submitted, setSubmitted] = useState(false);

  const selectedIds = [
    config.desk,
    config.chair,
    ...config.accessories,
  ].filter((id): id is string => id != null);

  const total = useMemo(
    () =>
      selectedIds.reduce(
        (sum, id) => sum + (getProduct(id)?.price ?? 0) * MULTIPLIERS[DEFAULT_RENTAL_PERIOD],
        0,
      ),
    [selectedIds],
  );

  async function handleRent() {
    const ok = await confirm();
    if (!ok) return;

    onClose?.();
    setSubmitted(true);
    try {
      await rentWorkspace({
        desk: config.desk,
        chair: config.chair,
        accessories: config.accessories,
        total,
        period: DEFAULT_RENTAL_PERIOD,
      });
      onRented?.(total);
      toast('Workspace submitted successfully!', 'success');
    } catch {
      toast('Failed to submit workspace. Please try again.', 'error');
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <>
      <Button
        onClick={handleRent}
        loading={submitted}
        size="lg"
        className="w-full"
      >
        {submitted ? 'Submitting...' : 'Rent This Setup'}
      </Button>

      <ConfirmDialog
        ref={confirmRef}
        title="Confirm Your Rental"
        confirmText="Rent Now"
        variant="default"
      >
        <p className="text-sm text-muted">
          You are about to rent <strong className="text-foreground">{selectedIds.length} item(s)</strong>{' '}
          for{' '}
          <strong className="text-foreground">
            ${total}/{DEFAULT_RENTAL_PERIOD}
          </strong>
          .
        </p>
      </ConfirmDialog>
    </>
  );
}
