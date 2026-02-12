import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UX Portfolio",
  description: "Starter Next.js app with shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
