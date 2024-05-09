"use client";
import DashBoard from "@/components/DashBoard";
import HomePage from "@/components/Home";
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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <DashBoard />
        </main>
      )}
    </div>
  );
}
