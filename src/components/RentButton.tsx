'use client';

import { useState, useMemo } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { getProduct } from '@/lib/products';
import { DEFAULT_RENTAL_PERIOD, MULTIPLIERS } from '@/lib/constants';
import { rentWorkspace } from '@/lib/actions';
import { Button } from './ui';
import ConfirmationModal from './ConfirmationModal';

export default function RentButton() {
  const { config } = useWorkspace();
  const [showModal, setShowModal] = useState(false);
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
    setSubmitted(true);
    await rentWorkspace({
      desk: config.desk,
      chair: config.chair,
      accessories: config.accessories,
      total,
      period: DEFAULT_RENTAL_PERIOD,
    });
    setShowModal(true);
    setSubmitted(false);
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
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
