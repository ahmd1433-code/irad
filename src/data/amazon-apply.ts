import { articles } from "@/data/publisher";

export const amazonProgramUrls = [
  {
    store: "السعودية",
    href: "https://associates.amazon.sa/",
    label: "associates.amazon.sa",
  },
  {
    store: "الإمارات",
    href: "https://affiliates.amazon.ae/",
    label: "affiliates.amazon.ae",
  },
  {
    store: "مصر",
    href: "https://affiliate-program.amazon.eg/",
    label: "affiliate-program.amazon.eg",
  },
  {
    store: "عام / أمريكا",
    href: "https://affiliate-program.amazon.com/",
    label: "affiliate-program.amazon.com",
  },
] as const;

export const amazonSitePages = [
  {
    amazonField: "Website URL — الموقع الأساسي",
    path: "/site",
    why: "هذا عنوان «اختيار» الذي يراجعه أمازون. لا تلصق الصفحة الرئيسية لإيراد.",
  },
  {
    amazonField: "Additional websites — صفحات إضافية",
    path: "/site/about",
    why: "من نحن: يوضح أنك موقع تحريري ولست متجر أمازون.",
  },
  {
    amazonField: "Additional websites",
    path: "/site/privacy",
    why: "سياسة خصوصية — مطلوبة غالبًا للقبول.",
  },
  {
    amazonField: "Additional websites",
    path: "/site/disclosure",
    why: "إفصاح العمولة — شرط أمانة.",
  },
  {
    amazonField: "Additional websites",
    path: "/site/contact",
    why: "تواصل ببريد ظاهر على الصفحة بعد النشر.",
  },
  {
    amazonField: "مقال للمراجعة",
    path: `/site/${articles[0]?.slug ?? "vacuum-for-gulf-homes"}`,
    why: "دليل شراء أصلي بالعربية، ليس قائمة روابط.",
  },
  {
    amazonField: "مقال للمراجعة",
    path: `/site/${articles[1]?.slug ?? "first-baby-kit"}`,
    why: "مقال ثانٍ يُظهر أن الموقع ليس صفحة واحدة.",
  },
] as const;

export const amazonWebsiteDescriptionAr = `اختيار موقع عربي مستقل يشرح قرارات الشراء اليومية في المنزل والعمل وتربية المولود. نكتب أدلة مقارنة عملية لجمهور الخليج، ولسنا متجرًا ولا نبيع من مستودعنا. بعض المقالات قد تتضمن روابط إلى متاجر إلكترونية، مع إفصاح واضح في الصفحة.`;

export const amazonWebsiteDescriptionEn = `Ikhtiyar is an independent Arabic buying guide. We publish practical comparison articles to help Gulf shoppers choose everyday home, baby, and work products. We do not hold inventory or sell from our own warehouse. Some articles may include store links, disclosed on the page.`;

export const amazonPromotionMethodAr =
  "أنشر مقالات مقارنة وأدلة شراء على موقعي. الزائر يقرأ الدليل ثم ينتقل إلى صفحة المنتج إن أراد الشراء.";

export const amazonPromotionMethodEn =
  "I publish comparison and how-to buying guides on my website. Readers who want a product can follow a store link from the article.";

export const amazonTrafficHonestyAr =
  "الموقع نُشر حديثًا. عدد الزوار ما زال منخفضًا (أقل من ألف زيارة شهرية).";

export const amazonPhoneNotes = [
  "الجوال للحساب نفسه: أمازون يرسل رمز تحقق برسالة. هذا إجراء رسمي، ليس احتيالًا.",
  "اكتب الرقم الذي تصلك عليه الرسائل، مع رمز الدولة: السعودية 966، الإمارات 971، مصر 20.",
  "لا تشارك رمز الرسالة مع أحد — لا مع إيراد ولا مع «دعم» على واتساب.",
  "إن ظهر حقل «تطبيق جوال / Mobile app URL» اتركه فارغًا ما لم يكن لديك تطبيق منشور.",
  "إن طلب المتصفح فتح تطبيق أمازون للتسوق فأنت في المكان الخطأ: ارجع لصفحة أسوشيتس في المتصفح.",
] as const;
