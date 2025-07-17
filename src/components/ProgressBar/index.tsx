import React from 'react';
import { motion } from 'framer-motion';
import { quizProgressInterface } from '@/props/PropsInterface';

const ProgressBar = ({
  answeredQuestion,
  totalQuestion,
  progressPercentage,
}: quizProgressInterface) => {
  return (
    <div className="mt-[130px]">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-semibold text-cyan-400">
          Progress: {answeredQuestion}/{totalQuestion}
        </span>
        <span className="text-lg font-semibold text-purple-400">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>
      <div className="w-full h-4 bg-gray-700/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            progressPercentage < 50
              ? 'bg-gradient-to-r from-red-500 to-pink-500'
              : progressPercentage < 80
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                : 'bg-gradient-to-r from-cyan-500 to-purple-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
