'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Dynamic Background with Animated Particles */}
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

      {/* Main Content */}
      <div ref={ref} className="relative container mx-auto px-4 py-16 mt-[100px]">
        {/* Header Section */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          About DebateQuest
        </motion.h1>

        {/* Mission Statement */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="text-lg md:text-xl text-gray-300">
            DebateQuest is your ultimate platform for sharpening your mind and mastering the art of debate. Powered by cutting-edge technology, we bring you immersive quizzes, real-time challenges, and a futuristic community where ideas collide and intellect thrives.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          style={{ scale, opacity }}
        >
          {[
            { name: 'Aryansh Raj', role: 'Founder & Visionary', desc: 'Pioneering the future of intellectual engagement.' },
            { name: 'Luna Stark', role: 'Tech Innovator', desc: 'Crafting seamless, futuristic user experiences.' },
            { name: 'Orion Blaze', role: 'Community Architect', desc: 'Building a vibrant ecosystem for debaters.' },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800/50 backdrop-blur-md rounded-lg border border-blue-500/30 hover:border-blue-500 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-blue-400">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
              <p className="mt-2 text-gray-300">{member.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision Section with Holographic Effect */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300">
            To create a universe where every voice is heard, every argument is honed, and every mind is elevated. DebateQuest is more than an app—it's a movement to redefine how we think, argue, and connect in a digital age.
          </p>
          <motion.div
            className="mt-8 inline-block px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700"
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Quest
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Orbs for Futuristic Effect */}
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

export default AboutPage;