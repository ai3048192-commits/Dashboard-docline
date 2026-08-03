import { useState, useEffect } from "react";
import { 
  Settings, 
  MessageSquare, 
  Save, 
  CheckCircle2,
  Upload,
  Loader2,
  Mail,
  MapPin,
  Link as LinkIcon,
  Image as ImageIcon,
  Trash2,
  Sparkles,
  Phone,
  Globe,
  Edit3
} from "lucide-react";

interface ClinicSetting {
  id: number;
  whatsapp: string;
  logo: string;
  email: string;
  address: string;
  mapLink: string;
}

export default function ClinicSettingsDashboard({ lang = "AR", isDark = true }) {
  const [whatsapp, setWhatsapp] = useState("+201012345678");
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [email, setEmail] = useState("clinic@example.com");
  const [address, setAddress] = useState("القاهرة، مصر - شارع الهرم الرئيسي");
  const [mapLink, setMapLink] = useState("https://maps.google.com/?q=clinic");

  // حالة لتخزين معرف السجل الذي يتم تعديله حالياً (إذا كانت null فهذا يعني وضع إضافة جديد)
  const [editingId, setEditingId] = useState<number | null>(null);

  // قائمة السجلات المحفوظة
  const [records, setRecords] = useState<ClinicSetting[]>([
    {
      id: 1,
      whatsapp: "+201012345678",
      logo: "",
      email: "dr.mahmoud@clinic.com",
      address: "القاهرة - الدقي - شارع البطل أحمد عبد العزيز",
      mapLink: "https://maps.google.com/?q=cairo"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 400);
      } catch (err) {
        console.error("Error fetching clinic settings:", err);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // رفع الصورة ومعاينتها فورياً
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      setErrorMessage("");

      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setLogoFile(imageUrl);
        setUploadingLogo(false);
      }, 800);

    } catch (err) {
      console.error("Error uploading logo:", err);
      setErrorMessage("فشل رفع الشعار، تأكد من إعدادات المتصفح.");
      setUploadingLogo(false);
    }
  };

  // تفعيل وضع التعديل: جلب بيانات السجل المستهدف إلى حقول النموذج بالأعلى
  const handleEditRecord = (record: ClinicSetting) => {
    setEditingId(record.id);
    setWhatsapp(record.whatsapp);
    setLogoFile(record.logo || null);
    setEmail(record.email);
    setAddress(record.address);
    setMapLink(record.mapLink);
    
    // التمرير بسلسة إلى أعلى النموذج لسهولة التعديل
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // إلغاء وضع التعديل وتفريغ الحقول أو إرجاعها للوضع الافتراضي
  const handleCancelEdit = () => {
    setEditingId(null);
    setWhatsapp("+201012345678");
    setLogoFile(null);
    setEmail("clinic@example.com");
    setAddress("القاهرة، مصر - شارع الهرم الرئيسي");
    setMapLink("https://maps.google.com/?q=clinic");
  };

  // حفظ التعديل أو إضافة سجل جديد
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");

    try {
      setTimeout(() => {
        if (editingId !== null) {
          // تحديث السجل الحالي الموجود في القائمة
          setRecords(records.map(item => 
            item.id === editingId 
              ? { ...item, whatsapp, logo: logoFile || item.logo, email, address, mapLink }
              : item
          ));
          setEditingId(null);
        } else {
          // إضافة سجل جديد تماماً
          const newRecord: ClinicSetting = {
            id: Date.now(),
            whatsapp,
            logo: logoFile || "",
            email,
            address,
            mapLink,
          };
          setRecords([newRecord, ...records]);
        }

        setSaving(false);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);

        // إعادة ضبط الحقول الافتراضية
        setWhatsapp("+201012345678");
        setLogoFile(null);
        setEmail("clinic@example.com");
        setAddress("القاهرة، مصر - شارع الهرم الرئيسي");
        setMapLink("https://maps.google.com/?q=clinic");

      }, 800);
    } catch (err) {
      console.error("Error saving settings:", err);
      setErrorMessage("حدث خطأ أثناء حفظ إعدادات العيادة.");
      setSaving(false);
    }
  };

  // حذف سجل
  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter(item => item.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  if (loading) {
    return (
      <div className={`p-12 text-center flex flex-col items-center justify-center space-y-3 rounded-3xl ${isDark ? "bg-[#08080c] text-white" : "bg-slate-100 text-slate-900"}`} dir="rtl">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-xs text-zinc-400 font-mono">جاري تحميل إعدادات العيادة...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 p-6 md:p-8 rounded-3xl transition-colors duration-300 shadow-xl border ${isDark ? "bg-[#08080c] border-white/[0.06] text-white" : "bg-white border-slate-200 text-slate-900"}`} dir="rtl">
      
      {/* رأس الصفحة */}
      <div className={`p-6 rounded-2xl border ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Settings size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wide">إعدادات العيادة العامة</h1>
              <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {editingId !== null ? "وضع التعديل النشط: قم بتعديل البيانات ثم اضغط تحديث السجل" : "إدارة وتعديل معلومات العيادة بكل سهولة."}
              </p>
            </div>
          </div>
          {editingId !== null && (
            <button 
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-xl transition-all border border-white/10"
            >
              إلغاء التعديل
            </button>
          )}
        </div>
      </div>

      {/* رسالة النجاح */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold">
            {editingId !== null ? "تم تحديث بيانات السجل بنجاح!" : "تم إضافة وحفظ بيانات العيادة في السجلات بنجاح!"}
          </span>
        </div>
      )}

      {/* رسالة الخطأ */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* رقم الواتساب */}
          <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
              <MessageSquare size={18} className="text-emerald-400" />
              <h2 className="text-base font-bold">رقم حجز الواتساب</h2>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">رقم هاتف العيادة</label>
              <input 
                type="text" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${isDark ? "bg-[#08080c] border-white/10 text-white focus:border-emerald-500/50" : "bg-white border-slate-300 text-slate-900 focus:border-emerald-500"}`}
                required
              />
            </div>
          </div>

          {/* البريد الإلكتروني */}
          <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
              <Mail size={18} className="text-indigo-400" />
              <h2 className="text-base font-bold">البريد الإلكتروني للعيادة</h2>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">البريد الرسمي</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${isDark ? "bg-[#08080c] border-white/10 text-white focus:border-indigo-500/50" : "bg-white border-slate-300 text-slate-900 focus:border-indigo-500"}`}
                required
              />
            </div>
          </div>

          {/* العنوان التفصيلي */}
          <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
              <MapPin size={18} className="text-rose-400" />
              <h2 className="text-base font-bold">عنوان العيادة</h2>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">العنوان النصي التفصيلي</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${isDark ? "bg-[#08080c] border-white/10 text-white focus:border-rose-500/50" : "bg-white border-slate-300 text-slate-900 focus:border-rose-500"}`}
                required
              />
            </div>
          </div>

          {/* رابط الخريطة */}
          <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
              <LinkIcon size={18} className="text-blue-400" />
              <h2 className="text-base font-bold">رابط الخريطة (Google Maps)</h2>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">رابط الموقع الجغرافي</label>
              <input 
                type="url" 
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${isDark ? "bg-[#08080c] border-white/10 text-white focus:border-blue-500/50" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                required
              />
            </div>
          </div>

          {/* رفع شعار العيادة */}
          <div className={`p-6 rounded-2xl border space-y-4 lg:col-span-2 ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50 border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
              <ImageIcon size={18} className="text-teal-400" />
              <h2 className="text-base font-bold">شعار العيادة (Logo)</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden shrink-0">
                {logoFile ? (
                  <img src={logoFile} alt="Clinic Logo" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-zinc-600" />
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="block text-xs font-semibold text-slate-400">اختر صورة الشعار من جهازك</label>
                <label className={`w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 ${uploadingLogo ? "opacity-50 pointer-events-none" : ""}`}>
                  {uploadingLogo ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  <span>{uploadingLogo ? "جاري رفع الصورة..." : "رفع صورة الشعار"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* زر الحفظ / التحديث */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit"
            disabled={saving}
            className={`py-3.5 px-8 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50 ${
              editingId !== null 
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]" 
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            }`}
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : (editingId !== null ? <Edit3 size={18} /> : <Save size={18} />)}
            <span>{saving ? "جاري المعالجة..." : (editingId !== null ? "تحديث السجل الحالي" : "حفظ وإضافة للسجلات")}</span>
          </button>
        </div>
      </form>

      {/* قسم السجلات المحفوظة */}
      <div className={`mt-10 p-6 rounded-3xl border space-y-6 ${isDark ? "bg-white/[0.01] border-white/[0.06]" : "bg-slate-50 border-slate-200"}`}>
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <span>سجلات العيادة ({records.length})</span>
          </h2>
          <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            اضغط على زر التعديل لأي سجل لتحديث بياناته
          </span>
        </div>

        {records.length === 0 ? (
          <p className="text-xs text-zinc-500 text-center py-8">لا توجد سجلات مضافة حتى الآن.</p>
        ) : (
          <div className="space-y-6">
            {records.map((item) => (
              <div key={item.id} className={`p-5 rounded-2xl border transition-all ${editingId === item.id ? "bg-amber-500/5 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]" : "bg-black/40 border-white/10"}`}>
                
                {/* رأس السجل وأزرار التحكم (تعديل + حذف) */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    رقم السجل: #{item.id} {editingId === item.id && "(قيد التعديل حالياً)"}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {/* زر التعديل الفل */}
                    <button 
                      type="button" 
                      onClick={() => handleEditRecord(item)}
                      className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Edit3 size={14} />
                      <span>تعديل</span>
                    </button>

                    {/* زر الحذف */}
                    <button 
                      type="button" 
                      onClick={() => handleDeleteRecord(item.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Trash2 size={14} />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>

                {/* شبكة البيانات المنفصلة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  
                  {/* بطاقة الشعار منفصلة */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-teal-400 flex items-center gap-1.5">
                      <ImageIcon size={14} /> شعار العيادة (Logo)
                    </span>
                    <div className="w-14 h-14 rounded-lg border border-white/10 bg-black flex items-center justify-center overflow-hidden">
                      {item.logo ? (
                        <img src={item.logo} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] text-zinc-500">لا توجد صورة</span>
                      )}
                    </div>
                  </div>

                  {/* بطاقة الواتساب منفصلة */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                      <Phone size={14} /> رقم الواتساب
                    </span>
                    <p className="text-sm font-mono text-white pt-1">{item.whatsapp}</p>
                  </div>

                  {/* بطاقة البريد الإلكتروني منفصلة */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
                      <Mail size={14} /> البريد الإلكتروني
                    </span>
                    <p className="text-xs text-zinc-200 pt-1 truncate">{item.email}</p>
                  </div>

                  {/* بطاقة العنوان منفصلة */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
                      <MapPin size={14} /> عنوان العيادة
                    </span>
                    <p className="text-xs text-zinc-200 pt-1 leading-relaxed">{item.address}</p>
                  </div>

                  {/* بطاقة رابط الخريطة منفصلة */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 sm:col-span-2">
                    <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                      <Globe size={14} /> رابط الخريطة (Google Maps)
                    </span>
                    <a 
                      href={item.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-blue-400 hover:underline pt-1 block truncate"
                    >
                      {item.mapLink}
                    </a>
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