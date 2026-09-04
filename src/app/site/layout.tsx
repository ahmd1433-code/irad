import type { Metadata } from "next";
import { PublisherFooter, PublisherHeader } from "@/components/publisher-chrome";
import { publisher } from "@/data/publisher";

export const metadata: Metadata = {
  title: {
    default: `${publisher.name} — ${publisher.tagline}`,
    template: `%s | ${publisher.name}`,
  },
  description: publisher.description,
};

export default function PublisherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublisherHeader />
      <main className="flex-1">{children}</main>
      <PublisherFooter />
    </>
  );
}
