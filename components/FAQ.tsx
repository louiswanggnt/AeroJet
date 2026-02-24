'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [

 {
  q: "使用 AeroJet 療程會有痛感嗎？",
  a: "無痛無創。由於是氣體接觸，患者僅會感受到溫和的氣流與微震波按摩。"
 },
 {
  q: "療程後需要多久的恢復期？",
  a: "零恢復期。不產生開放性傷口，療程結束後進行保濕即可。"
 },
 {
  q: "建議的療程頻率為何？",
  a: "一般建議初期 每週一次，效果進入穩定後，每 2-3 個月進行一次保養。"
 },
 {
  q: "AeroJet 可以搭配哪些活性成分？",
  a: "極為廣泛。包含玻尿酸、生長因子、外泌體 、及各式液態化妝品。由於是物理性導入，不會破壞成分活性。只要是無沉澱物之溶液皆可作施打"
},
{
 q: "AeroJet 可以搭配哪些活性成分？",
 a: "極為廣泛。包含玻尿酸、生長因子、外泌體 、及各式液態化妝品。由於是物理性導入，不會破壞成分活性。只要是無沉澱物、並且分子量<80000 Da皆可作施打"
},
{
 q: "可否配合其他美容儀、導入儀使用？",
 a: "完全可以。AeroJet只將藥物做物理導入，不需擔心其他影響。"
},
{
 q: "要搭配的耗材？",
 a: "藥物安瓶、文式管、衛生頭蓋。為防止交叉感染，這些部件均建議使用後拋棄。"
},
{
 q: "一般美容師可使用嗎？",
 a: "AeroJet T6 是針對美容師設計的最新機種。我們延續T4世代 醫材的技術，將最高公益的規格，以最安全的手法推薦給您。"
}

];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3"
          >
            常見問題
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            解答您的疑惑
          </motion.h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'bg-white border-blue-200 shadow-md' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <button
                  className="w-full text-left px-6 py-6 font-semibold text-lg flex justify-between items-center focus:outline-none text-gray-900 group"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-50 font-light text-lg">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
