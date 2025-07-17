import React from 'react'
import { motion } from 'framer-motion'
import { quizQuestionInterface } from '@/props/PropsInterface'

const QuizSidebar = ({quizData, selectedQuestionId, answers, handleQuestionSelect}: quizQuestionInterface) => {
  return (
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
          className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
            selectedQuestionId === question.id
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
              : answers[question.id]
                ? 'bg-green-600/50'
                : 'bg-gray-700/50 hover:bg-gray-600/50'
          }`}
          onClick={() => handleQuestionSelect?.(question.id)}
        >
          <span className="font-semibold">
            Question {question.id}
          </span>
          <p className="text-sm truncate">{question.question}</p>
        </motion.li>
      ))}
    </ul>
  </motion.aside>
  )
}

export default QuizSidebar
