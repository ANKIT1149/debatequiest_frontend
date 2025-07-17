'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getUserId } from '@/lib/ClerkUserId';

export default function StartDebating() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(5);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user_id = await getUserId();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/start_debate`, {topic, duration, user_id}
        );
        
        if (response.status === 200) {
            router.push(`/send_debate/${response.data.data.id}`)
            toast.success("Starting Your Debate wait for some minutes")
        }

    } catch (error) {
      console.log('error in starting debate', error);
      toast.error('Do not able to start debate');
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-20"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          animate={{ scale: [0.8, 1.05, 1] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          🎤 Initiate Your Cosmic Debate
        </motion.h1>

        <div className="grid gap-6 mt-8">
          {/* Topic Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="" className="text-2xl font-serif">
              Debate Topic
            </label>
            <Input
              placeholder="Enter Debate Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-800/50 mt-3 backdrop-blur-md border border-blue-500/30 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </motion.div>

          {/* Duration Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="" className="text-2xl font-serif">
              Debate Duration
            </label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="Enter Your Duration (minutes)"
              className="bg-gray-800/50 mt-3 backdrop-blur-md border border-blue-500/30 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </motion.div>

          {/* Start Debate Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {loading ? "Starting Debate": "Launch Debate"}
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
