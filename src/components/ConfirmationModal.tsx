'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getProduct } from '@/lib/products';
import AnimatedPrice from './AnimatedPrice';
import type { WorkspaceConfig } from '@/lib/types';

export default function ConfirmationModal({
  config,
  total,
  period,
  open,
  onClose,
}: {
  config: WorkspaceConfig;
  total: number;
  period: string;
  open: boolean;
  onClose: () => void;
}) {
  const selectedIds = [config.desk, config.chair, ...config.accessories].filter(
    Boolean,
  ) as string[];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl"
          >
            <h2 className="mb-4 text-xl font-bold text-mint-400">
              Workspace Rented! 🎉
            </h2>
            <p className="mb-4 text-sm text-gray-400">
              Your setup has been submitted. Here&apos;s what you ordered:
            </p>

            <div className="mb-4 space-y-2">
              {selectedIds.map((id) => {
                const product = getProduct(id);
                if (!product) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm"
                  >
                    <span className="text-gray-300">{product.name}</span>
                    <span className="text-coral-400">${product.price}</span>
                  </div>
                );
              })}
            </div>

            <div className="mb-6 flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm text-gray-400">Total /{period}</span>
              <span className="text-xl font-bold text-coral-400"><AnimatedPrice value={total} /></span>
            </div>

            <button
              onClick={onClose}
              className="wd-btn-primary"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
