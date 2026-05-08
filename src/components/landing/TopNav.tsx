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
    <nav className="fixed top-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4">
      <ul className="flex items-center gap-0.5 rounded-full border border-border/50 bg-background/80 px-2 py-1.5 backdrop-blur-md md:gap-1 md:border-none md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative px-2.5 py-1.5 text-xs font-medium transition-colors md:px-3 md:text-sm',
                  isActive && 'text-foreground',
                  !isActive && item.accent && 'text-primary hover:text-primary/80',
                  !isActive && !item.accent && 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/contact"
            className="ml-1 inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow transition-transform hover:scale-105 md:ml-2 md:px-4 md:text-sm"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
