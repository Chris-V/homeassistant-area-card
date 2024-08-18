import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { when } from 'lit/directives/when';
import styles from './area-card.styles';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, } from './types';
import { ActionConfig, createDefaultAction, handleAction } from './helpers/action-handler';
import { actionHandler, ActionHandlerEvent } from './helpers/action-handler-directive';
import { HassEntity } from 'home-assistant-js-websocket';

const UNKNOWN_AREA_ICON = 'mdi:help-circle';
const UNKNOWN_AREA_NAME = 'Unknown';

export interface AreaCardBadgeConfig {
  entity: string;
  icon?: string;
  name?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface AreaCardControlConfig {
  entity: string;
  icon?: string;
  tag?: string;
  name?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface AreaCardClimateConfig {
  room_key: string;
}

export interface AreaCardConfig extends LovelaceCardConfig {
  area: string;
  climate?: AreaCardClimateConfig;
  color?: string;
  entity?: string;
  badges?: AreaCardBadgeConfig[];
  controls?: AreaCardControlConfig[];
}

@customElement('area-card')
export class AreaCard extends LitElement implements LovelaceCard<AreaCardConfig> {
  @property({ attribute: false }) hass?: HomeAssistant

  @state() private config?: AreaCardConfig;

  static styles = styles;

  setConfig(config: AreaCardConfig): void {
    if (!config.area) {
      throw new Error('Area required');
    }

    this.config = config;
  }

  getCardSize(): number {
    return 6;
  }

  getLayoutOptions() {
    return {
      grid_rows: 6,
      grid_columns: 5,
      grid_min_rows: 6,
      grid_max_rows: 6,
    };
  }

  protected render() {
    if (!this.config || !this.hass) {
      return nothing;
    }

    const area = this.hass.areas[this.config.area];
    const icon = area?.icon || UNKNOWN_AREA_ICON;
    const name = area?.name || UNKNOWN_AREA_NAME;
    const picture = area?.picture || null;
    const state = this.config.entity ? this.hass.states[this.config.entity] : undefined;

    return html`
      <ha-card>
        ${when(picture, () => html`<hui-image .hass=${this.hass} .image="${picture}"></hui-image>`)}

        <div class="root">
          <div class="section header">
            <div class="title">
              ${this.iconTemplateResult(state, icon)}
              ${name}
            </div>

            <div class="sensors">
              ${this.config.badges?.map((badge) => html`
                <area-card-badge
                  .hass=${this.hass}
                  .entity=${badge.entity}
                  .icon=${badge.icon}
                  .name=${badge.name}
                  .tap=${badge.tap_action}
                  .hold=${badge.hold_action}
                ></area-card-badge>
              `)}
            </div>
          </div>

          <div class="section panels">
            <div class="panel empty-panel"></div>
            ${this.config.climate ? html`
              <area-card-climate-panel
                class="panel"
                .key=${this.config.climate.room_key}
              ></area-card-climate-panel>` : nothing}
          </div>

          <div class="section footer">
            ${this.config.controls?.map((control) => html`
              <area-card-control
                .hass=${this.hass}
                .entity=${control.entity}
                .icon=${control.icon}
                .tag=${control.tag}
                .name=${control.name}
                .tap=${control.tap_action}
                .hold=${control.hold_action}
              ></area-card-control>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private iconTemplateResult(state: HassEntity | undefined, icon: string): TemplateResult {
    return when(
      this.config?.entity,
      () => state ? html`
        <state-badge
          tabindex="0"
          title=${state?.state}
          .hass=${this.hass}
          .stateObj=${state}
          .stateColor=${false}
          @action=${this.handleIconAction}
          .actionHandler=${actionHandler()}
        ></state-badge>
      ` : html`<hui-warning-element></hui-warning-element>`,
      () => html`<ha-icon .icon="${icon}"></ha-icon>`
    );
  }

  private handleIconAction(event: ActionHandlerEvent) {
    if (!this.hass) {
      return;
    }

    handleAction(
      this,
      this.hass,
      { tap_action: { action: 'more-info', entity: this.config?.entity } },
      event.detail.action,
    );
  }
}
