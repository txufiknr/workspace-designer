'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronRight as ChevronRightIcon, X as CloseIcon } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import DeskSelector from './DeskSelector';
import ChairSelector from './ChairSelector';
import AccessoryGrid from './AccessoryGrid';
import PersonaPresets from './PersonaPresets';
import ResetButton from './ResetButton';
import { IconButton } from './ui';

type SectionId = 'presets' | 'desk' | 'chair' | 'accessories';

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'presets', label: 'Quick Start', icon: '⚡' },
  { id: 'desk', label: 'Desks', icon: '🖥' },
  { id: 'chair', label: 'Chairs', icon: '💺' },
  { id: 'accessories', label: 'Accessories', icon: '🔌' },
];

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<SectionId>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const query = searchQuery.toLowerCase().trim();

  const filteredDesks = useMemo(
    () => (query ? PRODUCTS_BY_CATEGORY.desk.filter((p) => p.name.toLowerCase().includes(query)) : undefined),
    [query],
  );

  const filteredChairs = useMemo(
    () => (query ? PRODUCTS_BY_CATEGORY.chair.filter((p) => p.name.toLowerCase().includes(query)) : undefined),
    [query],
  );

  const filteredAccessories = useMemo(
    () => (query ? PRODUCTS_BY_CATEGORY.accessory.filter((p) => p.name.toLowerCase().includes(query)) : undefined),
    [query],
  );

  function toggleSection(id: SectionId) {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function renderSectionContent(id: SectionId) {
    switch (id) {
      case 'presets': return <PersonaPresets />;
      case 'desk': return <DeskSelector products={filteredDesks} />;
      case 'chair': return <ChairSelector products={filteredChairs} />;
      case 'accessories': return <AccessoryGrid products={filteredAccessories} />;
    }
  }

  return (
    <aside
      className={`shrink-0 border-r border-border bg-gray-950/80 backdrop-blur-xl transition-[width] duration-300 ${
        collapsed ? 'w-16' : 'w-80'
      }`}
    >
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex shrink-0 flex-col border-b border-border">
          <div className="flex h-14 items-center px-4">
            {collapsed ? (
              <div className="mx-auto">
                <IconButton
                  icon={<ChevronRight size={16} />}
                  label="Expand sidebar"
                  onClick={onToggle}
                  size="md"
                />
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <h1 className="text-sm font-bold text-gray-100">
                  Workspace Designer
                </h1>
                <div className="flex items-center gap-0.5">
                  <IconButton
                    icon={<Search size={14} />}
                    label="Search products"
                    onClick={() => {
                      if (searchOpen) {
                        setSearchOpen(false);
                        setSearchQuery('');
                      } else {
                        setSearchOpen(true);
                      }
                    }}
                    size="md"
                  />
                  <IconButton
                    icon={<ChevronLeft size={14} />}
                    label="Collapse sidebar"
                    onClick={onToggle}
                    size="md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div
            className={`overflow-hidden transition-all duration-200 ${
              searchOpen && !collapsed ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 mx-4 mb-3">
              <Search size={14} className="shrink-0 text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="shrink-0 text-gray-500 hover:text-gray-300"
                >
                  <CloseIcon size={14} />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Scrollable sections */}
        <div className="flex-1 overflow-y-auto">
          {!collapsed && searchQuery && (
            <p className="px-4 pb-2 pt-3 text-xs text-gray-500">
              {`${filteredDesks!.length + filteredChairs!.length + filteredAccessories!.length} results for "${searchQuery}"`}
            </p>
          )}

          {collapsed ? (
            <div className="flex flex-col items-center gap-1 py-4">
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
            </div>
          ) : (
            <div
              className="space-y-6 p-4"
            >
              {SECTIONS.map((section) => {
                const isCollapsed = collapsedSections.has(section.id);
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="mb-3 flex w-full items-center gap-2 text-left"
                    >
                      <span className="inline-flex w-5 items-center justify-center text-sm">{section.icon}</span>
                      <h2 className="wd-section-heading mb-0 flex-1">
                        {section.label}
                      </h2>
                      {isCollapsed ? (
                        <ChevronRightIcon size={14} className="shrink-0 text-gray-500" />
                      ) : (
                        <ChevronDown size={14} className="shrink-0 text-gray-500" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isCollapsed ? 'max-h-0' : 'max-h-[1000px]'
                      }`}
                    >
                      {renderSectionContent(section.id)}
                    </div>
                  </div>
                );
              })}
              <ResetButton />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
