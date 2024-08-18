import { html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators";
import { createRef, Ref, ref } from "lit/directives/ref";
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



    // - type: entities
    //   show_header_toggle: false
    //   card_mod:
    //     style: |
    //       ha-card .card-content { padding: 0; }
    //       ha-card #states > * { margin: 0; }
    // .mdc-text-field--filled {
    //   height: 3em;
    // }

    return html`
      <div class="root">
        <hui-entities-card
          class="settings"
          ${ref(this.entitiesCardRef)}
        ></hui-entities-card>

        <div class="thermostat">
        ${climateEntity}
        </div>
      </div>
    `;
  }

  private entitiesCardRef: Ref<HTMLInputElement & LovelaceCard<any>> = createRef();

  protected firstUpdated(properties: PropertyValues): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      .card-content, :host ::slotted(.card-content) {
          padding: 0;
      }
    `);

    this.entitiesCardRef.value
      ?.shadowRoot
      ?.querySelector('ha-card')
      ?.shadowRoot
      ?.adoptedStyleSheets
      .push(sheet);
  }

  protected updated(properties: PropertyValues): void {
    const card = this.entitiesCardRef.value;
    if (!card) {
      return;
    }

    if (properties.has('hass')) {
      card.hass = this.hass;
    }

    if (properties.has('key')) {
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
}
