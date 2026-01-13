import * as CollapsiblePrimitive from '@rn-primitives/collapsible';
import * as React from 'react';

const Collapsible = React.memo(function Collapsible({
  ...props
}: CollapsiblePrimitive.RootProps & React.RefAttributes<CollapsiblePrimitive.RootRef>) {
  return <CollapsiblePrimitive.Root {...props} />;
});

const CollapsibleTrigger = React.memo(function CollapsibleTrigger({
  ...props
}: CollapsiblePrimitive.TriggerProps & React.RefAttributes<CollapsiblePrimitive.TriggerRef>) {
  return <CollapsiblePrimitive.Trigger {...props} />;
});

const CollapsibleContent = React.memo(function CollapsibleContent({
  ...props
}: CollapsiblePrimitive.ContentProps & React.RefAttributes<CollapsiblePrimitive.ContentRef>) {
  return <CollapsiblePrimitive.Content {...props} />;
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
