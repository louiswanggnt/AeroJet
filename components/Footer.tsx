'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('common');

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[100%] rounded-full bg-blue-900/20 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight leading-tight">
          {t('ctaTitle')}<br className="hidden md:block" />
          <span className="text-blue-400">{t('ctaHighlight')}</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          {t('ctaDesc')}
        </p>
        
        <Link href="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center mx-auto group mb-24">
          {t('ctaBtn')}
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-6 md:mb-0 flex items-center">
            <span className="text-2xl font-bold text-white tracking-tight mr-2">{tc('brandName')}</span>
            <span className="text-gray-400 font-light text-xl">| {tc('productName')}</span>
          </div>
          <p className="mb-6 md:mb-0">{t('copyright')}</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
