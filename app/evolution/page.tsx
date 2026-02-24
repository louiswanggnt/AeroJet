import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EvolutionTimeline from '@/components/EvolutionTimeline';

export default function EvolutionPage() {
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
