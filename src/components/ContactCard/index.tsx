
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const ContactCard = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[90vh] bg-[#3d3a37] flex justify-between items-center">
      <div className="mx-10 px-5">
        <h1 className="text-3xl font-serif text-white font-bold">
          Facing Issue While Using
          <span className="text-amber-400"> DebitQuiest AI</span> Reach Us?
        </h1>
        <p className="max-w-3xl mt-4 text-justify font-mono italic text-slate-200">
          Empower your institution with insights. For school and college
          administrators, tracking student progress effectively can be a
          monumental task. Our platform offers a seamless solution to register
          your organization and gain unprecedented visibility into student
          performance.
        </p>
        <Button onClick={() => router.push("/contact")} className="mx-auto mt-8 w-[300px] h-[50px] border-2 cursor-pointer hover:shadow-2xl hover:shadow-amber-950 hover:scale-105 transition-[0.5s] border-red-800 bg-red-800 hover:bg-transparent">
          Contact Us
        </Button>
      </div>
      <div className="mx-10 mt-2 grid grid-cols-2">
        <Image
          src="/contact.png"
          alt="response"
          width={100}
          height={100}
          className="w-[400px] h-[400px] rounded-2xl ml-7 transition-all hover:scale-105 cursor-pointer hover:transition-transform hover:translate-x-6"
        />
        <Image
          src="https://www.marktechpost.com/wp-content/uploads/2023/07/multi-colored-abstract-background-with-vibrant-flying-feathers-generated-by-ai-scaled.jpg"
          alt="image"
          width={100}
          height={100}
          className="w-[400px] h-[200px] mt-20 rounded-2xl transition-all hover:scale-105 cursor-pointer hover:transition-transform hover:translate-x-6"
        />
      </div>
    </div>
  );
};

export default ContactCard;
