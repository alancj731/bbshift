"use client";
import HomePage from "@/components/Home";
import Board from "@/components/Board";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      {!user && (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
          <HomePage />
        </main>
      )}
      {user && (
          <Board />
      )}
    </div>
  );
}
