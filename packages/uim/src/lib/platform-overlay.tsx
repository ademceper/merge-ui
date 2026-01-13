import * as React from 'react';
import { Platform } from 'react-native';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

/**
 * Wrapper component that acts as a no-op on non-iOS platforms.
 * Used to maintain consistent component API across platforms.
 */
function FragmentWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * Platform-specific overlay component for iOS full-window overlays.
 * On iOS, uses RNFullWindowOverlay for proper edge-to-edge rendering.
 * On other platforms, uses FragmentWrapper (no-op).
 * 
 * This is used by Dialog, AlertDialog, Popover, DropdownMenu, and ContextMenu
 * to ensure proper overlay behavior on iOS.
 */
export const FullWindowOverlay: React.ComponentType<{ children: React.ReactNode }> =
  Platform.OS === 'ios' ? RNFullWindowOverlay : FragmentWrapper;
