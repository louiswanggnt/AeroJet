import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Tech from '@/components/Tech';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <Hero />
      <Tech />
      <FAQ />
      <Footer />
    </main>
  );
}
