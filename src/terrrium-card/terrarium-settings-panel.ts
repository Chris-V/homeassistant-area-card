import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { createRowElement } from "../helpers/lazy-load-elements";
import { HomeAssistant } from "../types";
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

  static styles = styles;

  set hass(hass: HomeAssistant) {
    this.#hass = hass;
  }

  protected render() {
    if (!this.#hass || !this.entities?.length) {
      return nothing;
    }

    return html`${this.entities.map((setting) => createRowElement(this.#hass!, setting))}`;
  }
}
