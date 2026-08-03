import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  Code2,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Upload,
  Layers,
} from "lucide-react";

export default function MethodologyManagement() {
  // حالة السجلات المخزنة محلياً
  const [items, setItems] = useState([
    {
      id: 1,
      title: "نهج تشخيصي تكاملي شامل",
      description: "نحن لا نكتفي بعلاج الأعراض الظاهرة فقط، بل نقوم بتحليل دقيق لنمط حياة المريض، تاريخه الصحي، وعوامل البيئة المحيطة للوصول إلى جذور المشكلة الطبية وضمان التعافي المستدام.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    }
  ]);
  
  // حقول النموذج (Form States)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  // دالة لتحويل الصورة المرفوعة محلياً إلى رابط معاينة (Base64) لكي تظهر فوراً
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // دالة حفظ أو تحديث السجل
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newItem = {
      id: editId !== null ? editId : Date.now(),
      title,
      description,
      image: image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    };

    if (editId !== null) {
      setItems(items.map((item) => (item.id === editId ? newItem : item)));
      setEditId(null);
    } else {
      setItems([newItem, ...items]);
    }

    resetForm();
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setEditId(null);
  };

  // تعبئة البيانات للتعديل
  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.image);
    setEditId(item.id);
  };

  // حذف سجل
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (editId === id) resetForm();
  };

  return (
    <div className="space-y-8 pb-12" dir="rtl">
      {/* عنوان الصفحة */}
      <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
            <Layers size={22} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            لماذا تختار منهجيتنا العلاجية؟ // لوحة التحكم والإدارة
          </h1>
        </div>
        <p className="text-sm text-zinc-400">
          إدارة العناوين، الأوصاف، ورفع الصور الخاصة بالمنهجية العلاجية مع معاينة فورية وعرض مرتب في السجلات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* نموذج الإدخال / التعديل */}
        <div className="lg:col-span-5 bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl h-fit relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500" />
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" />
              {editId !== null ? "تعديل محتوى السجل" : "إضافة ميزة جديدة للمنهجية"}
            </h2>
            {editId !== null && (
              <button type="button" onClick={resetForm} className="text-xs text-rose-400 hover:underline">
                إلغاء التعديل
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* العنوان */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">عنوان المنهجية *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: نهج تشخيصي تكاملي شامل..."
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            {/* الوصف */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">وصف المنهجية *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب تفاصيل المنهجية العلاجية هنا..."
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                required
              />
            </div>

            {/* رفع الصورة والمعاينة الفورية */}
            <div className="space-y-2 p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
              <label className="block font-semibold text-cyan-400 flex items-center gap-1.5">
                <ImageIcon size={16} /> تحميل صورة المنهجية
              </label>
              
              <div className="flex items-center gap-3">
                <label className="flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed border-white/10 hover:border-cyan-500 rounded-xl cursor-pointer bg-black/30 transition-all">
                  <Upload size={20} className="text-cyan-400 mb-1" />
                  <span className="text-xs text-zinc-300">اضغط لرفع صورة من جهازك</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              {/* معاينة الصورة المرفوعة فوراً */}
              {image && (
                <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-white/10">
                  <img src={image} alt="معاينة الصورة" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-cyan-300 text-[10px] px-2 py-0.5 rounded-md">
                    معاينة حية للصورة
                  </span>
                </div>
              )}
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
              <span>{editId !== null ? "حفظ التعديلات" : "إضافة السجل للنظام"}</span>
            </button>
          </form>
        </div>

        {/* عرض السجلات بشكل منفصل ومنظم (Cards) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500" />
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-cyan-400" />
                سجلات المنهجية العلاجية ({items.length})
              </h2>
              <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                بطاقات منفصلة مع الصور
              </span>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 text-zinc-500 space-y-3">
                <AlertCircle size={36} className="mx-auto opacity-40 text-cyan-400" />
                <p className="text-sm font-mono">لا توجد سجلات مضافة للمنهجية حالياً.</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[750px] overflow-y-auto pl-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 rounded-3xl p-5 shadow-xl space-y-4 hover:border-cyan-500/40 transition-all"
                  >
                    {/* شريط علوي للبطاقة (ID وأزرار التحكم) */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        سجل رقم: #{item.id}
                      </span>
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

                    {/* محتوى البطاقة (العنوان، الوصف، والصورة المرفوعة) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-8 space-y-2">
                        <h3 className="text-base font-extrabold text-white">{item.title}</h3>
                        <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>
                      </div>
                      
                      <div className="md:col-span-4">
                        {item.image ? (
                          <div className="w-full h-28 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-28 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-zinc-500 text-xs">
                            بدون صورة
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}