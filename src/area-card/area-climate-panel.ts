import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { ref } from "lit/directives/ref";
import { HomeAssistant, LovelaceCard } from "../types";
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

    const row = window.loadCardHelpers().then(({ createRowElement }) => {
      const row = createRowElement({ type: 'input-select', entity: `input_select.${this.key}_thermostat_mode` });
      row.hass = this.hass;
      return row;
    });

    return html`
      <div class="root">
        <div class="settings">
          ${row}
        </div>

        <div class="thermostat">
        ${climateEntity}
        </div>
      </div>
    `;
  }

  private entitiesCardChanged(element?: Element): void {
    if (!element) {
      return;
    }

    const card = <LovelaceCard<any>>element;
    card.hass = this.hass;
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
