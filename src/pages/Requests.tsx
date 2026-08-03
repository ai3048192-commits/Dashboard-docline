import { useState } from "react";
import {
  Sparkles,
  Clock,
  MessageCircle,
  User,
  Inbox,
  RefreshCw,
  Calendar,
  MapPin,
  HeartPulse,
  Activity,
  Phone,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  Trash2
} from "lucide-react";

export default function MedicalDashboardRequests() {
  // حالة تخزين الكروت (طلبات الحجز الواردة، المقبولة، والمحذوفة) بكامل البيانات
  const [incomingReservations, setIncomingReservations] = useState([
    {
      id: 1,
      fullName: "محمد أحمد محمود",
      phone: "01012345678",
      email: "mohamed@example.com",
      gender: "ذكر",
      age: "32",
      weight: "80",
      height: "178",
      bloodType: "A+",
      city: "القاهرة",
      date: "15/06/2026",
      timeSlot: "05:00 م - 06:00 م",
      consultationType: "كشف جديد",
      chronicDiseases: "ارتفاع ضغط الدم الخفيف",
      currentMedications: "كونكور 2.5 ملغ",
      allergies: "لا توجد",
      notes: "يعاني من إرهاق مستمر ودوخة صباحية",
      status: "pending" // pending (وارد), accepted (مقبول), deleted (محذوف)
    },
    {
      id: 2,
      fullName: "فاطمة إبراهيم علي",
      phone: "01098765432",
      email: "fatma@example.com",
      gender: "أنثى",
      age: "28",
      weight: "65",
      height: "165",
      bloodType: "O+",
      city: "الإسكندرية",
      date: "16/06/2026",
      timeSlot: "03:00 م - 04:00 م",
      consultationType: "متابعة دورية",
      chronicDiseases: "لا توجد",
      currentMedications: "فيتامين د",
      allergies: "حساسية من بعض المكسرات",
      notes: "متابعة نتائج تحليل الدم الشامل",
      status: "pending"
    }
  ]);

  const [refreshing, setRefreshing] = useState(false);

  // دالة قبول الحجز ونقله للحجوزات المقبولة بنفس البيانات الكاملة
  const handleAccept = (id: number) => {
    setIncomingReservations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "accepted" } : item))
    );
  };

  // دالة حذف الحجز ونقله لسلة المحذوفات بنفس البيانات الكاملة
  const handleDelete = (id: number) => {
    setIncomingReservations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "deleted" } : item))
    );
  };

  // دالة استعادة الحجز المحذوف إلى قائمة الانتظار
  const handleRestore = (id: number) => {
    setIncomingReservations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "pending" } : item))
    );
  };

  const fetchDashboardData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const pendingList = incomingReservations.filter((item) => item.status === "pending");
  const acceptedList = incomingReservations.filter((item) => item.status === "accepted");
  const deletedList = incomingReservations.filter((item) => item.status === "deleted");

  // تصميم كارت المريض الموحد بكامل التفاصيل والبيانات
  const renderPatientCard = (patient: any, currentStatus: string) => {
    return (
      <div
        key={patient.id}
        className={`bg-stone-900/90 border rounded-3xl p-6 shadow-2xl flex flex-col justify-between transition-all relative overflow-hidden group ${
          currentStatus === "accepted"
            ? "border-emerald-500/50"
            : currentStatus === "deleted"
            ? "border-rose-500/30 opacity-75"
            : "border-stone-800 hover:border-emerald-500/40"
        }`}
      >
        <div className="space-y-4">
          {/* رأس الكارت */}
          <div className="flex items-start justify-between pb-3 border-b border-stone-800">
            <div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                {patient.consultationType}
              </span>
              <h3 className="text-base font-black text-white mt-2 flex items-center gap-2">
                <User size={16} className="text-emerald-400" />
                {patient.fullName}
              </h3>
            </div>
            {currentStatus === "pending" && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                قيد الانتظار
              </span>
            )}
            {currentStatus === "accepted" && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                مقبول ومؤكد
              </span>
            )}
            {currentStatus === "deleted" && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                في المحذوفات
              </span>
            )}
          </div>

          {/* بيانات الاتصال والموعد */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
              <Phone size={14} className="text-cyan-400" />
              <span dir="ltr">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
              <MapPin size={14} className="text-emerald-400" />
              <span>{patient.city}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
              <Calendar size={14} className="text-teal-400" />
              <span>{patient.date}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
              <Clock size={14} className="text-amber-400" />
              <span>{patient.timeSlot}</span>
            </div>
          </div>

          {/* المؤشرات الحيوية والقياسات */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-stone-950/80 p-2 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 block">العمر</span>
              <span className="font-bold text-white">{patient.age} سنة</span>
            </div>
            <div className="bg-stone-950/80 p-2 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 block">الوزن</span>
              <span className="font-bold text-white">{patient.weight} كجم</span>
            </div>
            <div className="bg-stone-950/80 p-2 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 block">الطول</span>
              <span className="font-bold text-white">{patient.height} سم</span>
            </div>
            <div className="bg-stone-950/80 p-2 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 block">الدم</span>
              <span className="font-bold text-emerald-400">{patient.bloodType}</span>
            </div>
          </div>

          {/* التاريخ المرضي والأدوية */}
          <div className="space-y-2 text-xs bg-stone-950/90 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-1.5 text-stone-300">
              <HeartPulse size={14} className="text-rose-400" />
              <span><strong>أمراض مزمنة:</strong> {patient.chronicDiseases || "لا توجد"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Activity size={14} className="text-purple-400" />
              <span><strong>الأدوية الحالية:</strong> {patient.currentMedications || "لا توجد"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <ShieldAlert size={14} className="text-amber-400" />
              <span><strong>الحساسية:</strong> {patient.allergies || "لا توجد"}</span>
            </div>
            {patient.notes && (
              <p className="text-stone-400 text-[11px] pt-1 border-t border-stone-800">
                <strong>ملاحظات إضافية:</strong> "{patient.notes}"
              </p>
            )}
          </div>
        </div>

        {/* أزرار التحكم والتواصل عبر الواتساب */}
        <div className="pt-4 mt-4 border-t border-stone-800 flex items-center gap-2">
          {currentStatus === "pending" && (
            <>
              <button
                onClick={() => handleAccept(patient.id)}
                className="flex-1 py-2.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
              >
                <CheckCircle2 size={15} />
                <span>قبول</span>
              </button>
              <a
                href={`https://wa.me/${patient.phone}?text=مرحباً بك يا أستاذ(ة) ${patient.fullName}، تم استقبال استمارة حجزك الطبي بنجاح وموعدك المقترح في ${patient.date} (${patient.timeSlot}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
                title="تواصل واتساب"
              >
                <MessageCircle size={16} />
                <span>واتساب</span>
              </a>
              <button
                onClick={() => handleDelete(patient.id)}
                className="py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-all flex items-center justify-center gap-1 text-xs font-bold cursor-pointer"
                title="حذف"
              >
                <Trash2 size={15} />
              </button>
            </>
          )}

          {currentStatus === "accepted" && (
            <>
              <a
                href={`https://wa.me/${patient.phone}?text=مرحباً دكتور/أستاذ ${patient.fullName}، نذكرك بموعدك المؤكد في العيادة بتاريخ ${patient.date}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <MessageCircle size={16} />
                <span>مراسلة واتساب</span>
              </a>
              <button
                onClick={() => handleDelete(patient.id)}
                className="py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-all flex items-center justify-center gap-1 text-xs font-bold cursor-pointer"
              >
                <Trash2 size={15} />
                <span>حذف</span>
              </button>
            </>
          )}

          {currentStatus === "deleted" && (
            <>
              <button
                onClick={() => handleRestore(patient.id)}
                className="flex-1 py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw size={14} className="text-emerald-400" />
                <span>استعادة الكارت</span>
              </button>
              <a
                href={`https://wa.me/${patient.phone}?text=مرحباً ${patient.fullName}...`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <MessageCircle size={16} />
                <span>واتساب</span>
              </a>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12  min-h-screen text-white" dir="rtl">
      
      {/* الترحيب العلوي */}
{/* الترحيب العلوي */}
      <div className="relative overflow-hidden bg-stone-900/60 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <Sparkles size={13} className="animate-spin" />
                لوحة استلام الملفات الطبية الشاملة
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide">
              استمارة الملف الطبي الشامل - د. أحمد إسماعيل 🩺
            </h1>
            <p className="text-sm text-stone-400 mt-2 max-w-2xl leading-relaxed">
              تظهر هنا استمارات الملف الطبي الشامل للمرضى فور إرسالها بكامل البيانات الصحية، مع إمكانية مراجعتها، قبولها، أو التواصل الفوري عبر الواتساب[cite: 1].
            </p>
          </div>
        </div>
      </div>

      {/* قسم طلبات الحجز الواردة */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Inbox size={20} />
            </div>
            <h2 className="text-lg font-bold text-white">طلبات الحجز الواردة ({pendingList.length})</h2>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin text-emerald-400" : ""} />
            <span>تحديث البيانات</span>
          </button>
        </div>

        {pendingList.length === 0 ? (
          <div className="py-12 text-center bg-stone-900/40 border border-stone-800 rounded-3xl">
            <p className="text-sm text-stone-400">لا توجد طلبات حجز جديدة حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingList.map((patient) => renderPatientCard(patient, "pending"))}
          </div>
        )}
      </div>

      {/* قسم الحجوزات المقبولة */}
      {acceptedList.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-stone-800">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={20} />
            <h3 className="text-lg font-bold text-white">الحجوزات المقبولة المؤكدة ({acceptedList.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {acceptedList.map((patient) => renderPatientCard(patient, "accepted"))}
          </div>
        </div>
      )}

      {/* قسم سلة المحذوفات */}
      <div className="space-y-6 pt-8 border-t border-stone-800">
        <div className="flex items-center gap-2 text-rose-400">
          <ShieldAlert size={20} />
          <h3 className="text-lg font-bold text-white">سلة المحذوفات ({deletedList.length})</h3>
        </div>

        {deletedList.length === 0 ? (
          <div className="p-6 bg-stone-900/20 border border-stone-800/60 rounded-2xl text-center text-xs text-stone-500">
            سلة المحذوفات فارغة.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deletedList.map((patient) => renderPatientCard(patient, "deleted"))}
          </div>
        )}
      </div>

    </div>
  );
}