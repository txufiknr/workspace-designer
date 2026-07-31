'use client';

import { ShoppingCart } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui';

export default function FloatingCart({
  onClick,
}: {
  onClick: () => void;
}) {
  const { config } = useWorkspace();
  const count = [config.desk, config.chair, ...config.accessories].filter(
    Boolean,
  ).length;

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full cursor-pointer bg-mint-500 text-white shadow-xl shadow-mint-500/20 transition-colors hover:bg-mint-600 active:scale-95"
      >
        <ShoppingCart size={22} />
        <span className="absolute -right-1 -top-1">
          <Badge count={count} variant="coral" />
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
