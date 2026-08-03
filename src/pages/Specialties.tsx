import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function ServicesDashboard() {
  const [items, setItems] = useState([
    {
      code: "SPEC-01",
      title: "متابعة وتشخيص أمراض السكري",
      desc: "إدارة شاملة لمرض السكري من النوعين الأول والثاني، وتعديل الجرعات بدقة عبر الفحوصات الدورية.",
      tag: "الأكثر طلباً",
    },
    {
      code: "SPEC-02",
      title: "علاج وقياس ضغط الدم المزمن",
      desc: "برامج مخصصة لضبط ضغط الدم المرتفع ومنع المضاعفات القلبية والمرضية المبكرة.",
      tag: "رعاية وقائية",
    },
    {
      code: "SPEC-03",
      title: "أمراض الجهاز الهضمي والقولون",
      desc: "تشخيص وعلاج قرحة المعدة، التهابات القولون العصبي، ومشاكل عسر الهضم المزمن.",
      tag: "تشخيص رقمي",
    },
    {
      code: "SPEC-04",
      title: "أمراض الكبد والفيروسات",
      desc: "متابعة كفاءة وظائف الكبد، علاج الكبد الدهني، وفحوصات الأمراض الفيروسية ببروتوكولات حديثة.",
      tag: "عناية متقدمة",
    },
    {
      code: "SPEC-05",
      title: "أمراض الكلى والمسالك البولية",
      desc: "فحص وظائف الكلى الدورية، تقييم حالات الزلال والالتهابات المتكررة، وتنظيم السوائل.",
      tag: "توجيه طبي",
    },
    {
      code: "SPEC-06",
      title: "حالات فقر الدم (الأنيميا) وسوء التغذية",
      desc: "علاج كافة أنواع الأنيميا ونقص الفيتامينات الأساسية ببرامج غذائية ودوائية دقيقة.",
      tag: "استشارات تغذية",
    },
    {
      code: "SPEC-07",
      title: "أمراض الصدر والحساسية المزمنة",
      desc: "متابعة حالات الربو الشعبي، التهابات الشعب الهوائية، وضيق التنفس المزمن.",
      tag: "تنفس آمن",
    },
    {
      code: "SPEC-08",
      title: "أمراض الغدد الصماء والاضطرابات الهرمونية",
      desc: "تشخيص اضطرابات الغدة الدرقية، الغدة الجار درقية، والمشاكل الهرمونية العامة.",
      tag: "توازن هرموني",
    },
    {
      code: "SPEC-09",
      title: "الرعاية الوقائية والفحص الشامل",
      desc: "باقات متكاملة لفحص الجسم بالكامل واكتشاف الأمراض في مراحلها المبكرة للوقاية التامة.",
      tag: "فحص دوري",
    },
  ]);

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim() || !code.trim()) return;

    const newItem = {
      code: code.trim(),
      title: title.trim(),
      desc: desc.trim(),
      tag: tag.trim() || "خدمة طبية",
    };

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([newItem, ...items]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCode("");
    setTitle("");
    setDesc("");
    setTag("");
    setEditIndex(null);
  };

  const handleEdit = (item, index) => {
    setCode(item.code);
    setTitle(item.title);
    setDesc(item.desc);
    setTag(item.tag);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    if (editIndex === index) resetForm();
  };

  return (
    <div dir="rtl" className=" min-h-screen text-slate-100 ">
      {/* رأس الصفحة */}
      <div className="max-w-9xl mx-auto mb-10 bg-[#111827] border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            لوحة تحكم الخدمات السريرية
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          إدارة وتحديث مجالات الاختصاص الدقيق والخدمات المتاحة لتظهر مباشرة في
          الواجهة الرئيسية.
        </p>
      </div>

      <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* فورم الإضافة والتعديل */}
        <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-[2rem] p-6 shadow-2xl h-fit">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Plus size={16} className="text-indigo-400" />
              {editIndex !== null
                ? "تعديل الخدمة السريرية"
                : "إضافة خدمة جديدة"}
            </h2>
            {editIndex !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                إلغاء
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                كود الخدمة (Code) *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثال: SPEC-10"
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                عنوان الخدمة *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: أمراض القلب والأوعية الدموية"
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                تصنيف الخدمة (Tag)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="مثال: رعاية متقدمة"
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                وصف الخدمة *
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="اكتب تفاصيل الخدمة السريرية..."
                rows={3}
                className="w-full px-4 py-2.5 bg-[#1f2937] border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                editIndex !== null
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              <Plus size={16} />
              <span>
                {editIndex !== null ? "حفظ التعديلات" : "إضافة الخدمة للقائمة"}
              </span>
            </button>
          </form>
        </div>

        {/* عرض الكود المطلوب بتصميمه الأصلي مع تحكم الإدارة */}
        <div className="lg:col-span-8 space-y-6">
          <section className="space-y-8">
            {items.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-3 bg-[#111827] border border-slate-800 rounded-[2rem]">
                <AlertCircle
                  size={36}
                  className="mx-auto opacity-40 text-indigo-400"
                />
                <p className="text-sm">لا توجد خدمات مضافة حالياً.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <AnimatePresence>
                  {items.map((srv, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="p-6 rounded-[2rem] bg-[#111827] border border-slate-800 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl group hover:border-indigo-500/50 transition-all relative"
                    >
                      {/* أزرار التعديل والحذف السريعة للتحكم */}
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1f2937]/90 backdrop-blur-sm p-1 rounded-lg border border-slate-700 shadow-md">
                        <button
                          type="button"
                          onClick={() => handleEdit(srv, idx)}
                          className="p-1.5 text-amber-400 hover:bg-amber-500/10 rounded-md transition-colors cursor-pointer"
                          title="تعديل"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(idx)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center pr-16">
                        <span className="text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                          {srv.code}
                        </span>
                        <span className="text-[10px] text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
                          {srv.tag}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-indigo-400 shrink-0" />
                          <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                            {srv.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed pr-7">
                          {srv.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-indigo-400 font-medium">
                        <span>متوفر ضمن الخطة العلاجية</span>
                        <span>←</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
