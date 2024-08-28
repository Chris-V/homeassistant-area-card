import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { EntityStateIconConfig } from '../area-card-layout';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import styles from './terrarium-card.styles';
import { until } from 'lit/directives/until';
import { when } from 'lit/directives/when';

export interface TerrariumControlConfig extends EntityStateIconConfig {
  footer?: boolean;
  energy_entity?: string;
  power_entity?: string;
  problem_key?: string;
}

export interface TerrariumCardConfig extends LovelaceCardConfig {
  area: string;
  color?: string;
  controls?: TerrariumControlConfig[];
  problems?: string;
  settings?: { entity: string, name?: string, icon?: string }[];
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

    const controls = this.config.controls || [];
    const footer = controls.filter((control) => control.footer);

    return html`
      <area-card-layout
        .hass=${this.hass}
        .areaId=${this.config.area}
        .color=${this.config.color}
        .header=${false}
      >
        ${footer.map((control) => html`
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

        <div class="control-panel count${Math.min(controls.length, 9)}">
          ${controls.map((control) => this.createControlTemplate(control))}
        </div>

        ${when(this.config.settings?.length, () => html`
          <div class="settings-panel">
            ${this.config.settings?.map((setting) => this.createSettingRowTemplate({ ...setting }))}
          </div>
        `)}
      </area-card-layout>
    `;
  }

  private createControlTemplate(control: TerrariumControlConfig): TemplateResult {
    const powerState = control.power_entity && this.hass?.states[control.power_entity];
    const energyState = control.energy_entity && this.hass?.states[control.energy_entity];
    const stateLabel = [
      powerState && this.hass?.formatEntityState(powerState),
      energyState && this.hass?.formatEntityState(energyState),
    ].filter(x => !!x).join(' ⁓ ');

    return html`
      <entity-state-icon
        .hass=${this.hass}
        .entity=${control.entity}
        .icon=${control.icon}
        .tag=${control.tag}
        .name=${control.name}
        .showName=${true}
        .showState=${!!stateLabel}
        .state=${stateLabel}
        .tap=${control.tap_action}
        .hold=${control.hold_action}
      ></entity-state-icon>
    `;
  }

  private createSettingRowTemplate(options: LovelaceCardOptions) {
    const rowPromise = window.loadCardHelpers().then(({ createRowElement }) => {
      const row = createRowElement(options);
      row.hass = this.hass;
      return html`<div class="setting-row">${row}</div>`;
    });
    return until(rowPromise, nothing);
  }
}
