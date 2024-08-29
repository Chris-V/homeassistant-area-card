import { ActionConfig } from "../helpers/action-handler";


export interface EntityStateIconConfig {
  entity: string;
  icon?: string;
  tag?: string;
  name?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}
