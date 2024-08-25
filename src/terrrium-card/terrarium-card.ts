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
  private area: AreaRegistryEntry = STUB_AREA;

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

    this.area = this.hass.areas[this.config.area] || STUB_AREA;

    return html`
      <ha-card style=${styleMap({ '--area-accent-color': this.config?.color })}>
        ${when(this.area.picture, () => html`
          <hui-image .hass=${this.hass} .image=${this.area.picture} .aspectRatio=${"1.5:1"}></hui-image>
        `)}

        <div class="root">
          <div class="section panels">
            <div class="panel empty-panel"></div>
            <div class="panel"></div>
            <div class="panel"></div>
          </div>

          <div class="section footer">
          </div>
        </div>
      </ha-card>
    `;
  }
}
