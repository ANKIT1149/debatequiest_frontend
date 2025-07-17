/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';

interface UserAvatarProps {
  avatarUrl?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl }) => {
  return (
    <motion.div
      className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500"
      whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img
        src={avatarUrl || '/images/avatar-placeholder.png'}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-blue-500/20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default UserAvatar;
