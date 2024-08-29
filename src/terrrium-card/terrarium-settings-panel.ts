import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { repeat } from "lit/directives/repeat";
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
  @property({ attribute: false }) hass?: HomeAssistant;

  static styles = styles;

  protected render() {
    if (!this.hass || !this.entities?.length) {
      return nothing;
    }

    html`
      ${repeat(this.entities, (entity) => entity.entity, (entity) => html`
        ${createRowElement(this.hass!, entity)}
      `)}
    `;
  }
}
