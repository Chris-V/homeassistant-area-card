import { css } from "lit";

export default css`
:host {
  cursor: pointer;
}

.root {
  position: relative;
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

  --mdc-icon-size: calc(var(--icon-size) / 2);
}

.active .tag {
  color: var(--state-active-color);
}
`;
