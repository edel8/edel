"use client";

import { motion } from "framer-motion";
import { Heart, TrendingUp, Brain, Moon } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  { label: "المزاج الحالي", value: "7", icon: Heart },
  { label: "مستوى الطاقة", value: "6", icon: TrendingUp },
  { label: "مستوى التوتر", value: "4", icon: Brain },
  { label: "جودة النوم", value: "7.5", icon: Moon },
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
  let greeting: string;
  if (hour >= 5 && hour < 12) greeting = "صباح الخير";
  else if (hour >= 12 && hour < 18) greeting = "مساء الخير";
  else greeting = "مساء الخير";

  const dateStr = new Date().toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const monthYear = new Date().toLocaleDateString("ar-SA", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={item} className="relative mb-10">
          <div className="absolute -top-2 -left-2 rotate-[-8deg] rounded-md border-2 border-[#111111] border-double px-3 py-1 text-[11px] font-bold text-[#111111] opacity-25 leading-none select-none">
            Edel · {monthYear}
          </div>
          <h1 className="font-sans text-[32px] font-semibold leading-tight text-[#111111]">
            {greeting}
          </h1>
          <p className="mt-1 font-sans text-[32px] font-light leading-tight text-[#111111] opacity-40">
            {dateStr}
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-[24px] border border-[#EAEAEA] bg-white p-5 cursor-default"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#111111]">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="font-sans text-[32px] font-bold leading-none text-[#111111]">
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-sm text-[#6B6B6B]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="mb-8 rounded-[24px] border border-[#EAEAEA] bg-white p-6"
        >
          <h2 className="mb-8 font-sans text-xl font-semibold text-[#111111]">
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
                  <span className="font-sans text-sm text-[#6B6B6B]">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative rounded-[24px] border border-[#EAEAEA] bg-white p-6 overflow-hidden"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "0 24px 24px 0",
                borderColor: "transparent #EAEAEA transparent transparent",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "0 23px 23px 0",
                borderColor: "transparent #FFFCF5 transparent transparent",
              }}
            />

            <div className="mb-4 flex items-center gap-2">
              <span className="font-sans text-xl font-semibold text-[#111111]">
                6 أيام متتالية
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
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-[24px] border border-[#EAEAEA] bg-white p-6"
          >
            <h3 className="mb-4 font-sans text-xl font-semibold text-[#111111]">
              إجراءات سريعة
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="font-sans text-sm text-[#111111] underline-offset-2 hover:underline transition-all"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <svg
          className="mx-auto mb-6 h-4 w-32 text-[#111111] opacity-[0.07]"
          viewBox="0 0 100 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5 C20 2, 30 8, 50 5 S70 8, 98 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M5 7 C25 3, 35 9, 55 6 S75 9, 95 6"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>

        <motion.p
          variants={item}
          className="font-sans text-center text-xs text-[#6B6B6B]"
        >
          صمم وطور بجهد شخصي بواسطة عادل الخالدي
        </motion.p>
      </motion.div>
    </div>
  );
}
