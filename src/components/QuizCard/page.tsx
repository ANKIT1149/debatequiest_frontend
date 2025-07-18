'use client';
import { LucideBookMarked, LucideClock3 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { quizInterface } from '@/props/PropsInterface';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getUserId } from '@/lib/ClerkUserId';

const QuizCard = () => {
  const [quizdata, setQuizData] = useState<quizInterface[]>([]);
  const router = useRouter();
  const [bookmarkedQuizzes, setBookmarkedQuizzes] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const getQuizData = async () => {
      const grade = localStorage.getItem('grade');
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/quizzes`,
          { grade: grade }
        );

        if (response.status === 200) {
          setQuizData(response.data.data);
        }
      } catch (error) {
        console.log('Error in getting quizzes', error);
        toast.error('Failed to fetch quizzes');
      }
    };

    getQuizData();
  }, []);


  useEffect(() => {
    const getBookmarkedQuiz = async () => {
      const userId = await getUserId();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_bookmarked_quiz`,
          { userId }
        );

        if (response.status === 200) {
          const comingquizId = response.data.data
            ? response.data.data.map((item: any) => item.quizId)
            : [];

          const bookmarkStatus: { [key: string]: boolean } = {};

          quizdata.forEach((quiz) => {
            bookmarkStatus[quiz.quizId] = comingquizId.includes(quiz.quizId);
          });
          setBookmarkedQuizzes(bookmarkStatus);
          console.log('Bookmark status:', bookmarkStatus);
        }
      } catch (error) {
        console.log('Error in fetching bookmarked quizzes', error);
        toast.error('Failed to fetch bookmarked quizzes');
      }
    };

    if (quizdata.length > 0) {
      getBookmarkedQuiz();
    }
  }, [quizdata]);

  const handleQuiz = async (quizId: string, level: string) => {
    setLoading(true);
    try {
      localStorage.setItem('level', level);
      router.push(`quiz/${quizId}`);
    } catch (error) {
      console.log('Error in setting quiz level', error);
      toast.error('Failed to start quiz');
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (quizId: string, level: string) => {
    const userId = await getUserId();
    const isCurrentlyBookmarked = bookmarkedQuizzes[quizId] || false;

    try {
      if (isCurrentlyBookmarked) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/removed_bookmark_quiz`,
          { quizId, userId }
        );

        if (response.status === 200) {
          setBookmarkedQuizzes((prev) => ({ ...prev, [quizId]: false }));
          toast.success('Quiz removed from bookmarks');
        }
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/store_bookmarked_quiz`,
          { quizId, level, userId }
        );
        if (response.status === 200) {
          setBookmarkedQuizzes((prev) => ({ ...prev, [quizId]: true }));
          toast.success('Quiz bookmarked successfully');
        }
      }
    } catch (error) {
      console.log('Error in toggling bookmark', error);
      toast.error('Failed to toggle bookmark');
    }
  };

  return (
    <div className="mt-20 mb-20 px-20">
      <h1 className="text-4xl font-serif border-b-2 w-fit border-red-800">
        Our Popular Quizzes
      </h1>
      <div className="mt-5 p-2 flex justify-center items-center gap-8">
        {quizdata?.map((quiz) => (
          <div
            key={quiz.id}
            className={`w-[500px] h-[450px] border-2 rounded-3xl hover:scale-110 cursor-pointer transition-all`}
            style={{
              borderColor:
                quiz.level === 'Beginner'
                  ? '#AFDDE5'
                  : quiz.level === 'Intermediate'
                    ? '#748D92'
                    : '#D3D9D4',
              backgroundColor:
                quiz.level === 'Beginner'
                  ? '#AFDDE5'
                  : quiz.level === 'Intermediate'
                    ? '#748D92'
                    : '#D3D9D4',
            }}
          >
            <div className="flex justify-between items-center mt-5 mx-5">
              <div className="w-[130px] p-2 rounded-4xl text-black font-serif font-bold border-2 border-amber-400 bg-amber-400 flex justify-center items-center">
                {quiz.level}
              </div>
              <div
                onClick={() => toggleBookmark(quiz.quizId, quiz.level)}
                className={`w-[50px] h-[50px] rounded-full border-2 border-white flex justify-center items-center cursor-pointer transition-all ${
                  bookmarkedQuizzes[quiz.quizId]
                    ? 'bg-amber-400 text-black'
                    : 'bg-white text-black hover:bg-transparent hover:text-white'
                }`}
              >
                <LucideBookMarked />
              </div>
            </div>
            <div className="mt-5 mx-5">
              <h1 className="text-2xl font-serif text-black italic">
                {quiz.title}
              </h1>
              <p className="mt-2 text-black font-light text-[20px]">
                {quiz.explanation}
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
                  onClick={() => handleQuiz(quiz.quizId, quiz.level)}
                  value={quiz.level}
                  className="w-[400px] bg-amber-800 border-2 border-amber-800 hover:bg-transparent cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading Quiz' : 'Take Quiz'}
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
