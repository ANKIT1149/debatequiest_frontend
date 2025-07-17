import { dashboardBadges } from '@/props/PropsInterface'
import { motion } from 'framer-motion'
import React from 'react'

const DashboardBadge = ({itemVariants, badges}: dashboardBadges) => {
  return (
    <motion.div variants={itemVariants} className="mb-12">
    <h2 className="text-4xl font-serif text-neon-pink mb-4 mt-8 italic px-10 py-5 text-red-700 border-b-2 border-b-white">
      My Badges
    </h2>
    <div className="flex space-x-20 px-10">
      {badges.map((badge, i) => (
        <>
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-gray-800 p-3 flex flex-col justify-center items-center rounded-full glow hover:scale-110 transition w-[200px] h-[200px] px-5 mt-5"
          >
            <div className="flex justify-center items-center">
              {badge.icon}
            </div>
            <span className="mt-5 font-serif text-amber-600 text-xl">
              {badge.title}
            </span>
          </motion.div>
        </>
      ))}
    </div>
  </motion.div>
  )
}

export default DashboardBadge
