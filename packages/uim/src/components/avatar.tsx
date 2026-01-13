import { cn } from '../lib/utils';
import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';

const Avatar = React.memo(function Avatar({
  className,
  ...props
}: AvatarPrimitive.RootProps & React.RefAttributes<AvatarPrimitive.RootRef>) {
  return (
    <AvatarPrimitive.Root
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
});

const AvatarImage = React.memo(function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.ImageProps & React.RefAttributes<AvatarPrimitive.ImageRef>) {
  return <AvatarPrimitive.Image className={cn('aspect-square size-full', className)} {...props} />;
});

const AvatarFallback = React.memo(function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.FallbackProps & React.RefAttributes<AvatarPrimitive.FallbackRef>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'bg-muted flex size-full flex-row items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  );
});

export { Avatar, AvatarFallback, AvatarImage };
