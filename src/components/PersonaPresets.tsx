'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRESETS } from '@/lib/presets';
import { Card } from './ui';

export default function PersonaPresets() {
  const { config, dispatch } = useWorkspace();

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => {
          const isActive = config.activePreset === preset.id;
          return (
            <Card
              key={preset.id}
              variant={isActive ? 'selected' : 'default'}
              onClick={() =>
                dispatch({
                  type: 'LOAD_PRESET',
                  config: preset.config,
                  presetId: preset.id,
                })
              }
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
    </section>
  );
}
