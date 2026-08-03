import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Eye,
  CheckCircle2,
  Sparkles,
  Plus,
  Clock,
  Mail,
  MessageCircle,
  User,
  Inbox,
  Loader2,
  Trash2,
  RefreshCw,
  CheckCheck,
  Calendar,
  Stethoscope,
  Activity,
  Phone,
} from "lucide-react";

export default function HomePage() {
  const [stats] = useState([
    {
      title: "إجمالي المرضى",
      value: "124",
      change: "+12%",
      period: "السجل الطبي",
      icon: Users,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "الحجوزات الواردة",
      value: "8",
      change: "نشط",
      period: "المواعيد اليومية",
      icon: Calendar,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "زيارات الموقع الطبي",
      value: "1,420",
      change: "+حي",
      period: "الإحصائيات",
      icon: Eye,
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
    },
    {
      title: "التقارير المنجزة",
      value: "98",
      change: "مستقر",
      period: "حالات الشفاء",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "محمد علي أحمد",
      service: "كشف عام وفحص دوري",
      time: "اليوم - 10:30 صباحاً",
      status: "مؤكد",
      phone: "+201012345678",
      age: "34 سنة",
      notes: "يعاني من آلام خفيفة في المعدة ويحتاج لفحص دوري.",
    },
    {
      id: 2,
      patientName: "فاطمة إبراهيم",
      service: "متابعة علاج وضغط الدم",
      time: "اليوم - 12:00 ظهراً",
      status: "قيد الانتظار",
      phone: "+201098765432",
      age: "45 سنة",
      notes: "مراجعة قياسات الضغط وتعديل الجرعات الدوائية.",
    },
    {
      id: 3,
      patientName: "محمود حسن",
      service: "استشارة باطنية",
      time: "غداً - 09:00 صباحاً",
      status: "مؤكد",
      phone: "+201122334455",
      age: "29 سنة",
      notes: "استشارة بخصوص تحاليل الدم الأخيرة.",
    },
  ]);

  const [loadingAppointments] = useState(false);

  const [incomingMessages, setIncomingMessages] = useState([
    {
      id: 1,
      name: "سارة خالد",
      email: "sara@example.com",
      message: "مرحباً دكتور، هل موعد الحجز متاح يوم الأربعاء القادم في الفترة المسائية؟",
      created_at: "2026-08-02",
      is_read: false,
    },
    {
      id: 2,
      name: "أحمد سمير",
      email: "ahmed@example.com",
      message: "أود الاستفسار عن التحاليل المطلوبة قبل جلسة المتابعة.",
      created_at: "2026-08-01",
      is_read: true,
    },
  ]);

  const [loadingMessages] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const handleDeleteMessage = (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
    setDeletingId(id);
    setTimeout(() => {
      setIncomingMessages((prev) => prev.filter((msg) => msg.id !== id));
      setDeletingId(null);
    }, 400);
  };

  const handleDeleteAllMessages = () => {
    if (!window.confirm("هل تريد حذف جميع الرسائل؟")) return;
    setRefreshing(true);
    setTimeout(() => {
      setIncomingMessages([]);
      setRefreshing(false);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-12" dir="rtl">
      {/* 1. قسم الترحيب الفاخر بالطبيب */}
      <div className="relative overflow-hidden bg-[#0c0a09] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <Sparkles size={13} className="animate-spin" style={{ animationDuration: "4s" }} />
                استشاري الباطنة والجهاز الهضمي
              </span>
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-full flex items-center gap-1">
                <Activity size={13} /> النظام الطبي نشط
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide">
              مرحباً بك، د. أحمد إسماعيل 🩺
            </h1>
            <p className="text-sm text-stone-400 mt-2 max-w-2xl leading-relaxed">
              إليك لوحة التحكم المتقدمة لمتابعة المواعيد والحجوزات وسجلات المرضى بتفاصيل كاملة عبر كروت تفاعلية ذكية.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/patients/add"
              className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-bold text-sm rounded-2xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <Plus size={18} />
              <span>تسجيل مريض جديد</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. بطاقات الإحصائيات الطبية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-[#0c0a09] border border-stone-800/80 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300 shadow-lg group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${item.bg} ${item.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500">{item.period}</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {item.change}
                  </span>
                </div>
              </div>
              <h3 className="text-3xl font-black text-white tracking-wider mb-1">{item.value}</h3>
              <p className="text-xs text-stone-400 font-medium">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* 3. سكشن الحجوزات والمواعيد القادمة على شكل كروت تفصيلية كاملة */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Stethoscope size={18} />
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              أحدث المواعيد والحجوزات الطبية
            </h2>
          </div>
          <Link
            to="/appointments"
            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            عرض الكل ←
          </Link>
        </div>

        {loadingAppointments ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-3 bg-[#0c0a09] border border-stone-800 rounded-3xl">
            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            <p className="text-xs text-stone-400">جاري تحميل المواعيد...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-12 text-center space-y-2 bg-[#0c0a09] border border-stone-800 rounded-3xl">
            <p className="text-sm font-bold text-white">لا توجد حجوزات مسجلة اليوم</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {appointments.map((apt, idx) => (
              <div
                key={apt.id || idx}
                className="bg-[#0c0a09] border border-stone-800/80 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between pb-3 border-b border-stone-800">
                    <div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {apt.service}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">{apt.patientName}</h3>
                      <span className="text-xs text-stone-400 block">العمر: {apt.age}</span>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        apt.status === "مؤكد"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Clock size={14} className="text-emerald-400" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-300">
                      <Phone size={14} className="text-cyan-400" />
                      <span>{apt.phone}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-2xl">
                    <span className="text-[10px] text-stone-500 block mb-1">ملاحظات الكشف:</span>
                    <p className="text-xs text-stone-300 leading-relaxed">"{apt.notes}"</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-800 flex items-center gap-2 relative z-10">
                  <a
                    href={`https://wa.me/${apt.phone}?text=مرحباً بك يا أستاذ ${apt.patientName}، بخصوص موعدك في العيادة...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-semibold"
                  >
                    <MessageCircle size={15} />
                    <span>مراسلة واتساب</span>
                  </a>
                  <button
                    onClick={() => alert(`عرض الملف الكامل للمريض: ${apt.patientName}`)}
                    className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 rounded-2xl transition-all text-xs font-semibold"
                  >
                    الملف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. سكشن استفسارات ورسائل المرضى على شكل كروت فخمة */}
      <div className="relative overflow-hidden bg-[#0c0a09] border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Inbox size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">استفسارات ورسائل المرضى</h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                  {incomingMessages.length} رسالة نشطة
                </span>
              </div>
              <span className="text-xs text-stone-400">الرد السريع ومتابعة استشارات المرضى</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchDashboardData}
              disabled={refreshing}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin text-purple-400" : ""} />
              <span>تحديث</span>
            </button>

            {incomingMessages.length > 0 && (
              <button
                onClick={handleDeleteAllMessages}
                disabled={refreshing}
                className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Trash2 size={14} />
                <span>حذف الكل</span>
              </button>
            )}
          </div>
        </div>

        {loadingMessages ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-xs text-stone-400">جاري التحميل...</p>
          </div>
        ) : incomingMessages.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-stone-900/40 border border-stone-800 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto">
              <CheckCheck size={24} />
            </div>
            <p className="text-sm font-bold text-white">لا توجد استفسارات جديدة في الوقت الحالي.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {incomingMessages.map((client) => (
              <div
                key={client.id}
                className="bg-[#0f0e0d] border border-purple-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/60 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {client.is_read ? "تم الرد" : "استفسار جديد"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                        <Clock size={13} />
                        <span>{client.created_at}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(client.id)}
                        disabled={deletingId === client.id}
                        className="p-1.5 bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 rounded-xl transition-all disabled:opacity-50"
                      >
                        {deletingId === client.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-2xl flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <User size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">اسم المريض</span>
                        <h4 className="text-xs font-bold text-white">{client.name}</h4>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-2xl flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Mail size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] text-stone-400 block">البريد الإلكتروني</span>
                        <h4 className="text-xs font-bold text-white truncate">{client.email}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-950/80 border border-stone-800/80 rounded-2xl space-y-1.5">
                    <span className="text-[10px] text-stone-500 block">نص الاستفسار الطبي:</span>
                    <p className="text-xs text-stone-200 leading-relaxed">"{client.message}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 mt-4 border-t border-stone-800">
                  <a
                    href={`mailto:${client.email}`}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl text-center transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-1.5"
                  >
                    <Mail size={14} />
                    <span>الرد عبر البريد</span>
                  </a>
                  <a
                    href={`https://wa.me/?text=مرحباً ${client.name}، بخصوص استفسارك الطبي...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 font-bold text-xs rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} className="text-emerald-400" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}