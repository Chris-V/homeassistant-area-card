import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { when } from 'lit/directives/when';
import styles from './area-card.styles';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, } from './types';
import { ActionConfig } from './helpers/action-handler';

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

export interface AreaCardConfig extends LovelaceCardConfig {
  area: string;
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

    return html`
      <ha-card>
        ${when(picture, () => html`<hui-image .hass=${this.hass} .image="${picture}"></hui-image>`)}

        <div class="root">
          <div class="section header">
            <div class="title">
              <ha-icon .icon="${icon}"></ha-icon>
              ${name}
            </div>

            <div class="sensors">
              ${this.config.badges?.map((badge) => html`
                <area-card-badge
                  .hass=${this.hass}
                  .entity=${badge.entity}
                  .icon=${badge.icon}
                  .name=${badge.name}
                  .tap-action=${badge.tap_action}
                  .hold-action=${badge.hold_action}
                ></area-card-badge>
              `)}
            </div>
          </div>

          <div class="section panels"></div>

          <div class="section footer">
            ${this.config.controls?.map((control) => html`
              <area-card-control
                .hass=${this.hass}
                .entity=${control.entity}
                .icon=${control.icon}
                .tag=${control.tag}
                .name=${control.name}
                .tap-action=${control.tap_action}
                .hold-action=${control.hold_action}
              ></area-card-control>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }
}
