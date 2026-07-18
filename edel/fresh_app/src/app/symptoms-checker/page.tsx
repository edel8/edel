"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Brain,
  AlertTriangle,
  Activity,
  Moon,
  Sun,
  Droplets,
  Headphones,
  Wind,
  Eye,
  Coffee,
  Smile,
  Frown,
  Zap,
  Thermometer,
  Shield,
  BatteryWarning,
  BedDouble,
  Utensils,
  Sparkles,
  Stethoscope,
  Search,
  ChevronDown,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SYMPTOMS = [
  { id: "sadness", label: "حزن مستمر", icon: Frown, category: "مشاعر" },
  { id: "anxiety", label: "قلق وتوتر", icon: Zap, category: "مشاعر" },
  { id: "anger", label: "غضب سريع", icon: BatteryWarning, category: "مشاعر" },
  { id: "hopelessness", label: "فقدان الأمل", icon: Heart, category: "مشاعر" },
  { id: "loneliness", label: "شعور بالوحدة", icon: Smile, category: "مشاعر" },
  { id: "guilt", label: "شعور بالذنب", icon: Heart, category: "مشاعر" },
  { id: "numbness", label: "خدر عاطفي", icon: Snowflake, category: "مشاعر" },

  { id: "sleep", label: "اضطرابات النوم", icon: Moon, category: "جسدية" },
  { id: "fatigue", label: "إرهاق مزمن", icon: BatteryWarning, category: "جسدية" },
  { id: "appetite", label: "تغير في الشهية", icon: Utensils, category: "جسدية" },
  { id: "headache", label: "صداع متكرر", icon: Brain, category: "جسدية" },
  { id: "muscle", label: "آلام عضلية", icon: Activity, category: "جسدية" },
  { id: "heart", label: "خفقان القلب", icon: Heart, category: "جسدية" },
  { id: "digestion", label: "مشاكل هضمية", icon: Droplets, category: "جسدية" },
  { id: "dizziness", label: "دوار", icon: Wind, category: "جسدية" },
  { id: "sweating", label: "تعرق زائد", icon: Droplets, category: "جسدية" },

  { id: "concentration", label: "صعوبة التركيز", icon: Eye, category: "ذهنية" },
  { id: "memory", label: "ضعف الذاكرة", icon: Brain, category: "ذهنية" },
  { id: "intrusive", label: "أفكار متطفلة", icon: AlertTriangle, category: "ذهنية" },
  { id: "indecision", label: "تردد مستمر", icon: Search, category: "ذهنية" },
  { id: "negative", label: "أفكار سلبية", icon: Frown, category: "ذهنية" },
  { id: "overthinking", label: "تفكير مفرط", icon: RefreshCw, category: "ذهنية" },

  { id: "social", label: "انسحاب اجتماعي", icon: MessageCircle, category: "سلوكية" },
  { id: "procrastination", label: "تسويف", icon: Coffee, category: "سلوكية" },
  { id: "restlessness", label: "تململ حركي", icon: Activity, category: "سلوكية" },
  { id: "avoidance", label: "تجنب المواقف", icon: Shield, category: "سلوكية" },
];

const CATEGORIES = ["الكل", "مشاعر", "جسدية", "ذهنية", "سلوكية"];

const MOOD_ICONS = ["😊", "🙂", "😐", "😢", "😰"];

function Snowflake(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M12 2v20M12 12l-8-8M12 12l8-8M12 12l-8 8M12 12l8 8" />
    </svg>
  );
}

export default function SymptomsCheckerPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [category, setCategory] = useState("الكل");
  const [showResult, setShowResult] = useState(false);
  const [mood, setMood] = useState<number | null>(null);

  const toggleSymptom = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowResult(false);
  };

  const filteredSymptoms = category === "الكل"
    ? SYMPTOMS
    : SYMPTOMS.filter((s) => s.category === category);

  const handleCheck = () => {
    if (selected.length > 0) setShowResult(true);
  };

  const handleReset = () => {
    setSelected([]);
    setShowResult(false);
    setMood(null);
  };

  const possibleConditions = selected.length > 0
    ? [
        "التوتر والقلق العام",
        "اضطراب المزاج",
        "الإرهاق النفسي",
      ]
    : [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-mist-50 via-lavender-50/30 to-rose-50/20 dark:from-mist-900 dark:via-lavender-900/20 dark:to-rose-900/10">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #9b8cff 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f43f5e 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender-100 px-4 py-1.5 text-xs font-medium text-lavender-700 dark:bg-lavender-900/30 dark:text-lavender-300">
            <Search className="h-3.5 w-3.5" /> استكشاف المشاعر
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            مدقق الأعراض
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            ليس هذا تشخيصاً طبياً. هذا مجرد فضاء لفهم مشاعرك بشكل أفضل. استشر مختصاً للحصول على تشخيص دقيق.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                category === cat
                  ? "bg-lavender-500 text-white shadow-lg shadow-lavender-500/25"
                  : "glass-subtle text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong mb-8 rounded-3xl p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              اختر ما تشعر به (يمكنك اختيار أكثر من عرض)
            </p>
            <p className="text-xs text-muted-foreground">
              {selected.length} {selected.length === 1 ? "عرض" : "أعراض"} مختارة
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {filteredSymptoms.map((symptom, i) => {
              const isSelected = selected.includes(symptom.id);
              return (
                <motion.button
                  key={symptom.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-2xl p-3 text-right text-sm font-medium transition-all duration-200",
                    isSelected
                      ? "bg-lavender-500/15 text-lavender-700 ring-2 ring-lavender-500/40 dark:bg-lavender-500/20 dark:text-lavender-300"
                      : "glass-subtle text-muted-foreground hover:text-foreground hover:shadow-sm"
                  )}
                >
                  <span className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                    isSelected ? "bg-lavender-500 text-white" : "bg-glass-white text-muted-foreground"
                  )}>
                    <symptom.icon className="h-4 w-4" />
                  </span>
                  <span className="leading-tight">{symptom.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {selected.length > 0 && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-8 flex justify-center"
            >
              <button
                onClick={handleCheck}
                className="inline-flex items-center gap-2.5 rounded-2xl bg-lavender-500 px-8 py-3.5 text-base font-medium text-white shadow-xl shadow-lavender-500/30 transition-all duration-300 hover:bg-lavender-600 hover:shadow-lavender-500/40 active:scale-[0.97]"
              >
                <Stethoscope className="h-5 w-5" />
                تحقق من الأعراض
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-8 overflow-hidden rounded-3xl"
            >
              <div className="relative bg-gradient-to-br from-lavender-500/20 via-rose-500/10 to-warm-500/20 p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,140,255,0.15),transparent_70%)]" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lavender-500/20"
                >
                  <AlertTriangle className="h-7 w-7 text-lavender-600" />
                </motion.div>
                <div className="relative">
                  <p className="text-lg font-medium text-foreground">
                    الأعراض التي ذكرتها قد تكون مرتبطة بـ:
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {possibleConditions.map((cond, i) => (
                      <motion.span
                        key={cond}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="rounded-full bg-lavender-500/15 px-4 py-1.5 text-sm font-medium text-lavender-700 dark:bg-lavender-500/20 dark:text-lavender-300"
                      >
                        {cond}
                      </motion.span>
                    ))}
                  </div>
                  <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-rose-200/50 bg-rose-50/80 p-4 backdrop-blur-sm dark:border-rose-900/30 dark:bg-rose-900/20">
                    <p className="text-sm leading-relaxed text-rose-700 dark:text-rose-300">
                      ⚠️ هذا ليس تشخيصاً طبياً. هذه مجرد ملاحظات عامة بناءً على الأعراض التي اخترتها.
                      ننصحك بشدة بزيارة أخصائي الصحة النفسية للحصول على تقييم دقيق.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-b-3xl p-6">
                <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
                  كيف كان شعورك بعد هذه الملاحظات؟
                </p>
                <div className="flex justify-center gap-2">
                  {["ممتاز", "جيد", "مقبول", "سيء", "صعب"].map((label, i) => (
                    <button
                      key={label}
                      onClick={() => setMood(i)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-xs transition-all duration-200",
                        mood === i
                          ? "bg-lavender-500/15 text-lavender-700 ring-2 ring-lavender-500/40"
                          : "glass-subtle text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="text-xl">{MOOD_ICONS[i]}</span>
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl border border-border-glass px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-glass-white hover:text-foreground"
                  >
                    <RefreshCw className="h-4 w-4" /> ابدأ من جديد
                  </button>
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-500/10 px-5 py-2.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-rose-500/20"
                  >
                    <Heart className="h-4 w-4" /> أحتاج دعماً
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl border border-amber-200/50 bg-amber-50/60 p-5 text-center backdrop-blur-sm dark:border-amber-900/30 dark:bg-amber-900/20"
        >
          <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
            <Shield className="h-4 w-4" />
            <p className="text-xs font-medium">
              تنويه مهم: هذا المدقق ليس بديلاً عن الاستشارة النفسية المهنية. إذا كنت تعاني من أعراض حادة،
              يرجى التواصل مع أخصائي صحي نفسي أو الاتصال على خط الدعم ١١٣.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
