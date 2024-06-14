"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const username = e.target.username.value

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, firstName, lastName, username })
    })

    const data = await res.json()

    if (data.error) {
      setError(data.error)
      return
    } else {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='shadow shadow-gray-600 rounded-lg flex flex-col gap-6 items-center p-4'>
      <h1>Login</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" className="h-10 p-2 border border-gray-300 mb-2" />
        </div>
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" className="h-10 p-2 border border-gray-300 mb-2" />
        </div>
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className="h-10 p-2 border border-gray-300 mb-2" />
        </div>
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="username">Email</label>
          <input type="email" id="email" name="email" className="h-10 p-2 border border-gray-300 mb-2" />
        </div>
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="w-full h-10 p-2 border border-gray-300" />
        </div>
        <span>{error}</span>
      </div>
      <button type="submit" className="w-32 h-10 p-2 bg-blue-500 text-white hover:bg-blue-600">Register</button>
      <span>Already have an account? <Link className="text-blue-500 hover:text-blue-600" href="/login">Login</Link>.</span>
    </form>
  )
}

export default Form