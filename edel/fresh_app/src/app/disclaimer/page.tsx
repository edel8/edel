"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Heart,
  Phone,
  ShieldAlert,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="glass-badge mb-4 inline-flex items-center gap-2 text-xs text-destructive">
            <ShieldAlert className="h-3.5 w-3.5" /> تنبيه مهم
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            تنبيه طبي واضح
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            من فضلك اقرأ هذا التنبيه بعناية قبل استخدام المنصة
          </p>
        </motion.div>

        {/* Main Warning Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-8 overflow-hidden rounded-3xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/5 via-transparent to-rose-500/5 p-8 shadow-glow-rose sm:p-12"
        >
          <div className="pointer-events-none absolute -inset-40 rounded-full bg-destructive/5 blur-3xl" />

          <div className="relative z-10 text-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/15"
            >
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </motion.div>

            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              هذا المحتوى تثقيفي فقط
            </h2>

            <div className="mx-auto mt-6 max-w-2xl space-y-4">
              <p className="text-xl font-semibold leading-relaxed text-foreground">
                لا يغني إطلاقاً عن زيارة مختص نفسي مؤهل.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                المعلومات والأدوات المتاحة على هذه المنصة هي لأغراض تثقيفية
                وتوعوية فقط. لا نقدم تشخيصات طبية أو نفسية، ولا نوصي بعلاجات
                محددة. إذا كنت تعاني من أعراض نفسية شديدة، فيرجى التوجه إلى
                مختص صحي مؤهل.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 overflow-hidden rounded-3xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5 p-8 sm:p-10"
        >
          <div className="text-center">
            <Phone className="mx-auto mb-4 h-10 w-10 text-destructive" />
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              في حال الأفكار الانتحارية
            </h2>
            <p className="mt-2 text-lg font-semibold text-destructive">
              اتصل فوراً على الأرقام التالية:
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.a
                href="tel:122"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl bg-destructive px-8 py-5 text-xl font-bold text-white shadow-glow-rose transition-all hover:bg-destructive/90 sm:w-auto"
              >
                <Phone className="h-6 w-6" />
                122
              </motion.a>
              <motion.a
                href="tel:113"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl border-2 border-destructive px-8 py-5 text-xl font-bold text-destructive transition-all hover:bg-destructive/10 sm:w-auto"
              >
                <Phone className="h-6 w-6" />
                113
              </motion.a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              خط المساعدة للوقاية من الانتحار متاح 24 ساعة طوال أيام الأسبوع
            </p>
          </div>
        </motion.div>

        {/* Important Notes Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border-glass bg-glass-white/60 p-6 text-center backdrop-blur-xl"
          >
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-amber-500" />
            <h3 className="font-semibold text-foreground">ليس بديلاً عن العلاج</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              هذه المنصة مكملة للعلاج النفسي وليست بديلاً عنه
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border-glass bg-glass-white/60 p-6 text-center backdrop-blur-xl"
          >
            <Heart className="mx-auto mb-3 h-8 w-8 text-rose-500" />
            <h3 className="font-semibold text-foreground">لا تشخيص عن بعد</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              لا نقدم تشخيصات طبية عبر الإنترنت تحت أي ظرف
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border-glass bg-glass-white/60 p-6 text-center backdrop-blur-xl"
          >
            <BookOpen className="mx-auto mb-3 h-8 w-8 text-sky-500" />
            <h3 className="font-semibold text-foreground">للتوعية فقط</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              المحتوى مبني على مصادر علمية ولكن للتوعية وليس للعلاج
            </p>
          </motion.div>
        </div>

        {/* Full Disclaimer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border-glass bg-glass-white/60 p-6 backdrop-blur-xl sm:p-8"
        >
          <h3 className="mb-4 font-serif text-xl font-bold text-foreground">
            إخلاء مسؤولية كامل
          </h3>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              منصة Edel هي منصة تثقيفية تهدف إلى نشر الوعي حول الصحة النفسية
              وتقديم أدوات مساعدة للتطور الشخصي. جميع المعلومات والتمارين
              والموارد المتاحة على المنصة هي لأغراض تعليمية وتوعوية فقط.
            </p>
            <p>
              استخدام المنصة لا ينشئ علاقة مهنية بينك وبين فريق Edel. لا ينبغي
              اعتبار أي محتوى على المنصة بديلاً عن الاستشارة النفسية أو الطبية
              المهنية.
            </p>
            <p>
              إذا كنت تعاني من أزمة نفسية أو لديك أفكار إيذاء النفس أو
              الانتحار، يرجى الاتصال فوراً على رقم الطوارئ 122 أو خط المساعدة
              113، أو التوجه إلى أقرب مستشفى.
            </p>
            <p>
              نحن نشجعك دائماً على التواصل مع مختص صحي نفسي مؤهل للحصول على
              الرعاية المناسبة لحالتك. صحتك النفسية مهمة، والعناية المهنية هي
              أفضل استثمار يمكنك القيام به لنفسك.
            </p>
            <p className="text-xs text-muted-foreground/70">
              آخر تحديث: ٢٠٢٥
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
