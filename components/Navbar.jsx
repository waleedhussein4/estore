"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CiMenuBurger } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session)

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b h-20 flex flex-row justify-between items-center bg-white p-4 text-black">
      {/* Logo */}
      <div>
        <Link href="/" onClick={() => {setMobileOpen(false)}}>
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
      </div>

      {/* Desktop nav */}
      <div className='hidden md:flex flex-row w-full justify-around items-center'>
        <div className="w-80 h-10 flex flex-row items-center">
          <input type="text" placeholder="Search" className="p-2 w-full h-full border border-gray-300" />
          <div className='w-10 h-10 relative flex justify-center items-center border border-gray-300 hover:bg-gray-50 cursor-pointer'>
            <Image src="/search.png" alt="search" width={26} height={26} />
          </div>
        </div>
        <div className="flex flex-row gap-8">
          {session?.user?.role == "admin" && <Link href="/dashboard">Admin Dashboard</Link>}
        </div>
        <div className='flex flex-row gap-6'>
          <div className='flex flex-row gap-4'>
            <Link href="/cart" className='hover:text-gray-600'>
              <Image src="/cart.png" alt="cart" width={30} height={30} />
            </Link>
            <Popover>
              <PopoverTrigger>
                <Image src="/down.png" height={10} width={10} alt='dropdown' />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col p-4 justify-between items-center w-36 gap-2">
                <Link href="/profile" className='hover:text-gray-600'>Profile</Link>
                <Link href="/cart">View cart</Link>
                <Link href="/checkout">Checkout</Link>
                <button onClick={() => signOut()}>Log out</button>
              </PopoverContent>
            </Popover>
          </div>
          {!session &&
            <Link href="/login" className='hover:text-gray-600'>Log in</Link>
          }
        </div>
      </div>

      {/* Mobile cart and menu button */}
      <div className='md:hidden flex flex-row gap-8 justify-center items-center'>
        <Link href="/cart" className='hover:text-gray-600' onClick={() => setMobileOpen(false)}>
          <Image src="/cart.png" alt="cart" width={30} height={30} />
        </Link>
        <CiMenuBurger onClick={() => { setMobileOpen(prev => !prev) }} className='hover:cursor-pointer' />
      </div>

      {/* Mobile menu */}
      {mobileOpen &&
        <div className={`md:hidden flex flex-col items-center justify-between z-10 absolute right-0 top-20 h-[calc(100vh-5rem)] p-4 w-4/5 bg-white shadow-[-1px_0px_1px_0px_#1a202c] transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)' }}>
          <div className='flex flex-col gap-10 justify-between h-full'>
            <div className="w-full h-10 flex flex-row items-center">
              <input type="text" placeholder="Search" className="p-2 w-full h-full border border-gray-300" />
              <div className='w-10 h-10 relative flex justify-center items-center border border-gray-300 hover:bg-gray-50 cursor-pointer'>
                <Image src="/search.png" alt="search" width={20} height={20} />
              </div>
            </div>

            <div className='flex flex-col gap-10 items-center justify-between'>
              {session?.user?.role == "admin" && <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Admin Dashboard</Link>}
              {session && <Link href="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>}
              <Link href="/cart" onClick={() => setMobileOpen(false)}>View cart</Link>
              {session && <Link href="/checkout" onClick={() => setMobileOpen(false)}>Checkout</Link>}
            </div>

            <div className='flex flex-col items-center'>
              {session ? (
                <button onClick={() => { signOut(); setMobileOpen(false) }}>Log out</button>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>Log in</Link>
              )
              }
            </div>
          </div>
        </div>
      }
    </nav>
  )
}

export default Navbar
