'use client';

import { Trash2 } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { getProduct } from '@/lib/products';
import { IconButton } from './ui';

export default function WorkspacePreview() {
  const { config, dispatch } = useWorkspace();

  const selectedAccessories = config.accessories
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => p != null);

  return (
    <section className="flex-1 rounded-2xl border border-border bg-gradient-to-br from-gray-950 via-gray-950 to-surface p-6">
      <div className="flex min-h-[500px] flex-col items-center justify-start gap-4 pt-8">
        {/* Accessories — top row */}
        <AnimatePresence mode="popLayout">
          {selectedAccessories.length > 0 && (
            <motion.div
              key="accessory-row"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {selectedAccessories.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative flex flex-col items-center gap-1 rounded-xl border border-coral-500/30 bg-surface/80 p-3"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={50}
                    className="max-h-12 object-contain"
                  />
                  <p className="text-xs text-coral-400">{product.name}</p>
                  <IconButton
                    icon={<Trash2 size={12} />}
                    label={`Remove ${product.name}`}
                    variant="danger"
                    shape="circle"
                    size="sm"
                    onClick={() =>
                      dispatch({ type: 'TOGGLE_ACCESSORY', id: product.id })
                    }
                    className="absolute -right-1.5 -top-1.5 opacity-0 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desk */}
        {config.desk ? (
          (() => {
            const product = getProduct(config.desk);
            return (
              <motion.div
                key={config.desk}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-mint-500/30 bg-surface p-6"
              >
                {product && (
                  <>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={70}
                      className="max-h-16 object-contain"
                    />
                    <p className="text-sm text-mint-400">{product.name}</p>
                    <IconButton
                      icon={<Trash2 size={14} />}
                      label="Remove desk"
                      variant="danger"
                      shape="circle"
                      size="sm"
                      onClick={() => dispatch({ type: 'DESELECT_DESK' })}
                      className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100"
                    />
                  </>
                )}
              </motion.div>
            );
          })()
        ) : (
          <div className="flex w-full max-w-md items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/50 p-12">
            <p className="text-sm text-gray-600">Select a desk</p>
          </div>
        )}

        {/* Chair */}
        {config.chair ? (
          (() => {
            const product = getProduct(config.chair);
            return (
              <motion.div
                key={config.chair}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative flex w-40 flex-col items-center gap-2 rounded-xl border border-mint-500/30 bg-surface p-3"
              >
                {product && (
                  <>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={70}
                      className="max-h-14 object-contain"
                    />
                    <p className="text-xs text-mint-400">{product.name}</p>
                    <IconButton
                      icon={<Trash2 size={12} />}
                      label="Remove chair"
                      variant="danger"
                      shape="circle"
                      size="sm"
                      onClick={() => dispatch({ type: 'DESELECT_CHAIR' })}
                      className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100"
                    />
                  </>
                )}
              </motion.div>
            );
          })()
        ) : (
          <div className="flex w-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/50 p-6">
            <p className="text-sm text-gray-600">Select a chair</p>
          </div>
        )}

        {/* Empty state */}
        {!config.desk && !config.chair && selectedAccessories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 flex flex-col items-center gap-5 text-center"
          >
            <svg
              width="160"
              height="120"
              viewBox="0 0 160 120"
              fill="none"
              className="opacity-40"
            >
              <rect x="15" y="65" width="130" height="8" rx="4" fill="#38383A" />
              <rect x="25" y="73" width="6" height="40" rx="3" fill="#38383A" />
              <rect x="129" y="73" width="6" height="40" rx="3" fill="#38383A" />
              <rect x="55" y="30" width="50" height="35" rx="4" fill="#38383A" />
              <rect x="75" y="65" width="10" height="5" rx="2" fill="#38383A" />
              <rect x="59" y="34" width="42" height="27" rx="2" fill="#10B981" fillOpacity="0.15" />
              <rect x="72" y="40" width="16" height="12" rx="1.5" fill="#10B981" fillOpacity="0.35" />
              <rect x="120" y="55" width="20" height="18" rx="3" fill="#38383A" />
              <ellipse cx="130" cy="51" rx="12" ry="6" fill="#38383A" />
              <ellipse cx="122" cy="44" rx="6" ry="10" fill="#10B981" fillOpacity="0.2" transform="rotate(-20 122 44)" />
              <ellipse cx="138" cy="44" rx="6" ry="10" fill="#10B981" fillOpacity="0.2" transform="rotate(20 138 44)" />
              <ellipse cx="130" cy="38" rx="5" ry="8" fill="#10B981" fillOpacity="0.3" />
              <rect x="25" y="55" width="4" height="18" rx="2" fill="#38383A" />
              <ellipse cx="27" cy="52" rx="10" ry="5" fill="#F97316" fillOpacity="0.15" />
              <ellipse cx="27" cy="52" rx="6" ry="3" fill="#F97316" fillOpacity="0.3" />
              <rect x="50" y="95" width="60" height="6" rx="3" fill="#38383A" />
            </svg>
            <div>
              <p className="text-base font-medium text-gray-400">
                Your Workspace Awaits
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Pick a desk, chair, and accessories to design your setup
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
