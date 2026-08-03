import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  FileText,
  MessageCircle,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
  Phone,
  Clock,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { name: "لوحة التحكم", icon: LayoutDashboard, path: "/" },
  { name: " الحجوزات", icon: CalendarDays, path: "/appointments", badge: "جديد" },
  { name: "مواعيد العيادة", icon: Clock, path: "/clinic-times" },
  { name: "مجالات العمل", icon: Stethoscope, path: "/specialties" },
  { name: "الخدمات", icon: FileText, path: "/services" },
  { name: "من نحن", icon: Users, path: "/about" },
  { name: "لماذا تختارنا", icon: Sparkles, path: "/why-choose-us" },
  { name: "آراء مرضانا", icon: MessageCircle, path: "/testimonials" },
  { name: "تواصل معنا", icon: Phone, path: "/contact" },
{ name: "الإعدادات", icon: Settings, path: "/settings" }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* خلفية شفافة مع ضبابية خفيفة للموبايل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* تم زيادة العرض قليلاً إلى w-72 ليكون بحجم متوازن ومريح جداً للعين */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 bg-[#0c0a09]/95 backdrop-blur-2xl text-stone-300 z-50 border-l border-emerald-500/10 shadow-[ -25px_0_50px_rgba(0,0,0,0.8)] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* خط إضاءة زمردي رفيع وراقي في الأعلى */}
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

        <div className="h-full flex flex-col justify-between p-5">
          {/* الجزء العلوي والقائمة */}
          <div className="space-y-7 overflow-y-auto pr-1 scrollbar-none">
            
            {/* بطاقة تعريف الدكتور بتصميم متوازن */}
            <div className="flex justify-between items-center pb-5 border-b border-stone-800/80">
              <div className="flex items-center gap-3.5">
                <div className="relative p-3 bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-transparent rounded-2xl border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Sparkles className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-wide text-white">
                    د. طارق الحكيم
                  </h1>
                  <span className="text-[11px] text-emerald-400/90 font-medium tracking-wider block mt-0.5">
                    استشاري جراحة القلب
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="lg:hidden p-2 bg-stone-900 text-stone-400 hover:text-white rounded-xl border border-stone-800 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* عناصر القائمة بحجم مريح وواضح */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`group relative flex items-center justify-between px-3.5.5 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.06)]"
                        : "text-stone-400 hover:text-stone-100 hover:bg-stone-900/60 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                            : "bg-stone-900/80 text-stone-400 group-hover:text-emerald-400 group-hover:bg-stone-800"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="tracking-wide">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 relative z-10">
                        {item.badge}
                      </span>
                    )}

                    {/* خط الإضاءة الجانبي النشط */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-l-full shadow-[0_0_10px_#10b981]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* الجزء السفلي: حالة النظام وزر الخروج */}
          <div className="pt-4 mt-auto border-t border-stone-800/80 space-y-3">
            
            {/* بطاقة الحالة المدمجة */}
            <div className="p-3.5 rounded-2xl bg-stone-900/40 border border-stone-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <span className="text-xs font-semibold text-stone-200 block">النظام الطبي نشط</span>
                </div>
              </div>
              <ShieldCheck size={16} className="text-emerald-500/80" />
            </div>

            {/* زر تسجيل الخروج بحجم ومساحة مريحة */}
            <button
              onClick={handleLogout}
              className="group flex w-full items-center justify-center gap-2.5 p-3.5 text-rose-400 hover:text-white hover:bg-rose-500/15 rounded-2xl border border-rose-500/15 hover:border-rose-500/30 transition-all font-semibold text-sm shadow-[0_4px_15px_rgba(244,63,94,0.05)]"
            >
              <LogOut size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>تسجيل الخروج</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}