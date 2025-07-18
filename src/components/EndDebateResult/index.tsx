/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Result {
  winner: string;
  ai_score: string;
  user_score: string;
  weak_argument: string;
  fallacies: string;
  suggestions: string;
}

export default function EndDebate() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | Result>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const { id: sessionId } = useParams();

  const handleEndDebate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/end-debate/${sessionId}`, { sessionId });
      if (res.status === 200) {
        setResult(res.data.data);
        toast.success('Your Debate Result Retrieved Successfully');
      } else {
        setError('Failed to end debate.');
        toast.error('Failed to retrieve debate results.');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Something went wrong.');
      toast.error(err.response?.data?.detail || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Particle Animation Background */}
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

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-[5px] w-full max-w-2xl mt-[100px]"
      >
        <Card className="bg-gray-900/50 backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-2xl">
          <CardHeader>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              🌌 Conclude Your Cosmic Debate
            </motion.h1>
            <p className="text-sm text-gray-400 text-center mt-2">
              Finalize your session and assess your AI-generated performance insights.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button
                onClick={handleEndDebate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: loading ? Infinity : 0, ease: 'easeInOut' }}
                >
                  {loading ? 'Processing Results...' : 'End Debate & Get Feedback'}
                </motion.span>
              </Button>
            </motion.div>

            {error && (
              <motion.p
                className="text-red-400 text-center bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {error}
              </motion.p>
            )}

            {result && (
              <motion.div
                className="bg-gray-900/50 backdrop-blur-md border border-blue-500/30 rounded-xl p-6 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 mb-4">
                  Debate Performance Assessment
                </h2>
                <div className="grid gap-4">
                  <motion.div
                    className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:bg-gray-800/70 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <span className="text-sm font-medium text-gray-300">Winner</span>
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">{result.winner}</Badge>
                  </motion.div>
                  <motion.div
                    className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:bg-gray-800/70 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <span className="text-sm font-medium text-gray-300">Your Score</span>
                    <span className="text-blue-400 font-semibold">{result.user_score}</span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:bg-gray-800/70 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <span className="text-sm font-medium text-gray-300">AI Score</span>
                    <span className="text-purple-400 font-semibold">{result.ai_score}</span>
                  </motion.div>
                  <motion.div
                    className="p-3 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:bg-gray-800/70 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <span className="text-sm font-medium text-gray-300 block mb-1">Weak Argument</span>
                    <p className="text-sm text-gray-200">{result.weak_argument}</p>
                  </motion.div>
                  <motion.div
                    className="p-3 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:bg-gray-800/70 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <span className="text-sm font-medium text-gray-300 block mb-1">Fallacies</span>
                    <p className="text-sm text-gray-200">{result.fallacies}</p>
                  </motion.div>
                  <motion.div
                    className="p-3 bg-gray-800/50 rounded-lg border border-blue-500/20"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setIsSuggestionsOpen(!isSuggestionsOpen)}
                    >
                      <span className="text-sm font-medium text-gray-300">Suggestions</span>
                      {isSuggestionsOpen ? (
                        <ChevronUp className="text-blue-400" size={20} />
                      ) : (
                        <ChevronDown className="text-blue-400" size={20} />
                      )}
                    </div>
                    <AnimatePresence>
                      {isSuggestionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 max-h-48 overflow-y-auto"
                        >
                          <pre className="whitespace-pre-wrap break-words text-sm text-gray-200 bg-gray-900/50 p-3 rounded-lg border border-blue-500/20">
                            {result.suggestions}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}