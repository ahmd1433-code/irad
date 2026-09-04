import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalLabels, menaFitLabels, modelLabels } from "@/lib/labels";
import type { Program } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProgramCard({
  program,
  compact = false,
}: {
  program: Program;
  compact?: boolean;
}) {
  return (
    <Card className="h-full bg-card/90 transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ background: program.accent }}
            aria-hidden
          >
            {program.brand.slice(0, 2)}
          </div>
          <Badge variant="outline">{menaFitLabels[program.menaFit]}</Badge>
        </div>
        <div>
          <CardTitle className="text-lg">{program.nameAr}</CardTitle>
          <CardDescription className="mt-1">{program.nameEn}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {!compact && (
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {program.summary}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {program.models.map((model) => (
            <Badge key={model} variant="secondary">
              {modelLabels[model]}
            </Badge>
          ))}
        </div>
        <p className={cn("text-sm", compact && "line-clamp-1")}>
          <span className="text-muted-foreground">العمولة: </span>
          {program.commission}
        </p>
        <p className="text-sm text-muted-foreground">
          {capitalLabels[program.capital]}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/irad/programs/${program.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          تفاصيل البرنامج
        </Link>
      </CardFooter>
    </Card>
  );
}
