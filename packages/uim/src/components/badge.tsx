import { TextClassContext } from './text';
import { cn } from '../lib/utils';
import { wrapTextChildren } from '../lib/wrap-children';
import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View, ViewProps } from 'react-native';

const badgeVariants = cva(
  'border-border group shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5',
  {
    variants: {
      variant: {
        default: 'bg-primary border-transparent',
        secondary: 'bg-secondary border-transparent',
        destructive: 'bg-destructive border-transparent',
        outline: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-white',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeProps = ViewProps &
  React.RefAttributes<View> & {
    asChild?: boolean;
    children?: React.ReactNode;
  } & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, children, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  
  const textClassName = React.useMemo(
    () => badgeTextVariants({ variant }),
    [variant]
  );

  const wrappedChildren = React.useMemo(
    () => wrapTextChildren(children),
    [children]
  );

  return (
    <TextClassContext.Provider value={textClassName}>
      <Component className={cn(badgeVariants({ variant }), className)} {...props}>
        {wrappedChildren}
      </Component>
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
