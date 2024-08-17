import { html, LitElement } from 'lit';
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

  @state() private icon: string = UNKNOWN_AREA_ICON;
  @state() private name: string = UNKNOWN_AREA_NAME;
  @state() private picture: string | null = null;

  #config: AreaCardConfig | null = null;

  static styles = styles;

  setConfig(config: AreaCardConfig) {
    if (!config.area) {
      throw new Error("You need to define an area.");
    }

    this.#config = config;
    this.refreshState();
  }

  private refreshState(): void {
    if (!this.#config || !this.hass) {
      return;
    }

    const area = this.hass.areas[this.#config.area];
    this.icon = area?.icon || UNKNOWN_AREA_ICON;
    this.name = area?.name || UNKNOWN_AREA_NAME;
    this.picture = area?.picture || null;
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
    return html`
      <ha-card>
        <div class="card-content">
          <ha-icon .icon="${this.icon}"></ha-icon>
          ${this.name}

          ${when(this.picture, () => html`<hui-image .hass=${this.hass} .image="${this.picture}"></ha-icon>`)}
        </div>
      </ha-card>
    `;
  }
}
