import { Icon } from './icon';
import { TextClassContext } from './text';
import { toggleVariants } from './toggle';
import { cn } from '../lib/utils';
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants> | null>(null);

const ToggleGroup = React.memo(function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupPrimitive.RootProps &
  VariantProps<typeof toggleVariants> &
  React.RefAttributes<ToggleGroupPrimitive.RootRef>) {
  const contextValue = React.useMemo(
    () => ({ variant, size }),
    [variant, size]
  );

  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        'flex flex-row items-center rounded-md shadow-none',
        variant === 'outline' && 'shadow-sm shadow-black/5',
        className
      )}
      {...props}>
      <ToggleGroupContext.Provider value={contextValue}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
})

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = React.memo(function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  isFirst,
  isLast,
  ...props
}: ToggleGroupPrimitive.ItemProps &
  VariantProps<typeof toggleVariants> &
  React.RefAttributes<ToggleGroupPrimitive.ItemRef> & {
    isFirst?: boolean;
    isLast?: boolean;
  }) {
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();
  const isSelected = ToggleGroupPrimitive.utils.getIsSelected(value, props.value);

  const textClassName = React.useMemo(
    () =>
      cn(
        'text-sm text-foreground font-medium',
        isSelected && 'text-accent-foreground'
      ),
    [isSelected]
  );

  return (
    <TextClassContext.Provider value={textClassName}>
      <ToggleGroupPrimitive.Item
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          props.disabled && 'opacity-50',
          isSelected && 'bg-accent',
          'min-w-0 shrink-0 rounded-none shadow-none',
          isFirst && 'rounded-l-md',
          isLast && 'rounded-r-md',
          (context.variant === 'outline' || variant === 'outline') && 'border-l-0',
          (context.variant === 'outline' || variant === 'outline') && isFirst && 'border-l',
          className
        )}
        {...props}>
        {children}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
});

const ToggleGroupIcon = React.memo(function ToggleGroupIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
  const textClass = React.useContext(TextClassContext);
  const iconClassName = React.useMemo(
    () => cn('size-4 shrink-0', textClass, className),
    [textClass, className]
  );
  return <Icon className={iconClassName} {...props} />;
});

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };
