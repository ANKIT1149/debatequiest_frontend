import { CountSection } from '@/Constants/Constants';
import React from 'react';
import CountUp from 'react-countup';

const NumberCounter = () => {
  return (
    <div className="mt-10 flex justify-center items-center mb-10">
      <div className="w-[1300px] shadow-2xl px-10 bg-amber-800 shadow-black h-[120px] rounded-2xl flex justify-between items-center">
        {CountSection.map((item) => (
          <div key={item.count}>
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
            <hr className=" transform rotate-[90deg] relative left-[280px] bottom-[40px] w-[110px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberCounter;
