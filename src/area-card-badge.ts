import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { when } from "lit/directives/when";
import { classMap } from "lit/directives/class-map";
import styles from './area-card-badge.styles';
import { actionHandler, ActionHandlerEvent } from "./helpers/action-handler";
import { fireEvent } from "./events/events";
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
        class=${classMap({ root: true, active: state.attributes['heating'] === true })}
        tabindex="0"
        .title=${title}
        @action=${this.handleAction}
        .actionHandler=${actionHandler()}
      >
        <state-badge
          class="icon"
          .hass=${this.hass}
          .stateObj=${state}
          .overrideIcon=${this.icon}
          .stateColor=${true}
        ></state-badge>

        ${when(showLabel, () => html`
          <div class="label">
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
