import { css } from "lit";

export default css`
:host {
  --mdc-select-fill-color: transparent;
  --mdc-select-outlined-idle-border-color: transparent;
  --mdc-select-outlined-hover-border-color: transparent;
  --mdc-select-dropdown-icon-color: var(--primary-text-color);
  --mdc-select-label-ink-color: var(--primary-text-color);
  --mdc-select-ink-color: var(--primary-text-color);
  --mdc-select-idle-line-color: var(--primary-text-color);
  --mdc-select-hover-line-color: var(--primary-text-color);

  --mdc-text-field-fill-color: transparent;
  --mdc-text-field-outlined-idle-border-color: transparent;
  --mdc-text-field-outlined-hover-border-color: transparent;
  --mdc-text-field-ink-color: var(--primary-text-color);
  --mdc-text-field-label-ink-color: var(--primary-text-color);
  --mdc-text-field-idle-line-color: var(--primary-text-color);
  --mdc-text-field-hover-line-color: var(--primary-text-color);

  --ha-card-border-width: 0;
  --ha-card-box-shadow: none;
}

.root {
  height: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-column-gap: 5px;
  grid-row-gap: 0px;
}

.settings {
  grid-area: 1 / 1 / 2 / 2;

  --ha-textfield-input-width: 3em;
}

.setting-row + .setting-row {
  margin-top: -5px;
}

.thermostat {
  grid-area: 1 / 2 / 2 / 3;
}
`;
