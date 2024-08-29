import { HassEntity } from 'home-assistant-js-websocket';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
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
  @property({ attribute: false }) hass!: HomeAssistant;

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
    const problemsEntity = this.config.problems ? this.hass.states[this.config.problems] : undefined;
    const hasProblems = problemsEntity?.state == 'on';

    return html`
      <area-card-layout
        class=${classMap({ 'has-problems': hasProblems })}
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

        <div slot="controls" class="badges">
          ${when(hasProblems, () => html`
            <entity-state-icon
              slot="controls"
              icon="mdi:alert-circle"
              name="Problems"
              .hass=${this.hass}
              .entity=${this.config.problems}
            ></entity-state-icon>
          `)}
        </div>

        <div class="control-panel count${Math.min(controls.length, 9)}">
          ${controls.map((control) => this.createControlTemplate(control, problemsEntity))}
        </div>

        ${this.config.settings?.length ? html`
          <terrarium-settings-panel
            .hass=${this.hass}
            .entities=${this.config.settings}
          ></terrarium-settings-panel>
        ` : nothing}
      </area-card-layout>
    `;
  }

  private createControlTemplate(control: TerrariumControlConfig, problemsEntity?: HassEntity): TemplateResult {
    const powerState = control.power_entity && this.hass?.states[control.power_entity];
    const energyState = control.energy_entity && this.hass?.states[control.energy_entity];
    const stateLabel = [
      powerState && this.hass?.formatEntityState(powerState),
      energyState && this.hass?.formatEntityState(energyState),
    ].filter(x => !!x).join(' ⁓ ');

    const hasProblem = control.problem_key && problemsEntity && problemsEntity.attributes[control.problem_key] === true;

    return html`
      <entity-state-icon
        .hass=${this.hass}
        .entity=${control.entity}
        .icon=${control.icon}
        .tag=${hasProblem ? 'mdi:alert-circle' : control.tag || nothing}
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
