'use client';
import HomeBanner from '@/components/HomeBanner';
import React from 'react';
import './globals.css';
import NumberCounter from '@/components/Counter';
import QuizCard from '@/components/QuizCard';
import FeatureCard from '@/components/FeatureCard';
import ResponseCard from '@/components/Response';
import OrganisationCard from '@/components/Organisation';
import AboutCard from '@/components/AboutCard';
import ContactCard from '@/components/ContactCard';
import SubscribeNewsLetter from '@/components/Subscribe';
import Footer from '@/components/Footer';

const page = () => {
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

export default page;
