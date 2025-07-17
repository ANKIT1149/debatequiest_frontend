'use client';

import React, { useEffect, useRef, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useParams } from 'next/navigation';
import { getClerkUser } from '@/lib/ClerkUserData';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface avatar {
  imageUrl: string;
  username: string;
}

export default function DebateChat() {
  const router = useRouter();
  const { id: sessionId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<avatar>();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const getdata = async () => {
      const userData = await getClerkUser();
      setUser({
        imageUrl: (await userData).imageUrl,
        username: (await userData).username,
      });
    };

    getdata();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading || !sessionId) return;
    setLoading(true);
    setIsTyping(true);

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/send_message`,
        { session_id: sessionId, user_message: input }
      );
      const data = await response.data;

      if (response.status === 200) {
        const aiReply: Message = { role: 'assistant', content: data.data };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        toast.error('Message sent failed');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEndDebate = (e: React.FormEvent) => {
    e.preventDefault();
    redirect(`/end_debate/${sessionId}`)
  };

  return (
    <main className="min-h-screen z-40 w-full bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex flex-col overflow-hidden">
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

      {/* Header */}
      <div className="flex justify-center gap-[100px] relative items-center border-b top-[130px] z-[5px] border-blue-500/30">
        <header className="relative  text-center p-4 text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600  ">
          🌌 Cosmic Debate Arena
        </header>
        <Button
          type="submit"
          onClick={handleEndDebate}
          className="bg-gradient-to-r w-[300px] ml-auto from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg p-3 transition-all duration-300"
          whilehover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
          >
            End Debate
          </motion.span>
        </Button>
      </div>

      {/* Chat Section */}
      <section className="relative top-[90px] z-[5px] flex-1 overflow-y-auto p-6 space-y-6 w-[1200px]">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`flex gap-3 items-start max-w-[80%] md:max-w-[60%] ${
                msg.role === 'user' ? '' : 'ml-auto'
              }`}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {msg.role === 'assistant' && (
                <Avatar className="w-10 h-10 border-2 border-blue-500/50">
                  <AvatarImage
                    src="/https://static.vecteezy.com/system/resources/previews/004/885/882/non_2x/ai-artificial-intelligence-logo-in-hands-artificial-intelligence-and-machine-learning-concept-sphere-grid-wave-with-binary-code-big-data-innovation-technology-neural-networks-illustration-vector.jpg"
                    alt="AI"
                  />
                  <AvatarFallback className="text-black ">AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800'
                    : 'bg-gradient-to-r from-gray-700 to-gray-800'
                }`}
              >
                <p className="text-sm md:text-base">{msg.content}</p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              {msg.role === 'user' && (
                <Avatar className="w-10 h-10 border-2 border-purple-500/50">
                  <AvatarImage
                    src={user?.imageUrl || '/user-avatar.png'}
                    alt="User"
                  />
                  <AvatarFallback>{user?.username?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              className="flex gap-3 items-start max-w-[60%] mr-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="w-10 h-10 border-2 border-blue-500/50">
                <AvatarImage src="/ai-avatar.png" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="px-4 py-3 rounded-2xl shadow-lg bg-gradient-to-r from-gray-700 to-gray-800 backdrop-blur-md">
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </section>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="relative top-[20px] z-10 border-t border-blue-500/30 p-4 flex gap-3 bg-gray-900/50 backdrop-blur-md"
      >
        <Input
          className="flex-1 bg-gray-800/50 border border-blue-500/30 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          placeholder="Type your argument..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg p-3 transition-all duration-300"
          whilehover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
          >
            <SendHorizonal size={18} />
          </motion.span>
        </Button>
      </form>
    </main>
  );
}
