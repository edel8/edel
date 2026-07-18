"use client";

import { motion } from "framer-motion";
import {
  Quote,
  Star,
  Heart,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: number;
  name: string;
  age: string;
  quote: string;
  excerpt: string;
  rating: number;
  tags: string[];
  color: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: "سارة",
    age: "٢٨ عاماً",
    quote: "لم أكن أعتقد أن هناك مخرجاً. لكن كل خطوة صغيرة كنت أخطوها كانت تقربني من النور.",
    excerpt:
      "بدأت رحلتي مع الاكتئاب منذ سنوات. كنت أشعر وكأنني أغرق في ظلام لا نهاية له. لكن مع الدعم المناسب والعلاج، تعلمت أن الأمل ليس مجرد كلمة، بل هو شعور ينمو بداخلك يوماً بعد يوم.",
    rating: 5,
    tags: ["اكتئاب", "تعافي", "أمل"],
    color: "from-sage-200/40 to-sage-300/20",
  },
  {
    id: 2,
    name: "أحمد",
    age: "٣٥ عاماً",
    quote: "طلب المساعدة ليس ضعفاً. بل هو أقوى قرار يمكن أن تتخذه.",
    excerpt:
      "كنت أظن أن الرجل يجب أن يكون قوياً ولا يظهر مشاعره. لكن تعلمت أن القوة الحقيقية تكمن في مواجهة مخاوفك والتحدث عما يؤلمك. اليوم أنا فخور بأني طلبت المساعدة.",
    rating: 5,
    tags: ["قلق", "صحة نفسية", "رجال"],
    color: "from-lavender-200/40 to-lavender-300/20",
  },
  {
    id: 3,
    name: "نورة",
    age: "٢٢ عاماً",
    quote: "الشفاء ليس خطياً. بعض الأيام تكون صعبة، لكن المهم أن لا تتوقف عن المحاولة.",
    excerpt:
      "في البداية كنت أتوقع أنني سأتحسن بين ليلة وضحاها. لكن تعلمت أن التعافي رحلة، فيها تقلبات ولكن كل يوم هو فرصة جديدة.",
    rating: 5,
    tags: ["نوبات هلع", "تقبل", "صبر"],
    color: "from-rose-200/40 to-rose-300/20",
  },
  {
    id: 4,
    name: "خالد",
    age: "٤٢ عاماً",
    quote: "الإدمان ليس نهاية الطريق. هناك حياة بعد الإدمان، وأنا أعيشها الآن.",
    excerpt:
      "عشر سنوات من الإدمان كادت أن تدمر كل شيء في حياتي. لكن بالإرادة والدعم، استطعت أن أبني حياتي من جديد. اليوم أساعد الآخرين الذين يمرون بنفس التجربة.",
    rating: 5,
    tags: ["إدمان", "تعافي", "حياة جديدة"],
    color: "from-amber-200/40 to-amber-300/20",
  },
  {
    id: 5,
    name: "مريم",
    age: "٣١ عاماً",
    quote: "العلاج النفسي لم يغيرني، بل ساعدني أن أكون نفسي الحقيقية.",
    excerpt:
      "كنت أخشى أن يغيرني العلاج. لكنني اكتشفت أنه ساعدني فقط على إزالة الأقنعة التي ارتديتها لسنوات. الآن أشعر أنني أعيش حياتي بصدق لأول مرة.",
    rating: 5,
    tags: ["علاج نفسي", "نمو شخصي", "صدق"],
    color: "from-emerald-200/40 to-emerald-300/20",
  },
  {
    id: 6,
    name: "فاطمة",
    age: "٢٦ عاماً",
    quote: "الحديث مع شخص يفهمك دون أحكام يمكن أن يغير مسار يومك بالكامل.",
    excerpt:
      "أكبر صعوبة واجهتها كانت الشعور بالوحدة رغم وجود الناس حولي. لكن حين وجدت مجتمعاً متفاهماً، شعرت أنني لست وحدي في هذه الرحلة.",
    rating: 5,
    tags: ["وحدة", "مجتمع", "دعم"],
    color: "from-sky-200/40 to-sky-300/20",
  },
  {
    id: 7,
    name: "يوسف",
    age: "١٩ عاماً",
    quote: "في عمري، يظن البعض أن المشاعر مبالغ فيها. لكن مشاعرك حقيقية ومهمة.",
    excerpt:
      "كنت أخشى أن يسخر مني أحد لأني أشعر بالقلق والخوف. لكن تعلمت أن التعبير عن المشاعر ليس عيباً، بل هو جزء من كونك إنساناً.",
    rating: 5,
    tags: ["مراهقون", "مشاعر", "قبول"],
    color: "from-purple-200/40 to-purple-300/20",
  },
  {
    id: 8,
    name: "هدى",
    age: "٣٨ عاماً",
    quote: "اعتني بنفسك كما تعتني بمن تحب. فأنت تستحق نفس القدر من الحنان.",
    excerpt:
      "أمضيت سنوات أعطي كل ما لدي لعائلتي دون أن أفكر في نفسي. تعلمت أن الرعاية الذاتية ليست أنانية، بل هي ضرورية لأتمكن من رعاية الآخرين.",
    rating: 5,
    tags: ["رعاية ذاتية", "أمهات", "توازن"],
    color: "from-teal-200/40 to-teal-300/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function StoriesPage() {
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
            <Heart className="h-3.5 w-3.5" /> قصص تعافي
          </span>
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
            قصص ملهمة من مجتمعنا
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            قصص حقيقية لأناس اختاروا مشاركة رحلتهم في التعافي. بأسمائهم المستعارة
            وبكل شجاعة.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              className={cn(
                "mb-5 break-inside-avoid rounded-2xl border border-border-glass bg-glass-white/55 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-glass-hover",
                "relative overflow-hidden"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -inset-40 -z-0 rounded-full bg-gradient-to-br opacity-40 blur-3xl",
                  story.color
                )}
              />

              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: story.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <Quote className="mb-3 h-8 w-8 text-primary/40" />

                <blockquote className="font-serif text-xl font-medium leading-relaxed text-foreground">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {story.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full glass-subtle px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-border-glass pt-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
                    {story.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {story.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {story.age} · متعافٍ/متعافية
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-xl text-center"
        >
          <div className="glass-strong rounded-2xl p-8">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-primary" />
            <h3 className="font-serif text-xl font-semibold text-foreground">
              جميع القصص مجهولة المصدر
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              نحمي هوية أصحاب القصص وننشرها بإذنهم. إن كانت لديك قصة تريد
              مشاركتها، نحن هنا لنستمع.
            </p>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
              <MessageCircle className="h-4 w-4" />
              شارك قصتك
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
