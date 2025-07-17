'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WaveAnimationProps {
  isActive: boolean;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ isActive }) => {
  const [waves, setWaves] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setWaves((prev) => [...prev, Math.random() * 100].slice(-20));
      }, 200);
      return () => clearInterval(interval);
    } else {
      setWaves([]);
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-64 bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-500/30 flex items-center justify-center overflow-hidden">
      {isActive ? (
        <div className="flex items-center h-full w-full">
          {waves.map((height, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 w-2 mx-1"
              style={{ height: `${height}%` }}
              animate={{ height: `${Math.random() * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          ))}
        </div>
      ) : (
        <span className="text-gray-400 text-lg">
          Press Start Session to begin
        </span>
      )}
      <motion.div
        className="absolute inset-0 bg-blue-500/20 rounded-lg"
        animate={{ opacity: isActive ? [0.2, 0.4, 0.2] : 0 }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default WaveAnimation;
