'use client';

import { forwardRef, useRef, useImperativeHandle, type ReactNode } from 'react';

export interface ConfirmDialogHandle {
  showModal: () => Promise<boolean>;
}

interface ConfirmDialogProps {
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export const ConfirmDialog = forwardRef<ConfirmDialogHandle, ConfirmDialogProps>(
  function ConfirmDialog(
    { title, description, children, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'default' },
    ref,
  ) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      showModal: () => {
        dialogRef.current?.showModal();
        return new Promise<boolean>((resolve) => {
          const dialog = dialogRef.current;
          if (!dialog) return resolve(false);
          const handler = () => {
            resolve(dialog.returnValue === 'confirmed');
            dialog.removeEventListener('close', handler);
          };
          dialog.addEventListener('close', handler, { once: true });
        });
      },
    }));

    const confirmStyles =
      variant === 'destructive'
        ? 'bg-coral-500 hover:bg-coral-400 text-white'
        : 'bg-mint-500 hover:bg-mint-400 text-white';

    return (
      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close('cancel');
        }}
      >
        <form method="dialog" className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          {children}
          {description && <p className="text-sm text-muted">{description}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button
              value="cancel"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              {cancelText}
            </button>
            <button
              value="confirmed"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${confirmStyles}`}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </dialog>
    );
  },
);
