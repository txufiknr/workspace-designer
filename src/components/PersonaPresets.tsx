'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRESETS } from '@/lib/presets';

export default function PersonaPresets() {
  const { dispatch } = useWorkspace();

  return (
    <section className="mb-6">
      <h2 className="wd-section-heading">Quick Start</h2>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => dispatch({ type: 'LOAD_PRESET', config: preset.config })}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface p-3 text-center transition-colors hover:border-mint-500/50 hover:bg-mint-500/5"
          >
            <span className="text-xl">{preset.icon}</span>
            <span className="text-sm font-medium text-gray-200">{preset.name}</span>
            <span className="text-xs text-gray-500">{preset.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
