import { html, LitElement, nothing } from "lit";
import { HomeAssistant, LovelaceCardConfig, LovelaceElement } from "./types";
import { customElement, property, state } from "lit/decorators";
import { ref } from "lit/directives/ref";


@customElement('area-card-badge')
export class AreaCardBadge extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() entity?: string;
  @property() icon?: string;
  @property() name?: string;

  protected render() {
    if (!this.entity) {
      return nothing;
    }

    const iconConfig = {
      entity: this.entity,
      icon: this.icon,
      title: this.name,
      tap_action: { action: 'more-info' },
    };

    return html`<hui-state-icon-element
      .hass=${this.hass}
      ${ref((element?: any) => element?.setConfig(iconConfig))}
    ></hui-state-icon-element>`;
  }
}
