'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/projects', accent: true },
  { label: 'Motion', href: '/motion' },
  { label: 'CV', href: '/cv' },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white px-6 py-3 md:px-10 md:py-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-bold text-black tracking-tight transition-opacity hover:opacity-70 md:text-lg"
          style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif' }}
        >
          Daniel Peters,
        </Link>
        <ul className="flex items-center gap-1 rounded-2xl border border-neutral-200 bg-white px-2 py-1.5 md:gap-2 md:px-2.5 md:py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'px-2 py-1 text-xs font-medium transition-colors md:px-2.5 md:text-sm',
                    isActive && 'text-black',
                    !isActive && 'text-neutral-500 hover:text-black'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="px-2 py-1 text-xs font-medium text-neutral-500 transition-colors hover:text-black md:px-2.5 md:text-sm"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
