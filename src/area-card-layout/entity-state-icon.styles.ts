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

.root:has(.name) {
  --mdc-icon-size: calc(var(--icon-size, 24px) - var(--name-size, 0.8em) - 0.2em);
}

.root:has(.state) {
  --mdc-icon-size: calc(var(--icon-size, 24px) - var(--state-size, 0.8em) - 0.2em);
}

.root:has(.state):has(.name) {
  --mdc-icon-size: calc(var(--icon-size, 24px) - var(--name-size, 0.8em) - var(--state-size, 0.8em) - 0.2em);
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

.name {
  color: var(--primary-text-color);
  font-size: var(--name-size, 0.8em);
  white-space: nowrap;
  line-height: calc(var(--name-size, 0.8em) * 2);
}

.state {
  color: var(--primary-text-color);
  font-size: var(--state-size, 0.8em);
  white-space: nowrap;
  line-height: calc(var(--state-size, 0.8em) * 2);
}

.active .state {
  color: var(--state-active-color);
}

.name + .state, .active .name + .state {
  color: var(--secondary-text-color);
}
`;
