import {
  quizResultDataInterface,
  quizResultInterface,
} from '@/props/PropsInterface';
import { useState } from 'react';
import { Button } from '../ui/button';

interface ResultBoxProps extends quizResultDataInterface, quizResultInterface {}

const ResultBox: React.FC<ResultBoxProps> = ({
  quizresultData,
  username,
  level,
  title,
}) => {
  return (
    <div className="w-[1100px] h-[70vh] border-gray-600 bg-gray-900 rounded-3xl">
      <div className="flex items-center justify-between mt-5 px-5">
        <h1 className="text-4xl font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          {title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="w-[130px] p-2 rounded-full text-black font-serif font-bold border-2 border-amber-400 bg-amber-400 flex justify-center items-center">
            {level || 'Level'}
          </div>
        </div>
      </div>
      <div className="mt-5 px-5">
        <h3 className="text-2xl font-serif text-white capitalize italic border-b-2 border-b-red-700">
          Quiz Result:
        </h3>
        <div className="flex justify-between">
          <h2 className="capitalize mt-4 text-3xl italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-purple-400">
            Congrats <span className="text-white"> {username}</span> for scoring{' '}
            <span className=" text-white rounded-3xl w-[200px]">
              {quizresultData.score} Marks out of {quizresultData.total_marks}
            </span>
          </h2>
          <div className="mt-5 px-5 w-[130px] p-2 rounded-full text-white font-serif font-bold border-2 border-red-400 bg-red-800 shadow-2xl shadow-black  flex justify-center items-center">
            <h3>Good</h3>
          </div>
        </div>
        <div className="mt-8 ">
          <h1 className="text-2xl font-serif text-white capitalize italic border-b-2 border-b-red-700">
            Result Overview:
          </h1>
          <div className="mt-5 grid grid-cols-2 gap-10">
            <h2 className="text-2xl italic font-serif text-green-700 capitalize">
              Correct answer:{' '}
              <span className="text-white">
                {quizresultData.correct_answers}
              </span>
            </h2>
            <h2 className="text-2xl italic font-serif text-red-700 capitalize">
              Wrong answer:{' '}
              <span className="text-white">{quizresultData.wrong_answers}</span>
            </h2>
            <h2 className="text-2xl italic font-serif text-green-700 capitalize">
              Marks:{' '}
              <span className="text-white">
                {quizresultData.score}/{quizresultData.total_marks}
              </span>
            </h2>
            <h2 className=" text-2xl italic font-serif text-green-700 capitalize">
              Percentage:{' '}
              <span className="text-white">{quizresultData.percentage}%</span>
            </h2>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
      <Button className="mx-auto mt-8 w-[300px] h-[50px] border-2 cursor-pointer hover:shadow-2xl hover:shadow-amber-950 hover:scale-105 transition-[0.5s] border-amber-800 bg-amber-800 hover:bg-transparent">
        Learn Debating With AI
      </Button>
      </div>
    </div>
  );
};

export default ResultBox;
