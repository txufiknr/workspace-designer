'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-full bg-mint-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-mint-600"
      >
        Try again
      </button>
    </div>
  );
}
