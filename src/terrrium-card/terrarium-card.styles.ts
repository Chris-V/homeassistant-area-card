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

.controls > div {
  grid-column-end: span 4;
}

.controls > div:first-child {
  grid-column-start: 3;
}

.controls > div:nth-child(n + 3) {
  grid-row-start: 2;
}
`;
