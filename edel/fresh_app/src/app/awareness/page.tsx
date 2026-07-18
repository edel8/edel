"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Moon,
  Users,
  Search,
  Sparkles,
  Clock,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";

const TOPICS = [
  { id: "all", label: "الكل", icon: Sparkles },
  { id: "anxiety", label: "قلق", icon: Brain },
  { id: "depression", label: "اكتئاب", icon: Heart },
  { id: "sleep", label: "نوم", icon: Moon },
  { id: "relationships", label: "علاقات", icon: Users },
];

const ARTICLES = [
  {
    slug: "understanding-anxiety",
    title: "فهم القلق: رفيقك في رحلة التعافي",
    excerpt: "القلق ليس عدوك. تعلم كيف تفهم إشاراته وتتعامل معها بلطف لتعيش حياة أكثر هدوءًا.",
    topic: "anxiety",
    readTime: "8 دقائق",
    date: "١٢ مايو ٢٠٢٦",
    gradient: "from-amber-400/20 via-amber-100/10 to-transparent",
  },
  {
    slug: "depression-is-not-weakness",
    title: "الاكتئاب ليس ضعفًا: رحلة تقبل الذات",
    excerpt: "الاكتئاب مرض حقيقي يحتاج علاجًا، وليس فشلًا شخصيًا. كل ما تحتاج معرفته عن رحلة التعافي.",
    topic: "depression",
    readTime: "١٠ دقائق",
    date: "٨ مايو ٢٠٢٦",
    gradient: "from-rose-400/20 via-rose-100/10 to-transparent",
  },
  {
    slug: "sleep-hygiene-guide",
    title: "دليلك الشامل لتحسين جودة النوم",
    excerpt: "النوم الجيد ليس ترفًا. تعرف على أسرار نظافة النوم وكيف تبني روتينًا ليليًا مريحًا.",
    topic: "sleep",
    readTime: "٦ دقائق",
    date: "٥ مايو ٢٠٢٦",
    gradient: "from-sky-400/20 via-sky-100/10 to-transparent",
  },
  {
    slug: "building-healthy-relationships",
    title: "كيف تبني علاقات صحية أثناء التعافي",
    excerpt: "العلاقات الإنسانية تؤثر بعمق على صحتنا النفسية. تعلم كيف تضع حدودًا صحية وتبني روابط آمنة.",
    topic: "relationships",
    readTime: "٧ دقائق",
    date: "٢ مايو ٢٠٢٦",
    gradient: "from-emerald-400/20 via-emerald-100/10 to-transparent",
  },
  {
    slug: "anxiety-breathing-techniques",
    title: "تمارين التنفس لتهدئة القلق: دليل عملي",
    excerpt: "عندما يسيطر القلق، يعودك أنفاسك إلى اللحظة الحالية. ٥ تمارين تنفس مجربة لتخفيف القلق الفوري.",
    topic: "anxiety",
    readTime: "٥ دقائق",
    date: "٢٩ أبريل ٢٠٢٦",
    gradient: "from-amber-400/20 via-amber-100/10 to-transparent",
  },
  {
    slug: "depression-symptoms-guide",
    title: "الأعراض الخفية للاكتئاب: دليل التعرف المبكر",
    excerpt: "ليس كل اكتئاب يبدو حزينًا. تعرف على الأعراض غير المتوقعة التي قد تشير إلى وجود اكتئاب كامن.",
    topic: "depression",
    readTime: "٩ دقائق",
    date: "٢٥ أبريل ٢٠٢٦",
    gradient: "from-rose-400/20 via-rose-100/10 to-transparent",
  },
  {
    slug: "sleep-and-mental-health",
    title: "العلاقة بين النوم والصحة النفسية",
    excerpt: "النوم والصحة النفسية وجهان لعملة واحدة. كيف يؤثر كل منهما على الآخر وما يمكنك فعله لتحسين كليهما.",
    topic: "sleep",
    readTime: "٨ دقائق",
    date: "٢٠ أبريل ٢٠٢٦",
    gradient: "from-sky-400/20 via-sky-100/10 to-transparent",
  },
  {
    slug: "setting-boundaries",
    title: "فن وضع الحدود في العلاقات",
    excerpt: "الحدود الصحية ليست جدرانًا، بل جسورًا تسمح بالتواصل المحترم. دليل عملي لوضع حدود تحمي صحتك النفسية.",
    topic: "relationships",
    readTime: "٦ دقائق",
    date: "١٥ أبريل ٢٠٢٦",
    gradient: "from-emerald-400/20 via-emerald-100/10 to-transparent",
  },
  {
    slug: "anxiety-mindfulness",
    title: "اليقظة الذهنية للقلق: دليل المبتدئين",
    excerpt: "اليقظة الذهنية ليست مجرد تأمل. إنها طريقة حياة تعلمك كيف تكون مع قلقك دون أن يسيطر عليك.",
    topic: "anxiety",
    readTime: "٧ دقائق",
    date: "١٠ أبريل ٢٠٢٦",
    gradient: "from-amber-400/20 via-amber-100/10 to-transparent",
  },
  {
    slug: "postpartum-depression",
    title: "اكتئاب ما بعد الولادة: لا تمرين به وحدك",
    excerpt: "اكتئاب ما بعد الولادة أكثر شيوعًا مما تعتقدين. تعرفي على العلامات وطرق الدعم المتاحة.",
    topic: "depression",
    readTime: "٨ دقائق",
    date: "٥ أبريل ٢٠٢٦",
    gradient: "from-rose-400/20 via-rose-100/10 to-transparent",
  },
];

export default function AwarenessPage() {
  const [activeTopic, setActiveTopic] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchTopic = activeTopic === "all" || a.topic === activeTopic;
      const matchSearch = !search || a.title.includes(search) || a.excerpt.includes(search);
      return matchTopic && matchSearch;
    });
  }, [activeTopic, search]);

  return (
    <div className="relative min-h-screen">
      {/* Editorial side-image background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.07]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> العودة للرئيسية
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl"
        >
          <span className="glass-badge inline-flex items-center gap-2 text-xs text-lavender-700">
            <Sparkles className="h-3.5 w-3.5" /> معرفة تثقف وتغير
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            قسم التوعية النفسية
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            مقالات تثقيفية مبنية على أسس علمية لمساعدتك على فهم صحتك النفسية بشكل أفضل.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeTopic === topic.id
                    ? "bg-lavender-600 text-white shadow-glow-primary"
                    : "glass-subtle text-muted-foreground hover:text-foreground hover:bg-glass-white"
                )}
              >
                <topic.icon className="h-4 w-4" />
                {topic.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <Input
              label="ابحث في المقالات"
              leading={<Search className="h-4 w-4 text-muted-foreground" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            >
              <Card variant="interactive" tilt glowOnHover className="group relative h-full overflow-hidden">
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", article.gradient)} />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                      article.topic === "anxiety" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                      article.topic === "depression" && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                      article.topic === "sleep" && "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
                      article.topic === "relationships" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
                    )}>
                      {article.topic === "anxiety" && "قلق"}
                      {article.topic === "depression" && "اكتئاب"}
                      {article.topic === "sleep" && "نوم"}
                      {article.topic === "relationships" && "علاقات"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-3">{article.excerpt}</CardDescription>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <span className="text-xs font-medium text-lavender-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      اقرأ المزيد ←
                    </span>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg text-muted-foreground">لم نجد مقالات تطابق بحثك. جرب كلمة مختلفة.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
