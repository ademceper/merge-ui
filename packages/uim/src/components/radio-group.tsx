import { cn } from '../lib/utils';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import * as React from 'react';

const RadioGroup = React.memo(function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.RootProps & React.RefAttributes<RadioGroupPrimitive.RootRef>) {
  return <RadioGroupPrimitive.Root className={cn('gap-3', className)} {...props} />;
});

const RadioGroupItem = React.memo(function RadioGroupItem({
  className,
  ...props
}: RadioGroupPrimitive.ItemProps & React.RefAttributes<RadioGroupPrimitive.ItemRef>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-input dark:bg-input/30 aspect-square size-4 shrink-0 items-center justify-center rounded-full border shadow-sm shadow-black/5',
        props.disabled && 'opacity-50',
        className
      )}
      accessibilityRole="radio"
      accessibilityState={{ checked: props.checked, disabled: props.disabled }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      {...props}>
      <RadioGroupPrimitive.Indicator className="bg-primary size-2 rounded-full" />
    </RadioGroupPrimitive.Item>
  );
});

export { RadioGroup, RadioGroupItem };
