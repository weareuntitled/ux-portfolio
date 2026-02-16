import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { cmsConfig } from "@/lib/cms/config";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <EditModeBar />
        {children}
      </body>
    </html>
  );
}
