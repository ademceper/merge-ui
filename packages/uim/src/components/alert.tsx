import { Icon } from './icon';
import { Text, TextClassContext } from './text';
import { cn } from '../lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

function Alert({
  className,
  variant,
  children,
  icon,
  iconLabel,
  iconClassName,
  ...props
}: ViewProps &
  React.RefAttributes<View> & {
    icon?: LucideIcon;
    iconLabel?: string;
    variant?: 'default' | 'destructive';
    iconClassName?: string;
  }) {
  const textClassName = React.useMemo(
    () =>
      cn(
        'text-sm text-foreground',
        variant === 'destructive' && 'text-destructive',
        className
      ),
    [variant, className]
  );

  return (
    <TextClassContext.Provider value={textClassName}>
      <View
        role="alert"
        className={cn(
          'bg-card border-border relative w-full rounded-lg border px-4 pb-2 pt-3.5',
          className
        )}
        {...props}>
        {icon && (
          <View
            className="absolute left-3.5 top-3"
            accessibilityLabel={iconLabel || 'Alert icon'}
            accessibilityRole="image">
            <Icon
              as={icon}
              className={cn('size-4', variant === 'destructive' && 'text-destructive', iconClassName)}
            />
          </View>
        )}
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  const textClass = React.useContext(TextClassContext);
  const titleClassName = React.useMemo(
    () => cn('mb-1 ml-0.5 min-h-4 pl-6 font-medium leading-none tracking-tight', textClass, className),
    [textClass, className]
  );

  return <Text className={titleClassName} {...props} />;
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  const textClass = React.useContext(TextClassContext);
  const descriptionClassName = React.useMemo(
    () =>
      cn(
        'text-muted-foreground ml-0.5 pb-1.5 pl-6 text-sm leading-relaxed',
        textClass?.includes('text-destructive') && 'text-destructive/90',
        className
      ),
    [textClass, className]
  );

  return <Text className={descriptionClassName} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
