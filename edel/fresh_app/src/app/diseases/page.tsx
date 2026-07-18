"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Frown,
  Zap,
  Flame,
  Repeat,
  Moon,
  BatteryWarning,
  Users,
  Eye,
  AlertTriangle,
  Meh,
  Search,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";

const DISEASES = [
  {
    slug: "depression",
    name: "الاكتئاب",
    subtitle: "اضطراب المزاج",
    desc: "اضطراب نفسي يتميز بمشاعر حزينة مستمرة وفقدان الاهتمام بالأنشطة اليومية لمدة أسبوعين على الأقل.",
    icon: Frown,
    color: "text-rose-500",
    bg: "from-rose-500/10",
    stats: "أكثر من 280 مليون مصاب حول العالم",
  },
  {
    slug: "generalized-anxiety",
    name: "القلق العام",
    subtitle: "اضطراب القلق",
    desc: "قلق مفرط ومستمر تجاه أحداث يومية عادية، يصاحبه توتر عضلي وصعوبة في التركيز.",
    icon: Zap,
    color: "text-amber-500",
    bg: "from-amber-500/10",
    stats: "يؤثر على 6% من البالغين سنويًا",
  },
  {
    slug: "panic-disorder",
    name: "نوبات الهلع",
    subtitle: "اضطراب هلعي",
    desc: "نوبات مفاجئة من الخوف الشديد تصاحبها أعراض جسدية كخفقان القلب وضيق التنفس والدوار.",
    icon: Flame,
    color: "text-orange-500",
    bg: "from-orange-500/10",
    stats: "2-3% من السكان يعانون منه",
  },
  {
    slug: "ocd",
    name: "الوسواس القهري",
    subtitle: "اضطراب وسواسي قهري",
    desc: "أفكار مزعجة متكررة (وساوس) تدفع الشخص لتكرار سلوكيات معينة (أفعال قهرية) لتخفيف القلق.",
    icon: Repeat,
    color: "text-purple-500",
    bg: "from-purple-500/10",
    stats: "نسبة انتشاره 2-3% عالميًا",
  },
  {
    slug: "bipolar",
    name: "ثنائي القطب",
    subtitle: "اضطراب وجداني",
    desc: "تقلبات شديدة بين نوبات الهوس (نشاط مفرط) والاكتئاب (انخفاض حاد في المزاج).",
    icon: Brain,
    color: "text-indigo-500",
    bg: "from-indigo-500/10",
    stats: "يؤثر على 1-3% من السكان",
  },
  {
    slug: "ptsd",
    name: "اضطراب ما بعد الصدمة",
    subtitle: "PTSD",
    desc: "اضطراب نفسي يحدث بعد التعرض لحدث صادم، يتضمن ذكريات اقتحامية وكوابيس وتجنب.",
    icon: Eye,
    color: "text-red-500",
    bg: "from-red-500/10",
    stats: "حوالي 7-8% سيصابون به في حياتهم",
  },
  {
    slug: "insomnia",
    name: "الأرق",
    subtitle: "اضطراب النوم",
    desc: "صعوبة في الدخول في النوم أو الاستمرار فيه، يؤدي إلى إرهاق نهاري وضعف في الأداء الوظيفي.",
    icon: Moon,
    color: "text-sky-500",
    bg: "from-sky-500/10",
    stats: "30% من البالغين يعانون منه مؤقتًا",
  },
  {
    slug: "burnout",
    name: "الاحتراق الوظيفي",
    subtitle: "إجهاد مهني مزمن",
    desc: "حالة من الإرهاق العاطفي والجسدي والعقلي ناتجة عن ضغط عمل مفرط ومستمر.",
    icon: BatteryWarning,
    color: "text-teal-500",
    bg: "from-teal-500/10",
    stats: "أكثر من 50% من الموظفين يعانون منه",
  },
  {
    slug: "social-anxiety",
    name: "الرهاب الاجتماعي",
    subtitle: "قلق اجتماعي",
    desc: "خوف شديد ومستمر من المواقف الاجتماعية أو الأداء أمام الآخرين خوفًا من الإحراج.",
    icon: Users,
    color: "text-emerald-500",
    bg: "from-emerald-500/10",
    stats: "12% من السكان يصابون به في مرحلة ما",
  },
  {
    slug: "schizophrenia",
    name: "الفصام",
    subtitle: "اضطراب ذهاني",
    desc: "اضطراب عقلي مزمن يتسم بالهلوسات والأوهام واضطراب في التفكير والسلوك.",
    icon: Brain,
    color: "text-violet-500",
    bg: "from-violet-500/10",
    stats: "يؤثر على 0.5-1% من السكان",
  },
  {
    slug: "bpd",
    name: "اضطراب الشخصية الحدية",
    subtitle: "BPD",
    desc: "نمط من عدم الاستقرار في العلاقات والصورة الذاتية والمشاعر، مع اندفاعية ملحوظة.",
    icon: AlertTriangle,
    color: "text-pink-500",
    bg: "from-pink-500/10",
    stats: "1.6-5.9% من العامة",
  },
  {
    slug: "eating-disorders",
    name: "اضطرابات الأكل",
    subtitle: "شهية مضطربة",
    desc: "مجموعة من الاضطرابات النفسية التي تؤثر على عادات الأكل، كفقدان الشهية والشره المرضي.",
    icon: Heart,
    color: "text-rose-400",
    bg: "from-rose-400/10",
    stats: "9% من السكان يتأثرون بها",
  },
];

export default function DiseasesPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => DISEASES.filter(d => d.name.includes(search) || d.desc.includes(search)),
    [search]
  );

  return (
    <div className="relative min-h-screen">
      {/* Micro-noise gradient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender-50/40 via-transparent to-rose-50/30" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
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
        >
          <span className="glass-badge inline-flex items-center gap-2 text-xs text-lavender-700">
            <Sparkles className="h-3.5 w-3.5" /> مرجعك الشامل
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            موسوعة الأمراض النفسية
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            دليل شامل ومبسط لأكثر الاضطرابات النفسية شيوعًا. اختر أي مرض لقراءة تعريفه، أسبابه، أعراضه، وطرق علاجه.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-md"
        >
          <Input
            label="ابحث عن مرض"
            leading={<Search className="h-4 w-4 text-muted-foreground" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((disease, i) => (
            <Link key={disease.slug} href={`/diseases/${disease.slug}`} className="group block">
              <Card
                variant="interactive"
                tilt
                glowOnHover
                className="relative h-full overflow-hidden"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", disease.bg)} />
                <div className="relative">
                  <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-glass-white transition-all duration-300", disease.color)}>
                    <disease.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{disease.name}</CardTitle>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{disease.subtitle}</p>
                  <CardDescription className="mt-3 line-clamp-3">{disease.desc}</CardDescription>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full glass-subtle px-2.5 py-1">
                      {disease.stats}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <Meh className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg text-muted-foreground">لم نجد نتائج لبحثك. جرب كلمة مختلفة.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
