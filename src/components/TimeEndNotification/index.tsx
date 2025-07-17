'use client';
import { motion } from 'framer-motion';
import React from 'react';

const TimeEndNotification: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-cyan-400/50 max-w-md w-full text-center">
        <motion.div
          className="relative w-32 h-32 mx-auto mb-6 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(0, 255, 255, 0.5)',
              '0 0 40px rgba(0, 255, 255, 0.8)',
              '0 0 20px rgba(0, 255, 255, 0.5)',
            ],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
          <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Your Time Ends, Quiz Auto Submitted
        </h2>
      </div>
    </motion.div>
  );
};

export default TimeEndNotification;
