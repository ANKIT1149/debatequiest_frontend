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
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex z-10 w-full items-center justify-between h-auto overflow-hidden bg-[#6989db] p-2 fixed">
      <div className="my-5 mx-10">
        <h1 className="text-3xl font-serif italic text-[#003135]">
          Debate<span className="text-white text-[33px]">Quiest</span>
        </h1>
      </div>
      <div className="flex gap-10 mr-10">
        {navLinks?.map((item) => (
          <div key={item.name} className="mt-2">
            <Link
              href={item.link}
              className={cn(
                pathname === item.link
                  ? 'text-[#3E362E]  border-b-2 border-[#AFFDE5] text-[20px]'
                  : 'font-serif font-semibold text-white text-[20px]'
              )}
            >
              {item.name}
            </Link>
          </div>
        ))}
        {/* <Link
          href={`/dashboard/${userId}`}
          className={cn(
            pathname === `/dashboard/${userId}`
              ? 'text-[#3E362E]  border-b-2 border-[#AFFDE5] text-[20px] mt-2'
              : 'font-serif font-semibold text-white text-[20px] mt-2'
          )}
        >
          Dashboard
        </Link> */}
        <SignedOut>
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
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
