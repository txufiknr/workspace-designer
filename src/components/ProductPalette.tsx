'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronRight as ChevronRightIcon, X as CloseIcon } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import { BRAND_NAME } from '@/lib/constants';
import type { Product } from '@/lib/types';
import CategorySelector from './CategorySelector';
import AccessoryGrid from './AccessoryGrid';
import PersonaPresets from './PersonaPresets';
import ProductInfoModal from './ProductInfoModal';
import ThemeToggle from './ThemeToggle';
import { IconButton } from './ui';

type SectionId = 'presets' | 'desk' | 'chair' | 'accessories';

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'presets', label: 'Product Bundles', icon: '⚡' },
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
  const [infoProduct, setInfoProduct] = useState<Product | null>(null);
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
      case 'desk': return <CategorySelector category="desk" products={filteredDesks} onView={setInfoProduct} />;
      case 'chair': return <CategorySelector category="chair" products={filteredChairs} onView={setInfoProduct} />;
      case 'accessories': return <AccessoryGrid products={filteredAccessories} onView={setInfoProduct} />;
    }
  }

  return (
    <aside
      className={`shrink-0 border-r border-border bg-background/80 backdrop-blur-xl transition-[width] duration-300 ${
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
                <h1 className="flex items-center">
                  <Image src="/monisrent-white.png" alt={BRAND_NAME} width={120} height={32} className="h-6 w-auto invert dark:invert-0" />
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
                  <ThemeToggle />
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
              <Search size={14} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-faint"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="shrink-0 text-muted hover:text-foreground"
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
            <p className="px-4 pb-2 pt-3 text-xs text-muted">
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
            </div>
          ) : (
              <div
                className="p-4"
              >
                {SECTIONS.filter((section) => section.id !== 'presets' || !query).map((section) => {
                const isCollapsed = collapsedSections.has(section.id);
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="mb-2 flex w-full items-center gap-2 rounded-md p-2.5 text-left hover:bg-surface-hover"
                    >
                      <span className="inline-flex w-5 items-center justify-center text-sm">{section.icon}</span>
                      <h2 className="wd-section-heading mb-0 flex-1 whitespace-nowrap">
                        {section.label}
                      </h2>
                      {isCollapsed ? (
                        <ChevronRightIcon size={14} className="shrink-0 text-muted" />
                      ) : (
                        <ChevronDown size={14} className="shrink-0 text-muted" />
                      )}
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ${
                        isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-1 pt-1 pb-3">
                          {renderSectionContent(section.id)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ProductInfoModal
        product={infoProduct}
        onClose={() => setInfoProduct(null)}
      />
    </aside>
  );
}
