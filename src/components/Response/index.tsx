import { LucideSearch } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

const ResponseCard = () => {
  return (
    <div className="w-full h-[90vh] bg-[#212A31] flex justify-between items-center">
      <div className="mx-10 mt-2">
        <Image
          src="/quizbanner.png"
          alt="response"
          width={100}
          height={100}
          className="w-[400px] rounded-2xl ml-7 border-4 border-amber-800 transition-all hover:scale-105 cursor-pointer animate-pulse hover:transition-transform hover:translate-x-6"
        />
        <div className="p-2 mb-5 mt-4 flex justify-center items-center">
          <LucideSearch className="relative left-[380px]" />
          <input
            type="text"
            placeholder="Enter Prompt"
            className=" mx-auto w-[400px] p-2 border-2 border-white font-serif rounded-3xl text-white "
          />
        </div>
      </div>
      <div className="mx-10 px-5">
        <h1 className="text-3xl font-serif text-white font-bold">
          Debate, <span className="text-amber-400">Design, Dominate</span>: Your
          Quiz, Your Rules.
        </h1>
        <p className="max-w-2xl mt-4 text-justify font-mono italic text-slate-200">
          Tired of generic quizzes? Step into the future of education and
          entertainment with our AI-powered Quiz Generator! Craft custom quizzes
          in minutes, fueled by advanced artificial intelligence. From
          challenging trivia to engaging educational tests, our intuitive,
          futuristic interface makes creation seamless and fun. Design, debate,
          and discover – your perfect quiz is just a few clicks away.
        </p>
        <Button className='mx-auto mt-8 w-[300px] h-[50px] border-2 cursor-pointer hover:shadow-2xl hover:shadow-amber-950 hover:scale-105 transition-[0.5s] border-amber-800 bg-amber-800 hover:bg-transparent'>Generate Your Own Quiz</Button>
      </div>
    </div>
  );
};

export default ResponseCard;
