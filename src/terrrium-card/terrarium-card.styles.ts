import { css } from "lit";

export default css`
:host {
}

.controls {
  display: grid;
  gap: 4px;
}

.controls.count5, .controls.count6 {
  grid-template-columns: repeat(12, 1fr);
}

.controls.count7, .controls.count8 {
  grid-template-columns: repeat(16, 1fr);
}

.controls.count9, .controls.count10 {
  grid-template-columns: repeat(20, 1fr);
}

.controls > div {
  grid-column-end: span 4;
}

.controls:is(.count5, .count7, .count9) > div:first-child {
  grid-column-start: 3;
}

.controls.count5 > div:nth-child(n + 3) {
  grid-row-start: 2;
}

.controls:is(.count6, .count7) > div:nth-child(n + 4) {
  grid-row-start: 2;
}

.controls:is(.count8, .count9) > div:nth-child(n + 5) {
  grid-row-start: 2;
}

.controls.count10 > div:nth-child(n + 6) {
  grid-row-start: 2;
}
`;
