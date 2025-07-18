import { getUserId } from '@/lib/ClerkUserId';
import {  Dashprofile, levelProps, profiledisplayquiz } from '@/props/PropsInterface';
import axios from 'axios';
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'


const DashboardProfile = ({userValue, itemVariants}: Dashprofile) => {
  const [quizTakenlength, setquizLength] = useState<profiledisplayquiz>()
  const [leveldata, setlevelData] = useState<levelProps>()

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const userId = await getUserId()
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/calculate`, { userId })
        
        if (response.status === 200) {
          console.log(response.data.data)
          setquizLength(response.data.data)
        }
      } catch (error) {
        console.log("error in getting quizLength", error)
      }
    }

    getQuizData()
  }, [])

  useEffect(() => {
    const levelData = async () => {
      try {
        const userId = await getUserId()
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_level`, { userId })
        
        if (response.status === 200) {
          console.log(response.data.data)
          setlevelData(response.data.data)
        }
      } catch (error) {
        console.log("error in getting quizLength", error)
      }
    }

    levelData()
  }, [])
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex justify-between items-center mb-8 mt-[130px] gap-20 px-10"
  >
    <div className="flex items-center flex-col">
      <motion.img
        src={userValue?.imageUrl}
        alt="User"
        className="w-[100px] h-[100px] rounded-full border-4 border-cyan-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <h1 className="ml-4 text-2xl font-bold text-neon-blue font-serif capitalize mt-5">
        {userValue?.username}
      </h1>
    </div>
    <div className="text-right">
        <p className="text-lg">Level {leveldata?.Level}</p>
      <div className="w-[300px] bg-gray-700 rounded-full h-4">
        <motion.div
          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${leveldata?.Exp}%` }}
        />
      </div>
    </div>
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-3 gap-20 mb-12"
    >
      <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:rotate-2 transition">
        <h2 className="text-xl text-neon-purple">Quizzes Taken</h2>
        <p className="text-3xl text-neon-cyan mt-2">{quizTakenlength?.taken_quiz}</p>
      </motion.div>
      <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:rotate-2 transition">
        <h2 className="text-xl text-neon-purple">Total Score</h2>
        <p className="text-3xl text-neon-cyan mt-2">{quizTakenlength?.percentage}%</p>
      </motion.div>
      <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:rotate-2 transition">
        <h2 className="text-xl text-neon-purple">Total Score</h2>
        <p className="text-3xl text-neon-cyan mt-2">{quizTakenlength?.total_score} marks</p>
      </motion.div>
    </motion.div>
  </motion.div>
  )
}

export default DashboardProfile
