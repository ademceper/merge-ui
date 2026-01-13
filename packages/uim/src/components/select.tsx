import { Icon } from './icon';
import { NativeOnlyAnimatedView } from './native-only-animated-view';
import { TextClassContext } from './text';
import { cn } from '../lib/utils';
import { FullWindowOverlay } from '../lib/platform-overlay';
import * as SelectPrimitive from '@rn-primitives/select';
import { Check, ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.memo(function SelectValue({
  ref,
  className,
  ...props
}: SelectPrimitive.ValueProps &
  React.RefAttributes<SelectPrimitive.ValueRef> & {
    className?: string;
  }) {
  const { value } = SelectPrimitive.useRootContext();

  // Validate value type (both development and production)
  // In production, invalid values are silently ignored to prevent crashes
  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `[SelectValue] Invalid value type: expected string or number, got ${typeof value}. Value:`,
            value
          );
        }
        // In production, invalid values are handled by the primitive
        // but we log a warning in development to help developers
      }
    }
  }, [value]);

  return (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        'text-foreground line-clamp-1 flex flex-row items-center gap-2 text-sm',
        !value && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  );
})

const SelectTrigger = React.memo(function SelectTrigger({
  ref,
  className,
  children,
  size = 'default',
  ...props
}: SelectPrimitive.TriggerProps &
  React.RefAttributes<SelectPrimitive.TriggerRef> & {
    children?: React.ReactNode;
    size?: 'default' | 'sm';
  }) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'border-input dark:bg-input/30 dark:active:bg-input/50 bg-background flex h-10 flex-row items-center justify-between gap-2 rounded-md border px-3 py-2 shadow-sm shadow-black/5',
        props.disabled && 'opacity-50',
        size === 'sm' && 'h-8 py-2',
        className
      )}
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel || 'Select option'}
      accessibilityHint={props.accessibilityHint || 'Opens a menu to select an option'}
      accessibilityState={{ disabled: props.disabled }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      {...props}>
      <>{children}</>
      <Icon as={ChevronDown} className="text-muted-foreground size-4" />
    </SelectPrimitive.Trigger>
  );
});

const SelectContent = React.memo(function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectPrimitive.ContentProps &
  React.RefAttributes<SelectPrimitive.ContentRef> & {
    className?: string;
    portalHost?: string;
  }) {
  const textClassName = React.useMemo(() => 'text-popover-foreground', []);

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay style={StyleSheet.absoluteFill}>
          <TextClassContext.Provider value={textClassName}>
            <NativeOnlyAnimatedView className="z-50" entering={FadeIn} exiting={FadeOut}>
              <SelectPrimitive.Content
                className={cn(
                  'bg-popover border-border relative z-50 min-w-[8rem] rounded-md border shadow-md shadow-black/5',
                  'p-1',
                  className
                )}
                position={position}
                {...props}>
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                  className={cn(
                    'p-1',
                    position === 'popper' && 'w-full'
                  )}>
                  {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
              </SelectPrimitive.Content>
            </NativeOnlyAnimatedView>
          </TextClassContext.Provider>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
});

const SelectLabel = React.memo(function SelectLabel({
  className,
  ...props
}: SelectPrimitive.LabelProps & React.RefAttributes<SelectPrimitive.LabelRef>) {
  return (
    <SelectPrimitive.Label
      className={cn('text-muted-foreground px-2 py-2 text-xs', className)}
      {...props}
    />
  );
})

const SelectItem = React.memo(function SelectItem({
  className,
  ...props
}: SelectPrimitive.ItemProps & React.RefAttributes<SelectPrimitive.ItemRef>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'active:bg-accent group relative flex w-full flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-8',
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <View className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} className="text-muted-foreground size-4 shrink-0" />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className="text-foreground group-active:text-accent-foreground text-sm" />
    </SelectPrimitive.Item>
  );
});

const SelectSeparator = React.memo(function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.SeparatorProps & React.RefAttributes<SelectPrimitive.SeparatorRef>) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        'bg-border -mx-1 my-1 h-px',
        className
      )}
      {...props}
    />
  );
})

const SelectScrollUpButton = React.memo(function SelectScrollUpButton() {
  return null;
})

const SelectScrollDownButton = React.memo(function SelectScrollDownButton() {
  return null;
})

const NativeSelectScrollView = React.memo(function NativeSelectScrollView({ className, ...props }: React.ComponentProps<typeof ScrollView>) {
  return <ScrollView className={cn('max-h-52', className)} {...props} />;
})

export {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
