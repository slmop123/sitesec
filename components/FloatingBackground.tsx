
import React from 'react';
import * as FramerMotion from 'framer-motion';

const { motion } = FramerMotion as any;

const icons = [
  'fa-shield-halved', 'fa-lock', 'fa-code', 'fa-microchip', 
  'fa-network-wired', 'fa-database', 'fa-fingerprint', 'fa-bug',
  'fa-terminal', 'fa-user-secret', 'fa-satellite-dish', 'fa-biohazard'
];

// Fix: Typed as React.FC to allow React's internal props like 'key' in JSX usage
const FloatingIcon: React.FC<{ icon: string, index: number }> = ({ icon, index }) => {
  // توليد قيم عشوائية لكل أيقونة
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 25;
  const randomDelay = Math.random() * 10;
  const randomScale = 0.5 + Math.random() * 1.5;

  return (
    <motion.div
      initial={{ 
        x: `${randomX}vw`, 
        y: `${randomY}vh`, 
        opacity: 0,
        rotate: 0 
      }}
      animate={{ 
        x: [
          `${randomX}vw`, 
          `${(randomX + 10) % 100}vw`, 
          `${(randomX - 10 + 100) % 100}vw`, 
          `${randomX}vw`
        ],
        y: [
          `${randomY}vh`, 
          `${(randomY - 15 + 100) % 100}vh`, 
          `${(randomY + 15) % 100}vh`, 
          `${randomY}vh`
        ],
        opacity: [0.03, 0.08, 0.03],
        rotate: [0, 90, 180, 270, 360],
        scale: [randomScale, randomScale * 1.2, randomScale]
      }}
      transition={{ 
        duration: randomDuration, 
        repeat: Infinity, 
        delay: randomDelay,
        ease: "linear"
      }}
      className="absolute pointer-events-none select-none text-[#47E0FF]"
      style={{ zIndex: -1 }}
    >
      <i className={`fas ${icon} text-4xl lg:text-6xl`}></i>
    </motion.div>
  );
};

const FloatingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* طبقة الأيقونات */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingIcon key={i} icon={icons[i % icons.length]} index={i} />
      ))}
      
      {/* توهجات ضوئية في الخلفية */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default FloatingBackground;
