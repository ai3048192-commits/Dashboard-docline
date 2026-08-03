import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  User, 
  Sparkles, 
  Quote, 
  Trash2, 
  Check, 
  X, 
  MessageCircle, 
  Ban, 
  SlidersHorizontal,
  Code2
} from 'lucide-react';

// التقييمات المعروضة للمستخدمين في الموقع
const initialApprovedReviews = [
  { id: 1, name: "د. خالد السعيد", phone: "+201000000001", comment: "تجربة علاجية استثنائية، احترافية عالية وأجهزة متطورة جداً.", rating: 5 },
  { id: 2, name: "منى عبدالله", phone: "+201000000002", comment: "أفضل دكتور تعاملت معه، اهتمام بالتفاصيل وراحة نفسية كبيرة.", rating: 5 },
  { id: 3, name: "ياسر إبراهيم", phone: "+201000000003", comment: "مستوى الرعاية الطبية فاق توقعاتي، شكراً لكم على كل شيء.", rating: 4 },
  { id: 4, name: "سارة محمود", phone: "+201000000004", comment: "تشخيص دقيق جداً وخطة علاجية واضحة من اليوم الأول.", rating: 5 },
];

// التقييمات المعلقة بانتظار المراجعة (قائمة الإدارة)
const initialPendingReviews = [
  { id: 101, name: "محمود حسن", phone: "+201011111111", comment: "أرغب في الاستفسار عن المواعيد المتاحة بشكل أسرع.", rating: 4 },
];

export default function ReviewsPortfolioThemeSection() {
  const [reviews, setReviews] = useState(initialApprovedReviews);
  const [pendingReviews, setPendingReviews] = useState(initialPendingReviews);
  const [blockedPhones, setBlockedPhones] = useState(new Set()); // أرقام الهواتف المحظورة

  // حالات لوحة التحكم للإشراف
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // الموافقة على التعليق وانتقاله للظهور في الموقع
  const handleApprove = (id: number) => {
    const itemToApprove = pendingReviews.find(r => r.id === id);
    if (!itemToApprove) return;

    setPendingReviews(pendingReviews.filter(r => r.id !== id));
    setReviews([itemToApprove, ...reviews]);
  };

  // رفض أو حذف التعليق
  const handleReject = (id: number, isPending: boolean) => {
    if (isPending) {
      setPendingReviews(pendingReviews.filter(r => r.id !== id));
    } else {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  // التواصل عبر واتساب
  const handleWhatsApp = (phoneNum: string, clientName: string) => {
    if (!phoneNum || phoneNum === 'غير محدد') {
      alert('رقم الهاتف غير متوفر لهذا التعليق.');
      return;
    }
    const cleanPhone = phoneNum.replace(/[^0-9]/g, '');
    const message = `مرحباً ${clientName}، بخصوص تعليقك في الموقع الطبي...`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // حظر المستخدم عبر رقم هاتفه
  const handleBlock = (phoneNum: string, id: number, isPending: boolean) => {
    if (!phoneNum || phoneNum === 'غير محدد') {
      alert('لا يمكن حظر هذا المستخدم لعدم توفر رقم هاتف مسجل.');
      return;
    }
    setBlockedPhones(new Set(blockedPhones).add(phoneNum.trim()));
    handleReject(id, isPending);
  };

  return (
    <section className="relative  text-white overflow-hidden" dir="rtl">
      
      {/* إضاءات خلفية ناعمة منسجمة مع ستايل العيادة */}
      <div className="absolute top-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-9xl mx-auto relative z-10 space-y-8">
        
        {/* عنوان رئيسي للقسم بنفس ستايل العيادة */}
        <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
                <Code2 size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-wide">
                  سجلات وآراء المرضى المميزة // رعاية طبية خاصة متكاملة
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                  لوحة التحكم لإدارة وعرض آراء وتجارب المرضى بشكل منفصل ومنظم يعكس تفاصيل العيادة بالكامل.
                </p>
              </div>
            </div>

            {/* زر فتح لوحة الإدارة */}
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              <span>{showAdminPanel ? "إخفاء لوحة الإدارة" : "فتح لوحة الإدارة"}</span>
              <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                {pendingReviews.length}
              </span>
            </button>
          </div>
        </div>

        {/* لوحة التحكم للإشراف (تظهر وتختفي) */}
        <AnimatePresence>
          {showAdminPanel && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-4"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-rose-500" />
              
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  التعليقات المعلقة بانتظار الموافقة ({pendingReviews.length})
                </h2>
                {blockedPhones.size > 0 && (
                  <span className="text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                    الأرقام المحظورة: {blockedPhones.size} أرقام
                  </span>
                )}
              </div>

              {pendingReviews.length === 0 ? (
                <div className="p-8 bg-black/40 border border-white/5 rounded-2xl text-center text-zinc-500 text-xs font-mono">
                  لا توجد تعليقات معلقة بانتظار المراجعة حالياً.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingReviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-black/50 border border-white/10 rounded-2xl flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-xs">{rev.name}</span>
                          <span className="text-[11px] text-zinc-400 font-mono" dir="ltr">{rev.phone}</span>
                        </div>
                        <p className="text-xs text-zinc-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">"{rev.comment}"</p>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/10">
                        <button
                          onClick={() => handleApprove(rev.id)}
                          className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Check size={13} /> قبول ونشر
                        </button>
                        <button
                          onClick={() => handleWhatsApp(rev.phone, rev.name)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <MessageCircle size={13} /> واتساب
                        </button>
                        <button
                          onClick={() => handleBlock(rev.phone, rev.id, true)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Ban size={13} /> حظر
                        </button>
                        <button
                          onClick={() => handleReject(rev.id, true)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-zinc-300 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <X size={13} /> رفض
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* رأس قسم الآراء */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-6">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-xs font-mono tracking-widest shadow-sm">
            <Sparkles size={14} />
            <span>PATIENT REVIEWS & FEEDBACK</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            آراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">مرضانا</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">نعتز بثقتكم ونعمل دائماً لنكون عند حسن ظنكم في تقديم أعلى معايير الرعاية.</p>
        </div>

        {/* شبكة عرض التقييمات المعتمدة بتصميم بطاقات العيادة الفاخرة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 p-6 rounded-[2.5rem] shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-5 left-5 text-cyan-500/10 w-10 h-10 transform -scale-x-100" />
              
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "text-amber-400" : "text-zinc-600"} />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">"{rev.comment}"</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 mt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs">{rev.name}</h3>
                    <span className="text-[10px] text-cyan-400 font-semibold">مريض موثق</span>
                  </div>
                </div>

                {/* خيارات الإدارة السريعة للتعليق المنشور (تظهر عند مرور الماوس) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <button
                    onClick={() => handleWhatsApp(rev.phone, rev.name)}
                    className="p-1.5 text-purple-400 hover:bg-purple-500/20 rounded-xl transition-colors cursor-pointer"
                    title="مراسلة واتساب"
                  >
                    <MessageCircle size={15} />
                  </button>
                  <button
                    onClick={() => handleBlock(rev.phone, rev.id, false)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-colors cursor-pointer"
                    title="حظر المستخدم وحذف التعليق"
                  >
                    <Ban size={15} />
                  </button>
                  <button
                    onClick={() => handleReject(rev.id, false)}
                    className="p-1.5 text-zinc-400 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                    title="حذف التعليق"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}