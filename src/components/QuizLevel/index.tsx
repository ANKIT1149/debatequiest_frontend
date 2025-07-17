'use client';
import { quizDataInterface } from '@/props/PropsInterface';
import axios from 'axios';
import { LucideLoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Timer from '../CountDownTimer';
import QuizSidebar from '../QuizSidebar';
import QuizOptionSidebar from '../QuizOptionSidebar';
import TimeEndNotification from '../TimeEndNotification';
import ProgressBar from '../ProgressBar';
import { getUserId } from '@/lib/ClerkUserId';
import { useParams, useRouter } from 'next/navigation';

const QuizLevel: React.FC = () => {
  const [quizData, setQuizData] = useState<quizDataInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );
  const {id} = useParams();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const initialTime = 5 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimeEnd, setTImeEnd] = useState(false);

  const router = useRouter()
  useEffect(() => {
    const levelquiz = localStorage.getItem('level');
    setLevel(levelquiz);

    const getQuizData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_quizzes`,
          { params: { quizId: id } }
        );

        if (response.status === 200) {
          setQuizData(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log('Error in getting quizzes', error);
      } finally {
        setLoading(false);
      }
    };

    getQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTImeEnd(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleQuestionSelect = (id: string) => {
    setSelectedQuestionId(id);
    console.log(selectedQuestionId);
  };

  const handleOptionSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quizData.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const answersArray = Object.entries(answers).map(([i, a]) => ({ i, a }));
    const Level = localStorage.getItem("level");
    try {
      const userId = await getUserId();
      console.log(userId);

      const response = await axios.post(`http://127.0.0.1:8000/submit_quiz`, {
        userId: userId,
        quizId: id,
        level: Level,
        answer: answersArray,
      });
      
      localStorage.setItem("response", JSON.stringify(response.data.data))

      if (response.status === 200) {
        console.log(response.data.data);
        router.push(`/quiz_result/${id}`);
      }
    } catch (error) {
      console.error('Error submitting quiz', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestion = quizData.length;
  const progressPercentage = (answeredQuestions / totalQuestion) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <LucideLoaderCircle className="w-12 h-12 text-cyan-400" />
          </motion.div>
        </div>
      ) : (
        <div className="p-10">
          <div className="flex items-center justify-between mb-8 relative top-[130px]">
            <h1 className="text-4xl font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Debate Quiz
            </h1>
            <div className="flex items-center space-x-4">
              <div className="w-[130px] p-2 rounded-full text-black font-serif font-bold border-2 border-amber-400 bg-amber-400 flex justify-center items-center">
                {level || 'Level'}
              </div>
            </div>
            <button className="w-[150px] p-2 rounded-full text-white font-serif font-bold border-2 border-black bg-black hover:bg-gray-800 transition-colors">
              Save
            </button>
            <Timer minutes={minutes} seconds={seconds} />
          </div>
          <hr className="relative top-[110px]" />

          <ProgressBar
            answeredQuestion={answeredQuestions}
            totalQuestion={totalQuestion}
            progressPercentage={progressPercentage}
          />

          {/* Quiz Section */}
          <div className="flex mt-[50px] gap-20">
            <QuizSidebar
              quizData={quizData}
              selectedQuestionId={selectedQuestionId}
              handleQuestionSelect={handleQuestionSelect}
              answers={answers}
            />

            <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh)]">
              <QuizOptionSidebar
                quizData={quizData}
                answers={answers}
                handleOptionSelect={handleOptionSelect}
                handleSubmit={handleSubmit}
              />
            </main>
          </div>
        </div>
      )}
      {isTimeEnd && <TimeEndNotification />}
    </div>
  );
};

export default QuizLevel;
