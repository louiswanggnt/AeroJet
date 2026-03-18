'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Zap, Wind, Droplets, Waves, FlaskConical } from 'lucide-react';
import { useTranslations } from 'next-intl';

const featureKeys = ['supersonic', 'micron', 'pulse'] as const;
const benefitKeys = ['delivery', 'shockwave', 'gas'] as const;

export default function Tech() {
  const icons = [ShieldCheck, Zap, Wind];
  const benefitIcons = [Droplets, Waves, FlaskConical];
  const t = useTranslations('tech');

  return (
    <section id="tech" className="py-24 bg-white px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top-right pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 bg-slate-50 rounded-3xl border border-slate-100 p-8 md:p-10"
        >
          <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('benefits.title')}
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            {benefitKeys.map((key, idx) => {
              const Icon = benefitIcons[idx];
              return (
                <div key={key} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-gray-900 mb-2">{t(`benefits.items.${key}.title`)}</h5>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{t(`benefits.items.${key}.desc`)}</p>
                  {key === 'gas' && (
                    <div className="mt-4 space-y-3 text-sm text-gray-700">
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                        <span className="font-semibold text-gray-900">{t('benefits.items.gas.co2.title')}</span>
                        <p className="mt-1 whitespace-pre-line">{t('benefits.items.gas.co2.desc')}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                        <span className="font-semibold text-gray-900">{t('benefits.items.gas.o2.title')}</span>
                        <p className="mt-1 whitespace-pre-line">{t('benefits.items.gas.o2.desc')}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-3xl bg-slate-800 border border-slate-700 p-8 md:p-10"
        >
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            {t('featuresTitle')}
          </h4>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {featureKeys.map((key, idx) => {
              const Icon = icons[idx];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
                  className="group p-8 rounded-3xl bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 hover:border-slate-500 transition-all duration-300 shadow-sm"
                >
                  <div className="w-16 h-16 bg-blue-500/30 rounded-2xl flex items-center justify-center mb-8 text-blue-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-white tracking-tight">{t(`features.${key}.title`)}</h4>
                  <p className="text-slate-300 mb-8 leading-relaxed font-light">
                    {t(`features.${key}.desc`)}
                  </p>
                  <div className="inline-flex items-center px-4 py-3 bg-slate-600/50 rounded-xl text-sm font-semibold text-slate-200 border border-slate-500 w-full group-hover:bg-slate-500/50 transition-colors">
                    {t(`features.${key}.stat`)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
