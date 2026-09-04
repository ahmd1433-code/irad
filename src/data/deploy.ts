export const publicDomainSteps: {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    title: "أنشئ مستودع GitHub",
    body: "من واجهة المشروع اضغط إنشاء المستودع (Create repo) إن لم يكن المشروع على GitHub بعد. Vercel يسحب الكود من GitHub، لا من المعاينة المحلية.",
  },
  {
    title: "سجّل في Vercel بحساب GitHub",
    href: "https://vercel.com/signup",
    linkLabel: "vercel.com/signup",
    body: "مجاني. اختر Continue with GitHub وأذَن بالوصول للمستودع.",
  },
  {
    title: "انشر المشروع",
    href: "https://vercel.com/new",
    linkLabel: "vercel.com/new",
    body: "Import المستودع. الإطار Next.js يُكتشف وحده. اضغط Deploy وانتظر دقيقة حتى يظهر Ready.",
  },
  {
    title: "انسخ الرابط الذي يعطيك إياه Vercel",
    body: "شكلُه https://اسم-المشروع.vercel.app — هذا نطاق علني على https. لا تشتري دومينًا الآن؛ أمازون يقبله.",
  },
  {
    title: "أضف بريد التواصل ثم أعد النشر",
    body: "في إعدادات المشروع: Settings → Environment Variables. أضف NEXT_PUBLIC_CONTACT_EMAIL ببريدك، وNEXT_PUBLIC_SITE_URL بعنوان Vercel نفسه. Redeploy مرة واحدة حتى يظهر البريد في صفحة التواصل.",
  },
  {
    title: "اختبر من بيانات الجوال",
    body: "افتح https://نطاقك/site من الهاتف على بيانات الجوال (أغلق الواي فاي). إذا ظهرت مقالات «اختيار»، الصق https://نطاقك في حقل النطاق بصفحة طلب أمازون.",
  },
] as const;
