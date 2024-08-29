import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { createRowElement } from "../helpers/lazy-load-elements";
import { HomeAssistant, LovelaceElement } from "../types";
import styles from './terrarium-settings-panel.styles';

export interface TerrariumSettingConfig {
  entity: string;
  name?: string;
  icon?: string;
}

@customElement('terrarium-settings-panel')
export class AreaClimatePanel extends LitElement {
  @property({ attribute: false }) entities?: TerrariumSettingConfig[];

  #hass?: HomeAssistant;

  set hass(hass: HomeAssistant) {
    this.#hass = hass;

    this.shadowRoot
      ?.querySelectorAll(":host > *")
      ?.forEach((element: unknown) => {
        (element as LovelaceElement<any>).hass = hass;
      });
  }

  static styles = styles;

  protected render() {
    if (!this.#hass || !this.entities?.length) {
      return nothing;
    }

    return html`
      ${this.entities.map((setting) => createRowElement(this.#hass!, setting))}
    `;
  }
}
