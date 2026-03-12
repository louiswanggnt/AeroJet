'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ASSETS } from '@/config/assets';

const cases = [
  {
    id: 1,
    problem: '靜態紋',
    age: '45歲',
    sessions: '5次',
    duration: '50min',
    startTime: '2023/10/01',
    endTime: '2023/12/15',
    beforeImg: ASSETS.treatment.case1.before,
    afterImg: ASSETS.treatment.case1.after,
  },
  {
    id: 2,
    problem: '暗瘡(痘痘)',
    age: '28歲',
    sessions: '3次',
    duration: '50min',
    startTime: '2023/08/12',
    endTime: '2023/10/20',
    beforeImg: ASSETS.treatment.case2.before,
    afterImg: ASSETS.treatment.case2.after,
  },
  {
    id: 3,
    problem: '代謝斑(曬斑)',
    age: '35歲',
    sessions: '5次',
    duration: '50min',
    startTime: '2023/09/05',
    endTime: '2023/11/10',
    beforeImg: ASSETS.treatment.case3.before,
    afterImg: ASSETS.treatment.case3.after,
  },
  {
    id: 4,
    problem: '臉頰凹陷與膠原蛋白流失',
    age: '52歲',
    sessions: '4次',
    duration: '45min',
    startTime: '2023/07/20',
    endTime: '2023/10/05',
    beforeImg: ASSETS.treatment.case4.before,
    afterImg: ASSETS.treatment.case4.after,
  },
  {
    id: 5,
    problem: '脂肪瘤',
    age: '32歲',
    sessions: '6次',
    duration: '60min',
    startTime: '2023/06/15',
    endTime: '2023/11/30',
    beforeImg: ASSETS.treatment.case5.before,
    afterImg: ASSETS.treatment.case5.after,
  },
  {
    id: 6,
    problem: '頭皮毛囊萎縮與落髮',
    age: '40歲',
    sessions: '8次',
    duration: '40min',
    startTime: '2023/05/10',
    endTime: '2024/01/15',
    beforeImg: ASSETS.treatment.case6.before,
    afterImg: ASSETS.treatment.case6.after,
  },
  {
    id: 7,
    problem: '眼袋',
    age: '60歲',
    sessions: '3次',
    duration: '45min',
    startTime: '2023/11/01',
    endTime: '2024/02/10',
    beforeImg: ASSETS.treatment.case7.before,
    afterImg: ASSETS.treatment.case7.after,
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
             
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            案例
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
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                    {item.startTime}
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
                    <span className="text-gray-500 text-sm">患者年齡</span>
                    <span className="font-semibold text-gray-800">{item.age}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-red-500 text-sm font-bold">課程 次數</span>
                    <span className="font-semibold text-red-500">{item.sessions}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-red-500 text-sm font-bold">每次時間</span>
                    <span className="font-semibold text-red-500">{item.duration}</span>
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
