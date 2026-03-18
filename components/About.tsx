'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ASSETS } from '@/config/assets';

const productKeys = ['p1', 'p2', 'p3'] as const;
const productImages = [ASSETS.about.products.t6, ASSETS.about.products.nanogold, ASSETS.about.products.wine];

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="GNT" className="py-24 px-6 relative overflow-hidden min-h-[800px] flex items-center">
      {/* Background Image for the whole section */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ASSETS.about.companyBackground}
          alt="Company Background"
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
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

        <div className="mb-20 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl text-gray-700 leading-relaxed font-light mb-6"
          >
            {t('desc').split('\n').map((line, i) => (
              <span key={i}>{line}{i < t('desc').split('\n').length - 1 && <br />}</span>
            ))}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productKeys.map((key, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all"
            >
              <Image
                src={productImages[idx]}
                alt={t(`products.${key}.title`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-white/80" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10">
                <h4 className="text-xl font-bold text-gray-900 mb-3">{t(`products.${key}.title`)}</h4>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {t(`products.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
