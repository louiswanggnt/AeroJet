'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

import { ASSETS } from '@/config/assets';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-md">
            <Image
              src={ASSETS.logo}
              alt="GNT Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-2xl font-bold tracking-tight">
              <span className="text-blue-600">京華堂</span>
              <span className="text-gray-300 font-light mx-3">|</span>
              <span className="text-blue-600">AeroJet</span>
            </div>
            <span className="text-[10px] text-black-300 font-bold tracking-widest leading-none -mt-1">肌因槍</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/technology" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">技術原理</Link>
          <Link href="/treatment" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">臨床實例</Link>
          <Link href="/evolution" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">發展</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">關於我們</Link>
          
          <div className="flex items-center space-x-2 text-gray-500 bg-gray-50/50 px-3 py-1.5 rounded-full border border-gray-100">
            <Globe className="w-4 h-4" />
            <select 
              className="bg-transparent border-none text-sm focus:ring-0 cursor-pointer outline-none font-medium text-gray-600"
              onChange={(e) => console.log('Language changed to:', e.target.value)}
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            聯絡業務專員
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-600 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 flex flex-col space-y-4 border-t border-gray-100"
          >
            <Link href="/technology" className="text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>技術原理</Link>
            <Link href="/treatment" className="text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>臨床實例</Link>
            <Link href="/evolution" className="text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>發展</Link>
            <Link href="/about" className="text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>關於我們</Link>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <Globe className="w-5 h-5" />
                <select 
                  className="bg-transparent border-none text-base focus:ring-0 cursor-pointer outline-none font-medium text-gray-600 w-full"
                  onChange={(e) => console.log('Language changed to:', e.target.value)}
                >
                  <option value="zh-TW">繁體中文</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md">
                聯絡業務專員
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
