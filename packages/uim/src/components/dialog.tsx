import { Icon } from './icon';
import { NativeOnlyAnimatedView } from './native-only-animated-view';
import { cn } from '../lib/utils';
import { FullWindowOverlay } from '../lib/platform-overlay';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.memo(function DialogOverlay({
  className,
  children,
  ...props
}: Omit<DialogPrimitive.OverlayProps, 'asChild'> &
  React.RefAttributes<DialogPrimitive.OverlayRef> & {
    children?: React.ReactNode;
  }) {
  // Use key prop to force remount and cleanup animations when dialog opens/closes
  // This prevents memory leaks from nested animations
  const [animationKey, setAnimationKey] = React.useState(0);

  React.useEffect(() => {
    // Reset animation key when component mounts to ensure clean animation state
    setAnimationKey((prev) => prev + 1);
    
    // Cleanup: animations are automatically cleaned up when component unmounts
    // The key prop ensures proper remounting and cleanup
    return () => {
      // React Native Reanimated automatically cleans up animations on unmount
    };
  }, []);

  return (
    <FullWindowOverlay>
      <DialogPrimitive.Overlay
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 p-2',
          className
        )}
        {...props}
        asChild>
        <NativeOnlyAnimatedView
          key={`outer-${animationKey}`}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}>
          <NativeOnlyAnimatedView
            key={`inner-${animationKey}`}
            entering={FadeIn.delay(50)}
            exiting={FadeOut.duration(150)}>
            <>{children}</>
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </DialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
})

const DialogContent: React.NamedExoticComponent<
  DialogPrimitive.ContentProps &
    React.RefAttributes<DialogPrimitive.ContentRef> & {
      portalHost?: string;
    }
> = React.memo(function DialogContent({
  className,
  portalHost,
  children,
  ...props
}: DialogPrimitive.ContentProps &
  React.RefAttributes<DialogPrimitive.ContentRef> & {
    portalHost?: string;
  }) {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          className={cn(
            'bg-background border-border z-50 mx-auto flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5',
            className
          )}
          {...props}>
          <>{children}</>
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded opacity-70 active:opacity-100'
            )}
            hitSlop={12}
            accessibilityLabel="Close dialog"
            accessibilityRole="button"
            accessibilityHint="Closes the current dialog">
            <Icon
              as={X}
              className={cn('text-accent-foreground size-4 shrink-0')}
            />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});

const DialogHeader = React.memo(function DialogHeader({ className, ...props }: ViewProps) {
  return (
    <View className={cn('flex flex-col gap-2 text-center', className)} {...props} />
  );
});

const DialogFooter = React.memo(function DialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col-reverse gap-2', className)}
      {...props}
    />
  );
});

const DialogTitle = React.memo(function DialogTitle({
  className,
  ...props
}: DialogPrimitive.TitleProps & React.RefAttributes<DialogPrimitive.TitleRef>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-foreground text-lg font-semibold leading-none', className)}
      {...props}
    />
  );
});

const DialogDescription = React.memo(function DialogDescription({
  className,
  ...props
}: DialogPrimitive.DescriptionProps & React.RefAttributes<DialogPrimitive.DescriptionRef>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
});

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
