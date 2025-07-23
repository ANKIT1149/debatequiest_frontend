import { CountSection } from '@/Constants/Constants';
import React from 'react';
import CountUp from 'react-countup';

const NumberCounter = () => {
  return (
    <div className="mt-10 flex justify-center items-center mb-10">
      <div className="w-[1300px] max-md:w-[95%] shadow-2xl px-10 max-md:py-5 bg-amber-800 shadow-black h-[120px] rounded-2xl max-md:flex-col max-md:h-auto flex justify-between items-center">
        {CountSection.map((item) => (
          <div key={item.count} className='max-md:mt-8 max-md:mb-8'>
            <div className="flex justify-center items-center gap-3 mt-1">
              <CountUp
                start={0}
                end={item.count}
                duration={20}
                delay={10}
                className="text-white text-3xl font-serif"
              />
              <item.icon className="text-green-300" />
            </div>
            <div className="flex justify-center items-center mt-3">
              <h4 className="font-serif italic text-slate-400 text-2xl">
                {item.title}
              </h4>
            </div>
            <hr className=" transform rotate-[90deg] max-md:rotate-0 relative left-[280px] max-md:left-0 bottom-[40px] max-md:bottom-[-40px] w-[110px] max-md:w-[350px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberCounter;
