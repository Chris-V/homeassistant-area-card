import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { styleMap } from 'lit/directives/style-map';
import { when } from 'lit/directives/when';
import { AreaRegistryEntry, HomeAssistant, LovelaceCard, LovelaceCardConfig, } from '../types';
import styles from './terrarium-card.styles';

const STUB_AREA: AreaRegistryEntry = {
  area_id: '',
  icon: 'mdi:help-circle',
  name: 'Unknown',
  created_at: 0,
  modified_at: 0,
};

export interface TerrariumCardConfig extends LovelaceCardConfig {
  area: string;
  color?: string;
}

@customElement('terrarium-card')
export class TerrariumCard extends LitElement implements LovelaceCard<TerrariumCardConfig> {
  @property({ attribute: false }) hass!: HomeAssistant

  @state() private config!: TerrariumCardConfig;

  static styles = styles;

  setConfig(config: TerrariumCardConfig): void {
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
        .header=${false}
      >
      </area-card-layout>
    `;
  }
}
