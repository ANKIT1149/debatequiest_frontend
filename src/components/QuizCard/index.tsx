import { QuizCardData } from '@/Constants/Constants';
import { LucideBookMarked, LucideClock3 } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

const QuizCard = () => {
  return (
    <div className="mt-20 mb-20 px-20">
      <h1 className="text-4xl font-serif border-b-2 w-fit border-red-800">
        Our Popular Quizes
      </h1>
      <div className="mt-5 p-2 flex justify-center items-center gap-8">
        {QuizCardData?.map((quiz) => (
          <div
            key={quiz.id}
            className={`w-[500px] h-[400px] border-2 rounded-3xl hover:scale-110 cursor-pointer transition-all`}
            style={{
              borderColor: quiz.color,
              backgroundColor: quiz.color,
            }}
          >
            <div className="flex justify-between items-center mt-5 mx-5">
              <div className="w-[130px] p-2 rounded-4xl text-black font-serif font-bold border-2 border-amber-400 bg-amber-400 flex justify-center items-center">
                {quiz.subject}
              </div>
              <div className="w-[50px] h-[50px] rounded-full border-2 border-white bg-white flex justify-center items-center hover:bg-transparent hover:text-white cursor-pointer transition-all">
                <LucideBookMarked />
              </div>
            </div>
            <div className="mt-5 mx-5">
              <h1 className="text-2xl font-serif text-black italic">
                {quiz.title}
              </h1>
              <p className="mt-2 text-black font-light text-[20px]">
                {quiz.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <h3 className="text-xl text-green-950">Total Question:</h3>
                <h5 className="text-2xl border-2 rounded-full w-[50px] h-[50px] flex justify-center items-center bg-black text-white">
                  {quiz.numberOfQuestions}
                </h5>
              </div>
              <div className="flex mt-4 gap-2">
                <h1 className="text-xl italic font-serif font-light">
                  {quiz.timeLimit} Minutes
                </h1>
                <LucideClock3 className="mt-1" />
              </div>
              <div className="flex justify-center items-center mt-7">
                <Button className="w-[400px] bg-amber-800 border-2 border-amber-800 hover:bg-transparent cursor-pointer">
                  Take Quiz
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
