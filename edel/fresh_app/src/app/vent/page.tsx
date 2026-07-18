"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Smile,
  Frown,
  Zap,
  Angry,
  Sparkles,
  Send,
  Flag,
  Clock,
  Shield,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateId } from "@/lib/utils";

type MoodTag = "سعيد" | "حزين" | "قلق" | "غاضب" | "ممتن";

const MOODS: { label: MoodTag; icon: React.ElementType; color: string }[] = [
  { label: "سعيد", icon: Smile, color: "text-emerald-500 bg-emerald-500/10" },
  { label: "حزين", icon: Frown, color: "text-blue-500 bg-blue-500/10" },
  { label: "قلق", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
  { label: "غاضب", icon: Angry, color: "text-rose-500 bg-rose-500/10" },
  { label: "ممتن", icon: Sparkles, color: "text-lavender-500 bg-lavender-500/10" },
];

interface VentPost {
  id: string;
  content: string;
  mood: MoodTag;
  timestamp: Date;
  likes: number;
  liked: boolean;
  flagged: boolean;
}

const SAMPLE_POSTS: VentPost[] = [
  {
    id: "1",
    content: "اليوم كان يوماً صعباً لكني تذكرت أن المشاعر مؤقتة، وكل شيء سيمر. أنا فخور بنفسي لأني ما زلت أحاول.",
    mood: "ممتن",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 12,
    liked: false,
    flagged: false,
  },
  {
    id: "2",
    content: "أحتاج أن أفضفض... أشعر أن الحياة تسير بسرعة ولا أستطيع اللحاق. لكني أعرف أن غداً سيكون أفضل.",
    mood: "قلق",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 8,
    liked: false,
    flagged: false,
  },
  {
    id: "3",
    content: "الحمد لله على كل شيء. اليوم شعرت بالسعادة الحقيقية لأول مرة منذ شهور. ابتسمت من قلبي.",
    mood: "سعيد",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 24,
    liked: false,
    flagged: false,
  },
  {
    id: "4",
    content: "أفتقد شخصاً رحل. الذكريات تؤلم لكنها تذكرني أني أحببت بصدق. الدموع تطهر الروح.",
    mood: "حزين",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 15,
    liked: false,
    flagged: false,
  },
  {
    id: "5",
    content: "لا أعرف كيف أتعامل مع هذا الغضب الذي يملؤني. أحتاج إلى التنفس بعمق والعد إلى عشرة.",
    mood: "غاضب",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    likes: 7,
    liked: false,
    flagged: false,
  },
  {
    id: "6",
    content: "كل يوم أتعلم شيئاً جديداً عن نفسي. اليوم تعلمت أن القوة الحقيقية هي في طلب المساعدة عندما نحتاجها.",
    mood: "ممتن",
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
    likes: 19,
    liked: false,
    flagged: false,
  },
];

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;
  return `منذ ${Math.floor(hours / 24)} يوم`;
}

export default function VentPage() {
  const [posts, setPosts] = useState<VentPost[]>(SAMPLE_POSTS);
  const [newPost, setNewPost] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodTag>("قلق");
  const [filter, setFilter] = useState<MoodTag | "الكل">("الكل");

  const filteredPosts = filter === "الكل" ? posts : posts.filter((p) => p.mood === filter);

  const handleSubmit = () => {
    if (!newPost.trim()) return;
    const post: VentPost = {
      id: generateId(),
      content: newPost.trim(),
      mood: selectedMood,
      timestamp: new Date(),
      likes: 0,
      liked: false,
      flagged: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
      )
    );
  };

  const handleFlag = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, flagged: !p.flagged } : p
      )
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-lavender-50/60 via-rose-50/40 to-amber-50/60 dark:from-lavender-950/30 dark:via-rose-950/20 dark:to-amber-950/30" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(155,140,255,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(244,63,94,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender-100 px-4 py-1.5 text-xs font-medium text-lavender-700 dark:bg-lavender-900/30 dark:text-lavender-300">
            <MessageCircle className="h-3.5 w-3.5" /> مساحة آمنة
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            فضفضة
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            مساحة آمنة ومجهولة لتشارك ما في قلبك. كل ما تكتبه يبقى مجهول الهوية.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-strong mb-8 rounded-3xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender-500/15 text-lavender-600">
              <MessageCircle className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium text-foreground">اكتب ما تشعر به</p>
          </div>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="ما الذي يدور في ذهنك؟ شاركنا بدون تردد..."
            rows={3}
            className="glass-input w-full resize-none rounded-2xl text-sm"
            dir="rtl"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                const isActive = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200",
                      isActive
                        ? mood.color + " ring-2 ring-offset-1 ring-offset-transparent"
                        : "glass-subtle text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {mood.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!newPost.trim()}
              className="inline-flex items-center gap-2 rounded-2xl bg-lavender-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-lavender-500/25 transition-all duration-300 hover:bg-lavender-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" /> نشر
            </button>
          </div>
        </motion.div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {["الكل", ...MOODS.map((m) => m.label)].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag as MoodTag | "الكل")}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200",
                  filter === tag
                    ? "bg-lavender-500 text-white"
                    : "glass-subtle text-muted-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="shrink-0 text-xs text-muted-foreground">{filteredPosts.length} منشور</p>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, i) => {
            const moodConfig = MOODS.find((m) => m.label === post.mood)!;
            const Icon = moodConfig.icon;
            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.04 }}
                whileHover={{ y: -2 }}
                className="glass-strong mb-4 rounded-3xl p-5 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <span className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm",
                    moodConfig.color
                  )}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                        moodConfig.color
                      )}>
                        {post.mood}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {formatRelativeTime(post.timestamp)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {post.content}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200",
                          post.liked
                            ? "bg-rose-500/15 text-rose-600"
                            : "glass-subtle text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Heart className={cn("h-3.5 w-3.5", post.liked && "fill-rose-500")} />
                        {post.likes}
                      </button>
                      <button
                        onClick={() => handleFlag(post.id)}
                        className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:text-amber-600"
                      >
                        <Flag className="h-3.5 w-3.5" /> بلّغ
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
            <Shield className="h-3.5 w-3.5" /> جميع المنشورات تخضع للإشراف لضمان بيئة آمنة للجميع
          </div>
        </motion.div>
      </div>
    </div>
  );
}
