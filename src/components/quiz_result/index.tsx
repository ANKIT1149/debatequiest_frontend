'use client';
import {
  quizDataInterface,
  quizResultDataInterface,
} from '@/props/PropsInterface';
import axios from 'axios';
import { LucideLoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getClerkUsername } from '@/lib/ClerkUsername';
import ResultBox from '../ResultBox';
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const Quiz_result_page: React.FC = () => {
  const [quizData, setQuizData] = useState<quizDataInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<string | null>();
  const [quizresultData, setQuizResult] =
    useState<quizResultDataInterface | null>(null);
  const [username, setUsername] = useState<string | null>('');
  const { id } = useParams();

  //   const router = useRouter();

  useEffect(() => {
    const getlevel = localStorage.getItem('level');
    setLevel(getlevel);

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
    const getQuizResult = async () => {
      try {
        const response = JSON.parse(localStorage.getItem('response')!);
        setQuizResult(response);

        const user = await getClerkUsername();
        setUsername(user);
      } catch (error) {
        console.log(error);
      }
    };

    getQuizResult();
  }, []);

  const getUserAnswer = (questionId: string) => {
    const answers = quizresultData?.answer;

    if (!answers || !Array.isArray(answers)) {
      console.warn(
        `No valid answers array for question ${questionId}`,
        answers
      );
      return undefined;
    }

    console.log(questionId);

    const answer = answers.find((ans) => String(ans.i) === String(questionId));
    if (!answer) {
      console.warn(
        `No answer found for question ${questionId}. Answer IDs:`,
        answers.map((a) => a.i)
      );
      return undefined;
    }

    console.log(`Question ${questionId} user answer: ${answer.a}`);
    return answer.a;
  };

  const isAnswerCorrect = (question_id: string) => {
    return quizresultData?.results?.[question_id] === true;
  };

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
              Download
            </button>
          </div>
          <hr className="relative top-[110px]" />

          <div className="mt-[200px] flex justify-center items-center">
            <ResultBox
              quizresultData={
                quizresultData || {
                  id: '',
                  score: 0,
                  correct_answers: 0,
                  wrong_answers: 0,
                  percentage: 0,
                  results: { key: '', value: '' },
                  total_marks: 0,
                }
              }
              username={username ?? ''}
              title={
                quizData?.length > 0 ? quizData[0].title : 'No title available'
              }
              level={level!}
            />
          </div>
          {/* Quiz Section */}
          <div className="flex mt-[150px] gap-20">
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-1/4 bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 border-r border-gray-700/50"
            >
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Questions
              </h2>
              <ul className="space-y-3">
                {quizData.map((question) => (
                  <motion.li
                    key={question.id}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg cursor-pointer ${isAnswerCorrect(question.id) ? 'bg-green-800' : 'bg-red-800'} transition-colors duration-300 `}
                  >
                    <span className="font-semibold">
                      Question {question.id}
                    </span>
                    <p className="text-sm truncate">{question.question}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>

            <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh)]">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-4xl space-y-8"
                >
                  {quizData.map((question, qIndex) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: qIndex * 0.1 }}
                      className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-gray-700/50"
                    >
                      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        Question {question.id}: {question.question}
                      </h2>
                      <div className="grid gap-3">
                        {question.options.map((option, index) => {
                          const optionLetter = String.fromCharCode(65 + index);
                          const userAnswer = getUserAnswer(question.id);
                          const iscorrectAnswer =
                            optionLetter === question.correct_answer;
                          const isUserAnswer = optionLetter === userAnswer;
                          const isCorrect = isAnswerCorrect(question.id);

                          let bgColor = 'bg-gray-700/50 hover:bg-gray-600/50';
                          if (isUserAnswer && isCorrect) {
                            bgColor = 'bg-green-500/50';
                          } else if (isUserAnswer && !isCorrect) {
                            bgColor = 'bg-red-500/50';
                          } else if (iscorrectAnswer && !isCorrect) {
                            bgColor = 'bg-green-500/50';
                          }

                          return (
                            <motion.button
                              key={index}
                              whileHover={{
                                scale: 1.03,
                                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                              }}
                              whileTap={{ scale: 0.97 }}
                              className={`p-3 rounded-lg text-left transition-colors duration-300 ${bgColor}`}
                              disabled
                            >
                              <span className="font-semibold">
                                {String.fromCharCode(65 + index)}.{' '}
                              </span>
                              {option}
                            </motion.button>
                          );
                        })}
                      </div>
                      <div className="mt-8 px-5 font-serif text-xl leading-relaxed border-2 border-green-600 rounded-3xl">
                        {question.explanation}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz_result_page;
