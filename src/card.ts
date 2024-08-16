import { css, html, LitElement } from "lit";
import { state } from "lit/decorators/state";
import styles from './card.styles';

interface AreaCardConfig {
    area: string;
}

const UNKNOWN_AREA_ICON = 'mdi:help-circle';
const UNKNOWN_AREA_NAME = 'Unknown';

export class AreaCard extends LitElement {
  @state() private icon: string = UNKNOWN_AREA_ICON;
  @state() private name: string = UNKNOWN_AREA_NAME;

  #config: AreaCardConfig | null = null;
  #hass: any | null = null;

  static styles = styles;

  set hass(hass: object) {
    this.#hass = hass;
  }

  setConfig(config: AreaCardConfig) {
    if (!config.area) {
      throw new Error("You need to define an area.");
    }

    this.#config = config;

    const area = this.#hass.areas[this.#config.area];
    const icon = area?.icon || UNKNOWN_AREA_ICON;
    const name = area?.name || UNKNOWN_AREA_NAME;
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

  render() {
    return html`
      <ha-card>
        <div class="card-content">
          <ha-icon .icon="${this.icon}"></ha-icon>
          ${this.name}
        </div>
      </ha-card>
    `;
  }
}
