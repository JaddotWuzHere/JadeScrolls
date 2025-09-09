"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      if (error.message.includes("Email")) {
        alert("Your mark awaits its awakening.");
      } else if (error.message.includes("Invalid")) {
        alert("The key you bear does not suffice.");
      } else {
        alert(error.message);
      }
      return;
    }

    // success → go Home (don’t set user state here to avoid UI flash)
    router.replace("/");
  }

  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      if (error.message.includes("8 characters")) {
        alert(
          "Your emblem lacks the strength to lift the Veil... only a key of at least 8 strokes—bearing the marks of the lower and upper, bound by numerals, and scarred with a symbol—may open the path."
        );
      } else if (error.message.includes("email")) {
        alert("The Veil rejects your mark. Inscribe your return anew, lest it remain disavowed.");
      } else {
        alert(error.message);
      }
      return;
    }

    // most projects require email confirmation; don’t redirect on sign-up
    alert("A confirmation scroll has been dispatched. Verify your mark, then return to enter.");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-6">
      <h1 className="text-2xl font-semibold">JadeScrolls</h1>
      <h2 className="text font">Conquer the Jade Veil</h2>

      <input
        type="email"
        placeholder="Mark of return (Email)"
        className="border px-3 py-2 rounded w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Key of entry (Password)"
        className="border px-3 py-2 rounded w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <div className="flex gap-2">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={signIn}
          disabled={loading}
        >
          {loading ? "Working..." : "Enter"}
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={signUp}
          disabled={loading}
        >
          Sign up
        </button>
      </div>
    </main>
  );
}
