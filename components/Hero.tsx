'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ASSETS } from '@/config/assets';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations('hero');

  const slides = [
    { image: ASSETS.hero.skin, text: t('slides.skin') },
    { image: ASSETS.hero.smile, text: t('slides.smile') },
    { image: ASSETS.hero.hair, text: t('slides.hair') },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
              src={slides[currentIndex].image}
              alt={`AeroJet Slide ${currentIndex + 1}`}
              fill
              className="object-cover object-center"
              priority
              referrerPolicy="no-referrer"
            />
            
            {/* Slide Text Overlay (Right Side) */}
            <div className="absolute inset-0 z-20 hidden md:flex items-center justify-end pr-[10%]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-white/10 backdrop-blur-md px-12 py-8 rounded-lg border border-white/30 shadow-2xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  {slides[currentIndex].text}
                </h2>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Mask (Left Side focus) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-white/10 md:to-transparent z-10" />
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-10 right-10 z-30 flex space-x-3">
          {slides.map((_, idx) => (
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
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
            AuJet<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t('title1')}<br />{t('title2')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed font-light">
            {t('desc')}<br />
            <strong className="font-semibold text-gray-900 block mt-2">{t('highlight')}</strong>
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center group">
              {t('btn1')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
