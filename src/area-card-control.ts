import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { when } from "lit/directives/when";
import styles from './area-card-control.styles';
import { ActionConfig, buildDefaultAction, handleAction } from "./helpers/action-handler";
import { actionHandler, ActionHandlerEvent } from "./helpers/action-handler-directive";
import { HomeAssistant } from "./types";

@customElement('area-card-control')
export class AreaCardControl extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property() entity?: string;
  @property() icon?: string;
  @property() name?: string;
  @property() tag?: string;
  @property({ attribute: 'tap-action' }) tapAction?: ActionConfig;
  @property({ attribute: 'hold-action' }) holdAction?: ActionConfig;

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
        tabindex=${this.tapAction?.action === 'none' ? 0 : nothing}
        .title=${title}
        @action=${this.handleAction}
        .actionHandler=${actionHandler({ hasHold: this.holdAction?.action !== 'none' })}
      >
        <state-badge
          .hass=${this.hass}
          .stateObj=${state}
          .overrideIcon=${this.icon}
          .stateColor=${true}
        ></state-badge>

        ${when(this.tag, () => html`<ha-icon class="tag" .icon="${this.tag}"></ha-icon>`)}
      </div>
    `;
  }

  private handleAction(event: ActionHandlerEvent) {
    if (!this.hass) {
      return;
    }

    const tap_action = buildDefaultAction('toggle', this.entity, this.tapAction);
    const hold_action = buildDefaultAction('more-info', this.entity, this.holdAction);

    handleAction(this, this.hass, { tap_action, hold_action }, event.detail.action);
  }
}
