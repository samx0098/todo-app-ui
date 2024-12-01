"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful")
        localStorage.setItem("token", data.token)
        router.push("/dashboard")
      } else {
        console.error("Login failed")
        setMessage(data.message || "Failed to login")
      }
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1
        className="flex justify-center items-center"
        style={{ textAlign: "center", fontSize: "3em", marginBottom: "1em" }}
      >
        <Image
          aria-hidden
          src="https://nextjs.org/icons/file.svg"
          alt="File icon"
          width={50}
          height={50}
          style={{ marginRight: "0.1em" }}
        />
        Todo App
      </h1>
      <ul className="space-y-6">
        <li className="flex flex-col gap-6 items-center justify-center">
          <input
            type="text"
            placeholder="Username/Email"
            className="rounded-full border border-solid border-white/[.145] transition-colors text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-full border border-solid border-white/[.145] transition-colors text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
        <li className="flex gap-6 items-center justify-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#1a1a1a] hover:border-transparent text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full sm:w-auto"
            href="/signup"
          >
            Signup
          </a>
          <a
            onClick={handleLogin}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full sm:w-auto"
            // href="/dashboard"
          >
            Login
          </a>
        </li>
      </ul>
      {message && <p>{message}</p>}
    </div>
  )
}
