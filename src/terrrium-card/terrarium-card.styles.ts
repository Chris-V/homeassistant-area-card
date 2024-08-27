import { css } from "lit";

export default css`
:host {
  --controls-count: 3;
}

.controls {
  display: grid;
  grid-template-columns: repeat(calc(3 * 4), 1fr);
  grid-auto-rows: 40px;
  gap: 4px;
}

.controls > div:first-child {
  grid-column: 3 / span 4;
}
.controls > div:nth-child(2) {
  grid-column: 7 / span 4;
}

.controls > div:nth-child(n + 3) {
  grid-row-start: 2;
  grid-column: span 4;
}
`;
