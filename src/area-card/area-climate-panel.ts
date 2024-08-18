import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import styles from './area-badge.styles';
import { HomeAssistant } from "../types";

@customElement('area-climate-panel')
export class AreaClimatePanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() key?: string;

  static styles = styles;

  protected render() {
    if (!this.key || !this.hass) {
      return nothing;
    }

    const hass = this.hass;
    const state = hass.states[`climate.${this.key}_thermostat`];

    return html`
      <div>
        TOP
      </div>
    `;
  }
}
