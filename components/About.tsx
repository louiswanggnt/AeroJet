'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ASSETS } from '@/config/assets';

const products = [
  {
    title: '藥物/美容液導入儀',
    desc: '結合流體力學與精密工程，提供無創、無痛的高效活性成分導入解決方案。',
    img: ASSETS.about.products.t6
  },
  {
    title: '汽化金、汽化銀工藝',
    desc: '專研汽化金屬材料，應用於食品、生技與藥物發展。',
    img: ASSETS.about.products.nanogold
  },
  {
    title: '黃金酒',
    desc: '將汽化食用金箔融入頂級酒液，展現極致奢華與獨特風味。',
    img: ASSETS.about.products.wine
  }
];

export default function About() {
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
            About GNT
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            關於京華堂
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
            京華堂 (GNT) 致力於導入儀器、高純度真空汽化貴金屬生醫材料工藝<br />
            以突破性的專利技術引領無創美容的新紀元<br />
            運用20年的實證經驗<br />
            帶來更安全、更有效、更科學的治療體驗。
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all"
            >
              {/* Background Image */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Semi-transparent White Overlay */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-white/80" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10">
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
