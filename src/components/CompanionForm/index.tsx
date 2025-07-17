'use client';

import { getUserId } from '@/lib/ClerkUserId';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMicrophone, FaBook, FaClock, FaUser } from 'react-icons/fa';

const CreateCompanionPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const [loading, setisLoading] = useState(false)
    
    const router = useRouter();

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const [companionData, setCompanionData] = useState({
    topic: '',
    duration: 'short',
    level: 'beginner',
    voice: 'male',
    tone: 'formal',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setCompanionData({ ...companionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const userId = await getUserId()
    try {
        setisLoading(true)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/create_companion`, { ...companionData, userId })
        if (response.status === 200) {
            toast.success("Companion Created Successfully")
            router.push(`/companion/${response.data.data.id}`)
        }
    } catch (error) {
        console.log("Error in creating_companion", error)
        toast.error("Error in creating companion")
    }finally{
        setisLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-30"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>


      <div ref={ref} className="relative container mx-auto px-4 py-16 mt-[100px]">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Create Your Debate Companion
        </motion.h1>

        <motion.div
          className="max-w-3xl mx-auto p-6 bg-gray-800/50 backdrop-blur-md rounded-lg border border-blue-500/30"
          style={{ scale, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Customize Your Companion</h2>
          <div className="space-y-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label className="text-gray-400 mb-1 block flex items-center gap-2">
                <FaBook className="text-blue-400" /> Debate Topic
              </label>
              <input
                type="text"
                name="topic"
                value={companionData.topic}
                onChange={handleInputChange}
                placeholder="e.g., Should AI be regulated?"
                className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileFocus={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label className="text-gray-400 mb-1 block flex items-center gap-2">
                <FaClock className="text-blue-400" /> Duration
              </label>
              <select
                name="duration"
                value={companionData.duration}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              >
                <option value="short">Short (5-10 min)</option>
                <option value="medium">Medium (10-20 min)</option>
                <option value="long">Long (20-30 min)</option>
              </select>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileFocus={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label className="text-gray-400 mb-1 block flex items-center gap-2">
                <FaUser className="text-blue-400" /> Level
              </label>
              <select
                name="level"
                value={companionData.level}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileFocus={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Voice Select */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label className="text-gray-400 mb-1 block flex items-center gap-2">
                <FaMicrophone className="text-blue-400" /> Voice
              </label>
              <select
                name="voice"
                value={companionData.voice}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              >
                <option value="male">Male (Indian Accent)</option>
                <option value="female">Female (Indian Accent)</option>
                <option value="neutral">Neutral</option>
              </select>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileFocus={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Tone Select */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label className="text-gray-400 mb-1 block flex items-center gap-2">
                <FaUser className="text-blue-400" /> Tone
              </label>
              <select
                name="tone"
                value={companionData.tone}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              >
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
              </select>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                whileFocus={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              className="w-full px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
            >
              {loading ? "Creating Companion" : "Create Companion"}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Orbs for Futuristic Effect (Same as About/Support) */}
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default CreateCompanionPage;