import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";
import { cmsConfig } from "@/lib/cms/config";
import { AppThemeWrapper } from "@/components/AppThemeWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UX Portfolio",
  description: "Starter Next.js app with shadcn/ui",
};

function EditModeBar() {
  if (!cmsConfig.editMode) return null;
  const previewUrl = `/api/preview?secret=${encodeURIComponent(cmsConfig.previewSecret)}`;
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-center text-sm">
      <Link
        href={previewUrl}
        className="text-amber-700 dark:text-amber-400 underline hover:no-underline"
      >
        Preview (draft) view
      </Link>
      {" · "}
      <Link
        href="/admin"
        className="text-amber-700 dark:text-amber-400 underline hover:no-underline"
      >
        Admin
      </Link>
    </div>
  );
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <EditModeBar />
        <AppThemeWrapper>{children}</AppThemeWrapper>
      </body>
    </html>
  );
}
