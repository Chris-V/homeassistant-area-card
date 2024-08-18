import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { ref } from "lit/directives/ref";
import { when } from "lit/directives/when";
import styles from './area-card-badge.styles';
import { HomeAssistant } from "./types";

@customElement('area-card-badge')
export class AreaCardBadge extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() entity?: string;
  @property() icon?: string;
  @property() name?: string;

  static styles = styles;

  protected render() {
    if (!this.entity) {
      return nothing;
    }

    const showLabel = !this.entity.startsWith('binary_sensor.');
    const iconConfig = {
      entity: this.entity,
      icon: this.icon,
      title: this.name,
      tap_action: { action: 'more-info' },
    };
    const labelConfig = {
      entity: this.entity,
      title: this.name,
      tap_action: { action: 'more-info' },
    };

    return html`
      <div class="root">
        <hui-state-icon-element
          .hass=${this.hass}
          ${ref((element?: any) => element?.setConfig(iconConfig))}
        ></hui-state-icon-element>

        ${when(showLabel, () => html`
          <hui-state-label-element
            .hass=${this.hass}
            ${ref((element?: any) => element?.setConfig(labelConfig))}
          ></hui-state-label-element>
        `)}
      </div>
    `;
  }
}
