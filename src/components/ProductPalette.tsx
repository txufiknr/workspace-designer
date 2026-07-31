'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspace } from '@/context/workspace-context';
import DeskSelector from './DeskSelector';
import ChairSelector from './ChairSelector';
import AccessoryGrid from './AccessoryGrid';
import PersonaPresets from './PersonaPresets';
import ResetButton from './ResetButton';
import { IconButton } from './ui';

const SECTIONS = [
  { id: 'presets', label: 'Quick Start', icon: '⚡' },
  { id: 'desk', label: 'Desks', icon: '🖥' },
  { id: 'chair', label: 'Chairs', icon: '💺' },
  { id: 'accessories', label: 'Accessories', icon: '🔌' },
] as const;

function hasSelection(config: ReturnType<typeof useWorkspace>['config'], sectionId: string): boolean {
  switch (sectionId) {
    case 'desk': return !!config.desk;
    case 'chair': return !!config.chair;
    case 'accessories': return config.accessories.length > 0;
    default: return false;
  }
}

export default function ProductPalette({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { config } = useWorkspace();

  return (
    <motion.aside
      layout
      className={`shrink-0 border-r border-border bg-gray-950/80 backdrop-blur-xl ${
        collapsed ? 'w-16' : 'w-80'
      }`}
    >
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center border-b border-border px-4">
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="expand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto"
              >
                <IconButton
                  icon={<ChevronRight size={16} />}
                  label="Expand sidebar"
                  onClick={onToggle}
                  size="md"
                />
              </motion.div>
            ) : (
              <motion.div
                key="expanded-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full items-center justify-between"
              >
                <h1 className="text-sm font-bold text-gray-100">
                  Workspace Designer
                </h1>
                <IconButton
                  icon={<ChevronLeft size={14} />}
                  label="Collapse sidebar"
                  onClick={onToggle}
                  size="md"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scrollable sections */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1 py-4"
              >
                {SECTIONS.map((section) => {
                  const selected = hasSelection(config, section.id);
                  return (
                    <div
                      key={section.id}
                      className="relative flex h-10 w-10 items-center justify-center"
                    >
                      <span
                        className={`text-base ${selected ? 'opacity-100' : 'opacity-40'}`}
                        title={section.label}
                      >
                        {section.icon}
                      </span>
                      {selected && (
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-mint-500" />
                      )}
                    </div>
                  );
                })}
                <div className="mt-2">
                  <ResetButton collapsed />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 p-4"
              >
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm">⚡</span>
                    <h2 className="wd-section-heading mb-0">Quick Start</h2>
                  </div>
                  <PersonaPresets />
                </section>

                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm">🖥</span>
                    <h2 className="wd-section-heading mb-0">Desks</h2>
                  </div>
                  <DeskSelector />
                </section>

                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm">💺</span>
                    <h2 className="wd-section-heading mb-0">Chairs</h2>
                  </div>
                  <ChairSelector />
                </section>

                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm">🔌</span>
                    <h2 className="wd-section-heading mb-0">Accessories</h2>
                  </div>
                  <AccessoryGrid />
                </section>

                <ResetButton />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
