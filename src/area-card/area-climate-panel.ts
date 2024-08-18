import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { ref } from "lit/directives/ref";
import { until } from "lit/directives/until";
import { HomeAssistant, LovelaceCard, LovelaceElement } from "../types";
import styles from './area-climate-panel.styles';

@customElement('area-climate-panel')
export class AreaClimatePanel extends LitElement {
  @property() key?: string;

  #hass?: HomeAssistant;

  static styles = styles;

  set hass(hass: HomeAssistant) {
    this.#hass = hass;

    this.shadowRoot
      ?.querySelectorAll(".setting-row > *")
      ?.forEach((element: unknown) => {
        (element as LovelaceElement<any>).hass = hass;
      });
  }

  protected render() {
    if (!this.key || !this.#hass) {
      return nothing;
    }

    const mode = this.createSettingRowTemplate({
      type: 'input-select-entity',
      entity: `input_select.${this.key}_thermostat_mode`,
      name: 'Mode',
    });
    const ecoSetpoint = this.createSettingRowTemplate({
      type: 'input-number-entity',
      entity: `input_number.${this.key}_thermostat_eco_setpoint`,
      name: 'Eco',
    });
    const comfortSetpoint = this.createSettingRowTemplate({
      type: 'input-number-entity',
      entity: `input_number.${this.key}_thermostat_comfort_setpoint`,
      name: 'Comfort',
    });

    return html`
      <div class="root">
        <div class="settings">
          ${mode}
          ${ecoSetpoint}
          ${comfortSetpoint}
        </div>

        <div class="thermostat">
          <hui-thermostat-card
            .hass=${this.#hass}
            ${ref(this.onClimateCardUpdated)}
          ></hui-thermostat-card>
        </div>
      </div>
    `;
  }

  private createSettingRowTemplate(options: LovelaceCardOptions) {
    const rowPromise = window.loadCardHelpers().then(({ createRowElement }) => {
      const row = createRowElement(options);
      row.hass = this.#hass;
      return html`<div class="setting-row">${row}</div>`;
    });
    return until(rowPromise, nothing);
  }

  private onClimateCardUpdated(card?: Element) {
    if (!card) {
      return;
    }

    (card as LovelaceCard<any>).setConfig({
      entity: `climate.${this.key}_thermostat`,
    });
  }
}
