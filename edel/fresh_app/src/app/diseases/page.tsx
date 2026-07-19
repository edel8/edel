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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

const DISEASES = [
  {
    slug: "depression",
    name: "الاكتئاب",
    subtitle: "اضطراب المزاج",
    desc: "اضطراب نفسي يتميز بمشاعر حزينة مستمرة وفقدان الاهتمام بالأنشطة اليومية لمدة أسبوعين على الأقل.",
    icon: Frown,
    color: "text-rose-500",
    stats: "أكثر من 280 مليون مصاب حول العالم",
    symptomsPreview: "حزن مستمر, فقدان شغف, تعب, تغير في الشهية",
  },
  {
    slug: "generalized-anxiety",
    name: "القلق العام",
    subtitle: "اضطراب القلق",
    desc: "قلق مفرط ومستمر تجاه أحداث يومية عادية، يصاحبه توتر عضلي وصعوبة في التركيز.",
    icon: Zap,
    color: "text-amber-500",
    stats: "يؤثر على 6% من البالغين سنويًا",
    symptomsPreview: "قلق دائم, توتر عضلي, أرق, صعوبة تركيز",
  },
  {
    slug: "panic-disorder",
    name: "نوبات الهلع",
    subtitle: "اضطراب هلعي",
    desc: "نوبات مفاجئة من الخوف الشديد تصاحبها أعراض جسدية كخفقان القلب وضيق التنفس والدوار.",
    icon: Flame,
    color: "text-orange-500",
    stats: "2-3% من السكان يعانون منه",
    symptomsPreview: "خفقان, خوف شديد, ضيق تنفس, دوار",
  },
  {
    slug: "ocd",
    name: "الوسواس القهري",
    subtitle: "اضطراب وسواسي قهري",
    desc: "أفكار مزعجة متكررة (وساوس) تدفع الشخص لتكرار سلوكيات معينة (أفعال قهرية) لتخفيف القلق.",
    icon: Repeat,
    color: "text-neutral-600",
    stats: "نسبة انتشاره 2-3% عالميًا",
    symptomsPreview: "أفكار مزعجة متكررة, تكرار سلوكيات, شك دائم",
  },
  {
    slug: "bipolar",
    name: "ثنائي القطب",
    subtitle: "اضطراب وجداني",
    desc: "تقلبات شديدة بين نوبات الهوس (نشاط مفرط) والاكتئاب (انخفاض حاد في المزاج).",
    icon: Brain,
    color: "text-indigo-500",
    stats: "يؤثر على 1-3% من السكان",
    symptomsPreview: "تقلبات مزاجية حادة, هوس, اكتئاب, اندفاعية",
  },
  {
    slug: "ptsd",
    name: "اضطراب ما بعد الصدمة",
    subtitle: "PTSD",
    desc: "اضطراب نفسي يحدث بعد التعرض لحدث صادم، يتضمن ذكريات اقتحامية وكوابيس وتجنب.",
    icon: Eye,
    color: "text-red-500",
    stats: "حوالي 7-8% سيصابون به في حياتهم",
    symptomsPreview: "ذكريات اقتحامية, كوابيس, تجنب, فرط يقظة",
  },
  {
    slug: "insomnia",
    name: "الأرق",
    subtitle: "اضطراب النوم",
    desc: "صعوبة في الدخول في النوم أو الاستمرار فيه، يؤدي إلى إرهاق نهاري وضعف في الأداء الوظيفي.",
    icon: Moon,
    color: "text-sky-500",
    stats: "30% من البالغين يعانون منه مؤقتًا",
    symptomsPreview: "صعوبة نوم, استيقاظ متكرر, إرهاق, تعب نهاري",
  },
  {
    slug: "burnout",
    name: "الاحتراق الوظيفي",
    subtitle: "إجهاد مهني مزمن",
    desc: "حالة من الإرهاق العاطفي والجسدي والعقلي ناتجة عن ضغط عمل مفرط ومستمر.",
    icon: BatteryWarning,
    color: "text-teal-500",
    stats: "أكثر من 50% من الموظفين يعانون منه",
    symptomsPreview: "إرهاق مستمر, فقدان شغف, سخرية, انخفاض إنتاجية",
  },
  {
    slug: "social-anxiety",
    name: "الرهاب الاجتماعي",
    subtitle: "قلق اجتماعي",
    desc: "خوف شديد ومستمر من المواقف الاجتماعية أو الأداء أمام الآخرين خوفًا من الإحراج.",
    icon: Users,
    color: "text-emerald-500",
    stats: "12% من السكان يصابون به في مرحلة ما",
    symptomsPreview: "خوف من المواقف الاجتماعية, تجنب, احمرار, رجفة",
  },
  {
    slug: "schizophrenia",
    name: "الفصام",
    subtitle: "اضطراب ذهاني",
    desc: "اضطراب عقلي مزمن يتسم بالهلوسات والأوهام واضطراب في التفكير والسلوك.",
    icon: Brain,
    color: "text-violet-500",
    stats: "يؤثر على 0.5-1% من السكان",
    symptomsPreview: "هلوسات, أوهام, كلام غير مترابط, انسحاب اجتماعي",
  },
  {
    slug: "bpd",
    name: "اضطراب الشخصية الحدية",
    subtitle: "BPD",
    desc: "نمط من عدم الاستقرار في العلاقات والصورة الذاتية والمشاعر، مع اندفاعية ملحوظة.",
    icon: AlertTriangle,
    color: "text-pink-500",
    stats: "1.6-5.9% من العامة",
    symptomsPreview: "خوف من الهجر, تقلبات عاطفية, فراغ, اندفاعية",
  },
  {
    slug: "eating-disorders",
    name: "اضطرابات الأكل",
    subtitle: "شهية مضطربة",
    desc: "مجموعة من الاضطرابات النفسية التي تؤثر على عادات الأكل، كفقدان الشهية والشره المرضي.",
    icon: Heart,
    color: "text-rose-400",
    stats: "9% من السكان يتأثرون بها",
    symptomsPreview: "تقييد أكل, نهم, قيء, هوس بالوزن",
  },
];

export default function DiseasesPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => DISEASES.filter((d) => d.name.includes(search) || d.desc.includes(search)),
    [search],
  );

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900"
          >
            <ChevronLeft className="h-4 w-4" /> العودة للرئيسية
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-1.5 text-xs text-neutral-600">
            مرجعك الشامل
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            موسوعة الأمراض النفسية
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-neutral-500">
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
            leading={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((disease, i) => (
            <Link key={disease.slug} href={`/diseases/${disease.slug}`} className="group block">
              <div className="flex h-full flex-col rounded-[24px] border border-[#EAEAEA] bg-white p-6 transition hover:bg-neutral-50">
                <div
                  className={cn(
                    "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100",
                    disease.color,
                  )}
                >
                  <disease.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  {disease.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-500">{disease.subtitle}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {disease.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#EAEAEA] bg-white px-2.5 py-1">
                    {disease.stats}
                  </span>
                </div>
                <div className="mt-3 text-xs leading-relaxed text-neutral-500">
                  <span className="font-medium text-neutral-700">الأعراض:</span>{" "}
                  {disease.symptomsPreview}
                </div>
                <div className="mt-auto pt-4 text-sm font-medium text-neutral-900 transition group-hover:underline">
                  اقرأ المزيد →
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <Meh className="mx-auto h-12 w-12 text-neutral-400" />
            <p className="mt-4 text-lg text-neutral-500">
              لم نجد نتائج لبحثك. جرب كلمة مختلفة.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
