import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { when } from 'lit/directives/when';
import { EntityStateIconConfig } from '../area-card-layout';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import styles from './terrarium-card.styles';
import { TerrariumSettingConfig } from './terrarium-settings-panel';

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
  settings?: TerrariumSettingConfig[];
}

@customElement('terrarium-card')
export class TerrariumCard extends LitElement implements LovelaceCard<TerrariumCardConfig> {
  @state() _hass?: HomeAssistant
  @state() private config!: TerrariumCardConfig;

  static styles = styles;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

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
    if (!this.config || !this._hass) {
      return nothing;
    }

    const controls = this.config.controls || [];
    const footer = controls.filter((control) => control.footer);
    const problemsEntity = this.config.problems ? this._hass.states[this.config.problems] : undefined;
    const hasProblems = problemsEntity?.state == 'on';

    return html`
      <area-card-layout
        class=${classMap({ 'has-problems': hasProblems })}
        .hass=${this._hass}
        .areaId=${this.config.area}
        .color=${this.config.color}
        .header=${false}
      >
        ${footer.map((control) => html`
          <entity-state-icon
            slot="controls"
            .hass=${this._hass}
            .entity=${control.entity}
            .icon=${control.icon}
            .tag=${control.tag}
            .name=${control.name}
            .tap=${control.tap_action}
            .hold=${control.hold_action}
          ></entity-state-icon>
        `)}

        <div slot="controls" class="badges">
          ${when(hasProblems, () => html`
            <entity-state-icon
              slot="controls"
              icon="mdi:alert-circle"
              name="Problems"
              .hass=${this._hass}
              .entity=${this.config.problems}
            ></entity-state-icon>
          `)}
        </div>

        <div class="control-panel count${Math.min(controls.length, 9)}">
          ${controls.map((control) => this.createControlTemplate(control))}
        </div>

        ${this.config.settings?.length ? html`
          <terrarium-settings-panel
            .hass=${this._hass}
            .entities=${this.config.settings}
          >
          </terrarium-settings-panel>
        ` : nothing}
      </area-card-layout>
    `;
  }

  private createControlTemplate(control: TerrariumControlConfig): TemplateResult {
    const powerState = control.power_entity && this._hass?.states[control.power_entity];
    const energyState = control.energy_entity && this._hass?.states[control.energy_entity];
    const stateLabel = [
      powerState && this._hass?.formatEntityState(powerState),
      energyState && this._hass?.formatEntityState(energyState),
    ].filter(x => !!x).join(' ⁓ ');

    return html`
      <entity-state-icon
        .hass=${this._hass}
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
}
