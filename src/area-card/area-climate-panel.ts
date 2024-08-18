import { html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators";
import { createRef, Ref, ref } from "lit/directives/ref";
import { HomeAssistant, LovelaceCard, LovelaceElement } from "../types";
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

    return html`
      <div class="root">
        <div class="settings">
          <hui-input-select-entity-row ${ref((row: any | undefined) => {
            if (row) {
              row.hass = this.hass;
              row.setConfig({ entity: `input_select.${this.key}_thermostat_mode`, name: 'Mode' });
            }
          })}></hui-input-select-entity-row>
                <hui-input-number-entity-row ${ref((row?: any) => {
            if (row) {
              row.hass = this.hass;
              row.setConfig({ entity: `input_number.${this.key}_thermostat_eco_setpoint`, name: 'Eco' });
            }
          })}></hui-input-number-entity-row>
          <hui-input-number-entity-row ${ref((row?: any) => {
            if (row) {
              row.hass = this.hass;
              row.setConfig({ entity: `input_number.${this.key}_thermostat_comfort_setpoint`, name: 'Comfort' });
            }
          })}></hui-input-number-entity-row>
        </div>

        <div class="thermostat">
        climate.${this.key}_thermostat
        </div>
      </div>
    `;
  }

  private entitiesCardRef: Ref<HTMLInputElement & LovelaceCard<any>> = createRef();

  protected firstUpdated(properties: PropertyValues): void {
    // const sheet = new CSSStyleSheet();
    // sheet.replaceSync(`
    //   .card-content,
    //   :host ::slotted(.card-content) {
    //       padding: 0;
    //   }
    // `);

    // this.entitiesCardRef.value
    //   ?.shadowRoot
    //   ?.querySelector('ha-card')
    //   ?.shadowRoot
    //   ?.adoptedStyleSheets
    //   .push(sheet);
  }

  // protected updated(properties: PropertyValues): void {
  //   const card = this.entitiesCardRef.value;
  //   if (!card) {
  //     return;
  //   }

  //   if (properties.has('hass')) {
  //     card.hass = this.hass;
  //   }
  //   if (properties.has('key')) {
  //     card.setConfig({
  //       type: "entities",
  //       entities: [
  //         { entity: `input_select.${this.key}_thermostat_mode`, name: 'Mode' },
  //         { entity: `input_number.${this.key}_thermostat_eco_setpoint`, name: 'Eco' },
  //         { entity: `input_number.${this.key}_thermostat_comfort_setpoint`, name: 'Comfort' },
  //       ],
  //     });
  //   }
  // }
}
