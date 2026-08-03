import { useState } from "react";
import {
  Code2,
  Sparkles,
  Clock,
  MapPin,
  Save,
  Car,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Calendar
} from "lucide-react";

export default function ClinicDashboardComplete() {
  // 1. حالة بيانات الموقع والعروض الحالية في الفورم
  const [clinicData, setClinicData] = useState({
    address: "القاهرة، المعادي، شارع النصر الرئيسي، برج الفيروز الطبي، الدور الثالث، بجوار محطة مترو المعادي.",
    parking: "متاحة مجاناً للعملاء",
    googleMapsUrl: "https://maps.google.com",
    
    saturday: "09:00 صباحاً - 10:00 مساءً",
    sunday: "09:00 صباحاً - 10:00 مساءً",
    monday: "09:00 صباحاً - 10:00 مساءً",
    tuesday: "09:00 صباحاً - 10:00 مساءً",
    wednesday: "09:00 صباحاً - 10:00 مساءً",
    thursday: "09:00 صباحاً - 11:30 مساءً",
    friday: "02:00 ظهراً - 09:00 مساءً",

    earlyBookingDiscount: "40% خصم",
    familyDiscount: "35% خصم",
    specialDaysDiscount: "كشف مجاني تام",
    elderlyDiscount: "50% خصم",
    followUpGift: "هدية مجانية",
    labDiscount: "25% خصم"
  });

  // 2. حالة السجلات (تخزين البيانات المحرشفة) وتتبع السجل الذي يتم تعديله حالياً
  const [savedRecords, setSavedRecords] = useState([]);
  const [editingRecordId, setEditingRecordId] = useState(null);

  const handleClinicChange = (e) => {
    const { name, value } = e.target;
    setClinicData(prev => ({ ...prev, [name]: value }));
  };

  // عند الضغط على زر الحفظ (سواء لإضافة جديد أو تحديث سجل موجود)
  const handleSaveClinic = (e) => {
    e.preventDefault();
    
    if (editingRecordId !== null) {
      // تحديث السجل الحالي المحدد
      setSavedRecords(savedRecords.map(record => 
        record.id === editingRecordId 
          ? { ...record, ...clinicData, savedAt: new Date().toLocaleString("ar-EG", { hour12: true }) + " (معدل)" }
          : record
      ));
      setEditingRecordId(null);
      alert("تم تحديث السجل بنجاح!");
    } else {
      // إضافة سجل جديد كلياً
      const newRecord = {
        id: Date.now(),
        savedAt: new Date().toLocaleString("ar-EG", { hour12: true }),
        ...clinicData
      };
      setSavedRecords([newRecord, ...savedRecords]);
      alert("تم حفظ النسخة وإضافتها إلى السجلات بنجاح!");
    }
  };

  // زر التعديل: نقل بيانات السجل المختار إلى الفورم بالأعلى ليتم تعديله
  const handleEditRecord = (record) => {
    setClinicData({
      address: record.address,
      parking: record.parking,
      googleMapsUrl: record.googleMapsUrl,
      saturday: record.saturday,
      sunday: record.sunday,
      monday: record.monday,
      tuesday: record.tuesday,
      wednesday: record.wednesday,
      thursday: record.thursday,
      friday: record.friday,
      earlyBookingDiscount: record.earlyBookingDiscount,
      familyDiscount: record.familyDiscount,
      specialDaysDiscount: record.specialDaysDiscount,
      elderlyDiscount: record.elderlyDiscount,
      followUpGift: record.followUpGift,
      labDiscount: record.labDiscount
    });
    setEditingRecordId(record.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // إلغاء وضع التعديل
  const handleCancelEdit = () => {
    setEditingRecordId(null);
  };

  // وظيفة لحذف سجل معين من القائمة
  const handleDeleteRecord = (id) => {
    setSavedRecords(savedRecords.filter(record => record.id !== id));
    if (editingRecordId === id) {
      setEditingRecordId(null);
    }
  };

  return (
    <div className="space-y-12  max-w-9xl mx-auto" dir="rtl">
      
      {/* عنوان لوحة التحكم الرئيسي */}
      <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
            <Code2 size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            لوحة تحكم العيادة المتكاملة // النظام الطبي المتقدم
          </h1>
        </div>
        <p className="text-sm text-zinc-400 max-w-2xl">
          إدارة شاملة لبيانات العيادة، اللوكيشن، أوقات العمل، والعروض، مع نظام أرشيف وسجلات متكامل يتيح التعديل والعرض الاحترافي الكامل.
        </p>
      </div>

      {/* ================= SECTION 1: Clinic & Location Settings Form ================= */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              {editingRecordId !== null ? `تعديل السجل الحالي (رقم: #${editingRecordId})` : "إعدادات ومحتوى الموقع الجغرافي والجدول العام"}
            </h2>
          </div>
          {editingRecordId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-rose-400 hover:underline bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 cursor-pointer"
            >
              إلغاء وضع التعديل
            </button>
          )}
        </div>

        <form onSubmit={handleSaveClinic} className="space-y-6">
          
          {/* بطاقة العنوان واللوكيشن */}
          <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500" />
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>موقع العيادة الجغرافي // اللوكيشن الرسمي</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 md:col-span-2">
                <label className="block font-semibold text-zinc-300 mb-1.5">عنوان العيادة التفصيلي:</label>
                <textarea 
                  name="address"
                  value={clinicData.address}
                  onChange={handleClinicChange}
                  rows="2"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-zinc-300 mb-1.5">خدمة ركن السيارات:</label>
                <div className="relative">
                  <span className="absolute right-3.5 top-3.5 text-zinc-400"><Car size={16} /></span>
                  <input 
                    type="text"
                    name="parking"
                    value={clinicData.parking}
                    onChange={handleClinicChange}
                    className="w-full pr-10 pl-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-zinc-300 mb-1.5">رابط خرائط جوجل (Google Maps URL):</label>
                <input 
                  type="text"
                  name="googleMapsUrl"
                  value={clinicData.googleMapsUrl}
                  onChange={handleClinicChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* شبكة أوقات العمل والخصومات */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* جدول أوقات العمل */}
            <div className="lg:col-span-6 bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500" />
              
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white">جدول الأيام وأوقات الاستقبال الكاملة</h3>
                <p className="text-xs text-zinc-400">تعديل مواعيد استقبال المرضى طوال أيام الأسبوع بدقة.</p>
              </div>

              <div className="space-y-2 text-xs">
                {Object.entries({
                  saturday: "السبت (أول الاسبوع)",
                  sunday: "الأحد",
                  monday: "الاثنين",
                  tuesday: "الثلاثاء",
                  wednesday: "الأربعاء",
                  thursday: "الخميس (ختام الأسبوع)",
                  friday: "الجمعة (عيادة الطوارئ)"
                }).map(([key, label]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-2xl bg-black/40 border border-white/10 gap-4">
                    <span className="text-zinc-300 font-medium w-1/2">{label}:</span>
                    <input 
                      type="text"
                      name={key}
                      value={clinicData[key]}
                      onChange={handleClinicChange}
                      className="w-1/2 px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* باقات الخصومات والعروض */}
            <div className="lg:col-span-6 bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500" />
              
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white">باقات الخصومات والعروض الكبرى</h3>
                <p className="text-xs text-zinc-400">تعديل نسب التخفيضات الاستثنائية المتاحة طوال الشهر للمرضى.</p>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { key: "earlyBookingDiscount", label: "خصم الحجز المبكر الأسبوعي" },
                  { key: "familyDiscount", label: "خصم باقة الكشف الشامل والعائلة" },
                  { key: "specialDaysDiscount", label: "أيام الاثنين والأربعاء (تخفيض)" },
                  { key: "elderlyDiscount", label: "خصم كبار السن وأصحاب الهمم" },
                  { key: "followUpGift", label: "متابعة ما بعد الفحوصات الطبية" },
                  { key: "labDiscount", label: "خصم التحاليل التابعة للعيادة" }
                ].map(item => (
                  <div key={item.key} className="flex justify-between items-center p-3 rounded-2xl bg-black/40 border border-white/10 gap-4">
                    <span className="text-zinc-300 font-medium w-1/2">{item.label}:</span>
                    <input 
                      type="text"
                      name={item.key}
                      value={clinicData[item.key]}
                      onChange={handleClinicChange}
                      className="w-1/2 px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs font-bold text-emerald-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                className={`w-full py-3.5 px-4 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                  editingRecordId !== null
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
                }`}
              >
                <Save size={16} />
                <span>{editingRecordId !== null ? "حفظ التعديلات على السجل الحالي" : "حفظ البيانات وإضافتها كسجل جديد"}</span>
              </button>
            </div>

          </div>
        </form>
      </div>

      <hr className="border-white/10 my-8" />

      {/* ================= SECTION 2: Saved Records Section (Fully Detailed) ================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-4">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
          <h2 className="text-xl font-bold text-white tracking-wide">سجلات الحفظ المؤرشفة والمتكاملة ({savedRecords.length})</h2>
        </div>

        {savedRecords.length === 0 ? (
          <div className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-12 text-center text-zinc-500 space-y-3">
            <AlertCircle size={36} className="mx-auto opacity-40 text-cyan-400" />
            <p className="text-sm">لم يتم حفظ أي سجلات بعد. اضغط على زر "حفظ البيانات وإضافتها كسجل جديد" بالأعلى.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {savedRecords.map((record) => (
              <div 
                key={record.id}
                className="bg-[#050510]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500" />
                
                {/* رأس السجل وأزرار التحكم */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 size={14} /> سجل رقم: #{record.id}
                    </span>
                    <span className="text-xs text-zinc-400 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                      <Clock size={13} className="text-purple-400" /> {record.savedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditRecord(record)}
                      className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/25 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Edit3 size={14} /> تعديل السجل
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(record.id)}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Trash2 size={14} /> حذف
                    </button>
                  </div>
                </div>

                {/* محتوى السجل المتكامل والمقسم بوضوح تام */}
                <div className="grid md:grid-cols-3 gap-6 text-xs">
                  
                  {/* 1. بيانات اللوكيشن */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm border-b border-white/10 pb-2">
                      <MapPin size={16} />
                      <span>بيانات اللوكيشن والعنوان</span>
                    </div>
                    <div className="space-y-2 text-zinc-300">
                      <p><strong className="text-white block mb-0.5">العنوان التفصيلي:</strong> {record.address}</p>
                      <p><strong className="text-white block mb-0.5">ركن السيارات:</strong> {record.parking}</p>
                      <p className="truncate"><strong className="text-white block mb-0.5">رابط خرائط جوجل:</strong> <span className="text-cyan-400">{record.googleMapsUrl}</span></p>
                    </div>
                  </div>

                  {/* 2. جدول أوقات العمل */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm border-b border-white/10 pb-2">
                      <Calendar size={16} />
                      <span>أوقات العمل الأسبوعية الكاملة</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-zinc-300">
                      <p><strong>السبت:</strong> <span className="text-cyan-300">{record.saturday}</span></p>
                      <p><strong>الأحد:</strong> <span className="text-cyan-300">{record.sunday}</span></p>
                      <p><strong>الاثنين:</strong> <span className="text-cyan-300">{record.monday}</span></p>
                      <p><strong>الثلاثاء:</strong> <span className="text-cyan-300">{record.tuesday}</span></p>
                      <p><strong>الأربعاء:</strong> <span className="text-cyan-300">{record.wednesday}</span></p>
                      <p><strong>الخميس:</strong> <span className="text-cyan-300">{record.thursday}</span></p>
                      <p className="col-span-2"><strong>الجمعة (طوارئ):</strong> <span className="text-cyan-300">{record.friday}</span></p>
                    </div>
                  </div>

                  {/* 3. باقات الخصومات والعروض */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm border-b border-white/10 pb-2">
                      <Sparkles size={16} />
                      <span>باقات الخصومات والعروض</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-zinc-300">
                      <p><strong>الحجز المبكر:</strong> <span className="text-emerald-400 font-bold">{record.earlyBookingDiscount}</span></p>
                      <p><strong>العائلة:</strong> <span className="text-emerald-400 font-bold">{record.familyDiscount}</span></p>
                      <p><strong>كشف خاص:</strong> <span className="text-emerald-400 font-bold">{record.specialDaysDiscount}</span></p>
                      <p><strong>كبار السن:</strong> <span className="text-emerald-400 font-bold">{record.elderlyDiscount}</span></p>
                      <p><strong>المتابعة:</strong> <span className="text-emerald-400 font-bold">{record.followUpGift}</span></p>
                      <p><strong>التحاليل:</strong> <span className="text-emerald-400 font-bold">{record.labDiscount}</span></p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}