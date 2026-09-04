export type DelegatedPermission =
  | "manage_plan"
  | "write_notes"
  | "update_status"
  | "pick_path";

export type LockedMatter =
  | "official_apply"
  | "spend_money"
  | "identity_docs"
  | "wipe_data"
  | "leave_device";

export type AgentProfile = {
  capital: "none" | "low" | "medium" | "high";
  region: "mena" | "ksa" | "uae" | "egypt";
  skill: "content" | "store" | "social";
};

export type AgentPermissions = Record<DelegatedPermission, boolean>;

export type ActionKind =
  | "add_program"
  | "write_note"
  | "update_status"
  | "suggest_playbook"
  | "open_apply"
  | "spend"
  | "wipe"
  | "identity";

export type ActionGate = "auto" | "needs_you" | "locked";

export type AgentAction = {
  id: string;
  kind: ActionKind;
  title: string;
  detail: string;
  slug?: string;
  note?: string;
  status?: "considering" | "applied" | "active";
  href?: string;
  gate: ActionGate;
  permission?: DelegatedPermission;
};

export type AgentRun = {
  at: string;
  command: string;
  summary: string;
  executed: AgentAction[];
  needsYou: AgentAction[];
  locked: AgentAction[];
};

export const delegatedLabels: Record<DelegatedPermission, { title: string; body: string }> = {
  manage_plan: {
    title: "إدارة الخطة",
    body: "إضافة برامج إلى خطتك المحلية وإزالة المقترحات التي أضافها الوكيل.",
  },
  write_notes: {
    title: "كتابة الملاحظات",
    body: "تدوين خطوة الأسبوع وقائمة التجهيز داخل كل برنامج محفوظ.",
  },
  update_status: {
    title: "تحديث الحالة",
    body: "نقل البرنامج من «أفكر فيه» إلى «قدّمت طلبًا» إذا قلت ذلك صراحة.",
  },
  pick_path: {
    title: "اختيار المسار",
    body: "اقتراح مسار عمل وربطه بملاحظاتك. لا يغيّر حساباتك الخارجية.",
  },
};

export const lockedLabels: Record<LockedMatter, { title: string; body: string }> = {
  official_apply: {
    title: "التسجيل الرسمي",
    body: "فتح حساب أو تقديم طلب لدى أمازون ونون وغيرهما يبقى بيدك أنت.",
  },
  spend_money: {
    title: "الإنفاق",
    body: "لا يشتري مخزونًا ولا يشغّل إعلانات ولا يدفع اشتراك متجر.",
  },
  identity_docs: {
    title: "الهوية والضريبة",
    body: "لا يرفع هوية ولا رقمًا ضريبيًا ولا يوقّع شروط منصة.",
  },
  wipe_data: {
    title: "مسح البيانات",
    body: "لا يفرّغ خطتك ولا يمسح الملاحظات إلا إذا فعلت ذلك بنفسك.",
  },
  leave_device: {
    title: "مغادرة الجهاز",
    body: "لا يرسل بياناتك إلى خادم ولا يتحدث باسمك خارج هذا المتصفح.",
  },
};

export const defaultPermissions: AgentPermissions = {
  manage_plan: true,
  write_notes: true,
  update_status: false,
  pick_path: true,
};

export const defaultProfile: AgentProfile = {
  capital: "none",
  region: "mena",
  skill: "content",
};
