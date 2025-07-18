import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/lib/ClerkUserId';
import toast from 'react-hot-toast';
import axios from 'axios';
import { bookmarkedQuiz } from '@/props/PropsInterface';

const BookMark = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [bookmarkData, setBookMarkData] = useState<bookmarkedQuiz[]>([]);

  useEffect(() => {
    const getBookmarkedQuiz = async () => {
      const userId = await getUserId();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_bookmarked_quiz`,
          { userId }
        );

        if (response.status === 200) {
          setBookMarkData(response.data.data);
        }
      } catch (error) {
        console.log('Error in fetching bookmarked quizzes', error);
        toast.error('Failed to fetch bookmarked quizzes');
      }
    };

    getBookmarkedQuiz();
  }, []);
    
    
  const handleQuiz = async (quizId: string) => {
    setLoading(true);
    try {
      setLoading(true);
      router.push(`/quiz/${quizId}`);
    } catch (error) {
      console.log('error in giving value level', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-10 w-[1300px]">
      {bookmarkData?.map((item) => (
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
          <Button
            onClick={() => handleQuiz(item.quizId)}
            className="w-[300px] z-10 bg-amber-800 border-2 border-amber-800 hover:bg-transparent cursor-pointer"
          >
            {loading ? 'Loading Quiz' : 'Take Quiz'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BookMark;
