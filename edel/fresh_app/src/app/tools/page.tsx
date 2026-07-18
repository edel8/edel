"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smile,
  Frown,
  Meh,
  Angry,
  Heart,
  BookOpen,
  Sparkles,
  Wind,
  Save,
  Trash2,
  Sun,
  Moon,
  Sunset,
  Cloud,
  Star,
  Clock,
  RefreshCw,
  Gift,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOOD_EMOJIS = [
  { emoji: "😢", label: "سيء جداً", value: 1, icon: Angry, color: "text-rose-500 bg-rose-500/10" },
  { emoji: "😞", label: "سيء", value: 2, icon: Frown, color: "text-orange-500 bg-orange-500/10" },
  { emoji: "😐", label: "متوسط", value: 3, icon: Meh, color: "text-amber-500 bg-amber-500/10" },
  { emoji: "🙂", label: "جيد", value: 4, icon: Smile, color: "text-emerald-500 bg-emerald-500/10" },
  { emoji: "😊", label: "ممتاز", value: 5, icon: Heart, color: "text-emerald-500 bg-emerald-500/10" },
];

const GRATITUDE_SUGGESTIONS = [
  "نعمة الصحة والعافية",
  "الأشخاص الذين يحبونني",
  "شروق الشمس كل يوم",
  "القوة الداخلية التي أملكها",
  "اللحظات الصغيرة الجميلة",
  "القدرة على التعلم والنمو",
  "الأمل الذي لا يموت",
  "الأصدقاء الحقيقيون",
];

const BREATHING_PHASES = [
  { label: "شهيق", duration: 4, tip: "ادخل الهواء ببطء من الأنف" },
  { label: "احبس", duration: 4, tip: "احبس النفس براحة" },
  { label: "زفير", duration: 6, tip: "أخرج الهواء ببطء من الفم" },
];

function BreathingCircle() {
  const [active, setActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    const phase = BREATHING_PHASES[phaseIdx];
    timerRef.current = setTimeout(() => {
      setPhaseIdx((prev) => (prev + 1) % BREATHING_PHASES.length);
    }, phase.duration * 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, phaseIdx]);

  const phase = BREATHING_PHASES[phaseIdx];
  const progress = phase ? (1 / BREATHING_PHASES.length) * phaseIdx : 0;

  const handleToggle = () => {
    if (active) {
      setActive(false);
      setPhaseIdx(0);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setActive(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-44 w-44 items-center justify-center">
        <motion.div
          animate={{
            scale: phase?.label === "شهيق" ? 1.6 : phase?.label === "احبس" ? 1.8 : 1,
            opacity: active ? 1 : 0.5,
          }}
          transition={{ duration: phase?.duration || 0, ease: "easeInOut" }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/30"
        >
          <span className="text-center">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">{phase?.label}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{phase?.duration} ثوانٍ</p>
          </span>
        </motion.div>
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: phase?.label === "شهيق" ? 1.6 : phase?.label === "احبس" ? 1.8 : 1,
              opacity: active ? 0.15 : 0.05,
            }}
            transition={{ duration: phase?.duration || 0, ease: "easeInOut" }}
            className="h-full w-full rounded-full bg-emerald-400 blur-2xl"
          />
        </div>
      </div>
      <button
        onClick={handleToggle}
        className={cn(
          "rounded-2xl px-6 py-2.5 text-sm font-medium transition-all",
          active
            ? "border border-border-glass text-muted-foreground hover:bg-glass-white"
            : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600"
        )}
      >
        {active ? "إيقاف" : "ابدأ التنفس"}
      </button>
    </div>
  );
}

export default function ToolsPage() {
  const [mood, setMood] = useState<number>(3);
  const [savedMood, setSavedMood] = useState<{ value: number; date: string }[]>([]);
  const [journal, setJournal] = useState("");
  const [savedJournal, setSavedJournal] = useState("");
  const [gratitudes, setGratitudes] = useState<string[]>([]);
  const [gratitudeInput, setGratitudeInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("edel_mood_history");
    if (saved) setSavedMood(JSON.parse(saved));
    const journalEntry = localStorage.getItem("edel_journal");
    if (journalEntry) setSavedJournal(journalEntry);
    const grats = localStorage.getItem("edel_gratitudes");
    if (grats) setGratitudes(JSON.parse(grats));
  }, []);

  const saveMood = () => {
    const entry = { value: mood, date: new Date().toISOString() };
    const updated = [...savedMood, entry];
    setSavedMood(updated);
    localStorage.setItem("edel_mood_history", JSON.stringify(updated));
  };

  const saveJournal = () => {
    setSavedJournal(journal);
    localStorage.setItem("edel_journal", journal);
  };

  const addGratitude = () => {
    if (!gratitudeInput.trim()) return;
    const updated = [...gratitudes, gratitudeInput.trim()];
    setGratitudes(updated);
    localStorage.setItem("edel_gratitudes", JSON.stringify(updated));
    setGratitudeInput("");
  };

  const removeGratitude = (idx: number) => {
    const updated = gratitudes.filter((_, i) => i !== idx);
    setGratitudes(updated);
    localStorage.setItem("edel_gratitudes", JSON.stringify(updated));
  };

  const clearAll = () => {
    localStorage.removeItem("edel_mood_history");
    localStorage.removeItem("edel_journal");
    localStorage.removeItem("edel_gratitudes");
    setSavedMood([]);
    setSavedJournal("");
    setGratitudes([]);
  };

  const todayEntries = savedMood.filter(
    (e) => new Date(e.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-warm-50/40 via-mist-50/30 to-emerald-50/40 dark:from-warm-950/20 dark:via-mist-950/30 dark:to-emerald-950/20">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, #f5d99e 0%, transparent 40%), radial-gradient(circle at 80% 70%, #6bd4a0 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-1.5 text-xs font-medium text-warm-700 dark:bg-warm-900/30 dark:text-warm-300">
            <Sparkles className="h-3.5 w-3.5" /> أدواتك اليومية
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            أدوات يومية
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            أدوات بسيطة لتتبع مزاجك، كتابة مشاعرك، وممارسة الامتنان. كل شيء يبقى في متصفحك.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                <Smile className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-medium text-foreground">متتبع المزاج</h2>
                <p className="text-xs text-muted-foreground">كيف تشعر الآن؟</p>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              {MOOD_EMOJIS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl p-3 text-sm transition-all duration-200",
                    mood === m.value
                      ? m.color + " ring-2 ring-offset-2 ring-offset-transparent"
                      : "glass-subtle text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[10px]">{m.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button onClick={saveMood} className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-amber-600">
                <Save className="h-3.5 w-3.5" /> احفظ
              </button>
              {todayEntries.length > 0 && (
                <span className="text-[11px] text-muted-foreground">
                  سُجل {todayEntries.length} مرة اليوم
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-500/15 text-lavender-600">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-medium text-foreground">المذكرات</h2>
                <p className="text-xs text-muted-foreground">اكتب ما في داخلك</p>
              </div>
            </div>
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="اكتب أفكارك ومشاعرك هنا..."
              rows={4}
              className="glass-input w-full resize-none rounded-2xl text-sm"
              dir="rtl"
            />
            <div className="mt-3 flex items-center justify-between">
              <button onClick={saveJournal} disabled={!journal.trim()} className="inline-flex items-center gap-1.5 rounded-xl bg-lavender-500 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-lavender-600 disabled:opacity-40">
                <Save className="h-3.5 w-3.5" /> احفظ
              </button>
              {savedJournal && (
                <span className="text-[11px] text-muted-foreground">تم الحفظ ✓</span>
              )}
            </div>
            {savedJournal && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-2xl bg-mist-50 p-3 dark:bg-mist-800/30">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" /> آخر تدوينة
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground line-clamp-3">{savedJournal}</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                <Gift className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-medium text-foreground">قائمة الامتنان</h2>
                <p className="text-xs text-muted-foreground">عدّد ٣ أشياء أنت ممتن لها</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                value={gratitudeInput}
                onChange={(e) => setGratitudeInput(e.target.value)}
                placeholder="أنا ممتن لـ..."
                className="glass-input flex-1 rounded-2xl text-sm"
              />
              <button onClick={addGratitude} disabled={!gratitudeInput.trim()} className="rounded-2xl bg-emerald-500 px-4 text-white transition-all hover:bg-emerald-600 disabled:opacity-40">
                +
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {GRATITUDE_SUGGESTIONS.filter((s) => !gratitudes.includes(s)).slice(0, 3).map((s) => (
                <button key={s} onClick={() => { setGratitudeInput(s); }} className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-600 transition-all hover:bg-emerald-500/20">
                  + {s}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {gratitudes.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2">
                  {gratitudes.map((g, i) => (
                    <motion.div
                      key={g + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between rounded-xl bg-emerald-500/10 p-2.5 text-xs text-emerald-700 dark:text-emerald-300"
                    >
                      <span className="flex items-center gap-2">
                        <Star className="h-3 w-3" /> {g}
                      </span>
                      <button onClick={() => removeGratitude(i)} className="text-emerald-500/50 hover:text-emerald-600">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                <Wind className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-medium text-foreground">تمارين التنفس</h2>
                <p className="text-xs text-muted-foreground">٣-٤-٥: شهيق، احبس، زفير أطول</p>
              </div>
            </div>
            <BreathingCircle />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-border-glass px-5 py-2.5 text-xs text-muted-foreground transition-all hover:bg-glass-white hover:text-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" /> مسح جميع البيانات المحفوظة
          </button>
          <p className="mt-2 text-[10px] text-muted-foreground">
            جميع البيانات تُحفظ في متصفحك فقط (LocalStorage)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
