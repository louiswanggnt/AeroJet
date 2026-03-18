'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ASSETS } from '@/config/assets';

const caseImages = [
  ASSETS.treatment.case1,
  ASSETS.treatment.case2,
  ASSETS.treatment.case3,
  ASSETS.treatment.case4,
  ASSETS.treatment.case5,
  ASSETS.treatment.case6,
  ASSETS.treatment.case7,
];

export default function Treatment() {
  const t = useTranslations('treatment');

  const cases: Array<{
    id: number;
    problem: string;
    age: string;
    sessions: string;
    duration: string;
    startTime: string;
    endTime: string;
  }> = t.raw('cases');

  return (
    <section id="treatment" className="py-24 bg-white px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
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
        </div>

        <div className="flex flex-col space-y-12">
          {cases.map((item, idx) => {
            const images = caseImages[idx];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col md:flex-row"
              >
                {/* Image Comparison */}
                <div className="flex flex-col sm:flex-row w-full md:w-2/3">
                  <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto sm:h-64 md:h-auto">
                    <Image
                      src={images.before}
                      alt={t('before')}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                      {item.startTime}
                    </div>
                  </div>
                  <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto sm:h-64 md:h-auto">
                    <Image
                      src={images.after}
                      alt={t('after')}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                      {item.endTime}
                    </div>
                  </div>
                </div>

                {/* Case Details */}
                <div className="p-6 md:p-8 w-full md:w-1/3 flex flex-col justify-center bg-white">
                  <div className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                    Case {item.id}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6">{item.problem}</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">{t('patientAge')}</span>
                      <span className="font-semibold text-gray-800">{item.age}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-red-500 text-sm font-bold">{t('sessions')}</span>
                      <span className="font-semibold text-red-500">{item.sessions}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-red-500 text-sm font-bold">{t('duration')}</span>
                      <span className="font-semibold text-red-500">{item.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
