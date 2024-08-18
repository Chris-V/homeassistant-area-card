// https://github.com/home-assistant/frontend/blob/dev/src/data/haptics.ts

import { fireEvent, HASSDomEvent } from "./events";

export type HapticType =
  | "success"
  | "warning"
  | "failure"
  | "light"
  | "medium"
  | "heavy"
  | "selection";

declare global {
  interface HASSDomEvents {
    haptic: HapticType;
  }

  interface GlobalEventHandlersEventMap {
    haptic: HASSDomEvent<HapticType>;
  }
}

export function forwardHaptic(hapticType: HapticType) {
  fireEvent(window, "haptic", hapticType);
};
