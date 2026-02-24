'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const products = [
  {
    title: '美容藥物導入儀',
    desc: '結合流體力學與精密工程，提供無創、無痛的高效活性成分導入解決方案。',
    img: 'https://picsum.photos/seed/product1/800/600'
  },
  {
    title: '奈米金屬(奈米金、奈米銀)工藝',
    desc: '專研奈米金等貴金屬材料，應用於生醫感測與藥物載體，提升生物相容性。',
    img: 'https://picsum.photos/seed/product2/800/600'
  },
  {
    title: '金箔酒',
    desc: '將高純度食用級金箔融入頂級酒液，展現極致奢華與獨特風味。',
    img: 'https://picsum.photos/seed/product3/800/600'
  },
  {
    title: '黃金中藥材',
    desc: '結合傳統中醫藥理與現代奈米金科技，提升藥材活性與吸收率。',
    img: 'https://picsum.photos/seed/product4/800/600'
  },
  {
    title: '保養品開發',
    desc: '開發專屬活性成分配方，包含高濃度玻尿酸與外泌體，將保養效果推向極致。',
    img: 'https://picsum.photos/seed/product5/800/600'
  },
  {
    title: '醫材(氣動床、導入儀)',
    desc: '自主研發高階醫療設備，取得多國專利與認證，確保臨床使用的安全性。',
    img: 'https://picsum.photos/seed/product6/800/600'
  }
];

export default function About() {
  return (
    <section id="GNT" className="py-24 px-6 relative overflow-hidden min-h-[800px] flex items-center">
      {/* Background Image for the whole section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/company/1920/1080"
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
            京華堂 (GNT) 致力於導入儀器、奈米科技與最高規格金屬工藝<br />
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
