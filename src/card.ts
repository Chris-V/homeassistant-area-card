import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { when } from 'lit/directives/when';
import styles from './card.styles';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig, } from './types';

const UNKNOWN_AREA_ICON = 'mdi:help-circle';
const UNKNOWN_AREA_NAME = 'Unknown';

interface AreaCardConfig extends LovelaceCardConfig {
  area: string;
}

@customElement('area-card')
export class AreaCard extends LitElement implements LovelaceCard {
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
        <div class="root">
          ${when(picture, () => html`<hui-image .hass=${this.hass} .image="${picture}"></ha-image>`)}

          <div class="wrapper">
            <div class="section header">
              <div class="title">
                <ha-icon .icon="${icon}"></ha-icon>
                ${name}
              </div>

              <div class="sensors">

              </div>
            </div>

            <div class="section content"></div>

            <div class="section footer"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
}
