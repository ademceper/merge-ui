import { Icon } from './icon';
import { TextClassContext } from './text';
import { cn } from '../lib/utils';
import * as AccordionPrimitive from '@rn-primitives/accordion';
import { ChevronDown } from 'lucide-react-native';
import * as React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const Accordion = React.memo(function Accordion({
  children,
  ...props
}: Omit<AccordionPrimitive.RootProps, 'asChild'> &
  React.RefAttributes<AccordionPrimitive.RootRef>) {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root
        {...(props as AccordionPrimitive.RootProps)}
        asChild>
        <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
})

const AccordionItem = React.memo(function AccordionItem({
  children,
  className,
  value,
  ...props
}: AccordionPrimitive.ItemProps & React.RefAttributes<AccordionPrimitive.ItemRef>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'border-border border-b',
        className
      )}
      value={value}
      asChild
      {...props}>
      <Animated.View
        className="native:overflow-hidden"
        layout={LinearTransition.duration(200)}>
        {children}
      </Animated.View>
    </AccordionPrimitive.Item>
  );
});

const Trigger = Pressable;

// Animation timing constants to avoid creating new objects on every render
const EXPAND_TIMING = { duration: 250 };
const COLLAPSE_TIMING = { duration: 200 };

const AccordionTrigger = React.memo(function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.TriggerProps & {
  children?: React.ReactNode;
} & React.RefAttributes<AccordionPrimitive.TriggerRef>) {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const textClassName = React.useMemo(
    () => cn('text-left text-sm font-medium'),
    []
  );

  const progress = useDerivedValue(
    () => (isExpanded ? withTiming(1, EXPAND_TIMING) : withTiming(0, COLLAPSE_TIMING)),
    [isExpanded]
  );
  const chevronStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
    }),
    [progress]
  );

  return (
    <TextClassContext.Provider value={textClassName}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger {...props} asChild>
          <Trigger
            className={cn(
              'flex-row items-start justify-between gap-4 rounded-md py-4 disabled:opacity-50',
              className
            )}>
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <Icon
                as={ChevronDown}
                size={16}
                className={cn(
                  'text-muted-foreground shrink-0'
                )}
              />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
});

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.ContentProps & React.RefAttributes<AccordionPrimitive.ContentRef>): React.ReactElement {
  const textClassName = React.useMemo(() => 'text-sm', []);

  return (
    <TextClassContext.Provider value={textClassName}>
      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden'
        )}
        {...props}>
        <Animated.View
          exiting={FadeOutUp.duration(200)}
          className={cn('pb-4', className)}>
          {children}
        </Animated.View>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

const AccordionContentMemo = React.memo(AccordionContent) as typeof AccordionContent;

export { Accordion, AccordionContentMemo as AccordionContent, AccordionItem, AccordionTrigger };
