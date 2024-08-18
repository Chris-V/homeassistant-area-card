import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
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

    const mode = window.loadCardHelpers().then(({ createRowElement }) => {
      const row = createRowElement({
        type: 'input-select-entity',
        entity: `input_select.${this.key}_thermostat_mode`,
        name: 'Mode',
      });
      row.hass = this.#hass;
      return html`<div class="setting-row">${row}</div>`;
    });
    const ecoSetpoint = window.loadCardHelpers().then(({ createRowElement }) => {
      const row = createRowElement({
        type: 'input-number-entity',
        entity: `input_number.${this.key}_thermostat_eco_setpoint`,
        name: 'Eco',
      });
      row.hass = this.#hass;
      return html`<div class="setting-row">${row}</div>`;
    });
    const comfortSetpoint = window.loadCardHelpers().then(({ createRowElement }) => {
      const row = createRowElement({
        type: 'input-number-entity',
        entity: `input_number.${this.key}_thermostat_comfort_setpoint`,
        name: 'Comfort',
      });
      row.hass = this.#hass;
      return html`<div class="setting-row">${row}</div>`;
    });

    return html`
      <div class="root">
        <div class="settings">
          ${until(mode, nothing)}
          ${until(ecoSetpoint, nothing)}
          ${until(comfortSetpoint, nothing)}
        </div>

        <div class="thermostat">
        climate.${this.key}_thermostat
        </div>
      </div>
    `;
  }

  private entitiesCardChanged(element?: Element): void {
    if (!element) {
      return;
    }

    const card = <LovelaceCard<any>>element;
    card.hass = this.#hass;
    card.setConfig({
      type: "entities",
      entities: [
        { entity: `input_select.${this.key}_thermostat_mode`, name: 'Mode' },
        { entity: `input_number.${this.key}_thermostat_eco_setpoint`, name: 'Eco' },
        { entity: `input_number.${this.key}_thermostat_comfort_setpoint`, name: 'Comfort' },
      ],
    });
  }
}
