'use client';

import { useWorkspace } from '@/context/workspace-context';
import { DEFAULT_RENTAL_PERIOD } from '@/lib/constants';
import { rentWorkspace } from '@/lib/actions';

export default function RentButton() {
  const { config, dispatch } = useWorkspace();

  async function handleRent() {
    const result = await rentWorkspace({
      desk: config.desk,
      chair: config.chair,
      accessories: config.accessories,
      total: 0,
      period: DEFAULT_RENTAL_PERIOD,
    });

    if (result.success) {
      alert('Workspace rented successfully! (mock)');
    }
  }

  return (
    <button
      onClick={handleRent}
      className="w-full rounded-full bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200"
    >
      Rent This Setup
    </button>
  );
}
