import { css } from "lit";

export default css`
.controls {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
}

.controls > div:nth-child(n + 4) {
  grid-row-start: 2;
}
`;
