import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { HomeAssistant } from "../types";
import styles from './area-climate-panel.styles';

@customElement('area-climate-panel')
export class AreaClimatePanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() key?: string;

  static styles = styles;

  protected render() {
    if (!this.key || !this.hass) {
      return nothing;
    }

    const climateEntity = `climate.${this.key}_thermostat`;
    const comfortSetpointEntity = `input_number.${this.key}_thermostat_comfort_setpoint`;
    const ecoSetpointEntity = `input_number.${this.key}_thermostat_eco_setpoint`;
    const modeEntity = `input_select.${this.key}_thermostat_mode`;

    return html`
      <div>
        ${climateEntity}
      </div>
    `;
  }
}
