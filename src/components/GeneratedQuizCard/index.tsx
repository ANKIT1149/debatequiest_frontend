'use client';
import { quizInterface } from '@/props/PropsInterface';
import { LucideBookMarked, LucideClock3 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import AnimatedParticle from '../AnimatedParticle';

const GeneratedQuizCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id: quizId } = useParams();
  const [generatedQuizData, setgeneratedQuizData] = useState<quizInterface[]>(
    []
  );

  useEffect(() => {
    const getquiz = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_quizzes`,
          {
            params: { quizId: quizId },
          }
        );

        if (response.status === 200) {
          setgeneratedQuizData(response.data.data);
        }
      } catch (error) {
        console.log('Data not found', error);
      } finally {
        setLoading(false);
      }
    };

    getquiz();
  }, []);

  const handleQuiz = async (quizId: string, level: string) => {
    setLoading(true);
    try {
      localStorage.setItem('level', level);
      router.push(`/quiz/${quizId}`);
    } catch (error) {
      console.log('Error in setting quiz level', error);
      toast.error('Failed to start quiz');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex items-center justify-center flex-col p-6 overflow-hidden">
      <AnimatedParticle />
      <h1 className="mt-20 text-4xl font-serif border-b-2 w-fit border-red-800">
        AI Generated Quiz
      </h1>
      <div className="mt-5 p-2 flex justify-center items-center gap-8">
        {generatedQuizData.length > 0 && (
          <div
            className={`w-[500px] h-[400px] border-2 rounded-3xl hover:scale-110 cursor-pointer transition-all`}
            style={{
              borderColor:
                generatedQuizData[0].level === 'Beginner'
                  ? '#AFDDE5'
                  : generatedQuizData[0].level === 'Intermediate'
                    ? '#748D92'
                    : '#D3D9D4',
              backgroundColor:
                generatedQuizData[0].level === 'Beginner'
                  ? '#AFDDE5'
                  : generatedQuizData[0].level === 'Intermediate'
                    ? '#748D92'
                    : '#D3D9D4',
            }}
          >
            <div className="flex justify-between items-center mt-5 mx-5">
              <div className="w-[130px] p-2 rounded-4xl text-black font-serif font-bold border-2 border-amber-400 bg-amber-400 flex justify-center items-center">
                {generatedQuizData[0].level}
              </div>
              <div
                className={`w-[50px] h-[50px] rounded-full border-2 border-white flex justify-center items-center cursor-pointer transition-all bg-white text-black hover:bg-transparent hover:text-white`}
              >
                <LucideBookMarked />
              </div>
            </div>
            <div className="mt-5 mx-5">
              <h1 className="text-2xl font-serif text-black italic">
                {generatedQuizData[0].title}
              </h1>
              <p className="mt-2 text-black font-light text-[20px]">
                {generatedQuizData[0].explanation}
              </p>
              <div className="flex justify-between items-center mt-3">
                <h3 className="text-xl text-green-950">Total Questions:</h3>
                <h5 className="text-2xl border-2 rounded-full w-[50px] h-[50px] flex justify-center items-center bg-black text-white">
                  10
                </h5>
              </div>
              <div className="flex mt-4 gap-2">
                <h1 className="text-xl italic font-serif font-light">
                  15 Minutes
                </h1>
                <LucideClock3 className="mt-1" />
              </div>
              <div className="flex justify-center items-center mt-7">
                <Button
                  onClick={() =>
                    handleQuiz(
                      generatedQuizData[0].quizId,
                      generatedQuizData[0].level
                    )
                  }
                  value={generatedQuizData[0].level}
                  className="w-[400px] bg-amber-800 border-2 border-amber-800 hover:bg-transparent cursor-pointer"
                  disabled={loading}
                >
                  {loading ? 'Loading Quiz' : 'Take Quiz'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedQuizCard;
