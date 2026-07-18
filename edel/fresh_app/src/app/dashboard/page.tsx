"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Gamepad2,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  Clock,
  Flame,

  Sparkles,
  Activity,
  Sun,
  Moon,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "المزاج الحالي", value: "٧/١٠", icon: Heart, color: "text-rose-500", bgColor: "bg-rose-500/15", trend: "+١٢%", trendUp: true },
  { label: "مستوى الطاقة", value: "٦/١٠", icon: TrendingUp, color: "text-amber-500", bgColor: "bg-amber-500/15", trend: "+٥%", trendUp: true },
  { label: "مستوى التوتر", value: "٤/١٠", icon: Brain, color: "text-blue-500", bgColor: "bg-blue-500/15", trend: "-٨%", trendUp: true },
  { label: "جودة النوم", value: "٧.٥س", icon: Moon, color: "text-indigo-500", bgColor: "bg-indigo-500/15", trend: "+٠.٥س", trendUp: true },
];

const weekMoods = [
  { day: "السبت", emoji: "😊", value: 7 },
  { day: "الأحد", emoji: "😐", value: 5 },
  { day: "الإثنين", emoji: "😢", value: 4 },
  { day: "الثلاثاء", emoji: "😊", value: 7 },
  { day: "الأربعاء", emoji: "😄", value: 8 },
  { day: "الخميس", emoji: "😊", value: 7 },
  { day: "الجمعة", emoji: "😄", value: 9 },
];

const quickActions = [
  { name: "سجل مزاجك", icon: Heart, desc: "سجل مشاعرك اليومية", color: "bg-rose-500/15 text-rose-500", href: "#" },
  { name: "تمرين CBT", icon: Brain, desc: "تمارين علاج سلوكي", color: "bg-blue-500/15 text-blue-500", href: "#" },
  { name: "لعبة ذهنية", icon: Gamepad2, desc: "درب عقلك", color: "bg-purple-500/15 text-purple-500", href: "#" },
  { name: "تواصل", icon: MessageSquare, desc: "شارك وتواصل", color: "bg-emerald-500/15 text-emerald-500", href: "#" },
  { name: "طوارئ", icon: AlertTriangle, desc: "مساعدة فورية", color: "bg-red-500/15 text-red-500", href: "#" },
  { name: "تعلم", icon: BookOpen, desc: "مكتبة تثقيفية", color: "bg-amber-500/15 text-amber-500", href: "#" },
];

const recentActivity = [
  { title: "تسجيل مزاج", desc: "مزاج جيد ومشاعر إيجابية", time: "قبل ساعتين", icon: Heart, color: "text-rose-500" },
  { title: "تمرين CBT", desc: "إعادة الهيكلة المعرفية", time: "قبل ٥ ساعات", icon: Brain, color: "text-blue-500" },
  { title: "لعبة ذهنية", desc: "تطابق الذاكرة - النتيجة: ٢,٤٥٠", time: "أمس", icon: Gamepad2, color: "text-purple-500" },
  { title: "مشاركة", desc: "انضممت لنقاش المجتمع", time: "قبل يومين", icon: MessageSquare, color: "text-emerald-500" },
];

const recommendedContent = [
  {
    title: "تمارين التنفس للقلق",
    desc: "بناءً على مزاجك الحالي، نوصي بهذا التمرين",
    icon: Brain,
    color: "from-sky-500/20 to-sky-600/10",
    btnText: "ابدأ التمرين",
  },
  {
    title: "التأمل الموجه",
    desc: "لتحسين مستوى الطاقة والتركيز",
    icon: Sun,
    color: "from-amber-500/20 to-amber-600/10",
    btnText: "استمع الآن",
  },
];

export default function DashboardPage() {
  const [streak] = useState(7);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl font-bold text-foreground">
                مرحباً بعودتك
              </h1>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                className="flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1.5 text-sm font-semibold text-orange-500"
              >
                <Flame className="h-4 w-4" />
                {streak} أيام متتالية
              </motion.div>
            </div>
            <p className="mt-1 text-muted-foreground">
              نظرة عامة على حالتك النفسية لهذا اليوم
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
            <Heart className="h-4 w-4" />
            سجل مزاجك
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border-glass bg-glass-white/60 p-4 backdrop-blur-xl transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 font-serif text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs font-medium",
                      stat.trendUp ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {stat.trend}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
                    stat.bgColor
                  )}
                >
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Mood Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                  <Activity className="h-5 w-5 text-primary" />
                  مزاج هذا الأسبوع
                </h3>
                <span className="text-xs text-muted-foreground">
                  آخر ٧ أيام
                </span>
              </div>

              <div className="flex items-end justify-between gap-2">
                {weekMoods.map((day, i) => (
                  <motion.div
                    key={day.day}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <span className="text-lg">{day.emoji}</span>
                    <div className="flex h-28 w-full items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${day.value * 10 + 10}%` }}
                        transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                        className="w-full max-w-[32px] rounded-lg bg-gradient-to-t from-primary/60 to-primary/40 transition-all hover:from-primary hover:to-primary/60"
                        style={{ minHeight: "12px" }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {day.day.slice(0, 2)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl sm:p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                إجراءات سريعة
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {quickActions.map((action, i) => (
                  <motion.a
                    key={action.name}
                    href={action.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-border-glass bg-glass-white/30 p-3 text-center transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
                        action.color
                      )}
                    >
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {action.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {action.desc}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl sm:p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                <Clock className="h-5 w-5 text-primary" />
                آخر النشاطات
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl glass-subtle p-3 transition-all hover:glass-strong"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        activity.color.replace("text", "bg").replace("rose-500", "rose-500/15").replace("blue-500", "blue-500/15").replace("purple-500", "purple-500/15").replace("emerald-500", "emerald-500/15")
                      )}
                    >
                      <activity.icon className={cn("h-4 w-4", activity.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.desc}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Weekly Insights & Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl sm:p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                تحليلات الأسبوع
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl glass-subtle p-3">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-foreground">التسجيل المتتالي</span>
                  </div>
                  <span className="font-serif text-xl font-bold text-orange-500">
                    {streak} أيام
                  </span>
                </div>

                {[
                  { label: "متوسط المزاج", value: "٧.٢", target: "٧.٥", color: "bg-rose-500", pct: 85 },
                  { label: "متوسط الطاقة", value: "٦.٥", target: "٧.٠", color: "bg-amber-500", pct: 75 },
                  { label: "متوسط التوتر", value: "٣.٨", target: "٣.٠", color: "bg-blue-500", pct: 60 },
                  { label: "متوسط النوم", value: "٧.٣س", target: "٨.٠س", color: "bg-indigo-500", pct: 80 },
                ].map((insight) => (
                  <div key={insight.label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{insight.label}</span>
                      <span className="font-medium text-foreground">
                        {insight.value} / {insight.target}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full glass-subtle">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={cn("h-full rounded-full", insight.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl sm:p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                اقتراحات لك
              </h3>

              <div className="space-y-3">
                {recommendedContent.map((content) => (
                  <div
                    key={content.title}
                    className={cn(
                      "relative overflow-hidden rounded-xl border border-border-glass bg-gradient-to-br p-4",
                      content.color
                    )}
                  >
                    <div className="relative z-10">
                      <content.icon className="mb-2 h-6 w-6 text-foreground/70" />
                      <h4 className="text-sm font-semibold text-foreground">
                        {content.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {content.desc}
                      </p>
                      <button className="mt-3 w-full rounded-lg bg-foreground/10 px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-foreground/20">
                        {content.btnText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl sm:p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                <MessageSquare className="h-5 w-5 text-emerald-500" />
                المجتمع
              </h3>

              <div className="space-y-3">
                {[
                  { user: "مجهول", preview: "أنهيت أول تمرين CBT...", time: "قبل ساعة" },
                  { user: "سامر", preview: "تمارين التنفس ساعدتني اليوم", time: "قبل ٣ ساعات" },
                  { user: "لمى", preview: "ممتنة لهذا المجتمع 🤍", time: "قبل ٥ ساعات" },
                ].map((post) => (
                  <div
                    key={post.preview}
                    className="rounded-xl glass-subtle p-3 transition-all hover:glass-strong"
                  >
                    <p className="text-xs font-medium text-primary">
                      {post.user}
                    </p>
                    <p className="mt-0.5 text-sm text-foreground line-clamp-2">
                      {post.preview}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {post.time}
                    </p>
                  </div>
                ))}
                <button className="w-full rounded-xl border border-border-glass py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-glass-white/50 hover:text-foreground">
                  انضم للمجتمع
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
