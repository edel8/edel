"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const platforms = [
  {
    title: "التقييم النفسي",
    desc: "اختبارات دقيقة مطابقة للمعايير العالمية، مترجمة ومكيّفة للسياق العراقي والعربي. تقيس القلق والاكتئاب والتوتر بدقة وتقدم لك تقريراً مفصلاً عن حالتك. كل اختبار صممته بنفسي لأضمن أنه يفهم ثقافتنا وتفاصيل حياتنا.",
  },
  {
    title: "تتبع المزاج",
    desc: "دوّن مزاجك كل يوم وشاهد كيف تتغير مشاعرك مع الوقت. رسوم بيانية بسيطة تكشف لك أنماطك الخفية. هل تشعر بالضيق أيام الأحد؟ هل القهوة تحسن مزاجك؟ البيانات تكشف كل شيء. أنت لا تحتاج طبيب نفسي لتفهم نفسك، تحتاج وعي.",
  },
  {
    title: "تمارين التنفس",
    desc: "تمارين تفاعلية بتقنية 4-7-8 وتقنيات أخرى، مع مؤقت بصري يوجهك خطوة بخطوة. لحظات الهلع والقلق تحتاج شيئاً فورياً يخفض الضغط، وهذه التمارين هي الإسعافات الأولية لعقلك. ثلاث دقائق فقط وتشعر بفرق.",
  },
  {
    title: "العلاج السلوكي المعرفي",
    desc: "مكتبة متكاملة من التمارين المستوحاة من العلاج السلوكي المعرفي (CBT). أدوات عملية لإعادة صياغة أفكارك السلبية، التعرف على التشوهات المعرفية، وبناء أنماط تفكير صحية. أطباء نفسيون عراقيون استشاروني في المحتوى عشان يكون فعّال وآمن.",
  },
  {
    title: "مكتبة التعلم",
    desc: "مقالات ودروس مبسطة بالعربية الفصحى والعراقية عن كل ما يخص الصحة النفسية. من فهم آلية القلق في الدماغ إلى استراتيجيات التعامل مع نوبات الهلع. أشرح فيها علوم النفس بأسلوب قريب للقلب، مثل ما أشرح لصديق.",
  },
  {
    title: "موسوعة الأمراض",
    desc: "دليل شامل لأكثر من ٥٠ اضطراباً نفسياً، كل واحد شرحناه بأعراضه وأسبابه وطرق علاجه. مكتوبة بلغة واضحة، بعيدة عن التعقيد الطبي. عشان إذا طلع لك تشخيص أو قريت عنه بالعيادة، يكون عندك مصدر تثق به.",
  },
  {
    title: "مجتمع الدعم",
    desc: "مساحة آمنة للناس يشاركون تجاربهم بدون خوف أو خجل. مجتمع معتدل، مراقب، مع مبادئ واضحة. هنا مو هاشتاغات وستوريات، هنا ناس حقيقية تمر بظروف حقيقية وتدعم بعضها. العراقي بطبعه طيوب وحنون، وهذا المجتمع يعكس هالشي.",
  },
  {
    title: "التنفيس",
    desc: "صفحة تكتب فيها كل شي مزعجك بدون ما تشيل همه. مساحة شخصية تفريغية، ما يقرأها أحد ولا تنحفظ في حسابك. مجرد تكتب وتحرر نفسك وتغلق. أنا مقتنع إنو بعض المشاكل تحل بس لأنك عبرت عنها بصوت عالي أو كتبتها.",
  },
  {
    title: "الألعاب الذهنية",
    desc: "العاب وتحديات ذهنية ممتعة لتحفيز الدماغ وزيادة التركيز. مو بس تسلية، هذي أدوات علاجية غير مباشرة. الذاكرة، سرعة البديهة، حل المشكلات وكلها بلغة عربية محترمة وتصميم أنيق. اللعب مو بس للأطفال، أدمغتنا تحتاج تتحرك.",
  },
  {
    title: "قصص ملهمة",
    desc: "قصص حقيقية لأشخاص تغلبوا على تحدياتهم النفسية. عراقيين وعرب تحدو الاكتئاب والقلق والإدمان وقاموا مرة ثانية. كل قصة فيها درس وأمل، وتذكرك إنو ما انت وحدك بهالمعاناة. منهم ناس قابلتهم شخصياً وتأكدت من قصصهم.",
  },
  {
    title: "دعم الأزمات",
    desc: "قسم مخصص للحالات الطارئة، فيه أرقام الخطوط الساخنة في العراق والوطن العربي، إرشادات فورية للتعامل مع نوبات الهلع والأفكار الانتحارية. لأن الأزمة ما تستنى، ودقيقة وحدة ممكن تكون فارق حياة أو موت.",
  },
  {
    title: "استشارات",
    desc: "دليل لأخصائيين نفسيين موثوقين في العراق والوطن العربي. ناس حقيقية، مؤهلات حقيقية. كل استشاري مر على مراجعة وتدقيق. لأن الواحد ما يحتاج يعاني بصمت، وفي ناس متخصصة مستعدة تساعد.",
  },
  {
    title: "أدوات يومية",
    desc: "مجموعة أدوات عملية تستخدمها بحياتك اليومية: متتبع عادات، حاسبة توتر، دفتر يوميات الكتروني، مولد روتين يومي. ليست نظرية، هذه أدوات تشتغل. افتحها كل صباح وخمس دقائق تحسن يومك كله.",
  },
  {
    title: "بودكاست Edel",
    desc: "سلسلة بودكاست أقدم فيها حوارات مع مختصين وتجارب شخصية، بأسلوب بسيط وقريب. مو بودكاست أكاديمي ممل، ولا فيديوهات تيك توك سطحية. محتوى عميق بمقدار فنجان قهوة، تسمعه وأنت تمشي أو تسوق.",
  },
];

export default function AboutPage() {
  const progressRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ["start 30%", "end 70%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      {/* Reading Progress */}
      <motion.div
        ref={progressRef}
        style={{ scaleX }}
        className="fixed top-0 left-0 z-50 h-[3px] w-full origin-right bg-[#111]"
      />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2400)",
          }}
        />
        <div className="absolute inset-0 bg-[#111]/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <span className="mb-3 inline-block text-sm font-medium tracking-[0.2em] text-[#E8E2D9]/80 uppercase">
              — About
            </span>
            <h1 className="font-serif text-6xl leading-[1.1] text-white sm:text-7xl md:text-8xl">
              من أنا؟
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">
              هذه القصة مش مجرد بايو أو سيرة ذاتية. هذي قصة شاب عراقي قرر يشتغل على
              شي حقيقي، بيده، من الصفر، بدون تمويل أو تيم، وبإيمان عميق إنو التغيير
              يبدأ بفكرة بسيطة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* من هو عادل الخالدي */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 lg:col-start-1"
          >
            <span className="mb-2 inline-block text-xs font-medium tracking-[0.15em] text-[#6B6B6B] uppercase">
              01
            </span>
            <h2 className="font-serif text-5xl leading-tight text-[#111] sm:text-6xl">
              من هو عادل الخالدي
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 lg:col-start-3"
          >
            <div className="space-y-5 text-lg leading-relaxed text-[#6B6B6B]">
              <p>
                أنا عادل الخالدي، شاب عراقي، مولود وتربيت بالعراق. من صغري وأنا
                أحاول أفهم الحياة بشكل مختلف، أحاول ألاقي معنى يتجاوز الروتين
                اليومي. ما عندي شهادة من جامعة مرموقة ولا دورات من معاهد
                عالمية. أنا شاب تعلم بنفسه، كلشي عنده سأله غوغل وفركها ليل نهار
                لحد ما استوعبها.
              </p>
              <p>
                شفت إنو المحتوى النفسي العربي كله إما مترجم ترجمة حرفية من نصوص
                أجنبية، أو قوالب جاهزة مملة ومكررة، أو ناس يبون فلوسك ويتاجرون
                بمعاناتك. أحسست بهذا النقص بعمق. شفت عراقيين كثر يعانون بصمت
                لأنو ما عندهم مكان آمن يتكلمون فيه، ولا مصدر موثوق يفهم ثقافتهم
                وظروفهم.
              </p>
              <p>
                فقررت أسوي شي بيدي. ما انتظرت وزارة ولا منظمة ولا جهة. جلست
                كم شهر أكتب كود وأمسح، أصمم وأعدل، أقرأ وأتعلم. كل سطر كتبته، كل
                زاوية رسمتها، كل ميزة برمجتها — بجهد شخصي، بدون تيم، بدون تمويل،
                بس بإيمان إنو شي بهتر. وأنا أكتب هالسطور، لساتني مصدق إنو هالمنصة
                اللي قدامك اليوم، أنا اللي سويتها. كلها. من الألف للياء.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="paper-divider" />
      </div>

      {/* لماذا Edel */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mb-2 inline-block text-xs font-medium tracking-[0.15em] text-[#6B6B6B] uppercase">
            02
          </span>
          <h2 className="font-serif text-5xl leading-tight text-[#111] sm:text-6xl">
            لماذا Edel؟
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-right text-lg leading-relaxed text-[#6B6B6B]">
            <p>
              Edel بالألمانية تعني "نبيل". واخترت هالاسم لأنو نبيل
              — نعم — هذا أسم جدتي رحمها الله. ونبيل لأنو المشاعر النبيلة تستحق
              تصميماً نبيلاً. مشاعر الخوف، القلق، الحزن، الأمل —
              هذي مشاعر مو سطحية، تستحق احترام.
            </p>
            <p>
              المنصة بالبدن مبنية على فكرة: مستقبل العراق مو بس نفط وطاقة
              واستثمارات. مستقبل العراق هو الصفاء الذهني. الوعي. القدرة على
              فهم نفسك والتعامل مع مشاعرك قبل ما تاكلك. أنا مؤمن إنو النهضة
              الحقيقية تبدأ من الداخل، من عقل واعي وقلب مطمئن.
            </p>
            <p>
              Edel مو مجرد موقع، هي رسالة إنو أنت تستحق شي جميل، شي حقيقي، شي
              مصمم بعناية يحترم وقتك وعقلك وقلبك. كل تفصيلة بالمنصة — الألوان،
              الخطوط، الحركات، الكلمات — كلها وضعتها بيدي وفكرت فيها ليل نهار
              عشان توصل هالرسالة.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="paper-divider" />
      </div>

      {/* رسالتنا */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-2 inline-block text-xs font-medium tracking-[0.15em] text-[#6B6B6B] uppercase">
              03
            </span>
            <h2 className="font-serif text-5xl leading-tight text-[#111] sm:text-6xl">
              رسالتنا
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-lg leading-relaxed text-[#6B6B6B]"
          >
            <p>
              أنا مو طبيب ولا أخصائي نفسي. أنا مبرمج شاب عنده شغف وفضول، وقرر
              يستخدم مهارته في البرمجة لبناء أداة تفيد الناس. هالمنصة ما تشخص
              ولا تعالج، بس تثقف وتدعم وتعطيك أدوات تعينك على فهم نفسك.
            </p>
            <p>
              دوري هو دور الصديق اللي يفهمك، اللي يمد لك يده وقت الضيق، اللي
              يعطيك معلومة مفيدة بدون مقابل. إضافة للوعي صحيح، مع أدوات عملية
              يومية تخليك قادر تتعامل مع مشاعرك بشكل أفضل.
            </p>
            <div className="paper-card mt-6 border-r-4 border-r-[#111] p-6">
              <p className="text-sm font-medium leading-relaxed text-[#6B6B6B]">
                تنويه مهم: Edel لا يشخص ولا يعالج، بل يثقف ويدعم. هذه المنصة
                أداة مساعدة وليست بديلاً عن الاستشارة الطبية المتخصصة. إذا كنت
                تمر بأزمة نفسية حادة أو لديك أفكار إيذاء النفس، من فضلك اتصل على
                الرقم المجاني للدعم النفسي في العراق <strong>16000</strong> أو
                توجّه لأقرب مستشفى فوراً.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="paper-divider" />
      </div>

      {/* كيف تعمل المنصة */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block text-xs font-medium tracking-[0.15em] text-[#6B6B6B] uppercase">
            04
          </span>
          <h2 className="font-serif text-5xl leading-tight text-[#111] sm:text-6xl">
            كيف تعمل المنصة؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B6B6B]">
            Edel مو مجرد موقع بمقالات، هي منصة متكاملة بأدوات تفاعلية مصممة
            ترافقك في رحلتك لفهم ذاتك وتحسين صحتك النفسية. ١٤ قسم، كل واحد
            بنيته بهدف محدد.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl space-y-8"
        >
          {platforms.map((section, i) => (
            <motion.div
              key={section.title}
              variants={fadeUp}
              custom={i}
              className="paper-card group p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-8"
            >
              <span className="mb-2 block text-xs font-medium tracking-[0.1em] text-[#6B6B6B]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#111]">
                {section.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-[#6B6B6B]">
                {section.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="paper-divider" />
      </div>

      {/* كلمة من القلب */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <span className="mb-2 inline-block text-xs font-medium tracking-[0.15em] text-[#6B6B6B] uppercase">
            05
          </span>
          <div className="paper-card rotate-neg-1 overflow-hidden border-2 border-[#EAEAEA] p-8 sm:p-12">
            <h2 className="font-serif text-4xl text-[#111] sm:text-5xl">
              كلمة من القلب
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#6B6B6B]">
              <p>
                إذا وصلت لهالجزء فأنا أشكرك من قلب. هذا يعني أنك شخص مهتم،
                فضولي، أو يمكن تمر بظرف وتدور على شي يفيدك. بأي حال، أنا فخور
                إنك هنا.
              </p>
              <p>
                بناء Edel كان أطول وأصعب مشروع سويته بحياتي. كم ليلة سهرت فيها
                للتلاتة فجراً وأنا أضبط ميزة ولا أصلح مشكلة ولا أقرأ بحث لأتأكد
                من معلومة. كم مرة قعدت أدقق بتفصيلة صغيرة يمكن ما ياخذ باله
                أحد غيري. بس هالتفاصيل هي اللي تفرق. هي اللي تخلي الشي حقيقي.
              </p>
              <p>
                ما عندي فريق كبير ولا ميزانية ضخمة. عندي بس حاسوب متواضع،
                اتصال نت، وإيمان عميق إنو العراقي يستاهل شي أحسن. يستاهل منصة
                محترمة، تصميم عالمي، محتوى عربي بأيدي عربية. مش مترجم ولا
                مقلد.
              </p>
              <p>
                أنا عارف إنو الطريق طويل، وإنو Edel لساتها بداية. كل يوم أضيف
                شي جديد، أطور، أتعلم من أخطائي، وأسمع لملاحظاتكم. لأنو هالمنصة
                مو ملكي، هي لكل شخص دخلها ولقى فيها شي مفيد.
              </p>
              <p>
                فشكراً لك. شكراً على وقتك، شكراً على ثقتك، وشكراً لأنك جزء من
                هالمشوار. نتمنى من الله التوفيق والسداد.
              </p>
            </div>
            <div className="mt-8 border-t border-[#EAEAEA] pt-6">
              <p className="font-serif text-2xl italic text-[#111]">
                عادل الخالدي
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                بغداد، العراق
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="paper-divider" />
      </div>

      {/* Footer Connection */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="paper-card mx-auto max-w-2xl p-8 text-center sm:p-12"
        >
          <p className="text-lg leading-relaxed text-[#6B6B6B]">
            صمم وطور بجهد شخصي بواسطة عادل الخالدي
          </p>
          <p className="mt-1 text-lg leading-relaxed text-[#6B6B6B]">
            شاب عراقي يحاول بكل إمكانياته
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://t.me/WZE66"
              target="_blank"
              rel="noopener noreferrer"
              className="paper-btn text-sm"
            >
              @WZE66
            </a>
            <a
              href="https://instagram.com/w9ub"
              target="_blank"
              rel="noopener noreferrer"
              className="paper-btn-outline text-sm"
            >
              @w9ub
            </a>
          </div>
          <p className="mt-6 text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} Edel — كل الحقوق محفوظة
          </p>
        </motion.div>
      </section>
    </div>
  );
}
