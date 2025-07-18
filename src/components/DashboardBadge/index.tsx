import { getUserId } from '@/lib/ClerkUserId';
import { dashboardBadges, levelProps } from '@/props/PropsInterface';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const DashboardBadge = ({ itemVariants }: dashboardBadges) => {
  const [leveldata, setlevelData] = useState<levelProps>();

  useEffect(() => {
    const levelData = async () => {
      try {
        const userId = await getUserId();
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/get_level`,
          { userId }
        );

        if (response.status === 200) {
          console.log(response.data.data);
          setlevelData(response.data.data);
        }
      } catch (error) {
        console.log('error in getting quizLength', error);
      }
    };

    levelData();
  }, []);

  return (
    <motion.div variants={itemVariants} className="mb-12">
      <h2 className="text-4xl font-serif text-neon-pink mb-4 mt-8 italic px-10 py-5 text-red-700 border-b-2 border-b-white">
        My Badges
      </h2>
      {leveldata?.Badges?.length === 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-serif italic">No Badges Earned Till</h1>
        </div>
      ) : (
        <div className="flex space-x-20 px-10">
          {leveldata?.Badges?.map((badge, i) => (
            <>
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-gray-800 p-3 flex flex-col justify-center items-center rounded-full glow hover:scale-110 transition w-[200px] h-[200px] px-5 mt-5"
              >
                <div className="flex justify-center items-center">{badge}</div>
              </motion.div>
            </>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardBadge;
