import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInfo from '@/components/ContactInfo';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <div className="pt-20">
        <ContactInfo />
      </div>
      <Footer />
    </main>
  );
}
