import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { ref } from "lit/directives/ref";
import { when } from "lit/directives/when";
import styles from './area-card-badge.styles';
import { HomeAssistant } from "./types";
import { fireEvent } from "./helpers/events";
import { actionHandler, ActionHandlerEvent } from "./helpers/action-handler";

@customElement('area-card-badge')
export class AreaCardBadge extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() entity?: string;
  @property() icon?: string;
  @property() name?: string;

  static styles = styles;

  protected render() {
    if (!this.entity || !this.hass) {
      return nothing;
    }

    const hass = this.hass;
    const state = hass.states[this.entity];

    if (!state) {
      return html`<hui-warning-element></hui-warning-element>`;
    }

    const showLabel = !this.entity.startsWith('binary_sensor.');
    const title = this.name || state.attributes.friendly_name || this.entity;
    const iconConfig = {
      title,
      entity: this.entity,
      icon: this.icon,
      tap_action: { action: 'more-info' },
    };

    return html`
      <div class="root">
        <hui-state-icon-element
          .hass=${hass}
          ${ref((element?: any) => element?.setConfig(iconConfig))}
        ></hui-state-icon-element>

        ${when(showLabel, () => html`
          <div
            .title=${title}
            @action=${this.handleAction}
            .actionHandler=${actionHandler({hasHold: false, hasDoubleClick: false})}
            class="label"
            tabindex="0"
          >
            ${this.hass?.formatEntityState(state)}
          </div>
          <hui-state-label-element
            .hass=${this.hass}
            ${ref((element?: any) => element?.setConfig(iconConfig))}
          ></hui-state-label-element>
        `)}
      </div>
    `;
  }

  private handleAction(event: ActionHandlerEvent) {
    fireEvent(this, "hass-more-info", {entityId: this.entity});
  }
}
