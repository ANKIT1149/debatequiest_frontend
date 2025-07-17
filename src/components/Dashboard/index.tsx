'use client';
import { getClerkUser } from '@/lib/ClerkUserData';
import { getUserId } from '@/lib/ClerkUserId';
import { ClerkUser } from '@/props/PropsInterface';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LucideBookA, LucideLoaderCircle, LucideTrophy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import React, { useEffect, useState } from 'react';
import DashboardProfile from '../DashboardProfile';
import DashboardBadge from '../DashboardBadge';

const Dashboard_Page = () => {
  const [isUserIdStore, setUserIdStore] = useState<boolean>(false);
  const [processComplete, setProcessComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<ClerkUser | undefined>();

  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
  ];

  const badges = [
    {
      title: 'Novice Debater',
      icon: <LucideBookA />,
    },
    {
      title: 'Argument Ace',
      icon: <LucideTrophy />,
    },
  ];

  useEffect(() => {
    const check_user_store = async () => {
      try {
        const userId = await getUserId();
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/check_userId`,
          { userId }
        );

        if (response.status === 200) {
          setUserIdStore(true);
        } else {
          setUserIdStore(false);
        }
      } catch (error) {
        console.log('error in getting values', error);
      } finally {
        setProcessComplete(true);
      }
    };

    check_user_store();
  }, []);

  useEffect(() => {
    const getClerkUserData = async () => {
      setLoading(true);
      try {
        const client = await getClerkUser();
        setUserValue(client);
      } catch (error) {
        console.log('error in getting data', error);
      } finally {
        setLoading(false);
      }
    };

    getClerkUserData();
  }, []);

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: 'spring' as const },
    },
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen px-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <LucideLoaderCircle className="w-12 h-12 text-cyan-400" />
          </motion.div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white p-6 overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
                animate={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
          <DashboardProfile userValue={userValue} itemVariants={itemVariants} />

          <DashboardBadge itemVariants={itemVariants} badges={badges} />

          <motion.div variants={itemVariants} className="mb-12 mt-10">
            <h2 className="text-4xl font-serif text-neon-pink mb-4 mt-8 italic px-10 py-5 text-red-700 border-b-2 border-b-white">
              Taken Quizes
            </h2>
            <div className="space-y-4">
              <Table className="w-full h-auto bg-gray-800 p-4 rounded-2xl transition hover:bg-gray-800">
                <TableHeader className="bg-gray-800 p-4 rounded-2xl transition h-[100px] hover:bg-gray-800">
                  <TableRow>
                    <TableHead className="p-2 text-3xl text-white font-serif font-light">
                      Title
                    </TableHead>
                    <TableHead className="p-2 text-3xl text-white font-serif font-light">
                      Level
                    </TableHead>
                    <TableHead className="p-2 text-3xl text-white font-serif font-light">
                      Correct Answer
                    </TableHead>
                    <TableHead className="p-2 text-3xl text-white font-serif font-light">
                      Wrong Answer
                    </TableHead>
                    <TableHead className="p-2 text-3xl text-white font-serif font-light">
                      Score
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="text-2xl font-serif italic">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Page;
