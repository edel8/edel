"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Heart,
  Feather,
  Sun,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  Target,
  Users,
  List,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TREATMENTS = [
  {
    id: "cbt",
    name: "العلاج المعرفي السلوكي",
    subtitle: "CBT",
    icon: Brain,
    color: "text-lavender-600",
    bg: "from-lavender-500/10",
    accent: "bg-lavender-600",
    howItWorks: [
      "يركز العلاج المعرفي السلوكي على العلاقة بين الأفكار والمشاعر والسلوكيات.",
      "يساعدك على تحديد أنماط التفكير السلبية (التشوهات المعرفية) وتحديها.",
      "يعلمك مهارات عملية لتغيير السلوكيات غير المرغوب فيها.",
      "يستهدف المشكلة الحالية بدلاً من التركيز على الماضي.",
      "يتضمن تمارين عملية وتطبيقات يومية بين الجلسات.",
      "يعتمد على التعاون النشط بين المعالج والمريض.",
    ],
    whoItsFor: [
      "مناسب لمعظم اضطرابات القلق والاكتئاب.",
      "فعال لاضطراب الوسواس القهري والرهاب الاجتماعي.",
      "مفيد لاضطرابات الأكل واضطراب ما بعد الصدمة.",
      "مناسب للأشخاص الذين يفضلون حلولًا عملية ومنظمة.",
      "فعال للبالغين والمراهقين والأطفال (بأساليب معدلة).",
      "مفيد للأشخاص المستعدين للمشاركة النشطة في العلاج.",
    ],
    sessionSteps: [
      "تقييم الحالة: فهم المشكلة وتحديد الأهداف العلاجية (الجلسة الأولى).",
      "التوعية: شرح نموذج CBT وكيفية ارتباط الأفكار بالمشاعر والسلوك.",
      "تحديد الأفكار التلقائية السلبية: تعلم التعرف على التشوهات المعرفية.",
      "إعادة الهيكلة المعرفية: تحدي الأفكار غير المنطقية واستبدالها بأخرى أكثر توازنًا.",
      "التجارب السلوكية: اختبار المعتقدات من خلال تمارين عملية.",
      "التعرض التدريجي: مواجهة المواقف المخيفة بشكل آمن ومنظم.",
      "الوقاية من الانتكاس: تطوير استراتيجيات للتعامل مع التحديات المستقبلية.",
      "التقييم الختامي: مراجعة التقدم وتلخيص المهارات المكتسبة.",
    ],
  },
  {
    id: "act",
    name: "العلاج بالقبول والالتزام",
    subtitle: "ACT",
    icon: Feather,
    color: "text-emerald-600",
    bg: "from-emerald-500/10",
    accent: "bg-emerald-600",
    howItWorks: [
      "ACT لا يحاول التخلص من المشاعر السلبية، بل يعلمك كيف تعيش معها دون أن تتحكم بك.",
      "يقوم على فكرة أن المعاناة جزء طبيعي من الحياة البشرية.",
      "يعزز القبول: السماح للمشاعر والأفكار بالوجود دون مقاومة.",
      "يساعدك على توضيح قيمك الشخصية والعيش وفقًا لها.",
      "يستخدم تقنيات اليقظة الذهنية للبقاء في اللحظة الحالية.",
      "يشجع على الالتزام بإجراء تغييرات سلوكية تتماشى مع قيمك.",
    ],
    whoItsFor: [
      "مناسب للأشخاص الذين يعانون من القلق المزمن والاكتئاب.",
      "فعال للألم المزمن والحالات الطبية المزمنة.",
      "مفيد لمن جربوا علاجات أخرى دون نجاح.",
      "مناسب للأشخاص المهتمين بالنمو الشخصي والوعي الذاتي.",
      "فعال لاضطرابات القلق العام والرهاب الاجتماعي.",
      "مفيد للأشخاص الذين يرغبون في تطوير علاقة صحية مع مشاعرهم.",
    ],
    sessionSteps: [
      "التقييم: فهم أنماط التجنب والقيم الأساسية للشخص.",
      "القبول: تعلم التوقف عن محاربة المشاعر والأفكار غير المريحة.",
      "الانفصال المعرفي: فصل الذات عن الأفكار (أنا لست أفكاري).",
      "الحضور الذهني: تطوير مهارات اليقظة الذهنية والوعي باللحظة الحالية.",
      "الذات كسياق: رؤية الذات كوعاء للمشاعر وليس محتواها.",
      "توضيح القيم: تحديد ما هو مهم حقًا في الحياة.",
      "الالتزام بالعمل: وضع أهداف ملموسة بناءً على القيم.",
      "الممارسة المستمرة: تطبيق المهارات في الحياة اليومية.",
    ],
  },
  {
    id: "dbt",
    name: "العلاج الجدلي السلوكي",
    subtitle: "DBT",
    icon: Heart,
    color: "text-rose-600",
    bg: "from-rose-500/10",
    accent: "bg-rose-600",
    howItWorks: [
      "يجمع DBT بين العلاج المعرفي السلوكي ومفاهيم اليقظة الذهنية والقبول.",
      "يركز على تنظيم المشاعر وتحمل الضيق وتحسين العلاقات.",
      "يعتمد على مفهوم 'الجدلية': التوازن بين التغيير والقبول.",
      "يشمل جلسات فردية وجلسات جماعية لمهارات التدريب.",
      "يعلم أربع مجموعات مهارات رئيسية: اليقظة، تحمل الضيق، تنظيم المشاعر، الفعالية الشخصية.",
      "يوفر دعمًا على مدار الساعة عبر الهاتف بين الجلسات.",
    ],
    whoItsFor: [
      "صمم خصيصًا لاضطراب الشخصية الحدية (BPD).",
      "فعال لمن يعانون من إيذاء النفس والأفكار الانتحارية.",
      "مفيد لاضطرابات الأكل الشديدة.",
      "مناسب للأشخاص ذوي المشاعر الشديدة والمتقلبة.",
      "فعال لاضطراب تعاطي المخدرات المصاحب لاضطرابات الشخصية.",
      "مفيد للمراهقين المصابين باضطرابات سلوكية حادة.",
    ],
    sessionSteps: [
      "التقييم الأولي: تحديد أنماط السلوك الخطيرة والأهداف العلاجية.",
      "اليقظة الذهنية: تعلم مهارات العيش في اللحظة الحالية.",
      "تنظيم المشاعر: فهم المشاعر وتعلم كيفية تغييرها.",
      "تحمل الضيق: بناء القدرة على تحمل الأزمات دون سلوك مدمر.",
      "الفعالية الشخصية: تعلم كيفية التواصل بفعالية ووضع الحدود.",
      "تطبيق المهارات: تطبيق المهارات المتعلمة على مواقف الحياة الواقعية.",
      "التقييم الأسبوعي: مراجعة التقدم ومعالجة التحديات.",
      "الوقاية من الانتكاس: تعزيز المهارات للتعامل مع المستقبل.",
    ],
  },
  {
    id: "erp",
    name: "العلاج بالتعرض ومنع الاستجابة",
    subtitle: "ERP",
    icon: Target,
    color: "text-violet-600",
    bg: "from-violet-500/10",
    accent: "bg-violet-600",
    howItWorks: [
      "ERP هو العلاج الأساسي والأكثر فعالية للوسواس القهري.",
      "يعمل على مبدأ مواجهة المخاوف تدريجيًا دون القيام بالسلوك القهري.",
      "يساعد الدماغ على التعلم أن القلق ينخفض طبيعيًا مع الوقت.",
      "يبدأ بمواقف أقل إثارة للقلق ويتدرج إلى الأكثر صعوبة.",
      "يمنع التعزيز السلبي الذي يحدث عند أداء الطقوس القهرية.",
      "يعتمد على مبدأ الاعتياد: التعود على القلق حتى يختفي.",
    ],
    whoItsFor: [
      "العلاج الأساسي لاضطراب الوسواس القهري (OCD).",
      "فعال للرهاب المحدد والرهاب الاجتماعي.",
      "مفيد لاضطراب الهلع ورهاب الخلاء.",
      "مناسب لاضطراب ما بعد الصدمة (PTSD).",
      "فعال لاضطرابات القلق الأخرى.",
      "مفيد لمن يعانون من سلوكيات التجنب المزمنة.",
    ],
    sessionSteps: [
      "بناء سلم القلق: تحديد المخاوف وترتيبها من الأسهل إلى الأصعب.",
      "التوعية: شرح آلية التعرض وكيفية عملها.",
      "التعرض في الخيال: مواجهة المخاوف ذهنيًا أولاً.",
      "التعرض الحي: مواجهة الموقف الحقيقي المسبب للقلق تدريجيًا.",
      "منع الاستجابة: مقاومة القيام بالسلوك القهري بعد التعرض.",
      "تسجيل النتائج: توثيق مستوى القلق قبل وأثناء وبعد التعرض.",
      "التدرج: الانتقال إلى المستوى التالي في سلم القلق.",
      "الاستمرار والممارسة: تكرار التمارين حتى يختفي القلق.",
    ],
  },
];

export default function TreatmentsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen">
      {/* Flat color block background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/60 via-background to-lavender-50/40" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-lavender-100/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:px-10">
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
          <span className="glass-badge inline-flex items-center gap-2 text-xs text-sage-700">
            <Sparkles className="h-3.5 w-3.5" /> خيارات علاجية مثبتة
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            قسم العلاج النفسي
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            تعرف على أنواع العلاج النفسي المختلفة وكيف يمكن لكل منها مساعدتك في رحلة التعافي.
          </p>
        </motion.div>

        <div className="mt-14 space-y-6">
          {TREATMENTS.map((t, i) => {
            const isOpen = expanded === t.id;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  className="overflow-hidden"
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", t.bg)} />
                  <div className="relative">
                    <button
                      onClick={() => setExpanded(isOpen ? null : t.id)}
                      className="flex w-full items-center justify-between text-right"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-glass-white transition-all duration-300", t.color)}>
                          <t.icon className="h-7 w-7" />
                        </div>
                        <div>
                          <h2 className="font-serif text-2xl font-semibold">{t.name}</h2>
                          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-6 w-6 text-muted-foreground" />
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
                          <div className="mt-8 space-y-8">
                            {/* كيف يعمل */}
                            <SectionBlock
                              icon={Brain}
                              title="كيف يعمل"
                              items={t.howItWorks}
                              color={t.color}
                            />

                            {/* لمن يناسب */}
                            <SectionBlock
                              icon={Users}
                              title="لمن يناسب"
                              items={t.whoItsFor}
                              color={t.color}
                            />

                            {/* خطوات الجلسة */}
                            <SectionBlock
                              icon={List}
                              title="خطوات الجلسة"
                              items={t.sessionSteps}
                              color={t.color}
                              numbered
                            />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl glass-strong p-8 text-center"
        >
          <Sun className="mx-auto h-10 w-10 text-sage-600" />
          <h2 className="mt-4 font-serif text-2xl font-semibold">لست وحدك في هذه الرحلة</h2>
          <p className="mt-2 mx-auto max-w-lg text-muted-foreground">
            العلاج النفسي ليس علامة ضعف، بل خطوة شجاعة نحو حياة أفضل. اختر النهج الذي يناسبك وابدأ رحلة التعافي اليوم.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function SectionBlock({
  icon: Icon,
  title,
  items,
  color,
  numbered = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  color: string;
  numbered?: boolean;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <Icon className={cn("h-5 w-5", color)} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-1 flex-shrink-0">
              {numbered ? (
                <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white", color === "text-lavender-600" ? "bg-lavender-600" : color === "text-emerald-600" ? "bg-emerald-600" : color === "text-rose-600" ? "bg-rose-600" : "bg-violet-600")}>
                  {idx + 1}
                </span>
              ) : (
                <CheckCircle className={cn("h-4 w-4", color)} />
              )}
            </span>
            <span className="leading-relaxed text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
