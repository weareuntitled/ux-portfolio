'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR, VP } from '@/lib/motion';
import { UserCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type QuoteCardProps = {
  quote: string;
  attribution?: string;
  avatarInitials?: string;
  className?: string;
};

export function QuoteCard({
  quote,
  attribution,
  avatarInitials = 'DP',
  className,
}: QuoteCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn('', className)}
      initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: reduce ? 0 : DUR.md, ease: EASE }}
    >
      <Card className="p-5">
        <div className="flex gap-4 items-start">
          <UserCircle2 className="h-10 w-10 shrink-0 text-primary" aria-hidden />
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="text-xs font-medium text-muted-foreground">
              {avatarInitials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <blockquote className="text-base leading-relaxed text-foreground">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {attribution && (
              <div className="mt-2 text-sm text-muted-foreground">
                {attribution}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
