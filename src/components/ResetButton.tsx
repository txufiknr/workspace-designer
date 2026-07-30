'use client';

import { useWorkspace } from '@/context/workspace-context';

export default function ResetButton() {
  const { dispatch, config } = useWorkspace();
  const hasItems = config.desk || config.chair || config.accessories.length > 0;

  if (!hasItems) return null;

  return (
    <button
      onClick={() => dispatch({ type: 'RESET' })}
      className="w-full rounded-lg border border-border px-3 py-2 text-sm text-gray-500 transition-colors hover:border-coral-500/30 hover:text-coral-400"
    >
      Clear All Selections
    </button>
  );
}
