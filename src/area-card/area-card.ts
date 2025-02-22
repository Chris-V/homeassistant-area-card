import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { EntityStateIconConfig } from '../area-card-layout';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import styles from './area-card.styles';

export interface AreaCardClimateConfig {
  room_key: string;
}

export interface AreaCardConfig extends LovelaceCardConfig {
  area: string;
  climate?: AreaCardClimateConfig;
  color?: string;
  entity?: string;
  badges?: EntityStateIconConfig[];
  controls?: EntityStateIconConfig[];
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
    return 4;
  }

  getLayoutOptions() {
    return {
      grid_columns: 4,
      grid_min_columns: 4,
      grid_rows: 4,
      grid_min_rows: 4,
    };
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
          <entity-state-icon
            slot="badges"
            .hass=${this.hass}
            .entity=${badge.entity}
            .icon=${badge.icon}
            .tag=${badge.tag}
            .name=${badge.name}
            .tap=${badge.tap_action}
            .hold=${badge.hold_action}
          ></entity-state-icon>
        `)}

        ${this.config.controls?.map((control) => html`
          <entity-state-icon
            slot="controls"
            .hass=${this.hass}
            .entity=${control.entity}
            .icon=${control.icon}
            .tag=${control.tag}
            .name=${control.name}
            .tap=${control.tap_action}
            .hold=${control.hold_action}
          ></entity-state-icon>
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
