import { cn } from '../lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';

// Switch dimensions constants (based on Tailwind w-8 = 32px)
// These constants ensure maintainability if switch dimensions change
const SWITCH_WIDTH_PX = 32; // w-8 = 8 * 4px = 32px
const THUMB_SIZE_PX = 16; // size-4 = 4 * 4px = 16px
const PADDING_PX = 2; // 2px padding on each side
// Calculate translate: (32 - 16 - 2) = 14px = 3.5 * 4px (Tailwind translate-x-3.5)
const THUMB_TRANSLATE_X_PX = SWITCH_WIDTH_PX - THUMB_SIZE_PX - PADDING_PX * 2;
const THUMB_TRANSLATE_X_CLASS = 'translate-x-3.5'; // 14px = 3.5 * 4px

const Switch = React.memo(function Switch({
  className,
  ...props
}: SwitchPrimitives.RootProps & React.RefAttributes<SwitchPrimitives.RootRef>) {
  // Use calculated constant: translate-x-3.5 = 14px (matches THUMB_TRANSLATE_X)
  // If dimensions change, update constants above and this class accordingly
  const thumbTranslateClass = props.checked ? THUMB_TRANSLATE_X_CLASS : 'translate-x-0';

  return (
    <SwitchPrimitives.Root
      className={cn(
        'flex h-[1.15rem] w-8 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5 z-10',
        props.checked ? 'bg-primary' : 'bg-input dark:bg-input/80',
        props.disabled && 'opacity-50',
        className
      )}
      accessibilityRole="switch"
      accessibilityState={{ checked: props.checked, disabled: props.disabled }}
      accessibilityLabel={props.accessibilityLabel || 'Toggle switch'}
      hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'bg-background size-4 rounded-full',
          props.checked
            ? `dark:bg-primary-foreground ${thumbTranslateClass}`
            : 'dark:bg-foreground translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
});

export { Switch };
