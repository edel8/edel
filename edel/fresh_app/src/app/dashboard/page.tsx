"use client";

import { motion } from "framer-motion";
import { Heart, Brain, TrendingUp, Moon, Sparkles, Activity } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  { label: "المزاج الحالي", value: "٧", icon: Heart },
  { label: "مستوى الطاقة", value: "٦", icon: TrendingUp },
  { label: "مستوى التوتر", value: "٤", icon: Brain },
  { label: "جودة النوم", value: "٧.٥", icon: Moon },
];

const weekMoods = [
  { day: "السبت", value: 7 },
  { day: "الأحد", value: 5 },
  { day: "الإثنين", value: 4 },
  { day: "الثلاثاء", value: 7 },
  { day: "الأربعاء", value: 8 },
  { day: "الخميس", value: 7 },
  { day: "الجمعة", value: 9 },
];

const quickActions = [
  { label: "سجل مزاجك", href: "#" },
  { label: "تمارين CBT", href: "#" },
  { label: "ألعاب ذهنية", href: "#" },
  { label: "مجتمع", href: "#" },
  { label: "تعلم", href: "#" },
];

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "صباح الخير" : "مساء الخير";

  const dateStr = new Date().toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <motion.div variants={item} className="mb-10">
          <h1 className="font-serif text-[32px] leading-tight text-[#111111]">
            {greeting}
          </h1>
          <p className="mt-1 font-serif text-[32px] leading-tight text-[#111111] opacity-40">
            {dateStr}
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="rounded-[24px] border border-[#EAEAEA] bg-white p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F5F0] border border-[#EAEAEA]">
                <stat.icon className="h-5 w-5 text-[#111111]" />
              </div>
              <p className="text-[32px] font-bold leading-none text-[#111111]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="mb-8 rounded-[24px] border border-[#EAEAEA] bg-white p-6"
        >
          <h2 className="mb-8 font-serif text-xl text-[#111111]">
            مزاجك هذا الأسبوع
          </h2>
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#111111] -translate-y-1/2" />
            <div className="relative flex justify-between">
              {weekMoods.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <div
                    className={`relative z-10 h-3 w-3 rounded-full border-2 border-[#111111] ${
                      day.value >= 6 ? "bg-[#111111]" : "bg-white"
                    }`}
                  />
                  <span className="text-sm text-muted-foreground">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            variants={item}
            className="rounded-[24px] border border-[#EAEAEA] bg-white p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="font-serif text-xl text-[#111111]">
                ٦ أيام متتالية
              </span>
              <span>🔥</span>
            </div>
            <div className="relative h-[2px] w-full bg-[#EAEAEA]">
              <div
                className="absolute inset-y-0 left-0 bg-[#111111] transition-all"
                style={{ width: "60%" }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-[24px] border border-[#EAEAEA] bg-white p-6"
          >
            <h3 className="mb-4 font-serif text-xl text-[#111111]">
              إجراءات سريعة
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="text-sm text-[#111111] underline-offset-2 hover:underline transition-all"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          variants={item}
          className="text-center text-xs text-muted-foreground"
        >
          صمم وطور بجهد شخصي بواسطة عادل الخالدي
        </motion.p>
      </motion.div>
    </div>
  );
}
