import { Text, TextClassContext } from './text';
import { cn } from '../lib/utils';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

const Card = React.memo(function Card({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  const textClassName = React.useMemo(() => 'text-card-foreground', []);

  return (
    <TextClassContext.Provider value={textClassName}>
      <View
        className={cn(
          'bg-card border-border flex flex-col gap-6 rounded-xl border py-6 shadow-sm shadow-black/5',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
});

const CardHeader = React.memo(function CardHeader({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
});

const CardTitle = React.memo(function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      role="heading"
      accessibilityRole="header"
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
});

const CardDescription = React.memo(function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
});

const CardContent = React.memo(function CardContent({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('px-6', className)} {...props} />;
});

const CardFooter = React.memo(function CardFooter({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
});

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
