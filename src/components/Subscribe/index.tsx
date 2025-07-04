import React from 'react';
import { Button } from '../ui/button';

const SubscribeNewsLetter = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-[1200px] h-[30vh] bg-[#3d4d4c] border-2 rounded-xl">
        <h1 className="mt-5 p-5 font-serif text-3xl italic text-white">
          Subscribe Our Newletter To{' '}
          <span className="text-amber-400">Get Latest Feature!</span>
        </h1>
        <div className='w-[1100px] border-2 p-2 mx-auto rounded-3xl flex justify-center items-center border-r-amber-400'>
          <input type="email" placeholder="Enter Your Email" className="w-[800px] font-serif italic text-2xl border-0 outline-none ml-2 text-white " />
          <Button className="mx-auto w-[300px] h-[50px] border-2 cursor-pointer hover:shadow-2xl rounded-3xl hover:shadow-amber-950 hover:scale-105 transition-[0.5s] border-amber-800 bg-amber-800 hover:bg-transparent">
           Subscribe Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNewsLetter;
