'use client';

interface timerprops{
  minutes: number;
  seconds: number;
}

export default function Timer({minutes, seconds}: timerprops) {
  return (
    <div className="flex items-center justify-center bg-gray-100 mr-20 rounded-4xl">
      <div className="text-4xl font-mono bg-white p-6 text-black rounded-2xl shadow-lg">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}