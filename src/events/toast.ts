import { fireEvent } from "./events";

declare global {
  interface HASSDomEvents {
    "hass-notification": ShowToastParams;
  }
}

export interface ShowToastParams {
  message: string;
  action?: ToastActionParams;
  duration?: number;
  dismissable?: boolean;
}

export interface ToastActionParams {
  action: () => void;
  text: string;
}

export function showToast(element: HTMLElement, params: ShowToastParams) {
  fireEvent(element, "hass-notification", params);
}
