'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ASSETS } from '@/config/assets';

const carouselImages = [
  { id: 'T3', src: ASSETS.evolution.t3.carousel, labelKey: 't3' as const },
  { id: 'T4', src: ASSETS.evolution.t4.carousel, labelKey: 't4' as const },
  { id: 'T5', src: ASSETS.evolution.t5.carousel, labelKey: 't5' as const },
  { id: 'T6', src: ASSETS.evolution.t6.carousel, labelKey: 't6' as const },
];

const specRowKeys = ['type', 'weight', 'speed', 'load', 'atomizer', 'design', 'output'] as const;
const genKeys = ['t1', 't2', 't3', 't4', 't5', 't6'] as const;

const timelineEntries = [
  {
    id: 'T1~T3',
    key: 't1t3' as const,
    gunImg: null,
    controlImg: ASSETS.evolution.t3.control,
  },
  {
    id: 'T4',
    key: 't4' as const,
    gunImg: ASSETS.evolution.t4.gun,
    controlImg: ASSETS.evolution.t4.control,
  },
  {
    id: 'T5',
    key: 't5' as const,
    gunImg: ASSETS.evolution.t5.gun,
    controlImg: ASSETS.evolution.t5.control,
  },
  {
    id: 'T6',
    key: 't6' as const,
    gunImg: ASSETS.evolution.t6.gun,
    controlImg: ASSETS.evolution.t6.control,
  },
];

export default function EvolutionTimeline() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations('evolution');
  const patents: Array<{ title: string; country: string; type: string; number: string; year: string }> = t.raw('patents.items');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3"
          >
            {t('subtitle')}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {t('title')}
          </motion.h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('desc').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 mb-12 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={carouselImages[currentSlide].src}
                alt={t(`carouselLabels.${carouselImages[currentSlide].labelKey}`)}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-bold text-2xl">{t(`carouselLabels.${carouselImages[currentSlide].labelKey}`)}</h4>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-6 right-6 flex space-x-2 z-10">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">{t('tableTitle')}</h3>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-blue-50 text-blue-800">
                  <th className="p-4 font-semibold border-b border-blue-100 whitespace-nowrap">{t('specHeaders.specs')}</th>
                  {genKeys.map((gen) => (
                    <th key={gen} className={`p-4 font-semibold border-b border-blue-100 ${gen === 't1' || gen === 't2' ? 'text-red-600' : ''}`}>
                      {t(`specHeaders.${gen}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {specRowKeys.map((rowKey) => (
                  <tr key={rowKey} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-800 whitespace-nowrap">{t(`specRows.${rowKey}.label`)}</td>
                    {genKeys.map((gen) => (
                      <td key={gen} className={`p-4 border-b border-gray-100 ${
                        gen === 't1' || gen === 't2' ? 'text-gray-400' : ''
                      } ${gen === 't6' ? 'font-semibold text-blue-600' : ''}`}>
                        {t(`specRows.${rowKey}.${gen}`).split('\n').map((line, i, arr) => (
                          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                        ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 mb-12 text-center font-bold text-xl text-gray-800 border-b-2 border-gray-200 pb-4">
          <div>{t('timelineHeaders.gun')}</div>
          <div className="w-20 text-blue-600">{t('timelineHeaders.gen')}</div>
          <div>{t('timelineHeaders.control')}</div>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          {timelineEntries.map((entry, index) => {
            const gunSpecs: string[] | undefined = t.has(`timeline.${entry.key}.gunSpecs`) ? t.raw(`timeline.${entry.key}.gunSpecs`) : undefined;
            const controlSpecs: string[] = t.raw(`timeline.${entry.key}.controlSpecs`);
            const gunTitle: string | undefined = t.has(`timeline.${entry.key}.gunTitle`) ? t(`timeline.${entry.key}.gunTitle`) : undefined;
            const gunIssue: string | undefined = t.has(`timeline.${entry.key}.gunIssue`) ? t(`timeline.${entry.key}.gunIssue`) : undefined;

            return (
              <div key={entry.id} className="relative mb-16 md:mb-24 last:mb-0">
                <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                  
                  {/* Left: Gun */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:text-right order-2 md:order-1"
                  >
                    {entry.gunImg && gunSpecs ? (
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-50">
                          <Image src={entry.gunImg} alt={`${entry.id} Gun`} fill className="object-contain" referrerPolicy="no-referrer" />
                        </div>
                        {gunTitle && <h4 className="font-bold text-blue-600 mb-2">{gunTitle}</h4>}
                        {gunIssue && <p className="text-red-500 text-sm mb-3 font-medium">{gunIssue}</p>}
                        <ul className="text-gray-600 text-sm space-y-2 md:inline-block md:text-left">
                          {gunSpecs.map((spec, i) => (
                            <li key={i} className="flex items-start md:justify-end">
                              <span className="mr-2 text-blue-400">&bull;</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="hidden md:flex h-full items-center justify-end text-gray-400 italic">
                        {t.has(`timeline.${entry.key}.noGunData`) ? t(`timeline.${entry.key}.noGunData`) : ''}
                      </div>
                    )}
                  </motion.div>

                  {/* Center: Generation Node */}
                  <div className="flex flex-col items-center order-1 md:order-2 z-10 relative">
                    {t.has(`timeline.${entry.key}.year`) && (
                      <div className="absolute -top-10 text-gray-400 font-bold text-lg whitespace-nowrap">{t(`timeline.${entry.key}.year`)}</div>
                    )}
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-4 border-white">
                      {entry.id}
                    </div>
                    {index !== timelineEntries.length - 1 && (
                      <div className="h-full min-h-[100px] md:min-h-[200px] w-1 bg-gradient-to-b from-blue-600 to-blue-200 my-4 flex items-center justify-center">
                        <ArrowDown className="text-blue-600 w-6 h-6 bg-slate-50 rounded-full" />
                      </div>
                    )}
                  </div>

                  {/* Right: Control System */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full text-left order-3 md:order-3"
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-50">
                        <Image src={entry.controlImg} alt={`${entry.id} Control`} fill className="object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <ul className="text-gray-600 text-sm space-y-2">
                        {controlSpecs.map((spec, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-blue-400">&bull;</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Patents */}
        <div className="mt-24">
          <div className="flex items-center justify-center mb-8">
            <Award className="w-6 h-6 text-blue-600 mr-3" />
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900">{t('patents.title')}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {patents.map((patent, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h5 className="font-bold text-gray-900 mb-3 leading-snug whitespace-pre-line">{patent.title}</h5>
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">{patent.country}</span>
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium">{patent.type}</span>
                  <span className="text-blue-600 text-sm font-medium">{patent.number}</span>
                </div>
                {patent.year && <div className="text-gray-500 text-sm text-right">{patent.year}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
