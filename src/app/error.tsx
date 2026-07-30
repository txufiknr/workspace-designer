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
      <p className="text-gray-400">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-full bg-white px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  );
}
