"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  RotateCcw,
  Brain,
  Eye,
  Wind,
  Puzzle,
  Gamepad2,
  Clock,
  Star,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const GAME_META: Record<string, { title: string; icon: React.ElementType; color: string; gradient: string }> = {
  memory: { title: "الذاكرة", icon: Brain, color: "text-lavender-600 bg-lavender-500/15", gradient: "from-lavender-500 to-purple-500" },
  focus: { title: "التركيز", icon: Eye, color: "text-amber-600 bg-amber-500/15", gradient: "from-amber-500 to-orange-500" },
  breathing: { title: "التنفس", icon: Wind, color: "text-emerald-600 bg-emerald-500/15", gradient: "from-emerald-500 to-teal-500" },
  puzzles: { title: "الألغاز", icon: Puzzle, color: "text-rose-600 bg-rose-500/15", gradient: "from-rose-500 to-pink-500" },
  stroop: { title: "اختبار ستروب", icon: Gamepad2, color: "text-cyan-600 bg-cyan-500/15", gradient: "from-cyan-500 to-blue-500" },
};

const CARD_SYMBOLS = ["🌸", "🌺", "⭐", "🌙", "🌿", "🍃", "💜", "✨", "🌈", "🌊", "🔥", "🍀"];
const STROOP_COLORS = ["أحمر", "أزرق", "أخضر", "أصفر", "بنفسجي"] as const;
const COLOR_MAP: Record<string, string> = {
  أحمر: "#ef4444",
  أزرق: "#3b82f6",
  أخضر: "#22c55e",
  أصفر: "#eab308",
  بنفسجي: "#a855f7",
};
const COLOR_NAME_MAP: Record<string, string> = {
  ef4444: "أحمر",
  "3b82f6": "أزرق",
  "22c55e": "أخضر",
  eab308: "أصفر",
  a855f7: "بنفسجي",
};

/* ==================== MEMORY GAME ==================== */
function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; symbol: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number>(0);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const pairs = 6;
    const symbols = CARD_SYMBOLS.slice(0, pairs);
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }));
    setCards(deck);
    setFlipped([]);
    setMatched(0);
    setMoves(0);
    setWon(false);
  };

  const handleFlip = (id: number) => {
    if (lock || won) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLock(true);
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((fid) => newCards.find((c) => c.id === fid)!);
      if (first.symbol === second.symbol) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === first.id || c.id === second.id ? { ...c, matched: true } : c)));
          setMatched((m) => m + 2);
          setFlipped([]);
          setLock(false);
          if (matched + 2 === cards.length) setWon(true);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (newFlipped.includes(c.id) ? { ...c, flipped: false } : c)));
          setFlipped([]);
          setLock(false);
        }, 800);
      }
    }
  };

  return (
    <div className="text-center">
      <div className="mb-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <span>الحركات: {moves}</span>
        <span>التطابقات: {matched / 2} / 6</span>
        <button onClick={initGame} className="inline-flex items-center gap-1.5 rounded-xl border border-border-glass px-3 py-1.5 text-xs hover:bg-glass-white">
          <RotateCcw className="h-3.5 w-3.5" /> إعادة
        </button>
      </div>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex aspect-square items-center justify-center rounded-2xl text-3xl font-bold transition-all duration-300",
              card.matched
                ? "bg-emerald-500/20 text-emerald-600 opacity-60"
                : card.flipped
                  ? "glass-strong shadow-lg"
                  : "glass-subtle hover:glass-strong cursor-pointer"
            )}
          >
            <AnimatePresence mode="wait">
              {card.flipped || card.matched ? (
                <motion.span key="front" initial={{ scale: 0, rotateY: 180 }} animate={{ scale: 1, rotateY: 0 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
                  {card.symbol}
                </motion.span>
              ) : (
                <motion.span key="back" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
                  <Brain className="h-6 w-6 text-muted-foreground" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {won && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-5 py-3 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" /> تهانينا! أكملت اللعبة في {moves} حركة
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==================== BREATHING EXERCISE ==================== */
function BreathingGame() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [duration, setDuration] = useState(4);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startBreathing = () => {
    setPhase("inhale");
  };

  useEffect(() => {
    if (phase === "idle") return;
    if (phase === "inhale") {
      timerRef.current = setTimeout(() => setPhase("hold"), duration * 1000);
    } else if (phase === "hold") {
      timerRef.current = setTimeout(() => setPhase("exhale"), duration * 1000);
    } else {
      timerRef.current = setTimeout(() => setPhase("inhale"), duration * 1000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, duration]);

  const stopBreathing = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("idle");
  };

  const phaseLabel = phase === "idle" ? "اضغط للبدء" : phase === "inhale" ? "شهيق" : phase === "hold" ? "احبس النفس" : "زفير";
  const scale = phase === "inhale" ? 1.8 : phase === "hold" ? 2 : phase === "exhale" ? 0.6 : 1;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-2">
        {[3, 4, 5].map((n) => (
          <button key={n} onClick={() => setDuration(n)} className={cn("rounded-full px-4 py-1.5 text-xs font-medium transition-all", duration === n ? "bg-emerald-500 text-white" : "glass-subtle")}>
            {n} ثوانٍ
          </button>
        ))}
      </div>
      <div className="relative flex h-72 w-72 items-center justify-center">
        <motion.div
          animate={{ scale }}
          transition={{ duration: phase === "idle" ? 0 : duration, ease: "easeInOut" }}
          className={cn(
            "flex h-36 w-36 items-center justify-center rounded-full transition-colors duration-500",
            phase === "inhale" ? "bg-emerald-400/30" : phase === "hold" ? "bg-emerald-500/40" : phase === "exhale" ? "bg-sky-400/30" : "bg-mist-300/30"
          )}
        >
          <motion.div
            animate={{ scale: phase === "idle" ? 1 : 0.7 }}
            className="text-center"
          >
            <p className="text-sm font-medium text-foreground">{phaseLabel}</p>
            {phase !== "idle" && (
              <motion.p key={phase} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground">
                {phase === "inhale" ? "ادخل الهواء ببطء" : phase === "hold" ? "احبس براحة" : "أخرج الهواء بهدوء"}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: phase === "idle" ? 1 : scale * 1.1, opacity: phase === "idle" ? 0.3 : 0.15 }}
            transition={{ duration: phase === "idle" ? 0 : duration, ease: "easeInOut" }}
            className="h-full w-full rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-xl"
          />
        </div>
      </div>
      <div className="mt-6">
        {phase === "idle" ? (
          <button onClick={startBreathing} className="rounded-2xl bg-emerald-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600">
            ابدأ التمرين
          </button>
        ) : (
          <button onClick={stopBreathing} className="rounded-2xl border border-border-glass px-6 py-2.5 text-sm font-medium text-muted-foreground hover:bg-glass-white">
            إيقاف
          </button>
        )}
      </div>
    </div>
  );
}

/* ==================== STROOP TEST ==================== */
function StroopGame() {
  const [current, setCurrent] = useState({ word: "", color: "" });
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [started, setStarted] = useState(false);

  const generate = useCallback(() => {
    const wordIdx = Math.floor(Math.random() * STROOP_COLORS.length);
    let colorIdx = Math.floor(Math.random() * STROOP_COLORS.length);
    while (colorIdx === wordIdx) colorIdx = Math.floor(Math.random() * STROOP_COLORS.length);
    const word = STROOP_COLORS[wordIdx];
    const color = STROOP_COLORS[colorIdx];
    setCurrent({ word, color });
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (started) generate();
  }, [started, generate]);

  const handleAnswer = (answer: string) => {
    if (!started) return;
    const correct = answer === current.color;
    setFeedback(correct ? "correct" : "wrong");
    setScore((s) => s + (correct ? 1 : 0));
    setTotal((t) => t + 1);
    setTimeout(generate, 600);
  };

  return (
    <div className="text-center">
      {!started ? (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">قل لون الخط (وليس اسم اللون المكتوب)</p>
          <button onClick={() => setStarted(true)} className="rounded-2xl bg-cyan-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-600">
            ابدأ التحدي
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>النقاط: {score}/{total}</span>
            <button onClick={() => { setScore(0); setTotal(0); setStarted(false); }} className="rounded-xl border border-border-glass px-3 py-1 text-xs hover:bg-glass-white">
              <RotateCcw className="inline h-3 w-3" /> إعادة
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={current.word} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
              <p className="mb-6 text-6xl font-bold" style={{ color: COLOR_MAP[current.color] }}>{current.word}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-wrap justify-center gap-2">
            {STROOP_COLORS.map((c) => (
              <button key={c} onClick={() => handleAnswer(c)} className="rounded-xl border-2 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105" style={{ borderColor: COLOR_MAP[c], color: COLOR_MAP[c], backgroundColor: `${COLOR_MAP[c]}10` }}>
                {c}
              </button>
            ))}
          </div>
          {feedback && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("mt-4 text-sm font-medium", feedback === "correct" ? "text-emerald-500" : "text-rose-500")}>
              {feedback === "correct" ? "✅ إجابة صحيحة!" : "❌ إجابة خاطئة"}
            </motion.p>
          )}
        </>
      )}
    </div>
  );
}

/* ==================== FOCUS GAME ==================== */
function FocusGame() {
  const [grid, setGrid] = useState<{ emoji: string; isDifferent: boolean }[][]>([]);
  const [found, setFound] = useState(false);
  const [level, setLevel] = useState(1);
  const [started, setStarted] = useState(false);

  const generateGrid = useCallback((lvl: number) => {
    const size = lvl + 2;
    const baseEmojis = ["🌸", "🌺", "🌻", "🌷", "🌹", "🍀", "🌿", "⭐"];
    const base = baseEmojis[lvl % baseEmojis.length];
    const different = lvl % 2 === 0 ? "💜" : "🌟";
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    const newGrid = Array.from({ length: size }, (_, ri) =>
      Array.from({ length: size }, (_, ci) => ({
        emoji: ri === r && ci === c ? different : base,
        isDifferent: ri === r && ci === c,
      }))
    );
    setGrid(newGrid);
    setFound(false);
  }, []);

  useEffect(() => { if (started) generateGrid(level); }, [started, level, generateGrid]);

  const handleCellClick = (ri: number, ci: number) => {
    if (found) return;
    if (grid[ri][ci].isDifferent) {
      setFound(true);
    }
  };

  const nextLevel = () => {
    setLevel((l) => l + 1);
  };

  return (
    <div className="text-center">
      {!started ? (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">اعثر على الرمز المختلف في الشبكة</p>
          <button onClick={() => setStarted(true)} className="rounded-2xl bg-amber-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
            ابدأ التحدي
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>المستوى: {level}</span>
            {found && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={nextLevel} className="rounded-xl bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600">
                المستوى التالي ←
              </motion.button>
            )}
          </div>
          <div className="mx-auto grid max-w-sm" style={{ gridTemplateColumns: `repeat(${level + 2}, minmax(0, 1fr))` }}>
            {grid.map((row, ri) =>
              row.map((cell, ci) => (
                <motion.button
                  key={`${ri}-${ci}`}
                  onClick={() => handleCellClick(ri, ci)}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex aspect-square items-center justify-center text-2xl transition-all duration-200 sm:text-3xl",
                    found && cell.isDifferent ? "scale-110" : "hover:bg-glass-white"
                  )}
                >
                  {cell.emoji}
                </motion.button>
              ))
            )}
          </div>
          {found && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm font-medium text-emerald-500">
              ✅ وجدتها! اضغط على المستوى التالي
            </motion.p>
          )}
        </>
      )}
    </div>
  );
}

/* ==================== PUZZLES GAME ==================== */
function PuzzlesGame() {
  const puzzles = [
    { question: "ما الشيء الذي يزيد كلما أخذت منه؟", answer: "الحفرة" },
    { question: "ما هو الشيء الذي يمشي بلا أرجل ويبكي بلا عيون؟", answer: "السحاب" },
    { question: "أنا طويل عندما أكون صغيراً، وقصير عندما أكون كبيراً. ما أنا؟", answer: "الشمعة" },
    { question: "ما هو الشيء الذي له أسنان ولا يعض؟", answer: "المشط" },
    { question: "ما هو الشيء الذي تراه في الليل ثلاث مرات وفي النهار مرة؟", answer: "حرف اللام" },
  ];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const reveal = () => setShowAnswer(true);
  const next = () => {
    setCompleted((p) => [...p, currentIdx]);
    setShowAnswer(false);
    if (currentIdx < puzzles.length - 1) setCurrentIdx((i) => i + 1);
  };

  return (
    <div className="text-center">
      <div className="mb-4 text-sm text-muted-foreground">لغز {currentIdx + 1} من {puzzles.length}</div>
      <div className="glass-strong mx-auto max-w-md rounded-3xl p-6">
        <p className="mb-6 text-lg font-medium leading-relaxed text-foreground">{puzzles[currentIdx].question}</p>
        {!showAnswer ? (
          <button onClick={reveal} className="rounded-2xl bg-rose-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-rose-500/25 hover:bg-rose-600">
            أظهر الإجابة
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-4 text-xl font-semibold text-rose-600">الإجابة: {puzzles[currentIdx].answer}</p>
            {currentIdx < puzzles.length - 1 && (
              <button onClick={next} className="rounded-2xl bg-lavender-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-lavender-600">
                اللغز التالي
              </button>
            )}
          </motion.div>
        )}
      </div>
      {completed.length === puzzles.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-5 py-3 text-sm text-emerald-600">
          <CheckCircle2 className="h-5 w-5" /> أحسنت! أكملت جميع الألغاز
        </motion.div>
      )}
    </div>
  );
}

/* ==================== MAIN PAGE ==================== */
export default function GamePage() {
  const params = useParams();
  const id = params.id as string;
  const meta = GAME_META[id];
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!meta) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-rose-500" />
          <p className="text-lg font-medium text-foreground">اللعبة غير موجودة</p>
          <Link href="/games" className="mt-4 inline-flex items-center gap-2 text-sm text-lavender-500 hover:text-lavender-600">
            <ArrowRight className="h-4 w-4" /> العودة للألعاب
          </Link>
        </div>
      </div>
    );
  }

  const Icon = meta.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-mist-50 via-white to-mist-50/50 dark:from-mist-950 dark:via-mist-900 dark:to-mist-950">
      <div className={cn("pointer-events-none fixed inset-0 z-0 opacity-[0.04]", meta.color.split(" ")[1])} />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link href="/games" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowRight className="h-4 w-4" /> العودة للألعاب
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className={cn("mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium", meta.color)}>
            <Icon className="h-3.5 w-3.5" /> لعبة
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {meta.title}
          </h1>
        </motion.div>

        <motion.div
          key={id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 sm:p-8"
        >
          {mounted && id === "memory" && <MemoryGame />}
          {mounted && id === "breathing" && <BreathingGame />}
          {mounted && id === "stroop" && <StroopGame />}
          {mounted && id === "focus" && <FocusGame />}
          {mounted && id === "puzzles" && <PuzzlesGame />}
          {mounted && !["memory", "breathing", "stroop", "focus", "puzzles"].includes(id) && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">هذه اللعبة قيد التطوير</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
