'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import axios from 'axios';
import AnimatedParticle from '../AnimatedParticle';

export default function GenerateQuiz() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    setLoading(true);
    const grade = localStorage.getItem('grade');

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/generate_quiz`,
        { title, level, grade }
      );

      if (res.status === 200) {
        toast.success('Quiz generated successfully!');
        console.log(res.data.data);
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
          const quizId = res.data.data.length > 0 && res.data.data[0].quizId;
          router.push(`generated_quiz_card/${quizId}`);
        }, 2000);
      } else {
        toast.error('Failed to generate quiz');
      }
    } catch (err) {
      console.error('Error generating quiz:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex items-center justify-center p-6 overflow-hidden">
      <AnimatedParticle />
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 1200}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}
          recycle={false}
          numberOfPieces={200}
          colors={['#3B82F6', '#8B5CF6', '#10B981']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-gray-900/50 backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-2xl">
          <CardHeader>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              🌌 Create Your Cosmic Quiz
            </motion.h1>
            <p className="text-sm text-gray-400 text-center mt-2">
              Craft a debate-focused quiz with AI-powered questions tailored to
              your preferences.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Input
                  placeholder="Enter Quiz Title (e.g., Politics Debate)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-800/50 backdrop-blur-md border border-blue-500/30 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  disabled={loading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Select
                  value={level}
                  onValueChange={setLevel}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-md border border-blue-500/30 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-blue-500/30 text-white">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={loading || !title.trim()}
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: loading ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Generating Quiz...
                      </span>
                    ) : (
                      'Generate Quiz'
                    )}
                  </motion.span>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
