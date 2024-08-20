import { css } from "lit";

export default css`
:host {
  cursor: pointer;
}

.root {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;

  --mdc-icon-size: 24px;
}

.root.has-label {
  --mdc-icon-size: 18px;
}

.root.active {
  --primary-text-color: var(--paper-item-icon-active-color);
  --paper-item-icon-color: var(--paper-item-icon-active-color);
}

state-badge {
  width: unset;
  height: unset;
  line-height: unset;
}

.label {
  color: var(--primary-text-color);
  font-size: 0.8em;
  white-space: nowrap;
}
`;
