import { css } from "lit";

export default css`
:host {
  --mdc-select-fill-color: transparent;
  --mdc-select-outlined-idle-border-color: transparent;
  --mdc-select-outlined-hover-border-color: transparent;
  --mdc-select-dropdown-icon-color: #DADADB;
  --mdc-select-label-ink-color: #DADADB;
  --mdc-select-ink-color: #DADADB;
  --mdc-select-idle-line-color: #DADADB;
  --mdc-select-hover-line-color: #DADADB;

  --mdc-text-field-fill-color: transparent;
  --mdc-text-field-outlined-idle-border-color: transparent;
  --mdc-text-field-outlined-hover-border-color: transparent;
  --mdc-text-field-ink-color: #DADADB;
  --mdc-text-field-label-ink-color: #DADADB;
  --mdc-text-field-idle-line-color: #DADADB;
  --mdc-text-field-hover-line-color: #DADADB;
}

.root {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.settings {
  grid-area: 1 / 1 / 2 / 2;
}

.thermostat {
  grid-area: 1 / 2 / 2 / 3;
}
`;
