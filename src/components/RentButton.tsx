'use client';

import { useState, useMemo } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { getProduct } from '@/lib/products';
import { DEFAULT_RENTAL_PERIOD, MULTIPLIERS } from '@/lib/constants';
import { rentWorkspace } from '@/lib/actions';
import { Button, ConfirmDialog, useToast } from './ui';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import ConfirmationModal from './ConfirmationModal';

export default function RentButton() {
  const { config, dispatch } = useWorkspace();
  const { toast } = useToast();
  const { ref: confirmRef, confirm } = useConfirmDialog();
  const [showSuccess, setShowSuccess] = useState(false);
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

    setSubmitted(true);
    try {
      await rentWorkspace({
        desk: config.desk,
        chair: config.chair,
        accessories: config.accessories,
        total,
        period: DEFAULT_RENTAL_PERIOD,
      });
      setShowSuccess(true);
      toast('Workspace submitted successfully!', 'success');
    } catch {
      toast('Failed to submit workspace. Please try again.', 'error');
    } finally {
      setSubmitted(false);
    }
  }

  function handleCloseSuccess() {
    setShowSuccess(false);
    dispatch({ type: 'RESET' });
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

      <ConfirmationModal
        config={config}
        total={total}
        period={DEFAULT_RENTAL_PERIOD}
        open={showSuccess}
        onClose={handleCloseSuccess}
      />

      <ConfirmDialog
        ref={confirmRef}
        title="Confirm Your Rental"
        confirmText="Rent Now"
        variant="default"
      >
        <p className="text-sm text-gray-400">
          You are about to rent <strong className="text-gray-200">{selectedIds.length} item(s)</strong>{' '}
          for{' '}
          <strong className="text-gray-200">
            ${total}/{DEFAULT_RENTAL_PERIOD}
          </strong>
          .
        </p>
      </ConfirmDialog>
    </>
  );
}
