import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  );
}
