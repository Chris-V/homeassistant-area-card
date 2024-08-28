import { css } from "lit";

export default css`
:host {
  cursor: pointer;
}

.root {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;

  --mdc-icon-size: var(--icon-size, 24px);
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

.tag {
  position: absolute;
  right: -4px;
  top: -6px;

  margin: 0px;

  --mdc-icon-size: calc(var(--icon-size, 24px) / 2);
}

.active .tag {
  color: var(--state-active-color);
}

.name {
  color: var(--primary-text-color);
  font-size: var(--name-size, 0.8em);
  white-space: nowrap;
  line-height: calc(var(--name-size, 0.8em) * 2);
}

.state {
  color: var(--secondary-text-color);
  font-size: var(--state-size, 0.8em);
  white-space: nowrap;
  line-height: calc(var(--state-size, 0.8em) * 2);
}

:not(.has-name) .state {
  color: var(--primary-text-color);
}
`;
