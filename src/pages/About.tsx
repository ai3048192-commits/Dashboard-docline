import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  Code2,
  Languages,
  Sparkles,
  CheckCircle2,
  X,
  Stethoscope,
  Award,
  Users,
  Clock,
  ShieldCheck,
  BookOpen,
  Activity,
  PhoneCall,
} from "lucide-react";

export default function PortfolioManagement() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "أ.د. محمود الشريف",
      title: "استشاري الطب الباطني المتقدم.",
      certificates: [
        "حاصل على الدكتوراه المتخصصة في الباطنة العامة",
        "عضو الجمعية الأوروبية لأمراض الباطنة والسكري",
        "خبير معتمد في الحالات المزمنة والمعقدة"
      ],
      emergencyStatus: "متاحة أونلاين 24/7",
      experience: "أكثر من 22 عاماً",
      totalPatients: "15,000+ مريض",
      accreditation: "زمالة الكليات الملكية",
      satisfactionRate: "99.8% تقييم ممتاز",
      publishedPapers: "40+ بحث دولي",
      waitTime: "أقل من 10 دقائق",
    }
  ]);
  
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [tempCert, setTempCert] = useState("");
  const [emergencyStatus, setEmergencyStatus] = useState("متاحة أونلاين 24/7");
  const [experience, setExperience] = useState("");
  const [totalPatients, setTotalPatients] = useState("");
  const [accreditation, setAccreditation] = useState("");
  const [satisfactionRate, setSatisfactionRate] = useState("");
  const [publishedPapers, setPublishedPapers] = useState("");
  const [waitTime, setWaitTime] = useState("");

  const [editId, setEditId] = useState(null);

  const handleAddCertificate = () => {
    if (tempCert.trim()) {
      setCertificates([...certificates, tempCert.trim()]);
      setTempCert("");
    }
  };

  const handleRemoveCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;

    const newItem = {
      id: editId !== null ? editId : Date.now(),
      name,
      title,
      certificates,
      emergencyStatus,
      experience,
      totalPatients,
      accreditation,
      satisfactionRate,
      publishedPapers,
      waitTime,
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
    setName("");
    setTitle("");
    setCertificates([]);
    setEmergencyStatus("متاحة أونلاين 24/7");
    setExperience("");
    setTotalPatients("");
    setAccreditation("");
    setSatisfactionRate("");
    setPublishedPapers("");
    setWaitTime("");
    setEditId(null);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setTitle(item.title);
    setCertificates(item.certificates || []);
    setEmergencyStatus(item.emergencyStatus);
    setExperience(item.experience);
    setTotalPatients(item.totalPatients);
    setAccreditation(item.accreditation);
    setSatisfactionRate(item.satisfactionRate);
    setPublishedPapers(item.publishedPapers);
    setWaitTime(item.waitTime);
    setEditId(item.id);
  };

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
            <Code2 size={22} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            عيادة الاستشاري الفردية المميزة // رعاية طبية خاصة متكاملة
          </h1>
        </div>
        <p className="text-sm text-zinc-400">
          لوحة التحكم لإدارة وعرض السجلات بشكل منفصل ومنظم يعكس تفاصيل العيادة بالكامل.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* نموذج الإدخال / التعديل */}
        <div className="lg:col-span-5 bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl h-fit relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500" />
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Languages size={18} className="text-cyan-400" />
              {editId !== null ? "تعديل السجل النشط" : "إضافة سجل جديد للنظام"}
            </h2>
            {editId !== null && (
              <button type="button" onClick={resetForm} className="text-xs text-rose-400 hover:underline">
                إلغاء التعديل
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">اسم الطبيب *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: أ.د. محمود الشريف"
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">المسمى الوظيفي / الوصف *</label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أدخل المسمى الوظيفي..."
                rows={2}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                required
              />
            </div>

            {/* الشهادات الديناميكية */}
            <div className="space-y-2 p-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <label className="block font-semibold text-cyan-400">الشهادات والاعتمادات</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempCert}
                  onChange={(e) => setTempCert(e.target.value)}
                  placeholder="اكتب الشهادة واضغط إضافة..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleAddCertificate}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl whitespace-nowrap cursor-pointer"
                >
                  إضافة
                </button>
              </div>
              <ul className="space-y-1 mt-2">
                {certificates.map((cert, index) => (
                  <li key={index} className="flex items-center justify-between bg-black/60 px-3 py-1.5 rounded-lg text-zinc-300">
                    <span>✓ {cert}</span>
                    <button type="button" onClick={() => handleRemoveCertificate(index)} className="text-rose-400 hover:text-rose-300">
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">حالة الاستشارة الطارئة</label>
              <input
                type="text"
                value={emergencyStatus}
                onChange={(e) => setEmergencyStatus(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-zinc-400 mb-1">الخبرة السريرية</label>
                <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="أكثر من 22 عاماً" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">إجمالي المرضى</label>
                <input type="text" value={totalPatients} onChange={(e) => setTotalPatients(e.target.value)} placeholder="15,000+ مريض" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">الاعتماد الدولي</label>
                <input type="text" value={accreditation} onChange={(e) => setAccreditation(e.target.value)} placeholder="زمالة الكليات الملكية" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">نسبة الشفاء</label>
                <input type="text" value={satisfactionRate} onChange={(e) => setSatisfactionRate(e.target.value)} placeholder="99.8%" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">الأبحاث المنشورة</label>
                <input type="text" value={publishedPapers} onChange={(e) => setPublishedPapers(e.target.value)} placeholder="40+ بحث" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">وقت الانتظار</label>
                <input type="text" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} placeholder="أقل من 10 دقائق" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white" />
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
                سجلات العيادة المنفصلة ({items.length})
              </h2>
              <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                عرض بطاقات منفصلة احترافية
              </span>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 text-zinc-500 space-y-3">
                <AlertCircle size={36} className="mx-auto opacity-40 text-cyan-400" />
                <p className="text-sm font-mono">لا توجد سجلات مضافة حالياً.</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[750px] overflow-y-auto pl-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 rounded-3xl p-6 shadow-xl space-y-5 hover:border-cyan-500/40 transition-all relative group"
                  >
                    {/* شريط علوي للبطاقة (ID وأزرار التحكم) */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          سجل رقم: #{item.id}
                        </span>
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                          <PhoneCall size={12} /> {item.emergencyStatus}
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

                    {/* معلومات الطبيب الأساسية داخل البطاقة */}
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                        <Stethoscope size={16} />
                        <span>الاستشاري المسؤول</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white">{item.name}</h3>
                      <p className="text-xs text-zinc-300 mt-0.5">{item.title}</p>
                    </div>

                    {/* شبكة الإحصائيات داخل السجل (منفصلة ومصممة بأيقونات) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-3 bg-black/50 border border-white/5 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <Clock size={13} className="text-cyan-400" />
                          <span>الخبرة السريرية</span>
                        </div>
                        <strong className="text-white text-xs block">{item.experience || "غير متوفر"}</strong>
                      </div>

                      <div className="p-3 bg-black/50 border border-white/5 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <Award size={13} className="text-purple-400" />
                          <span>الاعتماد الدولي</span>
                        </div>
                        <strong className="text-cyan-300 text-xs block">{item.accreditation || "غير متوفر"}</strong>
                      </div>

                      <div className="p-3 bg-black/50 border border-white/5 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <Users size={13} className="text-emerald-400" />
                          <span>إجمالي المرضى</span>
                        </div>
                        <strong className="text-white text-xs block">{item.totalPatients || "غير متوفر"}</strong>
                      </div>

                      <div className="p-3 bg-black/50 border border-white/5 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <ShieldCheck size={13} className="text-blue-400" />
                          <span>نسبة الشفاء</span>
                        </div>
                        <strong className="text-cyan-300 text-xs block">{item.satisfactionRate || "غير متوفر"}</strong>
                      </div>

                      <div className="p-3 bg-black/50 border border-white/5 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <BookOpen size={13} className="text-amber-400" />
                          <span>الأبحاث المنشورة</span>
                        </div>
                        <strong className="text-white text-xs block">{item.publishedPapers || "غير متوفر"}</strong>
                      </div>

                      <div className="p-3 bg-black/50 border border-white/5 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <Activity size={13} className="text-rose-400" />
                          <span>وقت الانتظار</span>
                        </div>
                        <strong className="text-cyan-300 text-xs block">{item.waitTime || "غير متوفر"}</strong>
                      </div>
                    </div>

                    {/* قسم الشهادات المنفصل داخل البطاقة */}
                    <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-2">
                      <span className="text-cyan-400 font-bold text-xs flex items-center gap-1.5">
                        <Award size={14} /> الشهادات والاعتمادات النشطة ({item.certificates?.length || 0}):
                      </span>
                      {item.certificates && item.certificates.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {item.certificates.map((cert, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 bg-white/[0.02] p-2 rounded-xl border border-white/5">
                              <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                              <span className="line-clamp-1">{cert}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-zinc-500 italic">لا توجد شهادات مسجلة لهذا السجل.</p>
                      )}
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