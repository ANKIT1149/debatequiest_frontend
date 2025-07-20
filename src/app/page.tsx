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
