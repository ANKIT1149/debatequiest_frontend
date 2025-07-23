import { LucideTag } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FeatureCard = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center mt-10 mb-10 max-md:mt-3">
      <div className="w-[1200px] flex justify-between max-md:flex-col max-md:h-auto max-md:w-[98%] h-[400px] border-2 border-[#376e6f] bg-[#376e6f] rounded-3xl">
        <div className="mt-10 mx-5 px-5 max-md:px-0">
          <div className="flex">
            <LucideTag className="mb-6 text-red-500" />
            <h1 className="text-4xl max-md:text-2xl  font-serif text-white capitalize italic border-b-2 border-red-800">
              AI Premiere{' '}
            </h1>
          </div>
          <h2 className="mt-8 relative left-20 max-md:left-3 text-3xl font-serif text-white">
            Try Our AI to Enhance Your{' '}
            <span className="italic text-amber-400 text-3xl">
              Debating Skill!
            </span>
          </h2>
          <p className="relative left-20 max-md:left-3 max-md:mt-6 max-w-md mt-3 text-justify text-[15px] text-slate-200 font-mono">
            Try Our DebateQuest AI, the intelligent core of our platform
            designed to revolutionize debate learning. Powered by cutting-edge
            technology, DebateQuest AI offers personalized feedback on your
            arguments, detects logical fallacies, and suggests improvements to
            elevate your debating skills.
          </p>
          <div className="mt-5 max-md:mt-10 flex justify-center mx-auto items-center">
            <Button onClick={() => router.push("/start_debate")} className="w-[300px] bg-[#2f4454] hover:border-2 hover:border-[#101010] hover:bg-transparent hover:scale-95 tranisition-all cursor-pointer">
              Try Our AI
            </Button>
          </div>
        </div>
        <div className="my-auto mr-10 max-md:ml-6 max-md:mx-auto max-md:my-0 max-md:mt-10 max-md:mb-10">
          <Image
            src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg"
            alt="ai"
            width={200}
            height={300}
            className='w-[400px] max-md:w-[95%] h-[300px] rounded-3xl'
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
