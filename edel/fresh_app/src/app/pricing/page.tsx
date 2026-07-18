"use client";

import { motion } from "framer-motion";
import {
  Check,
  Heart,
  Gift,
  ShieldCheck,
  Infinity as InfinityIcon,
  Smile,
  Sparkles,
  CreditCard,
  BookOpen,
  MessageCircle,
  Brain,
  Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const freeFeatures = [
  {
    icon: Brain,
    title: "تمارين العلاج المعرفي",
    desc: "مجموعة كاملة من تمارين العلاج السلوكي المعرفي",
  },
  {
    icon: Smile,
    title: "تتبع المزاج اليومي",
    desc: "سجل مشاعرك وتابع تطورك برسوم بيانية تفاعلية",
  },
  {
    icon: BookOpen,
    title: "مكتبة تثقيفية",
    desc: "فيديوهات، إنفوغرافيك، وأدلة PDF مجانية بالكامل",
  },
  {
    icon: Gamepad2,
    title: "ألعاب ذهنية",
    desc: "ألعاب تدريبية لتحسين التركيز والذاكرة",
  },
  {
    icon: MessageCircle,
    title: "مجتمع داعم",
    desc: "تواصل مع مجتمع آمن وداعم في أي وقت",
  },
  {
    icon: ShieldCheck,
    title: "خصوصية تامة",
    desc: "بياناتك مشفرة وآمنة. بدون إعلانات أو بيع بيانات",
  },
];

const donationOptions = [
  { amount: "٢٥", label: "داعم", popular: false },
  { amount: "٥٠", label: "مساهم", popular: true },
  { amount: "١٠٠", label: "راعي", popular: false },
  { amount: "أخرى", label: "مخصص", popular: false },
];

const paymentMethods = [
  { name: "بطاقة ائتمان", icon: CreditCard },
  { name: "Apple Pay", icon: CreditCard },
  { name: "Google Pay", icon: CreditCard },
  { name: "PayPal", icon: CreditCard },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="glass-badge mb-4 inline-flex items-center gap-2 text-xs">
            <Gift className="h-3.5 w-3.5" /> مجاني بالكامل
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            مجاني وداعم
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            المنصة مجانية بالكامل ولا توجد أي رسوم خفية. يمكنك دعمنا إذا أردت،
            لكنه ليس إلزامياً أبداً.
          </p>
        </motion.div>

        {/* Free Plan Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto mb-12 max-w-2xl overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-sage-500/10 p-8 text-center shadow-glow-emerald sm:p-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
          >
            <InfinityIcon className="h-10 w-10 text-emerald-500" />
          </motion.div>

          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            اشتراك مجاني للأبد
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            جميع خدمات المنصة متاحة مجاناً بالكامل. نحن نؤمن أن الصحة النفسية
            يجب أن تكون في متناول الجميع دون حواجز مالية.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "بدون بطاقة ائتمان",
              "بدون إعلانات",
              "بدون حدود",
              "تحديثات مجانية",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full glass-subtle px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Check className="h-3 w-3 text-emerald-500" />
                {tag}
              </span>
            ))}
          </div>

          <button className="mt-8 w-full rounded-xl bg-emerald-500 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-emerald-600 sm:w-auto sm:inline-flex">
            ابدأ مجاناً
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground sm:text-3xl">
            كل هذا مجاني
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freeFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border-glass bg-glass-white/60 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1"
              >
                <div className="absolute -inset-20 rounded-full bg-emerald-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-3xl border border-border-glass bg-glass-white/60 p-8 text-center backdrop-blur-xl sm:p-10">
            <Heart className="mx-auto mb-4 h-10 w-10 text-rose-500" />
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              ادعم المنصة (اختياري)
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              إذا وجدت المنصة مفيدة وتريد دعم استمراريتها، يمكنك التبرع بأي مبلغ
              تختاره. تبرعك يساعد في تطوير المحتوى وتوسيع الخدمات.
            </p>

            {/* Donation Amounts */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {donationOptions.map((option) => (
                <motion.button
                  key={option.amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative flex min-w-[80px] flex-col items-center gap-1 rounded-xl border-2 px-6 py-3 transition-all",
                    option.popular
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border-glass text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {option.popular && (
                    <span className="absolute -top-2.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                      الأكثر اختياراً
                    </span>
                  )}
                  <span className="text-lg font-bold">{option.amount}</span>
                  <span className="text-xs">{option.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Payment Methods Placeholder */}
            <div className="mt-6">
              <p className="mb-3 text-xs text-muted-foreground">
                طرق الدفع المتاحة (قريباً)
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-2 rounded-xl glass-subtle px-4 py-2 text-sm text-muted-foreground"
                  >
                    <method.icon className="h-4 w-4" />
                    {method.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-muted-foreground/30 p-4">
              <p className="text-xs text-muted-foreground">
                💚 شكراً لكل من يدعم هذه المنصة. كل تبرع، مهما كان صغيراً، يساعد
                في إبقاء المحتوى مجانياً للجميع.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-xl text-center"
        >
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            لا توجد أي خطط مدفوعة مستقبلية. سنبقى مجانيين دائماً.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
