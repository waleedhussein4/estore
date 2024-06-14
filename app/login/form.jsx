"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const callbackUrlParam = urlParams.get('callbackUrl');
    if (callbackUrlParam) {
      setCallbackUrl(callbackUrlParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res.error) {
      setError(res.error);
      return;
    } else {
      router.push(callbackUrl || '/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='shadow shadow-gray-600 rounded-lg flex flex-col gap-10 items-center p-4'>
      <h1>Login</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" className="h-10 p-2 border border-gray-300 mb-2" />
        </div>
        <div className="flex flex-col w-80 md:w-96">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="w-full h-10 p-2 border border-gray-300" />
        </div>
        <span>{error}</span>
      </div>
      <button type="submit" className="w-32 h-10 p-2 bg-blue-500 text-white hover:bg-blue-600">Login</button>
      <span>Don't have an account? <Link className="text-blue-500 hover:text-blue-600" href="/register">Register</Link>.</span>
    </form>
  );
}

export default Form;
