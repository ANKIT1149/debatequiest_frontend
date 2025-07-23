"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/lib/ClerkUserId';

const HomeBanner = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserId();
      setUserId(user);
      if (!user) {
        router.push('/sign-in');
      }
    };
    checkUser();
  }, []);

  return (
    <div className="w-full h-auto min-h-[90vh] overflow-hidden animate-bg flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 px-5 md:px-0 py-10">
      <div className="md:mr-5 max-md:mt-[60px] text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-relaxed">
          Master Debating Skill With{' '}
          <span className="text-3xl md:text-[42px] italic text-red-800">
            Fun and Creativity!
          </span>
        </h1>
        <p className="mt-4 max-w-md md:max-w-xl text-white text-base sm:text-lg md:text-[20px] font-light">
          An AI-powered, gamified learning platform to introduce school and
          college students to debating fundamentals through engaging,
          interactive, and age-appropriate content.
        </p>

        <div className="flex flex-col sm:flex-row mt-8 md:mt-10 justify-center md:justify-start items-center gap-4 sm:gap-6">
          <Button
            onClick={() => router.push("/subscription")}
            className="w-full sm:w-[240px] md:w-[300px] cursor-pointer bg-amber-800 hover:bg-transparent hover:border-2 hover:border-amber-800 h-[45px] md:h-[50px] hover:shadow-inner text-lg md:text-xl font-light font-serif"
          >
            Start Learning
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/${userId}`)}
            className="w-full sm:w-[240px] md:w-[300px] cursor-pointer bg-transparent hover:bg-red-800 border-2 border-red-800 h-[45px] md:h-[50px] hover:shadow-inner hover:shadow-red-800 transition-all text-lg md:text-xl font-light font-serif"
          >
            Visit Your Dashboard
          </Button>
        </div>
      </div>

      <div className="z-[2] border-4 border-amber-900 animate-bounce transition-all rounded-tl-[40px] rounded-br-[40px] md:rounded-tl-[60px] md:rounded-br-[60px]">
        <Image
          src="/banner[1].png"
          alt="banner"
          width={500}
          height={400}
          className="w-[260px] sm:w-[400px] md:w-[500px] h-auto transition cursor-pointer hover:scale-105 rounded-tl-[40px] rounded-br-[40px] md:rounded-tl-[60px] md:rounded-br-[60px]"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
