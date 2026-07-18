"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pill,
  Dumbbell,
  Wind,
  Moon,
  AlertTriangle,
  Sparkles,
  ChevronLeft,
  ChevronDown,
  Sun,
  Leaf,
  Heart,
  Brain,
  Frown,
  Zap,
  Flame,
  Repeat,
  BatteryWarning,
  Eye,
  Meh,
  Activity,
  Apple,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DISEASES_DATA = [
  {
    slug: "depression", name: "الاكتئاب", icon: Frown, color: "text-rose-500", bg: "from-rose-500/10", accent: "bg-rose-500",
    vitamins: [
      { name: "فيتامين D", dose: "٢٠٠٠-٥٠٠٠ وحدة دولية يوميا", note: "يفضل قياس المستوى أولا." },
      { name: "فيتامين B12", dose: "٥٠٠-١٠٠٠ ميكروغرام يوميا", note: "خاصة للنباتيين." },
      { name: "المغنيسيوم", dose: "٢٠٠-٤٠٠ ملغ يوميا", note: "يفضل سترات المغنيسيوم." },
      { name: "أوميغا 3", dose: "١٠٠٠-٢٠٠٠ ملغ يوميا EPA/DHA", note: "اختر زيت سمك عالي الجودة." },
    ],
    goodFoods: ["الأسماك الدهنية (السلمون، السردين، الماكريل)", "المكسرات وخاصة الجوز واللوز", "الخضروات الورقية الداكنة (السبانخ، الكرنب)", "الفواكه الغنية بفيتامين C (البرتقال، الكيوي)", "البذور (بذور الشيا، الكتان، القرع)", "الشوكولاتة الداكنة (٧٠٪ كاكاو فأكثر)", "الأفوكادو", "البيض ومنتجات الألبان كاملة الدسم"],
    badFoods: ["السكريات المكررة والحلويات المصنعة", "الأطعمة المقلية والدهون المتحولة", "المشروبات الغازية والكافيين المفرط", "الكحول", "الأطعمة فائقة المعالجة", "الدقيق الأبيض ومنتجاته", "المحليات الصناعية"],
    exercises: ["المشي لمدة ٣٠ دقيقة يوميا (أفضل في ضوء الصباح)", "اليوغا والتمدد اللطيف", "السباحة (تأثير مهدئ للمياه)", "الرقص (يحفز إفراز الإندورفين)", "تمارين القوة الخفيفة مرتين أسبوعيا"],
    breathing: ["التنفس البطني (٤ ثوان شهيق، ٦ ثوان زفير)", "تنفس ٤-٧-٨: شهيق ٤ ثوان، احبس ٧ ثوان، زفير ٨ ثوان", "التنفس المتماثل: شهيق وزفير لمدة ٤ ثوان لكل", "تنفس الأنف البديل (نادي شودانا)"],
    sleep: ["الذهاب إلى الفراش في نفس الوقت يوميا", "تجنب الشاشات قبل النوم بساعة", "الحفاظ على غرفة نوم مظلمة وباردة", "الاستحمام بماء دافئ قبل النوم", "كتابة يوميات قبل النوم لتفريغ الأفكار"],
  },
  {
    slug: "generalized-anxiety", name: "القلق العام", icon: Zap, color: "text-amber-500", bg: "from-amber-500/10", accent: "bg-amber-500",
    vitamins: [
      { name: "المغنيسيوم", dose: "٢٠٠-٤٠٠ ملغ يوميا", note: "جلايسينات المغنيسيوم أفضل للقلق." },
      { name: "فيتامين B المركب", dose: "حسب الجرعة المدونة", note: "خاصة B6 للقلق." },
      { name: "أوميغا 3", dose: "١٠٠٠-٢٠٠٠ ملغ يوميا", note: "يقلل الالتهاب المرتبط بالقلق." },
      { name: "إل-ثيانين", dose: "١٠٠-٢٠٠ ملغ يوميا", note: "حمض أميني في الشاي الأخضر." },
    ],
    goodFoods: ["الشاي الأخضر (غني بإل-ثيانين)", "الشوفان والحبوب الكاملة", "الموز (غني بالبوتاسيوم والمغنيسيوم)", "التوت بأنواعه", "الزبادي واللبن (غني بالبروبيوتيك)", "الأسماك الدهنية", "الشوكولاتة الداكنة باعتدال", "البابونج (مهدئ طبيعي)"],
    badFoods: ["الكافيين المفرط (القهوة، مشروبات الطاقة)", "السكريات المكررة", "الكحول", "الأطعمة الحارة (قد تحفز القلق عند البعض)", "المشروبات الغازية", "المحليات الصناعية (الأسبارتام)"],
    exercises: ["تمارين الأيروبيك المعتدلة (المشي السريع، الركض الخفيف)", "اليوغا وخاصة هاثا يوغا", "التاي تشي والكيغونغ", "السباحة", "الرقص", "تمارين التمدد"],
    breathing: ["التنفس المربع (٤-٤-٤-٤): شهيق، حبس، زفير، حبس", "تنفس ٤-٧-٨ (تصغير الاستجابة للقلق)", "التنفس البطيء (٦ أنفاس في الدقيقة)", "تنفس الشهيق العميق مع زفير طويل"],
    sleep: ["تثبيت مواعيد النوم والاستيقاظ", "طقوس استرخاء قبل النوم (قراءة، موسيقى هادئة)", "تقليل التعرض للضوء الأزرق مساء", "تمارين استرخاء عضلي تدريجي", "تجنب القيلولة الطويلة (أكثر من ٣٠ دقيقة)"],
  },
  {
    slug: "ocd", name: "الوسواس القهري", icon: Repeat, color: "text-purple-500", bg: "from-purple-500/10", accent: "bg-purple-500",
    vitamins: [
      { name: "ن-أسيتيل سيستين NAC", dose: "١٢٠٠-٢٤٠٠ ملغ يوميا", note: "أكثر المكملات دراسة للوسواس القهري." },
      { name: "فيتامين B12", dose: "٥٠٠-١٠٠٠ ميكروغرام يوميا", note: "يدعم وظائف الجهاز العصبي." },
      { name: "المغنيسيوم", dose: "٢٠٠-٤٠٠ ملغ يوميا", note: "يساعد في تخفيف التوتر." },
      { name: "أوميغا 3", dose: "١٠٠٠-٢٠٠٠ ملغ يوميا", note: "يدعم صحة الدماغ." },
    ],
    goodFoods: ["الأطعمة الغنية بمضادات الأكسدة (التوت، العنب البري)", "الأسماك الدهنية", "الخضروات الورقية الداكنة", "المكسرات والبذور", "الكركم (مضاد التهاب طبيعي)", "الشاي الأخضر", "الأطعمة المخمرة (الكيمتشي، مخلل الملفوف)"],
    badFoods: ["الكافيين والمنبهات", "السكريات المكررة", "الغلوتين (للبعض)", "منتجات الألبان (للبعض)", "الأطعمة فائقة المعالجة", "الكحول"],
    exercises: ["تمارين الأيروبيك (تقلل أعراض الوسواس)", "اليوغا واليقظة الذهنية", "المشي في الطبيعة", "الجري المعتدل", "تمارين القوة"],
    breathing: ["التنفس البطني العميق", "تنفس ٤-٧-٨", "التنفس الواعي (التركيز على حركة الهواء)", "تمارين التنفس مع التصور الذهني"],
    sleep: ["الالتزام بجدول نوم ثابت", "تهيئة غرفة النوم كملاذ آمن وهادئ", "تقليل المهيجات الحسية قبل النوم", "تمارين استرخاء قبل النوم", "كتابة الوساوس في دفتر خارج غرفة النوم"],
  },
  {
    slug: "ptsd", name: "اضطراب ما بعد الصدمة", icon: Eye, color: "text-red-500", bg: "from-red-500/10", accent: "bg-red-500",
    vitamins: [
      { name: "أوميغا 3", dose: "٢٠٠٠-٣٠٠٠ ملغ يوميا", note: "يدعم المرونة العصبية." },
      { name: "المغنيسيوم", dose: "٢٠٠-٤٠٠ ملغ يوميا", note: "يساعد في تنظيم استجابة الكورتيزول." },
      { name: "فيتامين D", dose: "٢٠٠٠-٥٠٠٠ وحدة دولية يوميا", note: "نقصه مرتبط بزيادة شدة الأعراض." },
      { name: "ن-أسيتيل سيستين NAC", dose: "١٢٠٠-٢٤٠٠ ملغ يوميا", note: "يدعم إزالة السموم العصبية." },
    ],
    goodFoods: ["الأسماك الدهنية الغنية بأوميغا 3", "الأطعمة الغنية بمضادات الأكسدة", "الخضروات الورقية الداكنة", "الفواكه الغنية بفيتامين C", "البروتينات الخالية من الدهون", "الأطعمة المخمرة الغنية بالبروبيوتيك", "الشاي الأخضر"],
    badFoods: ["الكافيين (يحفز اليقظة المفرطة)", "الكحول (يتداخل مع النوم ويعمق الأعراض)", "السكريات المكررة", "الأطعمة المصنعة", "الوجبات الثقيلة قبل النوم"],
    exercises: ["اليوغا وخاصة يوغا الصدمة Trauma-Sensitive Yoga", "المشي في الطبيعة Grounding", "السباحة", "تمارين التمدد اللطيفة", "الركض المعتدل", "تمارين القوة الخفيفة"],
    breathing: ["التنفس البطيء العميق (لتخفيف فرط اليقظة)", "التنفس المربع (للشعور بالأمان)", "تنفس ٤-٧-٨", "تمارين التنفس مع الحركة (تمديد الذراعين مع الشهيق)"],
    sleep: ["تثبيت جدول نوم آمن ومنتظم", "تهيئة بيئة نوم آمنة", "تقنيات التأريض قبل النوم", "تجنب المحتوى المزعج قبل النوم", "استخدام البطانيات الثقيلة Weighted Blanket"],
  },
  {
    slug: "insomnia", name: "الأرق", icon: Moon, color: "text-sky-500", bg: "from-sky-500/10", accent: "bg-sky-500",
    vitamins: [
      { name: "الميلاتونين", dose: "٠.٥-٣ ملغ قبل النوم بـ ٣٠-٦٠ دقيقة", note: "جرعات قليلة أفضل." },
      { name: "المغنيسيوم", dose: "٢٠٠-٤٠٠ ملغ قبل النوم", note: "جلايسينات المغنيسيوم مفيدة للنوم." },
      { name: "فيتامين B6", dose: "٢٥-٥٠ ملغ يوميا", note: "يدعم إنتاج الميلاتونين." },
      { name: "جذر الناردين", dose: "٣٠٠-٦٠٠ ملغ قبل النوم", note: "مهدئ طبيعي." },
    ],
    goodFoods: ["الموز (غني بالمغنيسيوم والبوتاسيوم)", "اللوز والجوز", "الكيوي (دراسات تشير لتحسين النوم)", "الحليب الدافئ", "شاي البابونج والنعناع", "الشوفان والحبوب الكاملة", "الكرز (مصدر طبيعي للميلاتونين)"],
    badFoods: ["الكافيين (القهوة، الشاي، الشوكولاتة) في المساء", "الوجبات الثقيلة قبل النوم", "السكريات المكررة", "الكحول (يعطل جودة النوم)", "الأطعمة الحارة (قد تسبب حرقة المعدة)", "المشروبات الغازية"],
    exercises: ["تمارين الأيروبيك المعتدلة صباحا أو ظهرا", "اليوغا المسائية اللطيفة", "المشي بعد العشاء", "تمارين التمدد", "تجنب الرياضة الشديدة قبل النوم بأقل من ٣ ساعات"],
    breathing: ["تنفس ٤-٧-٨ (ممتاز للنوم)", "التنفس البطني العميق", "استرخاء العضلات التدريجي مع التنفس", "التنفس المتماثل البطيء (٥ ثوان شهيق، ٥ ثوان زفير)"],
    sleep: ["تثبيت مواعيد النوم والاستيقاظ حتى في العطلات", "غرفة نوم مظلمة تماما وباردة (١٨-٢٢ درجة مئوية)", "لا شاشات قبل النوم بساعة على الأقل", "الاستحمام الدافئ قبل النوم", "القراءة (كتاب ورقي) قبل النوم"],
  },
  {
    slug: "burnout", name: "الاحتراق الوظيفي", icon: BatteryWarning, color: "text-teal-500", bg: "from-teal-500/10", accent: "bg-teal-500",
    vitamins: [
      { name: "فيتامين B المركب", dose: "حسب الجرعة المدونة", note: "يدعم الطاقة وإنتاج الناقلات العصبية." },
      { name: "المغنيسيوم", dose: "٢٠٠-٤٠٠ ملغ يوميا", note: "مهم للاسترخاء وتخفيف التوتر." },
      { name: "فيتامين C", dose: "٥٠٠-١٠٠٠ ملغ يوميا", note: "يدعم الغدة الكظرية." },
      { name: "أشواغاندا", dose: "٣٠٠-٦٠٠ ملغ يوميا", note: "مكيف طبيعي يخفض الكورتيزول." },
    ],
    goodFoods: ["الأطعمة الكاملة غير المصنعة", "البروتينات الخالية من الدهون (دجاج، سمك، بيض)", "الكربوهيدرات المعقدة (الشوفان، الكينوا، الأرز البني)", "الخضروات الورقية", "الأفوكادو", "المكسرات والبذور", "التوت والفواكه الطازجة", "شاي الأعشاب المهدئة"],
    badFoods: ["الكافيين المفرط (القهوة ومشروبات الطاقة)", "السكريات المكررة والوجبات السريعة", "الكحول", "الأطعمة فائقة المعالجة", "الوجبات الخفيفة غير الصحية"],
    exercises: ["تمارين الاسترخاء (اليوغا، التاي تشي)", "المشي في الطبيعة", "السباحة اللطيفة", "تمارين التمدد", "تمارين التنفس والحركة البطيئة"],
    breathing: ["التنفس البطني العميق (لتنشيط الجهاز العصبي السمبتاوي)", "تنفس ٤-٧-٨", "التنفس المربع", "زفير أطول من الشهيق"],
    sleep: ["النوم الكافي (٧-٩ ساعات)", "جدول نوم منتظم", "طقوس استرخاء مسائية", "فصل العمل عن المنزل", "أخذ استراحات منتظمة أثناء العمل"],
  },
];

const TABS = [
  { id: "vitamins", label: "الفيتامينات", icon: Pill },
  { id: "goodFoods", label: "أطعمة مفيدة", icon: Apple },
  { id: "badFoods", label: "أطعمة ضارة", icon: AlertTriangle },
  { id: "exercises", label: "الرياضة", icon: Dumbbell },
  { id: "breathing", label: "تمارين تنفس", icon: Wind },
  { id: "sleep", label: "النوم", icon: Moon },
];

export default function NaturalTreatmentsPage() {
  const [activeTab, setActiveTab] = useState("vitamins");
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2400&auto=format&fit=crop')",
            filter: "brightness(0.3) saturate(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
            <ChevronLeft className="h-4 w-4" /> العودة للرئيسية
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-rose-300/50 bg-rose-600/20 p-5 backdrop-blur-xl"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-rose-400" />
            <div>
              <p className="text-lg font-bold text-rose-100">تحذير مهم</p>
              <p className="mt-1 text-sm leading-relaxed text-rose-200">
                هذا المحتوى تثقيفي فقط ولا يغني عن استشارة المختص. المكملات الغذائية والتمارين المذكورة ليست بديلا عن العلاج الطبي أو النفسي الاحترافي. يجب استشارة الطبيب قبل البدء في أي مكمل غذائي، خاصة إذا كنت تتناول أدوية أخرى. الجرعات المذكورة هي جرعات مقترحة عامة وقد تختلف من شخص لآخر حسب حالته الصحية.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl"
        >
          <span className="glass-badge inline-flex items-center gap-2 text-xs text-sage-light">
            <Sparkles className="h-3.5 w-3.5" /> علاج طبيعي وتكميلي
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            العلاج الطبيعي والتكميلي
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            الفيتامينات، الأطعمة، التمارين، التنفس، والنوم — نظرة شاملة لدعم صحتك النفسية بطرق طبيعية.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-sage-600 text-white shadow-glow-emerald"
                  : "glass-subtle text-white/70 hover:text-white hover:bg-glass-white/20"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 space-y-4">
          {DISEASES_DATA.map((d, i) => {
            const isOpen = expandedDisease === d.slug;
            const items = d[activeTab as keyof typeof d] as string[] | { name: string; dose: string; note: string }[];

            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Card
                  variant="strong"
                  padding="lg"
                  className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", d.bg)} />
                  <div className="relative">
                    <button
                      onClick={() => setExpandedDisease(isOpen ? null : d.slug)}
                      className="flex w-full items-center justify-between text-right"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-glass-white transition-all duration-300", d.color)}>
                          <d.icon className="h-7 w-7" />
                        </div>
                        <h2 className="font-serif text-xl font-semibold text-white">{d.name}</h2>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="h-5 w-5 text-white/50" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 space-y-3">
                            {activeTab === "vitamins" ? (
                              <div className="grid gap-3 sm:grid-cols-2">
                                {(items as { name: string; dose: string; note: string }[]).map((v, idx) => (
                                  <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <p className="font-medium text-white">{v.name}</p>
                                    <p className="mt-1 text-sm text-sage-300">{v.dose}</p>
                                    <p className="mt-1 text-xs text-white/50">{v.note}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="grid gap-2 sm:grid-cols-2">
                                {(items as string[]).map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                                    <span className={cn("mt-1 h-2 w-2 flex-shrink-0 rounded-full", activeTab === "badFoods" ? "bg-rose-400" : "bg-emerald-400")} />
                                    <span className="text-sm leading-relaxed text-white/80">{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
