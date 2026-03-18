'use client';

import { motion } from 'motion/react';
import { Building2, MapPin, Phone, FileBadge2, Printer, Mail, Clock3, QrCode } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ContactDetail = {
  label: string;
  value: string;
};

const iconByKey = {
  company: Building2,
  address: MapPin,
  phone: Phone,
  taxId: FileBadge2,
  fax: Printer,
  email: Mail,
  hours: Clock3,
} as const;

const detailOrder = ['company', 'address', 'phone', 'taxId', 'fax', 'email', 'hours'] as const;

export default function ContactInfo() {
  const t = useTranslations('contact');
  const details: Record<string, ContactDetail> = t.raw('details');

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3"
          >
            {t('subtitle')}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {t('title')}
          </motion.h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8"
          >
            <h4 className="text-2xl font-bold text-gray-900 mb-6">{t('companyInfoTitle')}</h4>
            <div className="space-y-5">
              {detailOrder.map((key) => {
                const Icon = iconByKey[key];
                const detail = details[key];
                return (
                  <div key={key} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{detail.label}</p>
                      <p className="text-gray-800 whitespace-pre-line">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col"
          >
            <h4 className="text-2xl font-bold text-gray-900 mb-6">{t('lineSupportTitle')}</h4>
            <div className="flex-1 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center p-8 min-h-[320px]">
              <QrCode className="w-16 h-16 text-slate-400 mb-4" />
              <p className="font-semibold text-gray-700 mb-2">{t('qrPlaceholderTitle')}</p>
              <p className="text-sm text-gray-500 text-center whitespace-pre-line">{t('qrPlaceholderDesc')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
