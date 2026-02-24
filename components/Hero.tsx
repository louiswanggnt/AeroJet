'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';

const images = [
  'https://picsum.photos/seed/aerojet1/1920/1080',
  'https://picsum.photos/seed/aerojet2/1920/1080',
  'https://picsum.photos/seed/aerojet3/1920/1080',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-50">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`AeroJet Slide ${currentIndex + 1}`}
              fill
              className="object-cover object-center"
              priority
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 md:to-transparent z-10" />
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-10 right-10 z-20 flex space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300/80 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-left"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-blue-100 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>2024 全新第六代技術</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
            AeroJet<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              無創藥物導入<br />肌膚再生的新紀元
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed font-light">
            AeroJet 採用專利氣動力技術<br />
            將活性成分霧化為微米級液滴<br />
            以超音速直達真皮層<br />
            <strong className="font-semibold text-gray-900 block mt-2">無創、高效、零恢復期</strong>
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center group">
              立即體驗
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
