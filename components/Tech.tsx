'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Zap, Wind } from 'lucide-react';

const features = [
  {
    title: "超音速導入",
    desc: "405m/s 極速氣流，瞬間穿透角質層屏障，將活性成分送達真皮層。",
    stat: "405 m/s"
  },
  {
    title: "微米級霧化",
    desc: "專利霧化技術將精華液轉化為微米級液滴，確保吸收均勻且深層。",
    stat: "Micron Level"
  },
  {
    title: "專利脈衝技術",
    desc: "精準控制噴射頻率，在導入的同時提供溫和的氣動按摩效果。",
    stat: "Patented Pulse"
  }
];

export default function Tech() {
  const icons = [ShieldCheck, Zap, Wind];

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
            技術核心
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            為什麼選擇 AeroJet？
          </motion.h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
                className="group p-8 rounded-3xl bg-white hover:bg-blue-50/30 border border-slate-100 hover:border-blue-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">{feature.title}</h4>
                <p className="text-gray-600 mb-8 leading-relaxed font-light">
                  {feature.desc}
                </p>
                <div className="inline-flex items-center px-4 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-gray-800 border border-slate-100 w-full group-hover:bg-white transition-colors">
                  {feature.stat}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
