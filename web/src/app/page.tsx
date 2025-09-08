"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<any>(null)

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      if (error.message.includes("8 characters")) {
        alert("Your emblem lacks the strength to lift the Veil... only a key of at least 8 strokes—bearing the marks of the lower and upper, bound by numerals, and scarred with a symbol—may open the path.")
      } else if (error.message.includes("email")) {
        alert("The Veil rejects your mark. Inscribe your return anew, lest it remain disavowed.")
      }
    }
    else setUser(data.user)
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if ((error.message.includes("Email"))) {
        alert("Your mark awaits its awakening.")
      } else if (error.message.includes("Invalid")) {
        alert("The key you bear does not suffice.")
      } else {
        alert(error.message)
      }
    }
    else setUser(data.user)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {user ? (
        <div>
          <p>Tethered to {user.email}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={signOut}
          >
            Exit the Jade Veil
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Mark of return (Email)"
            className="border px-2 py-1 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Key of entry (Password)"
            className="border px-2 py-1 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={signUp}
          >
            Inscribe an emblem of passage
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={signIn}
          >
            Enter the Jade Veil
          </button>
        </div>
      )}
    </main>
  )
}
