import * as React from 'react';
import { cn } from '@/lib/utils';

type AvatarProps = React.ComponentPropsWithoutRef<'div'>;
type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
type AvatarFallbackProps = React.ComponentPropsWithoutRef<'span'>;

const AvatarContext = React.createContext<{ hasImage: boolean; setHasImage: (value: boolean) => void } | null>(null);

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => {
  const [hasImage, setHasImage] = React.useState(true);

  return (
    <AvatarContext.Provider value={{ hasImage, setHasImage }}>
      <div ref={ref} className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
    </AvatarContext.Provider>
  );
});
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(({ className, onError, alt, ...props }, ref) => {
  const context = React.useContext(AvatarContext);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Avatar supports arbitrary image sources (external URLs, etc.)
    <img
      ref={ref}
      alt={alt ?? ''}
      className={cn('aspect-square h-full w-full', className)}
      onError={(event) => {
        context?.setHasImage(false);
        onError?.(event);
      }}
      onLoad={() => context?.setHasImage(true)}
      {...props}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => {
  const context = React.useContext(AvatarContext);

  if (context?.hasImage) {
    return null;
  }

  return <span ref={ref} className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)} {...props} />;
});
AvatarFallback.displayName = 'AvatarFallback';
