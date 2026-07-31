'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export default function Dialog({
  open,
  onClose,
  title,
  children,
  className = '',
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`w-full max-w-md rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl ${className}`}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-2 ml-auto shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      {children && <div className="p-6">{children}</div>}
    </dialog>
  );
}
