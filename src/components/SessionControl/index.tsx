'use client';

   import { motion } from 'framer-motion';

   interface SessionControlsProps {
     isActive: boolean;
     onStart: () => void;
   }

   const SessionControls: React.FC<SessionControlsProps> = ({ isActive, onStart }) => {
     return (
       <motion.button
         className={`px-6 py-3 rounded-full text-lg font-semibold ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
         whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
         whileTap={{ scale: 0.95 }}
         onClick={onStart}
       >
         {isActive ? 'Stop Session' : 'Start Session'}
       </motion.button>
     );
   };

   export default SessionControls;