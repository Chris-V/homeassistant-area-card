import { css } from "lit";

export default css`
.has-problems {
  --ha-card-border-color: var(--error-color);
  --ha-card-border-width: 2px;
}

.badges {
}

.control-panel {
  display: grid;
  gap: 4px;

  grid-template-columns: repeat(12, 1fr);

  --icon-size: 4.5em;
  --name-size: 1em;
  --state-size: 0.8em;
}

.control-panel.count7, .control-panel.count8 {
  grid-template-columns: repeat(16, 1fr);
}

.control-panel > * {
  display: block;

  grid-column-end: span 4;
  place-self: center;
}

.control-panel:is(.count5, .count7, .count9) > *:first-child {
  grid-column-start: 3;
}

.control-panel.count5 > *:nth-child(n + 3) {
  grid-row-start: 2;
}

.control-panel:is(.count6, .count7) > *:nth-child(n + 4) {
  grid-row-start: 2;
}

.control-panel.count8 > *:nth-child(n + 5) {
  grid-row-start: 2;
}

.settings-panel {
  --mdc-select-fill-color: transparent;
  --mdc-select-outlined-idle-border-color: transparent;
  --mdc-select-outlined-hover-border-color: transparent;
  --mdc-select-dropdown-icon-color: var(--mdc-theme-primary);
  --mdc-select-label-ink-color: var(--mdc-theme-primary);
  --mdc-select-ink-color: var(--mdc-theme-primary);
  --mdc-select-idle-line-color: var(--mdc-theme-primary);
  --mdc-select-hover-line-color: var(--mdc-theme-primary);

  --mdc-text-field-fill-color: transparent;
  --mdc-text-field-outlined-idle-border-color: transparent;
  --mdc-text-field-outlined-hover-border-color: transparent;
  --mdc-text-field-ink-color: var(--mdc-theme-primary);
  --mdc-text-field-label-ink-color: var(--mdc-theme-primary);
  --mdc-text-field-idle-line-color: var(--mdc-theme-primary);
  --mdc-text-field-hover-line-color: var(--mdc-theme-primary);
}
`;
