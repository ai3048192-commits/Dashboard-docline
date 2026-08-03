import { Menu, User, Stethoscope } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="bg-[#050505]/90 backdrop-blur-xl px-6 py-3 flex items-center 
    justify-between sticky top-0 z-30 border-b 
    border-white/[0.06] lg:pr-72 transition-all">
      
      {/* زر القائمة للموبايل */}
      <button 
        onClick={onOpenSidebar} 
        className="lg:hidden p-2.5 bg-white/[0.03] text-teal-400 
        rounded-xl hover:bg-teal-500/10 transition-all border border-white/10"
      >
        <Menu size={20} />
      </button>

      {/* الشعار أو العنوان للموبايل */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <div className="p-2 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400">
          <Stethoscope size={18} />
        </div>
        <h1 className="text-sm font-bold text-white tracking-wide">لوحة تحكم الطبيب</h1>
      </div>

      {/* مؤشر حالة النظام الطبي في الديسكتوب */}
      <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 bg-[#08080c] border border-teal-500/20 rounded-full hover:border-teal-500/40 hover:bg-teal-500/[0.03] transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.03)] cursor-default">
        
        {/* مؤشر النبض الذكي */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-3.5 h-3.5 bg-teal-500/30 rounded-full animate-ping" />
          <div className="relative w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_8px_#14b8a6]" />
        </div>
        
        {/* النص بتنسيق أنيق */}
        <span className="text-[11px] font-bold text-slate-300 tracking-wide">
          نظام العيادة يعمل بكفاءة
        </span>

        {/* مؤشر جاهزية النظام */}
        <div className="flex items-center border-l border-white/10 pl-2 ml-1">
          <span className="text-[9px] font-mono font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">
            ONLINE
          </span>
        </div>

      </div>

      {/* الجانب الأيمن - معلومات الدكتور محمد بدارية */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3.5 pr-4 border-r border-white/[0.08]">
          
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white tracking-wide">د. محمد بدارية</p>
            <p className="text-[10px] text-teal-400 font-mono tracking-widest uppercase">
              Medical Consultant
            </p>
          </div>

          <div className="relative w-11 h-11 bg-[#0a0a0c] rounded-2xl p-[1.5px] border border-teal-500/30 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 rounded-[14px] flex items-center justify-center text-teal-400">
              <User size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}