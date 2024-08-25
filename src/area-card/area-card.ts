import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { styleMap } from 'lit/directives/style-map';
import { when } from 'lit/directives/when';
import { ActionConfig, handleAction } from '../helpers/action-handler';
import { actionHandler, ActionHandlerEvent } from '../helpers/action-handler-directive';
import { AreaRegistryEntry, HomeAssistant, LovelaceCard, LovelaceCardConfig, } from '../types';
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

const STUB_AREA: AreaRegistryEntry = {
  area_id: '',
  icon: 'mdi:help-circle',
  name: 'Unknown',
  created_at: 0,
  modified_at: 0,
};

@customElement('area-card')
export class AreaCard extends LitElement implements LovelaceCard<AreaCardConfig> {
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private config!: AreaCardConfig;
  private area: AreaRegistryEntry = STUB_AREA;

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

    this.area = this.hass.areas[this.config.area] || STUB_AREA;

    return html`
      <ha-card style=${styleMap({ '--area-accent-color': this.config?.color })}>
        ${when(this.area.picture, () => html`
          <hui-image .hass=${this.hass} .image=${this.area.picture} .aspectRatio=${"1.5:1"}></hui-image>
        `)}

        <div class="root">
          <div class="section header">
            <div class="title">
              ${this.iconTemplateResult()}
              ${this.area.name}
            </div>

            <div class="sensors">
              ${this.config.badges?.map((badge) => html`
                <area-badge
                  .hass=${this.hass}
                  .entity=${badge.entity}
                  .icon=${badge.icon}
                  .name=${badge.name}
                  .tap=${badge.tap_action}
                  .hold=${badge.hold_action}
                ></area-badge>
              `)}
            </div>
          </div>

          <div class="section panels">
            <div class="panel empty-panel"></div>
            ${this.config.climate ? html`
              <area-climate-panel
                class="panel"
                .hass=${this.hass}
                .key=${this.config.climate.room_key}
              ></area-climate-panel>` : nothing}
          </div>

          <div class="section footer">
            ${this.config.controls?.map((control) => html`
              <area-control
                .hass=${this.hass}
                .entity=${control.entity}
                .icon=${control.icon}
                .tag=${control.tag}
                .name=${control.name}
                .tap=${control.tap_action}
                .hold=${control.hold_action}
              ></area-control>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private iconTemplateResult(): TemplateResult {
    const state = this.config.entity ? this.hass.states[this.config.entity] : undefined;

    return when(
      this.config.entity,
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
      () => html`<ha-icon .icon="${this.area.icon}"></ha-icon>`
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
