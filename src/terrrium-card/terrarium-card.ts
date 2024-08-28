import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { EntityStateIconConfig } from '../area-card-layout';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import styles from './terrarium-card.styles';

export interface TerrariumControlConfig extends EntityStateIconConfig {
  footer?: boolean;
  energy_entity?: string;
  power_entity?: string;
}

export interface TerrariumCardConfig extends LovelaceCardConfig {
  area: string;
  color?: string;
  controls?: TerrariumControlConfig[];
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

        <div class="controls count${Math.min(controls.length, 9)}">
          ${controls.map((control) => this.createControlTemplate(control))}
        </div>

        <div class="settings">
        </div>
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

  private formatEnergyStates(control: TerrariumControlConfig): string {
    const powerState = control.power_entity && this.hass?.states[control.power_entity];
    const energyState = control.energy_entity && this.hass?.states[control.energy_entity];

    return [
      powerState && this.hass?.formatEntityState(powerState),
      energyState && this.hass?.formatEntityState(energyState),
    ].filter(x => !!x).join(' ⁓ ');
  }
}
