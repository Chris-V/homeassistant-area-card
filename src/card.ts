import { css, html, LitElement } from "lit";
import { state } from "lit/decorators/state";

interface AreaCardConfig {
    area: string;
}

export class AreaCard extends LitElement {
  @state() private config: AreaCardConfig | null = null;

  private hass: object | null = null;

  static styles = css``;

  setConfig(config: AreaCardConfig) {
    this.config = config;
  }

  set hass(hass: object) {
    this.hass = hass;
  }

  render() {
    return html`
      <ha-card>
        <div class="card-content">HI</div>
      </ha-card>
    `;
  }
}
