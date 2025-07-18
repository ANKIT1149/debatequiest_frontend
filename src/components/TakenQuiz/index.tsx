import { propquiz } from '@/props/PropsInterface';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const TakenQuiz = ({ takenquiz }: propquiz) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


   const handleQuiz = async (quizId: string) => {
     setLoading(true)
    try {
       setLoading(true);
       router.push(`/quiz_result/${quizId}`);
     } catch (error) {
         console.log("error in giving value level", error)
     } finally {
       setLoading(false);
     }
  }
  return (
    <div className="mt-10 w-[1300px]">
      {takenquiz.map((item) => (
        <div
          key={item.title}
          className="bg-amber-600 w-full p-4 border-2 rounded-3xl h-[100px] flex justify-between mt-10 z-[5px] items-center"
        >
          <h1 className="font-serif text-2xl text-white italic">
            {item.title}
          </h1>
          <div className="w-[130px] p-2 rounded-4xl text-white font-serif font-bold border-2 border-red-400 bg-red-700 flex justify-center items-center">
            {item.level}
          </div>
          <div className="w-[130px] p-2 rounded-4xl text-white font-serif font-bold border-2 border-red-400 bg-red-700 flex justify-center items-center">
            Quiz Score: {item.score}
          </div>
          <Button
            onClick={() => handleQuiz(item.quizId)}
            className="w-[300px] z-10 bg-amber-800 border-2 border-amber-800 hover:bg-transparent cursor-pointer"
          >
            {loading ? 'Loading Quiz' : 'Check Full Result'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TakenQuiz;
