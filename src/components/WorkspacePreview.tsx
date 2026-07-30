'use client';

import { useWorkspace } from '@/context/workspace-context';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { getProduct } from '@/lib/products';

export default function WorkspacePreview() {
  const { config } = useWorkspace();

  const selectedAccessories = config.accessories
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => p != null);

  return (
    <section className="flex-1 rounded-2xl border border-border bg-gradient-to-br from-gray-950 via-gray-950 to-surface p-6">
      <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-4">
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
                  className="flex flex-col items-center gap-1 rounded-xl border border-coral-500/30 bg-surface/80 p-3"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={50}
                    className="max-h-12 object-contain"
                  />
                  <p className="text-xs text-coral-400">{product.name}</p>
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
                className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-mint-500/30 bg-surface p-6"
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
                className="flex w-40 flex-col items-center gap-2 rounded-xl border border-mint-500/30 bg-surface p-3"
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
            className="flex flex-col items-center gap-4 text-center"
          >
            <svg
              width="120"
              height="90"
              viewBox="0 0 120 90"
              fill="none"
              className="opacity-30"
            >
              <rect x="10" y="40" width="100" height="6" rx="3" fill="#38383A" />
              <rect x="15" y="46" width="30" height="40" rx="4" fill="#38383A" />
              <rect x="75" y="46" width="30" height="40" rx="4" fill="#38383A" />
              <rect x="25" y="20" width="70" height="20" rx="3" fill="#38383A" />
              <rect x="48" y="25" width="8" height="10" rx="2" fill="#10B981" opacity="0.5" />
              <rect x="60" y="26" width="4" height="8" rx="1" fill="#F97316" opacity="0.5" />
            </svg>
            <p className="text-sm text-gray-500">
              Select items from the sidebar to build your workspace
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
