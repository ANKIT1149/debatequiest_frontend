import { LucideSearch } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

const OrganisationCard = () => {
  return (
    <div className="w-full h-[90vh] max-md:mt-7 max-md:ml-3 bg-[#181614] flex justify-between items-center max-md:flex-col max-md:rounded-3xl max-md:w-[96%] max-md:h-auto">
      <div className="mx-10 px-5 max-md:mx-0 max-md:px-5 max-md:mt-6">
        <h1 className="text-3xl font-serif text-white font-bold">
          Elevate Learning:
          <span className="text-amber-400">Track & Transform</span> Student Performance
        </h1>
        <p className="max-w-3xl mt-4 text-justify font-mono italic text-slate-200">
          Empower your institution with insights. For school and college
          administrators, tracking student progress effectively can be a
          monumental task. Our platform offers a seamless solution to register
          your organization and gain unprecedented visibility into student
          performance. 
        </p>
        <Button className="mx-auto mt-8 max-md:ml-5 max-md:mb-5 w-[300px] h-[50px] border-2 cursor-pointer hover:shadow-2xl hover:shadow-amber-950 hover:scale-105 transition-[0.5s] border-red-800 bg-red-800 hover:bg-transparent">
          Register Your Organization
        </Button>
      </div>
      <div className="mx-10 max-md:mx-0 mt-2">
        <Image
          src="/organisation.jpg"
          alt="response"
          width={100}
          height={100}
          className="w-[400px] h-[400px] max-md:w-[300px] max-md:ml-3 max-md:mb-8 rounded-2xl ml-7 border-4 border-amber-800 transition-all hover:scale-105 cursor-pointer hover:transition-transform hover:translate-x-6"
        />
      </div>
    </div>
  );
};

export default OrganisationCard;
