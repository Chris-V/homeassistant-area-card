import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';
import { StyleInfo, styleMap } from 'lit/directives/style-map';
import { when } from 'lit/directives/when';
import { handleAction } from '../helpers/action-handler';
import { actionHandler, ActionHandlerEvent } from '../helpers/action-handler-directive';
import { AreaRegistryEntry, HomeAssistant } from '../types';
import styles from './area-card-layout.styles';

const STUB_AREA: AreaRegistryEntry = {
  area_id: '',
  icon: 'mdi:help-circle',
  name: 'Unknown',
  created_at: 0,
  modified_at: 0,
};

@customElement('area-card-layout')
export class AreaCardLayout extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() areaId?: string;
  @property() color?: string;
  @property() entity?: string;
  @property() header?: boolean;

  private area: AreaRegistryEntry = STUB_AREA;

  static styles = styles;

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    this.area = this.areaId && this.hass.areas[this.areaId] || STUB_AREA;

    let cardStyles: StyleInfo = { '--area-accent-color': this?.color };
    if (this.area.picture) {
      cardStyles = {
        ...cardStyles,
        'background-image': `url(${this.area.picture})`,
      };
    }

    return html`
      <ha-card style=${styleMap(cardStyles)}>
        <div class="root">
          ${when(this.header ?? true, () => html`
            <div class="section header">
              <div class="title">
                ${this.iconTemplateResult()}
                ${this.area.name}
              </div>

              <div class="badges">
                <slot name="badges"></slot>
              </div>
            </div>
          `)}

          <div class="section panels">
            <div class="panel empty-panel"></div>
            <slot></slot>
          </div>

          <div class="section footer">
            <slot name="controls"></slot>
          </div>
        </div>
      </ha-card>
    `;
  }

  private iconTemplateResult(): TemplateResult {
    const state = this.entity ? this.hass.states[this.entity] : undefined;

    return when(
      this.entity,
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
      { tap_action: { action: 'more-info', entity: this?.entity } },
      event.detail.action,
    );
  }
}
