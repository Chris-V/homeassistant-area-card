import { fireEvent } from "../events/events";

declare global {
  interface HASSDomEvents {
    "location-changed": NavigateOptions;
  }
}

export interface NavigateOptions {
  replace?: boolean;
}

export function navigate(path: string, options?: NavigateOptions) {
  const replace = options?.replace || false;

  if (replace) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }

  fireEvent(window, "location-changed", { replace });
};
