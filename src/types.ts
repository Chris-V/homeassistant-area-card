import { HassConfig, HassEntities, HassEntity, HassServices } from "home-assistant-js-websocket";

export interface RegistryEntry {
  created_at: number;
  modified_at: number;
}

export interface AreaRegistryEntry extends RegistryEntry {
  area_id: string;
  floor_id: string | null;
  name: string;
  picture: string | null;
  icon: string | null;
  labels: string[];
  aliases: string[];
}

export interface DeviceRegistryEntry extends RegistryEntry {
  id: string;
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string | null;
  model: string | null;
  model_id: string | null;
  name: string | null;
  labels: string[];
  sw_version: string | null;
  hw_version: string | null;
  serial_number: string | null;
  via_device_id: string | null;
  area_id: string | null;
  name_by_user: string | null;
  entry_type: "service" | null;
  disabled_by: "user" | "integration" | "config_entry" | null;
  configuration_url: string | null;
}

type EntityCategory = "config" | "diagnostic";

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string;
  icon?: string;
  device_id?: string;
  area_id?: string;
  labels: string[];
  hidden?: boolean;
  entity_category?: EntityCategory;
  translation_key?: string;
  platform?: string;
  display_precision?: number;
}

export interface HomeAssistant {
  states: HassEntities;
  entities: { [id: string]: EntityRegistryDisplayEntry };
  devices: { [id: string]: DeviceRegistryEntry };
  areas: { [id: string]: AreaRegistryEntry };
  services: HassServices;
  config: HassConfig;

  formatEntityState(state: HassEntity): string;
}

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

export interface LovelaceElement<C> extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: C): void;
}

export interface LovelaceCard<C extends LovelaceCardConfig> extends LovelaceElement<C> {
  preview?: boolean;
  layout?: string;
  getCardSize(): number | Promise<number>;
  getLayoutOptions?(): LovelaceLayoutOptions;
}
