import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: {
    default: "إيراد — دليل برامج الشراكة وإعادة البيع",
    template: "%s | إيراد",
  },
  description:
    "كيف تستفيد من برامج أمازون وإيباي وعلي إكسبريس ونون وتيك توك والشبكات لرفع إيراداتك: تسويق بالعمولة، دروب شيبينغ، وإعادة بيع.",
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
