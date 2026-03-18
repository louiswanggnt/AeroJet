'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { FileText, FlaskConical, Droplets, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const comparisonRowKeys = ['gasSource', 'speed', 'brand', 'mode', 'safety', 'system', 'marketing', 'effect'] as const;

const richOpts = { strong: (chunks: ReactNode) => <strong>{chunks}</strong> };

export default function Technology() {
  const t = useTranslations('technology');

  const trials: Array<{ year: string; partner: string; title: string }> = t.raw('trials.items');
  const journals: Array<{ year: string; partner: string; title: string }> = t.raw('journals.items');

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
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

        {/* Section 1: Why Drug Delivery Devices? */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-16 group"
        >
          <Image
            src="https://picsum.photos/seed/tech1/1200/600"
            alt="Drug Delivery"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-50/80 backdrop-blur rounded-xl flex items-center justify-center text-blue-600 mr-4 shadow-sm border border-white/50">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{t('why.title')}</h4>
            </div>
            <div className="space-y-6 text-gray-800 leading-relaxed text-lg font-medium">
              <p>{t.rich('why.desc1', richOpts)}</p>
              <p>{t.rich('why.desc2', richOpts)}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Atomization and Transdermal Penetration */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-24 group"
        >
          <Image
            src="https://picsum.photos/seed/tech2/1200/600"
            alt="Atomization"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-50/80 backdrop-blur rounded-xl flex items-center justify-center text-blue-600 mr-4 shadow-sm border border-white/50">
                <Droplets className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{t('atomization.title')}</h4>
            </div>
            <div className="space-y-6 text-gray-800 leading-relaxed text-lg font-medium">
              <p>{t.rich('atomization.desc1', richOpts)}</p>
              <p>{t.rich('atomization.desc2', richOpts)}</p>
              <p>{t.rich('atomization.desc3', richOpts)}</p>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900">{t('comparison.title')}</h4>
          </div>
          
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="bg-slate-800 text-white p-4 md:p-6 font-bold text-center w-1/4 border-b border-r border-slate-700"></th>
                  <th className="bg-blue-900 text-white p-4 md:p-6 font-bold text-center text-lg md:text-xl w-3/8 border-b border-r border-slate-700">{t('comparison.headers.0')}</th>
                  <th className="bg-slate-700 text-white p-4 md:p-6 font-bold text-center text-lg md:text-xl w-3/8 border-b border-slate-700">{t('comparison.headers.1')}</th>
                </tr>
              </thead>
              <tbody className="text-center font-medium">
                {comparisonRowKeys.map((key, idx) => (
                  <tr key={key}>
                    <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">{t(`comparison.rows.${key}.label`)}</td>
                    <td className={`${idx % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'} text-gray-900 p-4 border-b border-r border-slate-300 ${key === 'speed' ? 'font-bold' : ''}`}>
                      {t(`comparison.rows.${key}.t6`).split('\n').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))}
                    </td>
                    <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">
                      {t(`comparison.rows.${key}.other`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Section 3: Trials & Journals */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Trials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <FlaskConical className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-2xl font-bold text-gray-900">{t('trials.title')}</h4>
            </div>
            <div className="space-y-6">
              {trials.map((trial, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-gray-900 mb-2 leading-snug whitespace-pre-line">{trial.title}</h5>
                  <p className="text-blue-600 text-sm font-medium mb-1 whitespace-pre-line">{trial.partner}</p>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span />
                    <span>{trial.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Journals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-2xl font-bold text-gray-900">{t('journals.title')}</h4>
            </div>
            <div className="space-y-6">
              {journals.map((journal, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-gray-900 mb-2 leading-snug whitespace-pre-line">{journal.title}</h5>
                  <p className="text-blue-600 text-sm font-medium mb-1 whitespace-pre-line">{journal.partner}</p>
                  <div className="text-gray-500 text-sm text-right">
                    {journal.year}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
