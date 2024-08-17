import { HomeAssistant } from "./homeassistant";

export type Condition =
  | NumericStateCondition
  | StateCondition
  | ScreenCondition
  | UserCondition
  | OrCondition
  | AndCondition;

interface BaseCondition {
  condition: string;
}

export interface NumericStateCondition extends BaseCondition {
  condition: "numeric_state";
  entity?: string;
  below?: string | number;
  above?: string | number;
}

export interface StateCondition extends BaseCondition {
  condition: "state";
  entity?: string;
  state?: string | string[];
  state_not?: string | string[];
}

export interface ScreenCondition extends BaseCondition {
  condition: "screen";
  media_query?: string;
}

export interface UserCondition extends BaseCondition {
  condition: "user";
  users?: string[];
}

export interface OrCondition extends BaseCondition {
  condition: "or";
  conditions?: Condition[];
}

export interface AndCondition extends BaseCondition {
  condition: "and";
  conditions?: Condition[];
}

export type LovelaceLayoutOptions = {
  grid_columns?: number;
  grid_rows?: number | "auto";
  grid_max_columns?: number;
  grid_min_columns?: number;
  grid_min_rows?: number;
  grid_max_rows?: number;
};

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: any;
  layout_options?: LovelaceLayoutOptions;
  type: string;
  [key: string]: any;
  visibility?: Condition[];
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  layout?: string;
  getCardSize(): number | Promise<number>;
  getLayoutOptions?(): LovelaceLayoutOptions;
  setConfig(config: LovelaceCardConfig): void;
}
