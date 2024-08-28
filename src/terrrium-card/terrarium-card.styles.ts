import { css } from "lit";

export default css`
:host {
}

.controls {
  display: grid;
  gap: 4px;

  --icon-size: 70px;
  --name-size: 14px;
  --label-size: 14px;
}

.controls.count5, .controls.count6 {
  grid-template-columns: repeat(12, 1fr);
}

.controls.count7, .controls.count8 {
  grid-template-columns: repeat(16, 1fr);
}

.controls > * {
  display: block;

  grid-column-end: span 4;
}

.controls:is(.count5, .count7, .count9) > *:first-child {
  grid-column-start: 3;
}

.controls.count5 > *:nth-child(n + 3) {
  grid-row-start: 2;
}

.controls:is(.count6, .count7) > *:nth-child(n + 4) {
  grid-row-start: 2;
}

.controls.count8 > *:nth-child(n + 5) {
  grid-row-start: 2;
}
`;
