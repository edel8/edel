"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  Image,
  Download,
  Search,
  Filter,
  BookOpen,
  ChevronRight,
  Clock,
  Star,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "all" | "videos" | "infographics" | "guides";

const categories: { key: Category; label: string; icon: typeof Play }[] = [
  { key: "all", label: "الكل", icon: BarChart3 },
  { key: "videos", label: "فيديوهات", icon: Play },
  { key: "infographics", label: "إنفوغرافيك", icon: Image },
  { key: "guides", label: "أدلة PDF", icon: FileText },
];

const resources = [
  {
    id: 1,
    type: "videos",
    title: "ما هو القلق؟ فهم أساسيات القلق",
    desc: "فيديو تعليمي يشرح طبيعة القلق وأسبابه وأعراضه",
    duration: "12:34",
    level: "مبتدئ",
    icon: Play,
  },
  {
    id: 2,
    type: "videos",
    title: "تقنيات التنفس العميق للاسترخاء",
    desc: "تمارين عملية للتنفس تساعد في تهدئة الجهاز العصبي",
    duration: "08:21",
    level: "متوسط",
    icon: Play,
  },
  {
    id: 3,
    type: "videos",
    title: "الاكتئاب: رحلة الفهم والتعافي",
    desc: "نظرة شاملة على الاكتئاب وكيفية التعامل معه",
    duration: "15:47",
    level: "جميع المستويات",
    icon: Play,
  },
  {
    id: 4,
    type: "infographics",
    title: "خريطة المشاعر الإنسانية",
    desc: "إنفوغرافيك يوضح أنواع المشاعر وكيفية التعرف عليها",
    icon: Image,
  },
  {
    id: 5,
    type: "infographics",
    title: "دورة النوم الصحي",
    desc: "رسم بياني يشرح مراحل النوم وأهميتها للصحة النفسية",
    icon: Image,
  },
  {
    id: 6,
    type: "infographics",
    title: "هرم الاحتياجات النفسية",
    desc: "تصنيف هرمي للاحتياجات النفسية الأساسية حسب ماسلو",
    icon: Image,
  },
  {
    id: 7,
    type: "infographics",
    title: "علامات الإنذار المبكر للضغط النفسي",
    desc: "دليل بصري للعلامات المبكرة التي تشير إلى تراكم الضغط",
    icon: Image,
  },
  {
    id: 8,
    type: "guides",
    title: "دليل العلاج السلوكي المعرفي",
    desc: "PDF شامل لمبادئ العلاج السلوكي المعرفي وتطبيقاته",
    pages: "48 صفحة",
    icon: FileText,
  },
  {
    id: 9,
    type: "guides",
    title: "مذكرة التوعية بالصحة النفسية",
    desc: "دليل تثقيفي شامل حول الصحة النفسية للجميع",
    pages: "72 صفحة",
    icon: FileText,
  },
  {
    id: 10,
    type: "guides",
    title: "كتيب تمارين اليقظة الذهنية",
    desc: "تمارين يومية لليقظة الذهنية مع شرح خطوة بخطوة",
    pages: "36 صفحة",
    icon: FileText,
  },
  {
    id: 11,
    type: "videos",
    title: "كيف تبني علاقة صحية مع نفسك",
    desc: "فيديو عن حب الذات وتقبلها كأساس للصحة النفسية",
    duration: "11:05",
    level: "مبتدئ",
    icon: Play,
  },
  {
    id: 12,
    type: "guides",
    title: "دليل الأسرة لدعم الصحة النفسية",
    desc: "كيف يمكن للأسرة أن تكون داعماً نفسياً لأفرادها",
    pages: "64 صفحة",
    icon: FileText,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = resources.filter((r) => {
    const matchCategory = activeCategory === "all" || r.type === activeCategory;
    const matchSearch =
      r.title.includes(searchQuery) || r.desc.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="glass-badge mb-4 inline-flex items-center gap-2 text-xs">
            <BookOpen className="h-3.5 w-3.5" /> مكتبة تثقيفية
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            تعلم عن صحتك النفسية
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            محتوى تثقيفي معتمد بالفيديوهات والإنفوغرافيك والأدلة القابلة للتحميل
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "glass-subtle text-muted-foreground hover:text-foreground"
                )}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </motion.button>
            ))}
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث في المكتبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full pr-10 sm:w-64"
            />
          </div>
        </div>

        <motion.div
          key={activeCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-border-glass bg-glass-white/60 backdrop-blur-xl transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1"
              >
                {resource.type === "videos" ? (
                  <div className="relative aspect-video bg-gradient-to-br from-sage-200/40 to-lavender-200/40 dark:from-sage-900/30 dark:to-lavender-900/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow-primary transition-all duration-300 group-hover:bg-primary"
                      >
                        <Play className="h-7 w-7 translate-x-0.5" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full glass-strong px-2.5 py-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </div>
                    {resource.level && (
                      <div className="absolute bottom-3 right-3 rounded-full glass-strong px-2.5 py-1 text-xs">
                        {resource.level}
                      </div>
                    )}
                  </div>
                ) : resource.type === "infographics" ? (
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-200/30 to-rose-200/30 dark:from-amber-900/20 dark:to-rose-900/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-200/30 to-teal-200/30 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                    {resource.pages && (
                      <div className="absolute bottom-3 right-3 rounded-full glass-strong px-2.5 py-1 text-xs">
                        {resource.pages}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        resource.type === "videos"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                          : resource.type === "infographics"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      )}
                    >
                      {resource.type === "videos"
                        ? "فيديو"
                        : resource.type === "infographics"
                        ? "إنفوغرافيك"
                        : "دليل PDF"}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {resource.desc}
                  </p>

                  {resource.type === "guides" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                    >
                      <Download className="h-4 w-4" />
                      تحميل الدليل
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              لا توجد نتائج مطابقة لبحثك
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
