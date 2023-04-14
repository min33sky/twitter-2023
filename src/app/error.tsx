'use client';

import Link from 'next/link';

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-emerald-700 dark:text-emerald-500">
          There was a problem loading this page. [Error Name: {error.name}]
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200">
          {error.message || 'Something went wrong. 😕'}
        </h1>
        <p className="mt-6 leading-7 text-zinc-600 dark:text-zinc-100">
          Please try again later or contact support if the problem persists.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={reset}
            className="rounded-md bg-emerald-500 px-3 py-2 transition-colors hover:bg-emerald-600"
          >
            Try again
          </button>
          <Link
            href={'/'}
            className="rounded-md border border-emerald-500 px-3 py-2 transition-colors hover:text-emerald-500"
          >
            Go back to main page
          </Link>
        </div>
      </div>
    </main>
  );
}
