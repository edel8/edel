"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "intro",
    title: "المقدمة",
    content: [
      "مرحباً بك في Edel. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة.",
      "هذه الاتفاقية ملزمة قانوناً بينك وبين Edel. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام المنصة.",
      "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإخطارك بأي تغييرات جوهرية عن طريق نشر الشروط المحدثة على هذه الصفحة.",
    ],
  },
  {
    id: "definitions",
    title: "التعاريف",
    content: [
      "• 'المنصة' أو 'الموقع' تشير إلى موقع Edel الإلكتروني وجميع خدماته",
      "• 'المستخدم' أو 'أنت' يشير إلى أي شخص يستخدم المنصة",
      "• 'المحتوى' يشير إلى جميع المواد المنشورة على المنصة بما في ذلك النصوص والفيديوهات والصور والتمارين",
      "• 'الخدمات' تشير إلى جميع الأدوات والموارد المتاحة عبر المنصة",
      "• 'نحن' أو 'لنا' يشير إلى فريق Edel",
    ],
  },
  {
    id: "acceptance",
    title: "قبول الشروط",
    content: [
      "باستخدامك للمنصة، فإنك تقر بأنك قرأت هذه الشروط والأحكام وتفهمها وتوافق على الالتزام بها.",
      "إذا كنت تستخدم المنصة نيابة عن كيان قانوني، فإنك تقر بأن لديك الصلاحية القانونية لربط ذلك الكيان بهذه الشروط.",
      "لا يحق للأشخاص دون سن ١٨ عاماً استخدام المنصة دون إشراف ولي أمرهم.",
    ],
  },
  {
    id: "services",
    title: "وصف الخدمات",
    content: [
      "Edel هي منصة عربية للصحة النفسية تقدم الموارد التالية:",
      "• أدوات تتبع المزاج والطاقة",
      "• تمارين العلاج السلوكي المعرفي",
      "• ألعاب ذهنية تدريبية",
      "• محتوى تثقيفي عن الصحة النفسية",
      "• مجتمع داعم للتفاعل وتبادل الخبرات",
      "• روابط ودعم في حالات الطوارئ",
      "جميع الخدمات مقدمة 'كما هي' و 'كما تتوفر' دون أي ضمانات صريحة أو ضمنية.",
    ],
  },
  {
    id: "user-obligations",
    title: "التزامات المستخدم",
    content: [
      "باستخدامك للمنصة، فإنك تتعهد بما يلي:",
      "• عدم استخدام المنصة لأي غرض غير قانوني",
      "• عدم مشاركة محتوى مسيء أو تشهيري أو تمييزي",
      "• عدم محاولة اختراق أمن المنصة أو الوصول غير المصرح به",
      "• عدم انتحال شخصية أي شخص أو كيان",
      "• عدم نشر أي محتوى ينتهك حقوق الملكية الفكرية للغير",
      "• الالتزام بآداب الحوار والاحترام المتبادل في المجتمع",
      "• تقديم معلومات دقيقة عند التسجيل",
      "نحتفظ بالحق في تعليق أو إنهاء حساب أي مستخدم ينتهك هذه الالتزامات.",
    ],
  },
  {
    id: "intellectual-property",
    title: "الملكية الفكرية",
    content: [
      "جميع محتويات المنصة بما في ذلك النصوص والرسومات والشعارات والصور ومقاطع الفيديو والبرمجيات هي ملكية حصرية لـ Edel أو مرخصة لها.",
      "لا يحق لك نسخ أو توزيع أو تعديل أو إنشاء أعمال مشتقة من محتوى المنصة دون إذن خطي مسبق.",
      "العلامات التجارية والشعارات المستخدمة في المنصة هي ملك لأصحابها.",
      "الاستخدام الشخصي غير التجاري للمحتوى مسموح به ضمن حدود الاستخدام العادل.",
    ],
  },
  {
    id: "disclaimer",
    title: "إخلاء المسؤولية",
    content: [
      "المحتوى المقدم على منصة Edel هو لأغراض تثقيفية فقط ولا يغني عن استشارة مختص نفسي مؤهل.",
      "لا نقدم تشخيصات طبية أو نفسية أو وصفات علاجية.",
      "في حالات الطوارئ أو الأفكار الانتحارية، يرجى الاتصال فوراً على الأرقام التالية:",
      "• 122 - emergency",
      "• 113 - suicide prevention hotline",
      "نحن لسنا مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة.",
      "المنصة لا تضمن دقة أو اكتمال أو حداثة المحتوى في جميع الأوقات.",
    ],
  },
  {
    id: "privacy",
    title: "الخصوصية",
    content: [
      "استخدامك للمنصة يخضع أيضاً لسياسة الخصوصية الخاصة بنا.",
      "نحن نلتزم بحماية بياناتك الشخصية وفقاً للقوانين واللوائح المعمول بها.",
      "يرجى مراجعة سياسة الخصوصية للحصول على تفاصيل كاملة حول كيفية جمع واستخدام وحماية معلوماتك.",
    ],
  },
  {
    id: "termination",
    title: "إنهاء الاستخدام",
    content: [
      "نحتفظ بالحق في إنهاء أو تعليق وصولك إلى المنصة في أي وقت، دون إشعار مسبق، لأي سبب كان، بما في ذلك انتهاك هذه الشروط.",
      "في حالة إنهاء الخدمة، ستظل الأحكام المتعلقة بالملكية الفكرية وإخلاء المسؤولية وحل النزاعات سارية المفعول.",
      "يمكنك إنهاء استخدامك للمنصة في أي وقت بالتوقف عن استخدامها وحذف حسابك.",
    ],
  },
  {
    id: "governing-law",
    title: "القانون الواجب التطبيق",
    content: [
      "تخضع هذه الشروط والأحكام للقوانين واللوائح المعمول بها.",
      "أي نزاع ينشأ عن استخدام المنصة سيتم حله وديًا قدر الإمكان.",
      "في حال عدم التوصل إلى حل ودي، يخضع النزاع للقضاء المختص.",
    ],
  },
  {
    id: "contact",
    title: "اتصل بنا",
    content: [
      "للاستفسارات المتعلقة بهذه الشروط والأحكام، يرجى التواصل معنا عبر:",
      "• تلغرام: @WZE66",
      "• إنستغرام: @w9ub",
      "• أو من خلال نموذج التواصل على المنصة",
    ],
  },
];

export default function TermsPage() {
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
            <FileText className="h-3.5 w-3.5" /> الشروط
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            الشروط والأحكام
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
