import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Tech from '@/components/Tech';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
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
