import { NativeOnlyAnimatedView } from './native-only-animated-view';
import { TextClassContext } from './text';
import { cn } from '../lib/utils';
import { FullWindowOverlay } from '../lib/platform-overlay';
import * as PopoverPrimitive from '@rn-primitives/popover';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.memo(function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  portalHost,
  ...props
}: PopoverPrimitive.ContentProps &
  React.RefAttributes<PopoverPrimitive.ContentRef> & {
    portalHost?: string;
  }) {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <PopoverPrimitive.Overlay style={StyleSheet.absoluteFill}>
          <NativeOnlyAnimatedView entering={FadeIn.duration(200)} exiting={FadeOut}>
            <TextClassContext.Provider value={React.useMemo(() => 'text-popover-foreground', [])}>
              <PopoverPrimitive.Content
                align={align}
                sideOffset={sideOffset}
                className={cn(
                  'bg-popover border-border z-50 w-72 rounded-md border p-4 shadow-md shadow-black/5',
                  className
                )}
                {...props}
              />
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </PopoverPrimitive.Overlay>
      </FullWindowOverlay>
    </PopoverPrimitive.Portal>
  );
});

export { Popover, PopoverContent, PopoverTrigger };
