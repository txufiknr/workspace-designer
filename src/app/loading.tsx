import { APP_NAME } from '@/lib/constants';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        <p className="text-sm text-muted">Loading {APP_NAME}...</p>
      </div>
    </div>
  );
}
