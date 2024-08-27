import { css } from "lit";

export default css`
:host {
}

.controls {
  --column-count: round(up, var(--controls-count) / 2);

  display: grid;
  grid-template-columns: repeat(calc(var(--column-count) * 4), 1fr);
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
