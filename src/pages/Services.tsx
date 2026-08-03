import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Clock,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Activity,
  PhoneCall,
  ClipboardList,
  Star,
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react";

export default function ServicesManagement() {
  const [items, setItems] = useState([
    {
      id: "appointments-1",
      title: "جدولة المواعيد الذكية",
      category: "المواعيد والتنبيهات",
      iconType: "Calendar",
      desc: "تنظيم دقيق لأوقات الحجوزات اليومية والأسبوعية مع منع التداخل وإدارة أوقات الاستراحة بكفاءة.",
      tag: "تنظيم مرن",
      highlight: "بدون انتظار",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      stats: "إدارة 100+ موعد أسبوعياً",
    },
    {
      id: "patients-1",
      title: "السجل الطبي الشامل للمريض",
      category: "السجلات والخصوصية",
      iconType: "FileText",
      desc: "أرشيف رقمي خاص لكل مريض يضم التاريخ المرضي، الفحوصات السابقة، والتشخيصات السكلانية بدقة.",
      tag: "ملف موحد",
      highlight: "وصول فوري",
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      stats: "أرشيف سحابي آمن",
    },
    {
      id: "consultation-1",
      title: "متابعة استشارية فردية ومباشرة",
      category: "المتابعة والاستشارات",
      iconType: "Stethoscope",
      desc: "خط زمني متصل يضمن متابعة المريض مع طبيبه الخاص مباشرة من أول زيارة وحتى تمام الشفاء.",
      tag: "رعاية شخصية",
      highlight: "طبيبك الخاص",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      stats: "متابعة حالة مستمرة",
    }
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [iconType, setIconType] = useState("Calendar");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [highlight, setHighlight] = useState("");
  const [badgeColor, setBadgeColor] = useState("bg-cyan-500/10 text-cyan-300 border-cyan-500/20");
  const [stats, setStats] = useState("");
  const [editId, setEditId] = useState(null);

  // استخراج قائمة الفئات الفريدة المتاحة في السجلات لإظهارها في الخيارات
  const defaultCategories = [
    "المواعيد والتنبيهات",
    "السجلات والخصوصية",
    "المتابعة والاستشارات",
    "الروشتات والفحوصات",
    "المالية والتقارير"
  ];

  const allCategories = Array.from(
    new Set([...defaultCategories, ...items.map(item => item.category)])
  );

  const renderIcon = (type) => {
    switch (type) {
      case "Calendar": return <Calendar size={24} />;
      case "FileText": return <FileText size={24} />;
      case "Stethoscope": return <Stethoscope size={24} />;
      case "HeartPulse": return <HeartPulse size={24} />;
      case "CreditCard": return <CreditCard size={24} />;
      case "Bell": return <Bell size={24} />;
      case "Clock": return <Clock size={24} />;
      case "UserCheck": return <UserCheck size={24} />;
      case "Activity": return <Activity size={24} />;
      case "ClipboardList": return <ClipboardList size={24} />;
      case "PhoneCall": return <PhoneCall size={24} />;
      case "Star": return <Star size={24} />;
      default: return <Calendar size={24} />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    // تحديد الفئة النهائية (سواء من القائمة أو المكتوبة يدوياً)
    const finalCategory = category === "custom" ? customCategory.trim() : category;
    if (!finalCategory) return;

    const newItem = {
      id: editId !== null ? editId : Date.now().toString(),
      title,
      category: finalCategory,
      iconType,
      desc,
      tag: tag || "خدمة مميزة",
      highlight: highlight || "معتمد",
      badgeColor,
      stats: stats || "إدارة متكاملة",
    };

    if (editId !== null) {
      setItems(items.map((item) => (item.id === editId ? newItem : item)));
      setEditId(null);
    } else {
      setItems([newItem, ...items]);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setIconType("Calendar");
    setDesc("");
    setTag("");
    setHighlight("");
    setBadgeColor("bg-cyan-500/10 text-cyan-300 border-cyan-500/20");
    setStats("");
    setEditId(null);
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    
    // التحقق مما إذا كانت الفئة موجودة في القائمة المتاحة أم جديدة يدوية
    if (defaultCategories.includes(item.category) || allCategories.includes(item.category)) {
      setCategory(item.category);
      setCustomCategory("");
    } else {
      setCategory("custom");
      setCustomCategory(item.category);
    }

    setIconType(item.iconType || "Calendar");
    setDesc(item.desc);
    setTag(item.tag);
    setHighlight(item.highlight);
    setBadgeColor(item.badgeColor);
    setStats(item.stats);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (editId === id) resetForm();
  };

  return (
    <div
      dir="rtl"
      className="bg-[#050510] min-h-screen text-white  selection:bg-cyan-500 selection:text-black relative overflow-hidden"
    >
      {/* تأثيرات الإضاءة الخلفية الداكنة */}
      <div className="absolute top-12 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-32 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* عنوان لوحة التحكم */}
      <div className="max-w-9xl mx-auto mb-10 bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
            لوحة تحكم وإدارة الخدمات الطبية
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400">
          إضافة، تعديل، وحذف الخدمات مع إمكانية كتابة فئة جديدة يدوياً لتظهر فوراً في السجلات ببطاقات منفصلة ومتناسقة.
        </p>
      </div>

      <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* نموذج الإدخال والتعديل (Form) */}
        <div className="lg:col-span-5 bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl h-fit relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500" />
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Plus size={18} className="text-cyan-400" />
              {editId !== null ? "تعديل بيانات الخدمة" : "إضافة خدمة جديدة"}
            </h2>
            {editId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                إلغاء التعديل
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">عنوان الخدمة *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: جدولة المواعيد الذكية"
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">الفئة (Category)</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value !== "custom") setCustomCategory("");
                  }}
                  className="w-full px-3 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="" disabled className="bg-zinc-900">اختر الفئة...</option>
                  {allCategories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-zinc-900">{cat}</option>
                  ))}
                  <option value="custom" className="bg-zinc-900 text-cyan-400 font-bold">+ كتابة فئة جديدة...</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">أيقونة الخدمة</label>
                <select
                  value={iconType}
                  onChange={(e) => setIconType(e.target.value)}
                  className="w-full px-3 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Calendar" className="bg-zinc-900">تقويم</option>
                  <option value="FileText" className="bg-zinc-900">ملف</option>
                  <option value="Stethoscope" className="bg-zinc-900">سماعة طبية</option>
                  <option value="HeartPulse" className="bg-zinc-900">نبض قلب</option>
                  <option value="CreditCard" className="bg-zinc-900">بطاقة دفع</option>
                  <option value="Bell" className="bg-zinc-900">جرس تنبيه</option>
                  <option value="Clock" className="bg-zinc-900">ساعة</option>
                  <option value="UserCheck" className="bg-zinc-900">مستخدم</option>
                  <option value="Activity" className="bg-zinc-900">نشاط</option>
                  <option value="ClipboardList" className="bg-zinc-900">قائمة</option>
                  <option value="PhoneCall" className="bg-zinc-900">اتصال</option>
                  <option value="Star" className="bg-zinc-900">تقييم</option>
                </select>
              </div>
            </div>

            {/* حقل إضافي يظهر في حال اختيار كتابة فئة يدوية */}
            {category === "custom" && (
              <div>
                <label className="block font-semibold text-cyan-400 mb-1.5">اكتب اسم الفئة الجديدة يدوياً *</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="مثال: قسم الطوارئ والعناية"
                  className="w-full px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">وصف الخدمة *</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="اكتب تفاصيل الخدمة..."
                rows={3}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">التصنيف (Tag)</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="مثال: تنظيم مرن"
                  className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">الكلمة البارزة</label>
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  placeholder="مثال: بدون انتظار"
                  className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">الإحصائيات</label>
                <input
                  type="text"
                  value={stats}
                  onChange={(e) => setStats(e.target.value)}
                  placeholder="مثال: 100+ موعد"
                  className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1.5">لون الشارة</label>
                <select
                  value={badgeColor}
                  onChange={(e) => setBadgeColor(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white cursor-pointer"
                >
                  <option value="bg-cyan-500/10 text-cyan-300 border-cyan-500/20" className="bg-zinc-900">سيان مضيء</option>
                  <option value="bg-blue-500/10 text-blue-300 border-blue-500/20" className="bg-zinc-900">أزرق عميق</option>
                  <option value="bg-purple-500/10 text-purple-300 border-purple-500/20" className="bg-zinc-900">بنفسجي فاخر</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 px-4 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                editId !== null
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
              }`}
            >
              <Plus size={16} />
              <span>{editId !== null ? "حفظ التعديلات" : "إضافة الخدمة للسجلات"}</span>
            </button>
          </form>
        </div>

        {/* عرض السجلات بشكل منفصل ومنظم (Cards) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500" />
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ClipboardList size={18} className="text-cyan-400" />
                سجلات الخدمات المسجلة ({items.length})
              </h2>
              <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                عرض منفصل ومنظم
              </span>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 text-zinc-500 space-y-3">
                <AlertCircle size={36} className="mx-auto opacity-40 text-cyan-400" />
                <p className="text-sm font-mono">لا توجد سجلات مضافة حالياً.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pl-2">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      className="bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 rounded-3xl p-5 shadow-xl space-y-4 hover:border-cyan-500/40 transition-all group relative"
                    >
                      {/* رأس السجل وأزرار التحكم */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            ID: #{item.id}
                          </span>
                          <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/25">
                            {item.category}
                          </span>
                          <span className={`text-[10px] px-3 py-1 rounded-full border font-bold ${item.badgeColor}`}>
                            {item.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Edit3 size={13} /> تعديل
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Trash2 size={13} /> حذف
                          </button>
                        </div>
                      </div>

                      {/* محتوى البطاقة */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center shrink-0">
                          {renderIcon(item.iconType)}
                        </div>
                        <div className="space-y-1 flex-1">
                          <h3 className="text-base font-extrabold text-white">
                            {item.title}
                          </h3>
                          <p className="text-xs text-zinc-300 leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* تفاصيل السجل السفلية */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs flex-wrap gap-2">
                        <span className="text-zinc-400 font-light flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item.stats}</span>
                        </span>
                        <span className="text-cyan-300 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 text-[11px]">
                          {item.highlight}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}