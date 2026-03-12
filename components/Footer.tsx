import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[100%] rounded-full bg-blue-900/20 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight leading-tight">
          準備好引進AeroJet.T6<br className="hidden md:block" />
          <span className="text-blue-400">極致無創給藥技術</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          提升您的競爭力，為病患提供無痛、高效、零恢復期的革命性療程體驗。
        </p>
        
        <button className="bg-blue-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center mx-auto group mb-24">
          預約儀器展示
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-6 md:mb-0 flex items-center">
            <span className="text-2xl font-bold text-white tracking-tight mr-2">京華堂</span>
            <span className="text-gray-400 font-light text-xl">| AeroJet</span>
          </div>
          <p className="mb-6 md:mb-0">&copy; 2026 京華堂 Chyng Hwang. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">隱私權政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
