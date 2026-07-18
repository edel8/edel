"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageCircle,
  Instagram,
  User,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactCard({
  icon: Icon,
  title,
  subtitle,
  action,
  href,
  gradient,
  delay = 0,
}: {
  icon: typeof MessageCircle;
  title: string;
  subtitle: string;
  action: string;
  href?: string;
  gradient: string;
  delay?: number;
}) {
  const handleClick = () => {
    if (!href) return;
    if (href.startsWith("https://t.me")) {
      const domain = href.split("/").pop();
      const tgDeepLink = `tg://resolve?domain=${domain}`;
      const webLink = href;
      const w = window.open("", "_blank");
      if (w) {
        w.location.href = tgDeepLink;
        setTimeout(() => {
          try { if (w.closed) window.open(webLink, "_blank"); } catch { window.open(webLink, "_blank"); }
        }, 500);
      } else {
        window.open(webLink, "_blank");
      }
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onClick={handleClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent bg-glass-white/60 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
        "before:pointer-events-none before:absolute before:-inset-[2px] before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
      )}
      style={{
        backgroundClip: "padding-box",
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          gradient
        )}
      />
      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-sm transition-all duration-300 group-hover:shadow-glow-primary"
        >
          <Icon className="h-7 w-7" />
        </motion.div>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            {action}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "الرجاء إدخال الاسم";
    if (!form.email.trim()) errs.email = "الرجاء إدخال البريد الإلكتروني";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "البريد الإلكتروني غير صحيح";
    if (!form.message.trim()) errs.message = "الرجاء إدخال الرسالة";
    else if (form.message.trim().length < 10)
      errs.message = "الرسالة قصيرة جداً (على الأقل 10 أحرف)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

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
            <Sparkles className="h-3.5 w-3.5" /> تواصل معنا
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            نحن هنا لأجلك
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            تواصل معنا عبر القنوات التالية أو أرسل لنا رسالة مباشرة
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Contact Cards */}
          <div className="space-y-5">
            <ContactCard
              icon={MessageCircle}
              title="تلغرام"
              subtitle="للتواصل المباشر السريع"
              action="@WZE66"
              href="https://t.me/WZE66"
              gradient="from-sky-400/10 to-sky-500/10"
              delay={0.1}
            />
            <ContactCard
              icon={Instagram}
              title="إنستغرام"
              subtitle="تابعنا للحصول على محتوى توعوي"
              action="@w9ub"
              href="https://instagram.com/w9ub"
              gradient="from-pink-400/10 to-purple-500/10"
              delay={0.2}
            />
            <ContactCard
              icon={Mail}
              title="البريد الإلكتروني"
              subtitle="للاقتراحات والاستفسارات"
              action="أرسل لنا رسالة"
              gradient="from-amber-400/10 to-rose-500/10"
              delay={0.3}
            />
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-strong rounded-2xl p-6 sm:p-8"
            >
              <h3 className="mb-6 font-serif text-xl font-bold text-foreground">
                أرسل لنا رسالة
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-muted-foreground"
                  >
                    الاسم
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={cn(
                        "glass-input w-full pr-10",
                        errors.name && "border-destructive/50 ring-destructive/20"
                      )}
                      placeholder="اسمك الكريم"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-muted-foreground"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className={cn(
                        "glass-input w-full pr-10",
                        errors.email && "border-destructive/50 ring-destructive/20"
                      )}
                      placeholder="بريدك الإلكتروني"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-muted-foreground"
                  >
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className={cn(
                      "glass-input w-full resize-none",
                      errors.message && "border-destructive/50 ring-destructive/20"
                    )}
                    placeholder="اكتب رسالتك هنا..."
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-medium transition-all",
                    submitted
                      ? "bg-emerald-500 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      تم الإرسال
                    </>
                  ) : sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                      />
                      جاري الإرسال
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      إرسال الرسالة
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
