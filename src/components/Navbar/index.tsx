'use client';
import { navLinks } from '@/Constants/Constants';
import { cn } from '@/lib/utils';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex flex-col md:flex-row z-10 w-full items-center justify-between h-auto overflow-hidden bg-[#6989db] p-6 fixed">
      <div className="flex justify-between items-center w-full md:w-auto px-5">
        <h1 className="text-3xl font-serif italic text-[#003135]">
          Debate<span className="text-white text-[33px]">Quiest</span>
        </h1>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={cn(
          "flex-col md:flex md:flex-row md:items-center md:gap-10 transition-all duration-300 ease-in-out w-full md:w-auto",
          menuOpen ? "flex mt-4 px-5 gap-5" : "hidden md:flex"
        )}
      >
        {navLinks?.map((item) => (
          <div key={item.name} className="mt-2">
            <Link
              href={item.link}
              className={cn(
                pathname === item.link
                  ? 'text-[#3E362E] border-b-2 border-[#AFFDE5] text-[20px]'
                  : 'font-serif font-semibold text-white text-[20px]'
              )}
            >
              {item.name}
            </Link>
          </div>
        ))}

        <SignedOut>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
            <SignInButton>
              <button className="cursor-pointer w-[100px] border-2 border-white rounded-full hover:border-4 hover:text-white transition-all hover:border-red-800 hover:bg-red-600">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base hover:bg-transparent hover:border-4 hover:border-purple-700 transition-all h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="mt-2 md:mt-0">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
