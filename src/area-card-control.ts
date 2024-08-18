import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { when } from "lit/directives/when";
import styles from './area-card-control.styles';
import { fireEvent } from "./events/events";
import { forwardHaptic } from "./events/haptic";
import { actionHandler, ActionHandlerEvent } from "./helpers/action-handler";
import { toggleEntity } from "./helpers/toggle-entity";
import { HomeAssistant } from "./types";

@customElement('area-card-control')
export class AreaCardControl extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() entity?: string;
  @property() icon?: string;
  @property() name?: string;
  @property() tag?: string;
  @property() tap_action?: 'toggle' | 'more-info';

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

    const title = this.name || state.attributes.friendly_name || this.entity;

    return html`
      <div
        class="root"
        @action=${this.handleAction}
        .actionHandler=${actionHandler()}
      >
        <state-badge
          tabindex="0"
          .hass=${this.hass}
          .stateObj=${state}
          .title=${title}
          .overrideIcon=${this.icon}
          .stateColor=${true}
        ></state-badge>

        ${when(this.tag, () => html`<ha-icon class="tag" .icon="${this.tag}"></ha-icon>`)}
      </div>
    `;
  }

  private handleAction(event: ActionHandlerEvent) {
    if (!this.entity || !this.hass) {
      return;
    }

    if (event.detail.action == 'tap' && !this.tap_action || this.tap_action == 'toggle') {
      toggleEntity(this.hass, this.entity);
      forwardHaptic('light');
    } else {
      fireEvent(this, "hass-more-info", { entityId: this.entity });
    }
  }
}
