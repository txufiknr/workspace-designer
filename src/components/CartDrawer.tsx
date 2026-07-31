'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ItemList from './ItemList';
import RentButton from './RentButton';
import { IconButton } from './ui';

export default function CartDrawer({
  open,
  onClose,
  onRented,
}: {
  open: boolean;
  onClose: () => void;
  onRented?: (total: number) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-border bg-surface p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-100">Your Setup</h2>
              <IconButton
                icon={<X size={16} />}
                label="Close cart"
                onClick={onClose}
                size="md"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <ItemList />
            </div>

            <div className="pt-4">
              <RentButton onClose={onClose} onRented={onRented} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
