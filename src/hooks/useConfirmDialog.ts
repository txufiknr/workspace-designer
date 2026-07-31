import { useRef } from 'react';
import type { ConfirmDialogHandle } from '@/components/ui/ConfirmDialog';

export function useConfirmDialog() {
  const ref = useRef<ConfirmDialogHandle>(null);

  async function confirm(): Promise<boolean> {
    if (!ref.current) return false;
    return ref.current.showModal();
  }

  return { ref, confirm };
}
