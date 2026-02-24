'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const cases = [
  {
    id: 1,
    problem: '嚴重頸紋與皮膚鬆弛',
    age: '45歲',
    sessions: '3次',
    beforeImg: 'https://picsum.photos/seed/before1/600/400',
    afterImg: 'https://picsum.photos/seed/after1/600/400',
  },
  {
    id: 2,
    problem: '深層痘疤與毛孔粗大',
    age: '28歲',
    sessions: '5次',
    beforeImg: 'https://picsum.photos/seed/before2/600/400',
    afterImg: 'https://picsum.photos/seed/after2/600/400',
  },
  {
    id: 3,
    problem: '眼周細紋與暗沉',
    age: '35歲',
    sessions: '2次',
    beforeImg: 'https://picsum.photos/seed/before3/600/400',
    afterImg: 'https://picsum.photos/seed/after3/600/400',
  },
  {
    id: 4,
    problem: '臉頰凹陷與膠原蛋白流失',
    age: '52歲',
    sessions: '4次',
    beforeImg: 'https://picsum.photos/seed/before4/600/400',
    afterImg: 'https://picsum.photos/seed/after4/600/400',
  },
  {
    id: 5,
    problem: '產後妊娠紋',
    age: '32歲',
    sessions: '6次',
    beforeImg: 'https://picsum.photos/seed/before5/600/400',
    afterImg: 'https://picsum.photos/seed/after5/600/400',
  },
  {
    id: 6,
    problem: '頭皮毛囊萎縮與落髮',
    age: '40歲',
    sessions: '8次',
    beforeImg: 'https://picsum.photos/seed/before6/600/400',
    afterImg: 'https://picsum.photos/seed/after6/600/400',
  },
  {
    id: 7,
    problem: '手背肌膚老化與斑點',
    age: '60歲',
    sessions: '3次',
    beforeImg: 'https://picsum.photos/seed/before7/600/400',
    afterImg: 'https://picsum.photos/seed/after7/600/400',
  }
];

export default function Treatment() {
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
            Clinical Cases
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            臨床實例與成果
          </motion.h3>
        </div>

        <div className="flex flex-col space-y-12">
          {cases.map((item, idx) => (
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
                    src={item.beforeImg}
                    alt="Before Treatment"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                    Before
                  </div>
                </div>
                <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto sm:h-64 md:h-auto">
                  <Image
                    src={item.afterImg}
                    alt="After Treatment"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                    After
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
                    <span className="text-gray-500 text-sm">患者年齡</span>
                    <span className="font-semibold text-gray-800">{item.age}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500 text-sm">治療次數</span>
                    <span className="font-semibold text-gray-800">{item.sessions}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
