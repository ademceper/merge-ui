import * as React from 'react';
import { Text } from '../components/text';

/**
 * Wraps string and number children in Text components for React Native.
 * Filters out null, undefined, and boolean values to prevent rendering issues.
 * 
 * @param children - React children to wrap
 * @param textClassName - Optional className to apply to Text components
 * @returns Wrapped children with strings/numbers converted to Text
 */
export function wrapTextChildren(
  children: React.ReactNode,
  textClassName?: string
): React.ReactNode {
  return React.Children.toArray(children)
    .filter(
      (child) =>
        child !== null &&
        child !== undefined &&
        typeof child !== 'boolean'
    )
    .map((child, index) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return (
          <Text key={index} className={textClassName}>
            {child}
          </Text>
        );
      }
      // For React elements, preserve key if it exists
      if (React.isValidElement(child) && child.key == null) {
        return React.cloneElement(child, { key: index });
      }
      return child;
    });
}
