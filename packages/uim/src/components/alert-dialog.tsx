import { buttonTextVariants, buttonVariants } from './button';
import { NativeOnlyAnimatedView } from './native-only-animated-view';
import { TextClassContext } from './text';
import { cn } from '../lib/utils';
import { FullWindowOverlay } from '../lib/platform-overlay';
import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.memo(function AlertDialogOverlay({
  className,
  children,
  ...props
}: Omit<AlertDialogPrimitive.OverlayProps, 'asChild'> &
  React.RefAttributes<AlertDialogPrimitive.OverlayRef> & {
    children?: React.ReactNode;
  }) {
  return (
    <FullWindowOverlay>
      <AlertDialogPrimitive.Overlay
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-2',
          className
        )}
        {...props}>
        <NativeOnlyAnimatedView
          entering={FadeIn.duration(200).delay(50)}
          exiting={FadeOut.duration(150)}>
          <>{children}</>
        </NativeOnlyAnimatedView>
      </AlertDialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
})

function AlertDialogContent({
  className,
  portalHost,
  ...props
}: AlertDialogPrimitive.ContentProps &
  React.RefAttributes<AlertDialogPrimitive.ContentRef> & {
    portalHost?: string;
  }): React.ReactElement {
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          className={cn(
            'bg-background border-border z-50 flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5',
            className
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

const AlertDialogContentMemo = React.memo(AlertDialogContent) as typeof AlertDialogContent;

const AlertDialogHeader = React.memo(function AlertDialogHeader({ className, ...props }: ViewProps) {
  const textClassName = React.useMemo(() => 'text-center', []);

  return (
    <TextClassContext.Provider value={textClassName}>
      <View className={cn('flex flex-col gap-2', className)} {...props} />
    </TextClassContext.Provider>
  );
})

const AlertDialogFooter = React.memo(function AlertDialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col-reverse gap-2', className)}
      {...props}
    />
  );
})

const AlertDialogTitle = React.memo(function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.TitleProps & React.RefAttributes<AlertDialogPrimitive.TitleRef>) {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-foreground text-lg font-semibold', className)}
      {...props}
    />
  );
})

const AlertDialogDescription = React.memo(function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.DescriptionProps &
  React.RefAttributes<AlertDialogPrimitive.DescriptionRef>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
})

const AlertDialogAction = React.memo(function AlertDialogAction({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: AlertDialogPrimitive.ActionProps & React.RefAttributes<AlertDialogPrimitive.ActionRef> & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}) {
  const textClassName = React.useMemo(
    () => buttonTextVariants({ variant, size }),
    [variant, size]
  );

  return (
    <TextClassContext.Provider value={textClassName}>
      <AlertDialogPrimitive.Action className={cn(buttonVariants({ variant, size }), className)} {...props} />
    </TextClassContext.Provider>
  );
})

const AlertDialogCancel = React.memo(function AlertDialogCancel({
  className,
  size = 'default',
  ...props
}: AlertDialogPrimitive.CancelProps & React.RefAttributes<AlertDialogPrimitive.CancelRef> & {
  size?: 'default' | 'sm' | 'lg' | 'icon';
}) {
  const textClassName = React.useMemo(
    () => buttonTextVariants({ variant: 'outline', size }),
    [size]
  );

  return (
    <TextClassContext.Provider value={textClassName}>
      <AlertDialogPrimitive.Cancel
        className={cn(buttonVariants({ variant: 'outline', size }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
})

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContentMemo as AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
