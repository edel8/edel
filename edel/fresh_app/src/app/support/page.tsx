"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneCall,
  Heart,
  AlertTriangle,
  Shield,
  Users,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  Clock,
  Ambulance,
  Home,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CRISIS_HOTLINES = [
  {
    name: "الخط الساخن للانتحار",
    number: "122",
    description: "دعم فوري للأشخاص الذين يفكرون في إيذاء أنفسهم",
    color: "rose",
    icon: PhoneCall,
  },
  {
    name: "دعم الصحة النفسية",
    number: "113",
    description: "استشارات نفسية مجانية من مختصين معتمدين",
    color: "lavender",
    icon: Heart,
  },
  {
    name: "الإسعاف النفسي",
    number: "١٢٢",
    description: "خدمة إسعاف نفسي طارئة على مدار الساعة",
    color: "amber",
    icon: Ambulance,
  },
  {
    name: "خط مساعدة الطفل",
    number: "116",
    description: "دعم نفسي للأطفال والمراهقين",
    color: "emerald",
    icon: Home,
  },
];

const SUPPORT_GROUPS = [
  {
    title: "مجموعة دعم القلق",
    schedule: "كل ثلاثاء ٨ مساءً",
    description: "جلسة أسبوعية للتعامل مع القلق والتوتر",
    members: 24,
  },
  {
    title: "مجموعة دعم الاكتئاب",
    schedule: "كل خميس ٧ مساءً",
    description: "مساحة آمنة لمشاركة التجارب والتعافي معاً",
    members: 31,
  },
  {
    title: "مجموعة الحزن والفقد",
    schedule: "كل سبت ٦ مساءً",
    description: "دعم متبادل لمن يعانون من فقدان عزيز",
    members: 18,
  },
  {
    title: "مجموعة التعافي من الإدمان",
    schedule: "كل أحد ٨ مساءً",
    description: "رحلة تعافي جماعية بإشراف مختصين",
    members: 15,
  },
];

const SELF_HELP_TIPS = [
  {
    title: "تمارين التنفس",
    desc: "خذ ٥ أنفاس عميقة: شهيق لمدة ٤ ثوانٍ، احبس ٤، زفير ٦",
    icon: BookOpen,
  },
  {
    title: "التأمل القصير",
    desc: "اجلس بهدوء لمدة دقيقتين وركز على أنفاسك فقط",
    icon: BookOpen,
  },
  {
    title: "التحدث مع صديق",
    desc: "في بعض الأحيان، مجرد مشاركة ما تشعر به يخفف العبء",
    icon: Users,
  },
  {
    title: "الحركة البسيطة",
    desc: "تمشَّ لمدة ١٠ دقائق أو قم بتمدد خفيف",
    icon: BookOpen,
  },
];

const URGENT_WARNING_SIGNS = [
  "أفكار بإيذاء النفس أو الانتحار",
  "شعور بأنك عبء على الآخرين",
  "فقدان كامل للأمل في المستقبل",
  "تغيرات مفاجئة وحادة في المزاج",
  "عزلة تامة عن الجميع",
];

export default function SupportPage() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-rose-50/40 via-lavender-50/30 to-mist-50/40 dark:from-rose-950/20 dark:via-lavender-950/20 dark:to-mist-950/40" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
            <Heart className="h-3.5 w-3.5" /> لست وحدك
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            قسم الدعم
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            مساحات آمنة، أرقام مهمة، ومجتمع داعم. مهما كان ما تمر به، هناك من يهتم ويستمع.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 overflow-hidden rounded-3xl border-2 border-rose-200/60 bg-gradient-to-br from-rose-50/90 via-white/80 to-rose-50/60 p-6 shadow-xl shadow-rose-500/10 dark:border-rose-900/40 dark:from-rose-950/40 dark:via-mist-900/60 dark:to-rose-950/30 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500/15">
              <AlertTriangle className="h-7 w-7 text-rose-600" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-rose-700 dark:text-rose-300">
                هل تمر بأزمة الآن؟
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-rose-600/80 dark:text-rose-400/80">
                إذا كنت تفكر في إيذاء نفسك أو تشعر أن الوضع لا يُحتمل،
                لا تتردد في الاتصال على الخط الساخن الآن. المساعدة على بعد مكالمة.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="tel:122"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-rose-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-rose-600/30 transition-all duration-300 hover:bg-rose-700 hover:shadow-rose-600/40 active:scale-[0.97]"
                >
                  <Phone className="h-5 w-5" />
                  اتصل على ١٢٢ الآن
                </a>
                <a
                  href="tel:113"
                  className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-rose-300/60 bg-white/60 px-6 py-3.5 text-base font-semibold text-rose-700 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 active:scale-[0.97] dark:border-rose-700/40 dark:bg-mist-900/60 dark:text-rose-300"
                >
                  <Phone className="h-5 w-5" />
                  دعم نفسي ١١٣
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10"
        >
          <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
            علامات الخطر
          </h2>
          <div className="glass-strong rounded-3xl p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-rose-500">
              إذا كنت تعاني من أي من هذه العلامات، تواصل مع المختص فوراً
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {URGENT_WARNING_SIGNS.map((sign, i) => (
                <motion.div
                  key={sign}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2.5 rounded-xl bg-rose-500/10 p-3 text-sm font-medium text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs">
                    ⚠
                  </span>
                  {sign}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
            أرقام الطوارئ
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {CRISIS_HOTLINES.map((line, i) => (
              <motion.a
                key={line.name}
                href={`tel:${line.number}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-5 transition-all duration-300",
                  line.color === "rose" && "bg-gradient-to-br from-rose-50 to-rose-100/80 dark:from-rose-950/40 dark:to-rose-900/20",
                  line.color === "lavender" && "bg-gradient-to-br from-lavender-50 to-lavender-100/80 dark:from-lavender-950/40 dark:to-lavender-900/20",
                  line.color === "amber" && "bg-gradient-to-br from-amber-50 to-amber-100/80 dark:from-amber-950/40 dark:to-amber-900/20",
                  line.color === "emerald" && "bg-gradient-to-br from-emerald-50 to-emerald-100/80 dark:from-emerald-950/40 dark:to-emerald-900/20",
                )}
              >
                <div className="flex items-start gap-4">
                  <span className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110",
                    line.color === "rose" && "bg-rose-500/15 text-rose-600",
                    line.color === "lavender" && "bg-lavender-500/15 text-lavender-600",
                    line.color === "amber" && "bg-amber-500/15 text-amber-600",
                    line.color === "emerald" && "bg-emerald-500/15 text-emerald-600",
                  )}>
                    <line.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{line.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{line.description}</p>
                    <span className={cn(
                      "mt-2 inline-flex items-center gap-1.5 text-2xl font-bold",
                      line.color === "rose" && "text-rose-600",
                      line.color === "lavender" && "text-lavender-600",
                      line.color === "amber" && "text-amber-600",
                      line.color === "emerald" && "text-emerald-600",
                    )}>
                      {line.number}
                      <ExternalLink className="h-4 w-4 opacity-50" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-10"
        >
          <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
            مجموعات الدعم
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUPPORT_GROUPS.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-strong cursor-pointer rounded-3xl p-5 transition-all duration-300 hover:shadow-lg"
                onClick={() => setExpandedGroup(expandedGroup === group.title ? null : group.title)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-500/15 text-lavender-600">
                      <Users className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground">{group.title}</h3>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {group.schedule}
                        </span>
                        <span>· {group.members} عضو</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-200",
                    expandedGroup === group.title && "rotate-180"
                  )} />
                </div>
                <AnimatePresence>
                  {expandedGroup === group.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 border-t border-border-glass pt-4 text-sm leading-relaxed text-muted-foreground">
                        {group.description}
                      </p>
                      <button className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-lavender-500/10 px-4 py-2 text-xs font-medium text-lavender-600 transition-all duration-200 hover:bg-lavender-500/20">
                        <MessageCircle className="h-3.5 w-3.5" /> انضم للمجموعة
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
            نصائح للدعم الذاتي
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SELF_HELP_TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-5 text-center transition-all duration-300 hover:shadow-md"
              >
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-500/10 text-lavender-600">
                  <Sparkles className="h-6 w-6" />
                </span>
                <h3 className="font-medium text-foreground">{tip.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 text-center"
        >
          <Link
            href="/vent"
            className="inline-flex items-center gap-2 rounded-2xl border border-border-glass px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-glass-white hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" /> أو يمكنك التحدث anonymously في قسم فضفضة
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
