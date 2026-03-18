import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EvolutionTimeline from '@/components/EvolutionTimeline';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function EvolutionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <div className="pt-20">
        <EvolutionTimeline />
      </div>
      <Footer />
    </main>
  );
}
