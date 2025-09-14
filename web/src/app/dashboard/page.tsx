"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* top bar */}
      <div className="flex justify-end p-6 z-10">
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      {/* center area */}
      <div className="flex flex-1 flex-col items-center justify-center absolute inset-0">
        <h1 className="text-3xl font-bold mb-6">
          this is your JadeScrolls dashboard shawty
        </h1>
        <Link
          href="/notes"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Notes
        </Link>
      </div>
    </main>
  );
}