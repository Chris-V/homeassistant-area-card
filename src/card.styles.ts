import { css } from "lit";

export default css`
ha-card {
  position: relative;

  overflow: hidden;

  --primary-text-color: #DADADB;
  --secondary-text-color: #DADADB;
  --paper-item-icon-color: #DADADB;

  --mdc-theme-primary: #DADADB;

  --mdc-select-fill-color: transparent;
  --mdc-select-outlined-idle-border-color: transparent;
  --mdc-select-outlined-hover-border-color: transparent;
  --mdc-select-dropdown-icon-color: #DADADB;
  --mdc-select-label-ink-color: #DADADB;
  --mdc-select-ink-color: #DADADB;
  --mdc-select-idle-line-color: #DADADB;
  --mdc-select-hover-line-color: #DADADB;

  --mdc-text-field-fill-color: transparent;
  --mdc-text-field-outlined-idle-border-color: transparent;
  --mdc-text-field-outlined-hover-border-color: transparent;
  --mdc-text-field-ink-color: #DADADB;
  --mdc-text-field-label-ink-color: #DADADB;
  --mdc-text-field-idle-line-color: #DADADB;
  --mdc-text-field-hover-line-color: #DADADB;
}

.root {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: stretch;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: hidden;

  color: var(--primary-text-color);

  --ha-card-background: rgba(0, 0, 0, 0);
  --ha-card-border-radius: 0;
  --ha-card-box-shadow: none;
}

.section {
  position: relative;
}

.header {
  order: 1;

  display: flex;
  align-items: center;
  padding: 5px;

  background-color: rgba(0, 96, 15, 0.9);
}

.header .title {
  font-size: 1.6em;
  font-weight: 500;

  --mdc-icon-size: 32px;
}

.header .sensors {
  height: 100%;
  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-size: 0.55em;

  --mdc-icon-size: 24px;
}

.footer {
  order: 3;
  height: unset;
  min-height: 1.75em;

  display: flex;
  align-items: baseline;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.55);

  --mdc-icon-size: 32px;
}

.content {
  order: 2;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  overflow: auto hidden;

  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  --mdc-icon-size: 24px;
}

.content ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.content ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.55);
}

.content ::-webkit-scrollbar-thumb {
  background: rgba(0, 96, 15, 0.55);
}

.content ::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 96, 15, 1);
}
`;
