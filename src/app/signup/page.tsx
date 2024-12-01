"use client"
import { useEffect, useState } from "react"

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setMessage("User created successfully")
      } else {
        setMessage(data.message || "Failed to create user")
      }
    } catch {
      setMessage("An error occurred")
    }
  }

  useEffect(() => {
    document.title = "Signup | Todo App"
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
    <h1 className="text-3xl font-bold mb-6">Create Your Account</h1>
      <div className="flex flex-col justify-center items-center space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Username"
          className="rounded-full border border-solid border-white/[.145] transition-colors text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
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
        <input
          type="password"
          placeholder="Confirm password"
          className="rounded-full border border-solid border-white/[.145] transition-colors text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleSignup}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-lg sm:text-xl h-12 sm:h-14 px-6 sm:px-7 w-full sm:w-auto mt-4 mb-2"
      >
        Signup
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
