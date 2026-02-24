'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

const carouselImages = [
  { id: 'T3', src: 'https://picsum.photos/seed/t3-control/1200/600', label: 'T3 世代' },
  { id: 'T4', src: 'https://picsum.photos/seed/t4-control/1200/600', label: 'T4 世代' },
  { id: 'T5', src: 'https://picsum.photos/seed/t5-control/1200/600', label: 'T5 世代' },
  { id: 'T6', src: 'https://picsum.photos/seed/t6-control/1200/600', label: 'T6 世代' },
];

const timelineData = [
  {
    id: 'T3',
    year: '2005',
    gun: null, // T3 沒有槍體資料
    control: {
      specs: ['重量 60 kg', '落地型', '含空壓機', '每秒最多 2 發'],
      img: 'https://picsum.photos/seed/t3-control/400/300'
    }
  },
  {
    id: 'T4',
    year: '',
    gun: {
      title: '步進馬達推動給藥系統',
      issue: '缺：定量不精準(活塞阻力造成給藥劑量不穩定)',
      specs: ['藥物裝載系統(針筒)', 'type 1 加壓霧化器(拋棄式)', '步進馬達', '輸出液體 1 μL'],
      img: 'https://picsum.photos/seed/t4-gun/400/300'
    },
    control: {
      specs: ['重量 5 kg', '桌上型', '每秒最多 2 發'],
      img: 'https://picsum.photos/seed/t4-control/400/300'
    }
  },
  {
    id: 'T5',
    year: '',
    gun: {
      specs: ['藥物裝載系統(安瓶)', 'type 2 加壓霧化器(拋棄式)', '槍頭較T6小', '輸出液體 0.6 μL'],
      img: 'https://picsum.photos/seed/t5-gun/400/300'
    },
    control: {
      specs: ['重量 950 g', '手攜型', '給藥速度分三種燈號', '每秒最多 6 發'],
      img: 'https://picsum.photos/seed/t5-control/400/300'
    }
  },
  {
    id: 'T6',
    year: '2025',
    gun: {
      specs: ['藥物裝載系統(安瓶)', 'type 2 加壓霧化器(拋棄式)', '磁吸式槍頭(可拋棄式)', '輸出液體 0.1 μL'],
      img: 'https://picsum.photos/seed/t6-gun/400/300'
    },
    control: {
      specs: ['重量 760 g', '手攜型', '螢幕', '每秒最多 10 發'],
      img: 'https://picsum.photos/seed/t6-control/400/300'
    }
  }
];

export default function EvolutionTimeline() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3"
          >
            Evolution
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            AeroJet 世代演進
          </motion.h3>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              從 2005 年第一代落地型設備<br />
              到 2025 年第六代手攜型 AeroJet T6<br />
              我們不斷突破技術瓶頸<br />
              實現更精準、更輕便的無創導入。
            </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 mb-12 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={carouselImages[currentSlide].src}
                alt={carouselImages[currentSlide].label}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-bold text-2xl">{carouselImages[currentSlide].label}</h4>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Indicators */}
          <div className="absolute bottom-6 right-6 flex space-x-2 z-10">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">各世代規格對照</h3>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-blue-50 text-blue-800">
                  <th className="p-4 font-semibold border-b border-blue-100 w-1/5">規格參數</th>
                  <th className="p-4 font-semibold border-b border-blue-100">T3</th>
                  <th className="p-4 font-semibold border-b border-blue-100">T4</th>
                  <th className="p-4 font-semibold border-b border-blue-100">T5</th>
                  <th className="p-4 font-semibold border-b border-blue-100">T6</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-800">型態</td>
                  <td className="p-4 border-b border-gray-100">落地型 (含空壓機)</td>
                  <td className="p-4 border-b border-gray-100">桌上型</td>
                  <td className="p-4 border-b border-gray-100">手攜型</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-blue-600">手攜型 (具備螢幕)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-800">重量</td>
                  <td className="p-4 border-b border-gray-100">60 kg</td>
                  <td className="p-4 border-b border-gray-100">5 kg</td>
                  <td className="p-4 border-b border-gray-100">950 g</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-blue-600">760 g</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-800">給藥速度</td>
                  <td className="p-4 border-b border-gray-100">每秒 2 發</td>
                  <td className="p-4 border-b border-gray-100">每秒 2 發</td>
                  <td className="p-4 border-b border-gray-100">每秒 6 發</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-blue-600">每秒 10 發</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-800">藥物裝載</td>
                  <td className="p-4 border-b border-gray-100 text-gray-400">-</td>
                  <td className="p-4 border-b border-gray-100">針筒</td>
                  <td className="p-4 border-b border-gray-100">安瓶</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-blue-600">安瓶</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-800">霧化器</td>
                  <td className="p-4 border-b border-gray-100 text-gray-400">-</td>
                  <td className="p-4 border-b border-gray-100">Type 1 (拋棄式)</td>
                  <td className="p-4 border-b border-gray-100">Type 2 (拋棄式)</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-blue-600">Type 2 (拋棄式)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-800">槍頭設計</td>
                  <td className="p-4 border-b border-gray-100 text-gray-400">-</td>
                  <td className="p-4 border-b border-gray-100">一般</td>
                  <td className="p-4 border-b border-gray-100">較小</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-blue-600">磁吸式 (可拋棄式)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">單次輸出量</td>
                  <td className="p-4 text-gray-400">-</td>
                  <td className="p-4">1 μL</td>
                  <td className="p-4">0.6 μL</td>
                  <td className="p-4 font-semibold text-blue-600">0.1 μL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 mb-12 text-center font-bold text-xl text-gray-800 border-b-2 border-gray-200 pb-4">
          <div>槍體系統</div>
          <div className="w-20 text-blue-600">世代</div>
          <div>控制系統</div>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          {timelineData.map((item, index) => (
            <div key={item.id} className="relative mb-16 md:mb-24 last:mb-0">
              <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                
                {/* Left: Gun */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full md:text-right order-2 md:order-1"
                >
                  {item.gun ? (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-50">
                        <Image src={item.gun.img} alt={`${item.id} 槍體`} fill className="object-contain" referrerPolicy="no-referrer" />
                      </div>
                      {item.gun.title && <h4 className="font-bold text-blue-600 mb-2">{item.gun.title}</h4>}
                      {item.gun.issue && <p className="text-red-500 text-sm mb-3 font-medium">{item.gun.issue}</p>}
                      <ul className="text-gray-600 text-sm space-y-2 md:inline-block md:text-left">
                        {item.gun.specs.map((spec, i) => (
                          <li key={i} className="flex items-start md:justify-end">
                            <span className="mr-2 text-blue-400">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="hidden md:flex h-full items-center justify-end text-gray-400 italic">
                      （研發初期，無對應槍體資料）
                    </div>
                  )}
                </motion.div>

                {/* Center: Generation Node */}
                <div className="flex flex-col items-center order-1 md:order-2 z-10 relative">
                  {item.year && (
                    <div className="absolute -top-10 text-gray-400 font-bold text-lg">{item.year}</div>
                  )}
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-4 border-white">
                    {item.id}
                  </div>
                  {index !== timelineData.length - 1 && (
                    <div className="h-full min-h-[100px] md:min-h-[200px] w-1 bg-gradient-to-b from-blue-600 to-blue-200 my-4 flex items-center justify-center">
                      <ArrowDown className="text-blue-600 w-6 h-6 bg-slate-50 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Right: Control System */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full text-left order-3 md:order-3"
                >
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-50">
                      <Image src={item.control.img} alt={`${item.id} 控制系統`} fill className="object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <ul className="text-gray-600 text-sm space-y-2">
                      {item.control.specs.map((spec, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-blue-400">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
