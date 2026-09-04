import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { publisher } from "@/data/publisher";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: {
    default: `${publisher.name} — ${publisher.tagline}`,
    template: `%s | ${publisher.name}`,
  },
  description: publisher.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plex.variable} h-full antialiased`}
    >
      <body className={`${plex.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
