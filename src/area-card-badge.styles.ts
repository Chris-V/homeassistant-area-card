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

  font-size: 0.55em;

  --mdc-icon-size: 24px;
}

.label {
  white-space: nowrap;
}
`;
