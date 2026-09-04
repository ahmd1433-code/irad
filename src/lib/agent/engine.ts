import { getPlaybook } from "@/data/playbooks";
import { getProgram, programs } from "@/data/programs";
import type { SavedProgram } from "@/lib/types";
import type {
  AgentAction,
  AgentPermissions,
  AgentProfile,
  AgentRun,
} from "./types";

function nowIso() {
  return new Date().toISOString();
}

function action(
  partial: Omit<AgentAction, "id"> & { id?: string },
  index: number
): AgentAction {
  return {
    ...partial,
    id: partial.id ?? `${partial.kind}-${index}-${partial.slug ?? "x"}`,
  };
}

function starterSlugs(profile: AgentProfile): string[] {
  if (profile.skill === "social") {
    return ["tiktok-shop", "amazon-influencer", "shein-affiliate"];
  }
  if (profile.capital === "high" || (profile.capital === "medium" && profile.skill === "store")) {
    return ["noon-seller", "amazon-fba", "salla-zid"];
  }
  if (profile.capital === "low" && profile.skill === "store") {
    return ["salla-zid", "aliexpress-dropship", "aliexpress-affiliate"];
  }
  const gulf =
    profile.region === "egypt"
      ? ["amazon-associates", "jumia-affiliate", "awin"]
      : ["amazon-associates", "awin", "booking-affiliate"];
  return gulf;
}

function playbookFor(profile: AgentProfile): string {
  if (profile.skill === "social") return "short-video-commerce";
  if (profile.capital === "high" || profile.capital === "medium") {
    return "gulf-marketplaces";
  }
  if (profile.capital === "low" && profile.skill === "store") {
    return "dropship-eyes-open";
  }
  return "affiliate-week";
}

function noteFor(slug: string, playbookTitle: string): string {
  const program = getProgram(slug);
  const first = program?.howToStart[0] ?? "جهّز محتوى حقيقيًا قبل الرابط.";
  return `[وكيل] خطوة الأسبوع: ${first} المسار المقترح: ${playbookTitle}. التسجيل الرسمي لم يُنفَّذ — يبقى قرارك.`;
}

function detect(command: string) {
  const text = command.trim();
  if (!text) return "weekly" as const;
  if (/مسح|احذف الكل|فرّغ|افرغ/.test(text)) return "wipe" as const;
  if (/سجّلني|سجلني|قدّم عني|قدم عني|افتح حساب|تسجيل رسمي/.test(text)) {
    return "apply" as const;
  }
  if (/إعلان|اعلان|اشتر مخزون|ادفع|ميزانية إعلان/.test(text)) {
    return "spend" as const;
  }
  if (/هوية|ضريب|سجل تجاري|وثائق/.test(text)) return "identity" as const;
  if (/قدّمت|قدمت|حدّث الحالة|حدث الحالة|صارت نشطة/.test(text)) {
    return "status" as const;
  }
  if (/مسار|توصية|يناسب/.test(text)) return "path" as const;
  if (/بدون رأس|بلا رأس|عمولة فقط/.test(text)) return "zero" as const;
  if (/نون|خليج|سعود|إمارات/.test(text)) return "gulf" as const;
  return "weekly" as const;
}

function namedSlugs(command: string): string[] {
  const found: string[] = [];
  const map: [RegExp, string][] = [
    [/أمازون|امازون|amazon/i, "amazon-associates"],
    [/نون|noon/i, "noon-seller"],
    [/إيباي|ايباي|ebay/i, "ebay-partner-network"],
    [/علي ?إكسبريس|aliexpress/i, "aliexpress-affiliate"],
    [/تيك توك|tiktok/i, "tiktok-shop"],
    [/أوين|awin/i, "awin"],
    [/بوكينغ|booking/i, "booking-affiliate"],
  ];
  for (const [pattern, slug] of map) {
    if (pattern.test(command)) found.push(slug);
  }
  return found;
}

function gateFor(
  permission: AgentPermissions,
  key: keyof AgentPermissions
): AgentAction["gate"] {
  return permission[key] ? "auto" : "needs_you";
}

export function runAgent(input: {
  command: string;
  plan: SavedProgram[];
  permissions: AgentPermissions;
  profile: AgentProfile;
}): AgentRun {
  const command = input.command.trim() || "شغّل أسبوع العمل";
  const intent = detect(command);
  const proposed: AgentAction[] = [];
  let n = 0;
  const playbookSlug = playbookFor(input.profile);
  const playbook = getPlaybook(playbookSlug);
  const playbookTitle = playbook?.title ?? "مسار العمولة";

  if (intent === "wipe") {
    proposed.push(
      action(
        {
          kind: "wipe",
          title: "مسح الخطة بالكامل",
          detail: "هذا أمر ضروري. الوكيل لا يفرّغ بياناتك. احذف من صفحة خطتي إن أردت.",
          gate: "locked",
        },
        n++
      )
    );
  } else if (intent === "spend") {
    proposed.push(
      action(
        {
          kind: "spend",
          title: "إنفاق أو إعلان مدفوع",
          detail: "الوكيل لا يشغّل إعلانات ولا يشتري بضاعة. استخدم الحاسبة أولًا ثم ادفع بنفسك إن قررت.",
          gate: "locked",
          href: "/irad/calculator",
        },
        n++
      )
    );
  } else if (intent === "identity") {
    proposed.push(
      action(
        {
          kind: "identity",
          title: "رفع هوية أو ملف ضريبي",
          detail: "الوثائق الرسمية تبقى بيدك. الوكيل يجهّز قائمة ما تحتاجه، لا يرفع الملف.",
          gate: "locked",
        },
        n++
      )
    );
  } else if (intent === "apply") {
    const slugs = namedSlugs(command);
    const targets = slugs.length ? slugs : starterSlugs(input.profile).slice(0, 1);
    for (const slug of targets) {
      const program = getProgram(slug);
      if (!program) continue;
      proposed.push(
        action(
          {
            kind: "open_apply",
            title: `التسجيل في ${program.nameAr}`,
            detail: "الوكيل لا يقدّم الطلب عنك. راجع الخطوات ثم افتح الصفحة الرسمية بنفسك.",
            slug,
            href: program.applyUrl,
            gate: "locked",
          },
          n++
        )
      );
    }
  } else {
    let slugs = starterSlugs(input.profile);
    if (intent === "zero") {
      slugs = programs
        .filter((program) => program.capital === "none" && program.menaFit !== "limited")
        .slice(0, 3)
        .map((program) => program.slug);
    }
    if (intent === "gulf") {
      slugs = ["amazon-associates", "noon-seller", "salla-zid"];
    }
    const named = namedSlugs(command);
    if (named.length) slugs = named;

    for (const slug of slugs) {
      const program = getProgram(slug);
      if (!program) continue;
      const existing = input.plan.find((item) => item.slug === slug);
      if (!existing) {
        proposed.push(
          action(
            {
              kind: "add_program",
              title: `إضافة ${program.nameAr} إلى الخطة`,
              detail: program.bestFor,
              slug,
              gate: gateFor(input.permissions, "manage_plan"),
              permission: "manage_plan",
            },
            n++
          )
        );
      }
      const canNote =
        input.permissions.write_notes &&
        (Boolean(existing) || input.permissions.manage_plan);
      proposed.push(
        action(
          {
            kind: "write_note",
            title: `خطوة أسبوع لـ ${program.nameAr}`,
            detail: noteFor(slug, playbookTitle),
            slug,
            note: noteFor(slug, playbookTitle),
            gate: canNote ? "auto" : "needs_you",
            permission: "write_notes",
          },
          n++
        )
      );
    }

    if (intent === "path" || intent === "weekly") {
      proposed.push(
        action(
          {
            kind: "suggest_playbook",
            title: `اعتماد مسار: ${playbookTitle}`,
            detail: playbook?.subtitle ?? "",
            slug: playbookSlug,
            href: `/irad/playbooks/${playbookSlug}`,
            gate: gateFor(input.permissions, "pick_path"),
            permission: "pick_path",
          },
          n++
        )
      );
    }

    if (intent === "status") {
      const target =
        namedSlugs(command)[0] ?? input.plan[0]?.slug ?? slugs[0];
      const program = getProgram(target);
      if (program) {
        proposed.push(
          action(
            {
              kind: "update_status",
              title: `تعيين ${program.nameAr} كـ «قدّمت طلبًا»`,
              detail: "يتم فقط إذا منحت صلاحية تحديث الحالة، وبعد أن تكون قدّمت بنفسك.",
              slug: target,
              status: "applied",
              gate: gateFor(input.permissions, "update_status"),
              permission: "update_status",
            },
            n++
          )
        );
      }
    }

    for (const slug of slugs.slice(0, 2)) {
      const program = getProgram(slug);
      if (!program) continue;
      proposed.push(
        action(
          {
            kind: "open_apply",
            title: `قرارك: التسجيل في ${program.nameAr}`,
            detail: "محجوز لك. الوكيل يجهّز الخطة ولا يضغط زر التسجيل.",
            slug,
            href: program.applyUrl,
            gate: "locked",
          },
          n++
        )
      );
    }
  }

  const executed = proposed.filter((item) => item.gate === "auto");
  const needsYou = proposed.filter((item) => item.gate === "needs_you");
  const locked = proposed.filter((item) => item.gate === "locked");

  const summaryParts = [
    executed.length
      ? `نفّذ ${executed.length} إجراء ضمن صلاحياتك.`
      : "لم يُنفَّذ شيء تلقائيًا.",
    needsYou.length ? `${needsYou.length} إجراء بانتظار تفعيل صلاحية.` : "",
    locked.length ? `${locked.length} أمر ضروري بقي بيدك.` : "",
  ].filter(Boolean);

  return {
    at: nowIso(),
    command,
    summary: summaryParts.join(" "),
    executed,
    needsYou,
    locked,
  };
}
