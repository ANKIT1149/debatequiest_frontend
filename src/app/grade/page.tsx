'use client';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/lib/ClerkUserData';
import { getUserId } from '@/lib/ClerkUserId';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SelectGrade = () => {
  const router = useRouter();
  const [grade, setGrade] = useState('');

  const handleSubmit = async () => {
    if (grade) {
      localStorage.setItem('grade', grade);
      await registerUser(grade);
    }
  };

  useEffect(() => {
    const store_level = async () => {
      const grade = localStorage.getItem('grade');
      if (grade) {
        const userId = await getUserId();
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/store_level`,
            { userId, grade }
          );
          if (response.status === 200) {
            console.log(response.data.data);
            router.push(`/dashboard/${userId}`);
          }
        } catch (error) {
          console.log('error in stroing level', error);
          toast.error('error in storing level');
        }
      }
    };

    store_level();
  }, [handleSubmit]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center flex-col">
      <div className="w-[500px] h-[300px] border-2 rounded-2xl flex items-center justify-center flex-col bg-white">
        <h1 className="text-3xl font-serif text-red-700 italic border-b-2 border-black max-w-full mb-10">
          Techkit
        </h1>
        <h1 className="text-3xl font-serif text-black italic">
          Select Your Grade
        </h1>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="mt-6 p-2 bg-gray-800 text-neon-cyan w-[300px] rounded-4xl"
        >
          <option value="">Select Grade</option>
          <option value="6-8">Grade 6-8</option>
          <option value="8-10">Grade 8-10</option>
          <option value="10-12">Grade 10-12</option>
        </select>
        <Button
          onClick={handleSubmit}
          className="mx-auto mt-8 w-[300px] h-[50px] border-2 cursor-pointer hover:shadow-2xl hover:shadow-amber-950 hover:scale-105 transition-[0.5s] border-amber-800 bg-amber-800 hover:bg-transparent hover:text-black"
        >
          Submit Grade
        </Button>
      </div>
    </div>
  );
};

export default SelectGrade;
