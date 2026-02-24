'use client';

import { motion } from 'motion/react';
import { FileText, Award, Droplets, Zap, Check, X } from 'lucide-react';
import Image from 'next/image';

const publications = [
  {
    title: 'High-velocity micro-particle delivery system for transdermal drug administration',
    journal: 'Journal of Controlled Release',
    year: '2022',
    authors: 'Chen Y. et al.'
  },
  {
    title: 'Efficacy of needle-free jet injection for hyaluronic acid delivery in skin rejuvenation',
    journal: 'Dermatologic Surgery',
    year: '2021',
    authors: 'Lin S. et al.'
  },
  {
    title: 'AeroJet: A novel approach to non-invasive exosome delivery',
    journal: 'Biomaterials Science',
    year: '2023',
    authors: 'Wang K. et al.'
  }
];

const patents = [
  {
    title: '無創藥物導入裝置與其控制方法',
    country: '台灣',
    number: 'I1234567',
    year: '2020'
  },
  {
    title: 'Needle-free injection system and method of use',
    country: '美國',
    number: 'US10987654B2',
    year: '2021'
  },
  {
    title: '霧化加壓給藥模組',
    country: '歐盟',
    number: 'EP3456789B1',
    year: '2022'
  }
];

export default function Technology() {
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
            Technology & Principles
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            技術原理
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
              <h4 className="text-2xl font-bold text-gray-900">為何需要藥物導入裝置？</h4>
            </div>
            <div className="space-y-6 text-gray-800 leading-relaxed text-lg font-medium">
              <p>
                人體皮膚的最外層「角質層」是天然的防禦屏障，能有效阻擋外界有害物質入侵，但同時也阻礙了保養品與藥物活性成分的吸收。傳統塗抹方式，僅有極少數（通常小於 1%）的活性成分能真正穿透角質層到達真皮層。
              </p>
              <p>
                為了解決這個問題，我們需要<strong>藥物導入裝置</strong>。透過物理性或化學性的輔助，暫時性地突破角質層屏障，將大分子活性成分（如玻尿酸、膠原蛋白、外泌體）直接送達肌膚深層，大幅提升吸收率與療效，同時避免傳統針筒注射帶來的疼痛與感染風險。
              </p>
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
              <h4 className="text-2xl font-bold text-gray-900">霧化保養品對經皮滲透的提高</h4>
            </div>
            <div className="space-y-6 text-gray-800 leading-relaxed text-lg font-medium">
              <p>
                AeroJet 採用獨家的高壓氣流技術，將液態保養品或藥物瞬間<strong>霧化為微米級別的微小液滴</strong>。
              </p>
              <p>
                當這些極細微的液滴以高達 405m/s 的超音速噴射至皮膚表面時，強大的動能會瞬間撐開角質層細胞間的脂質通道，形成微小的「液態針」。這些微米液滴的體積遠小於毛孔與細胞間隙，因此能輕易穿透表皮，均勻散佈於真皮層中。
              </p>
              <p>
                相較於傳統塗抹，霧化導入不僅將<strong>經皮滲透率提升數十倍</strong>，更因為其均勻分佈的特性，能讓活性成分在肌膚底層發揮最大效用，達到深層保濕、組織修復與膠原蛋白增生的卓越效果。
              </p>
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
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900">與其他市售商品的對照</h4>
          </div>
          
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="bg-slate-800 text-white p-4 md:p-6 font-bold text-center w-1/4 border-b border-r border-slate-700"></th>
                  <th className="bg-blue-900 text-white p-4 md:p-6 font-bold text-center text-lg md:text-xl w-3/8 border-b border-r border-slate-700">AeroJet T6</th>
                  <th className="bg-slate-700 text-white p-4 md:p-6 font-bold text-center text-lg md:text-xl w-3/8 border-b border-slate-700">他牌</th>
                </tr>
              </thead>
              <tbody className="text-center font-medium">
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">藥物速度</td>
                  <td className="bg-blue-100 text-gray-900 p-4 border-b border-r border-slate-300 font-bold">405 m/s</td>
                  <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">150~250 m/s</td>
                </tr>
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">品牌價值</td>
                  <td className="bg-blue-200 text-gray-900 p-4 border-b border-r border-slate-300">多國專利+國家認證<br/>20年以上專利維護</td>
                  <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">無</td>
                </tr>
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">發射模式</td>
                  <td className="bg-blue-100 text-gray-900 p-4 border-b border-r border-slate-300">脈衝式 (高效、按摩)<br/>連續式 (寧靜、舒適)</td>
                  <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">連續式</td>
                </tr>
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">安全性</td>
                  <td className="bg-blue-200 text-gray-900 p-4 border-b border-r border-slate-300">多項研究驗證</td>
                  <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">未確認</td>
                </tr>
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">體系</td>
                  <td className="bg-blue-100 text-gray-900 p-4 border-b border-r border-slate-300">培訓課程<br/>專案輔導創業</td>
                  <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">培訓</td>
                </tr>
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-b border-r border-slate-600 font-bold">行銷通路</td>
                  <td className="bg-blue-200 text-gray-900 p-4 border-b border-r border-slate-300">政府合作<br/>中日台企業聯手合作</td>
                  <td className="bg-slate-200 text-gray-700 p-4 border-b border-slate-300">網路行銷</td>
                </tr>
                <tr>
                  <td className="bg-slate-700 text-white p-4 border-r border-slate-600 font-bold">實際效果</td>
                  <td className="bg-blue-100 text-gray-900 p-4 border-r border-slate-300">中研院論文合作<br/>千例實證</td>
                  <td className="bg-slate-200 text-gray-700 p-4">少數案例<br/>實效不明</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Section 3: Publications & Patents */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-2xl font-bold text-gray-900">發表期刊</h4>
            </div>
            <div className="space-y-6">
              {publications.map((pub, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-gray-900 mb-2 leading-snug">{pub.title}</h5>
                  <p className="text-blue-600 text-sm font-medium mb-1">{pub.journal}</p>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>{pub.authors}</span>
                    <span>{pub.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Patents */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <Award className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-2xl font-bold text-gray-900">專利一覽</h4>
            </div>
            <div className="space-y-6">
              {patents.map((patent, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-gray-900 mb-2 leading-snug">{patent.title}</h5>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">
                      {patent.country}
                    </span>
                    <span className="text-blue-600 text-sm font-medium">{patent.number}</span>
                  </div>
                  <div className="text-gray-500 text-sm text-right">
                    {patent.year}
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
