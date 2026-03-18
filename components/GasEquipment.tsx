'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Wind, Gauge, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ASSETS } from '@/config/assets';

type SourceComparison = {
  sourceName: string;
  requirementText: string;
  usageScenario: string;
  advantages: string[];
  limitations: string[];
};

type GasType = {
  gasName: string;
  characteristics: string[];
  suitableFor: string[];
};

export default function GasEquipment() {
  const t = useTranslations('gasEquipment');
  const sourceComparisons: SourceComparison[] = t.raw('sourceComparisons');
  const cylinderGasTypes: GasType[] = t.raw('cylinderGasTypes');

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
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
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
        </div>

        <div className="mb-20">
          <h4 className="text-2xl font-bold text-gray-900 mb-8">{t('sourceComparisonsTitle')}</h4>
          <div className="grid md:grid-cols-2 gap-6">
            {sourceComparisons.map((item, idx) => (
              <motion.div
                key={`${item.sourceName}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08 }}
                className="relative min-h-[320px] rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
              >
                <Image
                  src={idx === 0 ? ASSETS.gasEquipment.cylinder : ASSETS.gasEquipment.compressor}
                  alt={item.sourceName}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
                <div className="relative z-10 p-6">
                  <div className="flex items-center mb-3">
                    <Wind className="w-5 h-5 text-blue-600 mr-2" />
                    <h5 className="text-xl font-bold text-gray-900">{item.sourceName}</h5>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line mb-3">{item.requirementText}</p>
                  <p className="text-sm text-blue-700 bg-blue-50 rounded-lg inline-block px-3 py-1 mb-5">
                    {t('usageLabel')}: {item.usageScenario}
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex items-center text-green-700 font-semibold mb-2">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        {t('advantagesLabel')}
                      </div>
                      <ul className="text-gray-600 text-sm space-y-1">
                        {item.advantages.map((adv, i) => (
                          <li key={i}>- {adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center text-rose-700 font-semibold mb-2">
                        <Gauge className="w-4 h-4 mr-2" />
                        {t('limitationsLabel')}
                      </div>
                      <ul className="text-gray-600 text-sm space-y-1">
                        {item.limitations.map((limitation, i) => (
                          <li key={i}>- {limitation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-gray-900 mb-8">{t('cylinderGasTypesTitle')}</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {cylinderGasTypes.map((gas, idx) => (
              <motion.div
                key={`${gas.gasName}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <h5 className="text-xl font-bold text-gray-900 mb-4">{gas.gasName}</h5>
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">{t('characteristicsLabel')}</p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {gas.characteristics.map((characteristic, i) => (
                      <li key={i}>- {characteristic}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">{t('suitableForLabel')}</p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {gas.suitableFor.map((target, i) => (
                      <li key={i}>- {target}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
