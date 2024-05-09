"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10 text-center">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
        Access Shift Schedule
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Link
          className="inline-flex text-xl text-white h-10 items-center justify-center rounded-md bg-blue-500 px-6 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-400/90 dark:focus-visible:ring-blue-300"
          href="/api/auth/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
