'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Support = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Form state
  const [formData, setFormData] = useState({ name: '', subject: '', issue: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Dynamic Background with Animated Particles (Same as About Page) */}
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
      <div ref={ref} className="relative container mx-auto px-10 py-16 mt-[100px]">
        {/* Banner Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex flex-col justify-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Support & FAQ
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-300 mt-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Got questions or need help? Our team is here to assist you in navigating the DebateQuest universe. Reach out, and lets resolve your queries with speed and precision.
            </motion.p>
            <motion.button
              className="mt-6 px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 w-fit"
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Contact Us
            </motion.button>
          </div>
          {/* Right Side: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="w-full h-64 md:h-96 bg-gray-800/50 backdrop-blur-md rounded-lg border border-blue-500/30 flex items-center justify-center">
              <Image src="https://www.xcally.com/wp-content/uploads/2023/05/omnichannel-contact-center2-1.jpg" alt='banner' width={700} height={100} className='h-[365px] rounded-2xl' />
            </div>
            <motion.div
              className="absolute inset-0 bg-blue-500/20 rounded-lg"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* Connect With Us Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20"
          style={{ scale, opacity }}
        >
          {/* Left Side: Contact Details */}
          <motion.div
            className="p-6 bg-gray-800/50 ml-[50px] w-[500px] h-[300px] backdrop-blur-md rounded-lg border border-blue-500/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-6">Connect With Us</h2>
            <div className="space-y-4 mt-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaEnvelope className="text-blue-400 text-xl" />
                <p className="text-gray-300">support@debatequest.com</p>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 mt-5"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaPhone className="text-blue-400 text-xl" />
                <p className="text-gray-300">+1 (800) 123-4567</p>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 mt-5"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaMapMarkerAlt className="text-blue-400 text-xl" />
                <p className="text-gray-300">123 Cosmic Avenue, Nebula City, 90210</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Futuristic Form */}
          <motion.div
            className="p-6 bg-gray-800/50 backdrop-blur-md rounded-lg border border-blue-500/30 mr-[60px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-6">Submit Your Query</h2>
            <div className="space-y-6">
              {[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Subject', name: 'subject', type: 'text' },
                { label: 'Issue', name: 'issue', type: 'textarea' },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label className="text-gray-400 mb-1 block">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white resize-none"
                      rows={4}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-900/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    whileFocus={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
              <motion.button
                className="w-full px-6 cursor-pointer py-3 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
              >
                Submit Query
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Orbs for Futuristic Effect (Same as About Page) */}
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

export default Support;