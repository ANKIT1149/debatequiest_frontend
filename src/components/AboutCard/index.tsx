import { LucideTag } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

const AboutCard = () => {
  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <div className="w-[1200px] flex justify-between h-[400px] border-2 border-[#464866] bg-[#464866] rounded-3xl">
        <div className="my-auto ml-10">
          <Image
            src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/d9de33d5-f786-406b-866c-4e8086819787_1280x720.jpeg"
            alt="ai"
            width={200}
            height={300}
            className="w-[400px] h-[300px] rounded-3xl cursor-pointer hover:scale-115 transition-all"
          />
        </div>
        <div className="mt-10 mx-5 px-5">
          <h2 className="mt-8 text-3xl font-serif text-white">
            Want To Know More About{' '}
            <span className="italic text-amber-400 text-3xl">
              DebateQuiest?
            </span>
          </h2>
          <p className=" max-w-md mt-3 text-justify text-[15px] text-slate-200 font-mono">
            Want to know the story behind DebatQuiest AI? Click here to
            discover our mission, our passion for AI-powered learning, and how
            we are revolutionizing quizzes for everyone. See what drives us!
          </p>
          <div className="mt-5 flex justify-center mx-auto items-center">
            <Button className="w-[300px] hover:shadow-inner hover:shadow-amber-500 bg-[#2e9cca] h-[50px] hover:border-2 hover:border-[#101010] hover:bg-transparent hover:scale-95 tranisition-all cursor-pointer">
              Know More About Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
