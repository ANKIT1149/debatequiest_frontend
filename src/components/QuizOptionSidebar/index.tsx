import { quizQuestionInterface } from '@/props/PropsInterface'
import { AnimatePresence, motion} from 'framer-motion'
import React from 'react'

const QuizOptionSidebar = ({ quizData, answers, handleOptionSelect, handleSubmit }: quizQuestionInterface) => {
  return (
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
                        {question.options.map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{
                              scale: 1.03,
                              boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                            }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-3 rounded-lg text-left transition-colors duration-300 ${
                              answers[question.id] === String.fromCharCode(65 + index)
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                                : 'bg-gray-700/50 hover:bg-gray-600/50'
                            }`}
                            onClick={() =>
                              handleOptionSelect?.(question.id, String.fromCharCode(65 + index))
                            }
                          >
                            <span className="font-semibold">
                              {String.fromCharCode(65 + index)}.{' '}
                            </span>
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                    onClick={handleSubmit}
                  >
                    Submit Quiz
                  </motion.button>
                </motion.div>
              </AnimatePresence>
  )
}

export default QuizOptionSidebar
