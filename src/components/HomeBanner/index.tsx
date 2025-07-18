"use client"
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HomeBanner = () => {
  const router = useRouter()

  return (
    <div className="w-full h-[90vh] overflow-hidden animate-bg flex justify-center items-center gap-20">
      <div className="mr-5 ">
        <h1 className="text-4xl font-serif text-white leading-relaxed">
          Master Debating Skill With{' '}
          <span className="text-[42px] italic text-red-800">
            Fun and Creativity!
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-white text-[20px] font-light">
          An AI-powered, gamified learning platform to introduce school and
          college students to debating fundamentals through engaging,
          interactive, and age-appropriate content.
        </p>
        <div className="flex mt-10 justify-between items-center gap-10">
          <Button onClick={() => router.push("/subscription")} className="w-[300px] cursor-pointer bg-amber-800 hover:bg-transparent hover:border-2 hover:border-amber-800 h-[50px] hover:shadow-inner text-xl font-light font-serif">
            Start Learning
          </Button>
          <Button className="w-[300px] cursor-pointer bg-transparent  hover:bg-red-800 border-2 border-red-800 h-[50px] hover:shadow-inner hover:shadow-red-800 transition-all text-xl font-light font-serif">
            Explore More
          </Button>
        </div>
          </div>
          <div className='ml-10 z-[2px] border-4 border-amber-900 animate-bounce transiton-all rounded-tl-[60px] rounded-br-[60px]'>
              <Image src="/banner[1].png" alt='banner' width={500} height={400}  className='w-[500px] h-[250px] transition cursor-pointer hover:scale-115 rounded-tl-[60px] rounded-br-[60px]'/>
          </div>
    </div>
  );
};

export default HomeBanner;
