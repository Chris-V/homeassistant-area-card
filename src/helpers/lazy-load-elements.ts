import { nothing } from "lit";
import { DirectiveResult } from "lit/directive";
import { until } from "lit/directives/until";
import { HomeAssistant } from "../types";

export function createRowElement(hass: HomeAssistant, options: LovelaceCardOptions): DirectiveResult {
  const promise = window.loadCardHelpers().then(({ createRowElement }) => {
    const row = createRowElement(options);
    row.hass = hass;
    return row;
  });
  return until(promise, nothing);
}
