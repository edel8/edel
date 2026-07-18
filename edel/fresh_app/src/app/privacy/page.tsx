"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "intro",
    title: "المقدمة",
    content: [
      "نحن في Edel نلتزم بحماية خصوصية زوارنا ومستخدمينا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدامك لمنصتنا.",
      "باستخدامك للمنصة، فإنك توافق على ممارسات جمع المعلومات واستخدامها كما هو موضح في هذه السياسة. إذا كنت لا توافق على أي جزء من هذه السياسة، فيرجى عدم استخدام المنصة.",
      "نحتفظ بالحق في تحديث أو تعديل سياسة الخصوصية هذه في أي وقت. سنقوم بإخطارك بأي تغييرات جوهرية عن طريق نشر السياسة المحدثة على هذه الصفحة.",
    ],
  },
  {
    id: "info-collect",
    title: "المعلومات التي نجمعها",
    content: [
      "نجمع المعلومات التالية عند استخدامك للمنصة:",
      "• المعلومات الشخصية: الاسم، البريد الإلكتروني (عند التسجيل)",
      "• معلومات المزاج والطاقة: البيانات التي تدخلها في أدوات تتبع المزاج",
      "• معلومات الاستخدام: الصفحات التي تزورها، الوقت الذي تقضيه على المنصة",
      "• معلومات التقنية: نوع المتصفح، نظام التشغيل، عنوان IP",
      "لا نجمع أي معلومات حساسة مثل المعتقدات الدينية أو التوجه الجنسي أو المعلومات الطبية الحقيقية (كل ما تدخله هو لأغراض التتبع الشخصي فقط).",
    ],
  },
  {
    id: "usage",
    title: "كيفية استخدام المعلومات",
    content: [
      "نستخدم المعلومات التي نجمعها للأغراض التالية:",
      "• تقديم وتحسين خدمات المنصة وتجربة المستخدم",
      "• تحليل الأنماط والاتجاهات لتحسين المحتوى المقدم",
      "• التواصل معك بخصوص تحديثات المنصة والخدمات",
      "• تحسين أداء المنصة وأمنها",
      "• تقديم توصيات مخصصة بناءً على مدخلاتك",
      "نحن لا نبيع معلوماتك الشخصية أبداً لأي طرف ثالث.",
    ],
  },
  {
    id: "protection",
    title: "حماية البيانات",
    content: [
      "نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفشاء أو الإتلاف:",
      "• تشفير جميع البيانات المنقولة عبر SSL/TLS",
      "• تخزين كلمات المرور بشكل مشفر باستخدام bcrypt",
      "• الوصول المحدود إلى البيانات الشخصية للموظفين المصرح لهم فقط",
      "• مراجعات أمنية دورية للنظام",
      "• نسخ احتياطية منتظمة للبيانات",
      "على الرغم من هذه الإجراءات، لا يمكن ضمان أمان مطلق للبيانات المنقولة عبر الإنترنت.",
    ],
  },
  {
    id: "rights",
    title: "حقوقك",
    content: [
      "لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:",
      "• حق الوصول: طلب نسخة من بياناتك الشخصية التي نحتفظ بها",
      "• حق التصحيح: طلب تصحيح أي معلومات غير دقيقة",
      "• حق الحذف: طلب حذف بياناتك الشخصية (في حدود القانون)",
      "• حق تقييد المعالجة: طلب الحد من معالجة بياناتك",
      "• حق نقل البيانات: طلب نقل بياناتك إلى مزود خدمة آخر",
      "• حق الاعتراض: الاعتراض على معالجة بياناتك لأغراض التسويق",
      "لممارسة هذه الحقوق، يرجى التواصل معنا عبر قنوات الاتصال المتاحة.",
    ],
  },
  {
    id: "changes",
    title: "التعديلات",
    content: [
      "نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ 'آخر تحديث'. التغييرات تصبح سارية المفعول فور نشرها.",
      "نشجعك على مراجعة هذه الصفحة بشكل دوري للاطلاع على أحدث المعلومات حول ممارسات الخصوصية لدينا. استمرار استخدامك للمنصة بعد نشر أي تغييرات يعني موافقتك على تلك التغييرات.",
      "آخر تحديث: ٢٠٢٥",
    ],
  },
  {
    id: "contact",
    title: "اتصل بنا",
    content: [
      "إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:",
      "• تلغرام: @WZE66",
      "• إنستغرام: @w9ub",
      "• أو من خلال نموذج التواصل على المنصة",
      "نحن ملتزمون بالرد على استفساراتك في أقرب وقت ممكن.",
    ],
  },
];

const sectionIds = sections.map((s) => s.id);

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("intro");

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
            <Shield className="h-3.5 w-3.5" /> الخصوصية
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            سياسة الخصوصية
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            آخر تحديث: ٢٠٢٥
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* TOC Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:h-fit lg:w-72 lg:shrink-0"
          >
            <div className="glass-strong rounded-2xl p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <BookOpen className="h-4 w-4" />
                المحتويات
              </div>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-glass-white/50"
                    )}
                  >
                    <ChevronLeft
                      className={cn(
                        "h-3 w-3 transition-transform",
                        activeSection === section.id && "-translate-x-0.5"
                      )}
                    />
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-w-0 flex-1"
          >
            <div className="space-y-8">
              {sections.map((section, i) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onViewportEnter={() => setActiveSection(section.id)}
                  className="scroll-mt-28"
                >
                  <div className="glass-strong rounded-2xl p-6 sm:p-8">
                    <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.content.map((paragraph, j) => (
                        <p
                          key={j}
                          className={cn(
                            "leading-relaxed",
                            paragraph.startsWith("•")
                              ? "text-muted-foreground pr-4"
                              : "text-foreground"
                          )}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.section>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
