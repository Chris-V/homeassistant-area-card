declare global {
  interface HASSDomEvents {
    "hass-more-info": {
      entityId: string | undefined;
    };
  }
}

export interface HASSDomEvent<T> extends Event {
  detail: T;
}

export const fireEvent = <HassEvent extends keyof HASSDomEvents>(
  node: HTMLElement | Window,
  type: HassEvent,
  detail?: HASSDomEvents[HassEvent],
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
) => {
  const event = new Event(type, {
    bubbles: options?.bubbles === undefined ? true : options.bubbles,
    cancelable: !!options?.cancelable,
    composed: options?.composed === undefined ? true : options.composed
  });
  (event as any).detail = detail === null || detail === undefined ? {} : detail;

  node.dispatchEvent(event);
  return event;
};
