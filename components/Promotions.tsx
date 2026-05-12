'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

import type { Promotion, SupportedLocale } from '@/types/promotion';
import activePromotions from '@/data/promotions/active.json';

const promotions = activePromotions as Promotion[];

export default function Promotions() {
  const locale = useLocale() as SupportedLocale;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const count = promotions.length;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  const goNext = useCallback(() => go((index + 1) % count), [go, index, count]);
  const goPrev = useCallback(() => go((index - 1 + count) % count), [go, index, count]);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  if (count === 0) return null;

  const item = promotions[index];
  const content = item[locale] ?? item['zh-TW'];

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={item.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left: Image */}
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
                <Image
                  src={item.image}
                  alt={content.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right: Text */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
                  #{item.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                  {content.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {content.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {count > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        {count > 1 && (
          <div className="flex justify-center mt-5 space-x-2.5">
            {promotions.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to promotion ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
