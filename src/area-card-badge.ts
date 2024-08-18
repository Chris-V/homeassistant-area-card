import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { when } from "lit/directives/when";
import styles from './area-card-badge.styles';
import { actionHandler, ActionHandlerEvent } from "./helpers/action-handler";
import { fireEvent } from "./helpers/events";
import { HomeAssistant } from "./types";

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

    return html`
      <div
        class="root"
        @action=${this.handleAction}
        .actionHandler=${actionHandler()}
      >
        <state-badge
          class="icon"
          tabindex="0"
          .hass=${this.hass}
          .stateObj=${state}
          .title=${title}
          .overrideIcon=${this.icon}
          .stateColor=${true}
        ></state-badge>

        ${when(showLabel, () => html`
          <div
            class="label"
            tabindex="0"
            .title=${title}
          >
            ${this.hass?.formatEntityState(state)}
          </div>
        `)}
      </div>
    `;
  }

  private handleAction(event: ActionHandlerEvent) {
    fireEvent(this, "hass-more-info", { entityId: this.entity });
  }
}
