import Header from '@/components/Header';
import Treatment from '@/components/Treatment';
import Footer from '@/components/Footer';

export default function TreatmentPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <div className="pt-20">
        <Treatment />
      </div>
      <Footer />
    </main>
  );
}
