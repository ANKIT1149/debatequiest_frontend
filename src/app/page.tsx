'use client';
import HomeBanner from '@/components/HomeBanner';
import './globals.css';
import NumberCounter from '@/components/Counter';
import QuizCard from '@/components/QuizCard/page';
import FeatureCard from '@/components/FeatureCard';
import ResponseCard from '@/components/Response';
import OrganisationCard from '@/components/Organisation';
import AboutCard from '@/components/AboutCard';
import ContactCard from '@/components/ContactCard';
import SubscribeNewsLetter from '@/components/Subscribe';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { getUserId } from '@/lib/ClerkUserId';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const checkingClient = async () => {
      const user = await getUserId();
      if (!user) {
        router.push('/sign-in');
      }
    };

    checkingClient();
  }, []);

  useEffect(() => {
    const store_level = async () => {
      const grade = localStorage.getItem("grade")
      if (grade) {
        const userId = await getUserId()
         try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/store_level`, {userId, grade}
        );
        if (response.status === 200) {
          console.log(response.data.data);
          router.push(`/dashboard/${userId}`);
        }
      } catch (error) {
        console.log('error in stroing level', error);
        toast.error('error in storing level');
      }
      }
    }

    store_level();
  }, [])
  return (
    <div>
      <HomeBanner />
      <NumberCounter />
      <QuizCard />
      <FeatureCard />
      <ResponseCard />
      <OrganisationCard />
      <AboutCard />
      <ContactCard />
      <SubscribeNewsLetter />
      <Footer />
    </div>
  );
};

export default Page;
