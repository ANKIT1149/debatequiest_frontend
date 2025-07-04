import React, { useEffect, useRef } from 'react';

const TypeWritter: React.FC = () => {
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const texts = ["Master Debate Skills", "Learn with AI", "Join DebateQuest"];
    let textIndex = 0;
    let charIndex = 0; 

    const type = () => {
      if (charIndex < texts[textIndex].length) {
        if (typewriterRef.current) {
          typewriterRef.current.textContent += texts[textIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, 150);
        }
      } else {
        setTimeout(erase, 2000); // Longer pause for professionalism
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        if (typewriterRef.current) {
          typewriterRef.current.textContent = texts[textIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 50);
        }
      } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
      }
    };

    type();

    return () => {
      if (typewriterRef.current) typewriterRef.current.textContent = '';
    };
  }, []);

  return (
    <div className="w-full h-[300px]  flex items-center justify-center px-6 py-4">
      <div className="text-white font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight relative">
        <span ref={typewriterRef} className="inline-block">
          {/* Initial empty span for typewriter effect */}
        </span>
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-2/3 bg-white animate-blink"></span>
      </div>
    </div>
  );
};

export default TypeWritter;