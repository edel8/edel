"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  Wind,
  Puzzle,
  Gamepad2,
  Clock,
  Star,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const GAMES = [
  {
    id: "memory",
    title: "الذاكرة",
    description: "لعبة بطاقات الذاكرة: اقلب البطاقات وتذكر أماكن الرموز المتطابقة. درب ذاكرتك البصرية.",
    icon: Brain,
    difficulty: "متوسط",
    time: "٥-١٠ دقائق",
    color: "from-lavender-500/20 to-lavender-600/10",
    iconBg: "bg-lavender-500/15 text-lavender-600",
    gradient: "from-lavender-500 to-purple-500",
  },
  {
    id: "focus",
    title: "التركيز",
    description: "اختبار الانتباه البصري: ابحث عن الرمز المختلف في شبكة من الرموز. حسّن تركيزك.",
    icon: Eye,
    difficulty: "صعب",
    time: "٣-٥ دقائق",
    color: "from-amber-500/20 to-amber-600/10",
    iconBg: "bg-amber-500/15 text-amber-600",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "breathing",
    title: "التنفس",
    description: "تمارين التنفس العميق: اتبع الدائرة التي تتوسع وتنكمش لتهدئة عقلك وجسدك.",
    icon: Wind,
    difficulty: "سهل",
    time: "٢-١٠ دقائق",
    color: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/15 text-emerald-600",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "puzzles",
    title: "الألغاز",
    description: "مجموعة من الألغاز المنطقية والأحجيات لتنشيط العقل وتحفيز التفكير الإبداعي.",
    icon: Puzzle,
    difficulty: "متوسط",
    time: "١٠-١٥ دقيقة",
    color: "from-rose-500/20 to-rose-600/10",
    iconBg: "bg-rose-500/15 text-rose-600",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: "stroop",
    title: "اختبار ستروب",
    description: "التحدي الكلاسيكي: قل لون الخط وليس اسم اللون. اختبر سرعة معالجة عقلك.",
    icon: Gamepad2,
    difficulty: "صعب",
    time: "٢-٣ دقائق",
    color: "from-cyan-500/20 to-cyan-600/10",
    iconBg: "bg-cyan-500/15 text-cyan-600",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};

export default function GamesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-lavender-50/30 via-mist-50/40 to-emerald-50/30 dark:from-lavender-950/20 dark:via-mist-950/30 dark:to-emerald-950/20">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(to right, #9b8cff 1px, transparent 1px), linear-gradient(to bottom, #9b8cff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <Gamepad2 className="h-3.5 w-3.5" /> العب وتعلم
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            ألعاب تنشيط الدماغ
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            ألعاب وتحديات عقلية مصممة لتنشيط ذهنك، تحسين تركيزك، ومساعدتك على الاسترخاء.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {GAMES.map((game, i) => {
            const Icon = game.icon;
            const isMain = i === 0;
            return (
              <Link key={game.id} href={`/games/${game.id}`} className={cn(isMain && "sm:col-span-2 lg:col-span-2 lg:row-span-1")}>
                <motion.div
                  variants={item}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 200, damping: 15 } }}
                  className={cn(
                    "glass-strong group relative h-full overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:shadow-xl sm:p-8",
                    isMain && "flex flex-col sm:flex-row sm:items-center sm:gap-8"
                  )}
                >
                  <div className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    game.color
                  )} />

                  <div className={cn(
                    "relative mb-5 flex items-center justify-center",
                    isMain && "sm:mb-0 sm:w-28"
                  )}>
                    <div className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500 group-hover:scale-110",
                      game.iconBg
                    )}>
                      <Icon className="h-10 w-10" />
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-serif text-2xl font-semibold text-foreground">{game.title}</h2>
                      <Sparkles className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {game.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                        game.difficulty === "سهل" && "bg-emerald-500/10 text-emerald-600",
                        game.difficulty === "متوسط" && "bg-amber-500/10 text-amber-600",
                        game.difficulty === "صعب" && "bg-rose-500/10 text-rose-600",
                      )}>
                        <Star className="h-3 w-3" /> {game.difficulty}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mist-500/10 px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" /> {game.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
