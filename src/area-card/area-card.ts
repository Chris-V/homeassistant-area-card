import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { ActionConfig } from '../helpers/action-handler';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import styles from './area-card.styles';

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
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private config!: AreaCardConfig;

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

  protected render() {
    if (!this.config || !this.hass) {
      return nothing;
    }

    return html`
      <area-card-layout
        .hass=${this.hass}
        .areaId=${this.config.area}
        .color=${this.config.color}
        .entity=${this.config.entity}
      >
        ${this.config.badges?.map((badge) => html`
          <area-badge
            slot="badges"
            .hass=${this.hass}
            .entity=${badge.entity}
            .icon=${badge.icon}
            .name=${badge.name}
            .tap=${badge.tap_action}
            .hold=${badge.hold_action}
          ></area-badge>
        `)}

        ${this.config.controls?.map((control) => html`
          <area-control
            slot="controls"
            .hass=${this.hass}
            .entity=${control.entity}
            .icon=${control.icon}
            .tag=${control.tag}
            .name=${control.name}
            .tap=${control.tap_action}
            .hold=${control.hold_action}
          ></area-control>
        `)}

        ${this.config.climate ? html`
          <area-climate-panel
            .hass=${this.hass}
            .key=${this.config.climate.room_key}
          ></area-climate-panel>` : nothing}
      </area-card-layout>
    `;
  }
}
