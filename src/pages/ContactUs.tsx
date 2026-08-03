import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Trash2, 
  Ban, 
  MessageCircle, 
  ShieldAlert, 
  Users, 
  Sparkles,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface ClientMessage {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'active' | 'blocked';
  date: string;
}

export default function AdminDashboard() {
  // بيانات العملاء التي تصل من الموقع
  const [clientsList, setClientsList] = useState<ClientMessage[]>([
    {
      id: 1,
      name: 'أحمد محمود',
      phone: '01012345678',
      email: 'ahmed@example.com',
      message: 'أريد الاستفسار عن تفاصيل الحجز ومواعيد العيادة المتاحة هذا الأسبوع.',
      status: 'active',
      date: 'منذ 10 دقائق'
    },
    {
      id: 2,
      name: 'سارة خالد',
      phone: '01198765432',
      email: 'sara@example.com',
      message: 'هل توفرون استشارات طبية أونلاين عبر الإنترنت؟',
      status: 'active',
      date: 'منذ نصف ساعة'
    },
    {
      id: 3,
      name: 'محمد إبراهيم',
      phone: '01234567890',
      email: 'mohamed@example.com',
      message: 'شكراً جزيلاً على الخدمة الممتازة.',
      status: 'blocked',
      date: 'منذ ساعتين'
    }
  ]);

  // حذف الكارت
  const handleDelete = (id: number) => {
    setClientsList(prev => prev.filter(client => client.id !== id));
  };

  // حظر أو إلغاء حظر العميل
  const handleBlock = (id: number) => {
    setClientsList(prev => prev.map(client => {
      if (client.id === id) {
        return { ...client, status: client.status === 'active' ? 'blocked' : 'active' };
      }
      return client;
    }));
  };

  return (
    <div className="space-y-8  min-h-screentext-white 2" dir="rtl">
      
      {/* عنوان الصفحة الرئيسي مع التدرج اللوني الفاخر */}
      <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold w-fit">
              <Users size={14} />
              <span>لوحة التحكم الرئيسية للعملاء</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              إدارة طلبات ورسائل العملاء // تواصل مباشر
            </h1>
            <p className="text-sm text-zinc-400">
              متابعة كروت العملاء الواردة من الموقع، مع إمكانية التواصل عبر واتساب، الحظر، أو الحذف الفوري.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl shadow-inner w-fit">
            <span className="text-xs text-zinc-400">إجمالي الكروت النشطة:</span>
            <span className="text-cyan-400 font-extrabold text-lg">{clientsList.length}</span>
          </div>
        </div>
      </div>

      {/* قسم عرض الكروت */}
      <div className="bg-[#050510]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500" />
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <span>كروت العملاء المسجلة</span>
          </h2>
          <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            تحديث فوري للبيانات
          </span>
        </div>

        {clientsList.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.02] border border-white/10 rounded-[2rem] space-y-4 backdrop-blur-xl">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-zinc-500">
              <ShieldAlert size={28} className="text-cyan-400" />
            </div>
            <p className="text-zinc-400 text-sm font-mono">لا توجد أي رسائل أو كروت حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientsList.map((client) => (
              <div 
                key={client.id} 
                className={`bg-gradient-to-b from-white/[0.04] to-black/40 backdrop-blur-xl border rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between space-y-5 transition-all duration-300 relative overflow-hidden group ${
                  client.status === 'blocked' ? 'border-red-500/30 opacity-60' : 'border-white/10 hover:border-cyan-500/40'
                }`}
              >
                {/* تأثير جمالي على الكارت */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                {/* رأس الكارت (اسم العميل والحالة) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-inner">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{client.name}</h3>
                      <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} className="text-cyan-400" /> {client.date}
                      </span>
                    </div>
                  </div>
                  {client.status === 'blocked' ? (
                    <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-bold">محظور</span>
                  ) : (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 size={10} /> نشط
                    </span>
                  )}
                </div>

                {/* تفاصيل بيانات العميل داخل الكارت */}
                <div className="space-y-3 text-xs text-zinc-300 relative z-10">
                  <div className="flex items-center gap-2.5 bg-black/50 p-3 rounded-2xl border border-white/5">
                    <Phone size={14} className="text-cyan-400 shrink-0" />
                    <span className="font-mono text-white">{client.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-black/50 p-3 rounded-2xl border border-white/5">
                    <Mail size={14} className="text-purple-400 shrink-0" />
                    <span className="truncate text-zinc-200">{client.email}</span>
                  </div>

                  <div className="flex items-start gap-2.5 bg-black/50 p-3.5 rounded-2xl border border-white/5">
                    <MessageSquare size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-zinc-200 leading-relaxed text-xs">{client.message}</p>
                  </div>
                </div>

                {/* أزرار التحكم بالأسفل (واتساب، حظر، حذف) */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 relative z-10">
                  {/* زر واتساب */}
                  <a 
                    href={`https://wa.me/${client.phone}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg"
                  >
                    <MessageCircle size={15} />
                    <span>واتساب</span>
                  </a>

                  {/* زر الحظر / إلغاء الحظر */}
                  <button 
                    type="button"
                    onClick={() => handleBlock(client.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      client.status === 'blocked' 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                        : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20'
                    }`}
                    title={client.status === 'blocked' ? "إلغاء الحظر" : "حظر العميل"}
                  >
                    <Ban size={16} />
                  </button>

                  {/* زر الحذف */}
                  <button 
                    type="button"
                    onClick={() => handleDelete(client.id)}
                    className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-all cursor-pointer"
                    title="حذف الكارت"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}