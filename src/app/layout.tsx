/**
 * Minimal root layout so Payload admin under (payload) can render its own
 * <html>/<body> without nesting. The main site under (site) provides the
 * document shell in (site)/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
