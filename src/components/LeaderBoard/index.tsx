'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getClerkUsername } from '@/lib/ClerkUsername';

interface LeaderboardEntry {
  username: string;
  total_score: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>();

  useEffect(() => {
    const fetchLeaderBoardData = async () => {
      setLoading(true);
      const name = await getClerkUsername();
      setUsername(name);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_quiz_leaderboard`
        );
        if (response.status === 200) {
          setLeaderboard(response.data.data);
        }
      } catch (error) {
        console.log('Error in getting leaderboard data', error);
      } finally {
          setLoading(false)
      }
    };

    fetchLeaderBoardData();
  }, []);

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
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-8"
          animate={{ scale: [0.9, 1.05, 1] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          Cosmic Leaderboard
        </motion.h1>
        <div className="bg-gray-900/50 mt-10 backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-2xl p-6">
          {loading ? (
            <motion.div
              className="text-center text-gray-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Loading leaderboard...
            </motion.div>
          ) : (
            <Table className=''>
              <TableHeader>
                <TableRow className="border-b border-blue-500/20">
                  <TableHead className="text-gray-300 font-serif text-2xl">
                    Username
                  </TableHead>
                  <TableHead className="text-gray-300 font-serif text-2xl">
                    Score
                  </TableHead>
                  <TableHead className="text-gray-300 font-serif text-2xl">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='mt-5'>
                <AnimatePresence>
                  {leaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.username}
                      className="border-b border-blue-500/10 hover:bg-gray-800/70 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <TableCell className="text-blue-400 text-3xl capitalize font-serif mt-4">
                        {entry.username === username ? (
                          <Badge className="bg-purple-600 hover:bg-purple-700 capitalize text-3xl font-serif">
                            You
                          </Badge>
                        ) : (
                          entry.username
                        )}
                      </TableCell>
                      <TableCell className="text-green-400 text-3xl ">
                        {entry.total_score}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                          onClick={() =>
                            toast.success(
                              `View profile for ${entry.username} (Coming soon)`
                            )
                          }
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
