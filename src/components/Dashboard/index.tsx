'use client';
import { getClerkUser } from '@/lib/ClerkUserData';
import { getUserId } from '@/lib/ClerkUserId';
import { ClerkUser, takenQuiz } from '@/props/PropsInterface';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LucideBookA, LucideLoaderCircle, LucideTrophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DashboardProfile from '../DashboardProfile';
import DashboardBadge from '../DashboardBadge';
import { useParams } from 'next/navigation';
import TakenQuiz from '../TakenQuiz';
import BookMark from '../BookMarkQuiz';

const Dashboard_Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<ClerkUser | undefined>();
  const { id: userId } = useParams()
  const [takenquiz, settakenQuiz] = useState<takenQuiz[]>([])

  useEffect(() => {
    const check_user_store = async () => {
      try {
        const userId = await getUserId();
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/check_userId`,
          { userId }
        );

        if (response.status === 200) {
            console.log("User Find")
        }
      } catch (error) {
        console.log('error in getting values', error);
      }
    };

    check_user_store();
  }, []);

  useEffect(() => {
    const getClerkUserData = async () => {
      setLoading(true);
      try {
        const client = await getClerkUser();
        setUserValue(client);
      } catch (error) {
        console.log('error in getting data', error);
      } finally {
        setLoading(false);
      }
    };

    getClerkUserData();
  }, []);

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: 'spring' as const },
    },
  };

  useEffect(() => {
    const getTakenQuiz = async() => {
         try {
           const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_taken_quiz`, { userId })
           if (response.status === 200) {
             console.log(response.data.data)
             settakenQuiz(response.data.data)
           }
         } catch (error) {
            console.log("Error in getting taken quiz", error)
         }
    }

    getTakenQuiz()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen px-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <LucideLoaderCircle className="w-12 h-12 text-cyan-400" />
          </motion.div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white p-6 overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
                animate={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
          <DashboardProfile userValue={userValue} itemVariants={itemVariants} />

          <DashboardBadge itemVariants={itemVariants} />

          <motion.div variants={itemVariants} className="mb-12 mt-10">
            <h2 className="text-4xl font-serif text-neon-pink mb-4 mt-8 italic px-10 py-5 text-red-700 border-b-2 border-b-white">
              Taken Quizes
              </h2>
              <TakenQuiz takenquiz={takenquiz}/>
            </motion.div>
            
          <motion.div variants={itemVariants} className="mb-12 mt-10">
            <h2 className="text-4xl font-serif text-neon-pink mb-4 mt-8 italic px-10 py-5 text-red-700 border-b-2 border-b-white">
              BookMark Quiz
              </h2>
              <BookMark/>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Page;
