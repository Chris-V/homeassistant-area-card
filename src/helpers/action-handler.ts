import { HassServiceTarget } from "home-assistant-js-websocket";
import { HomeAssistant } from "../types";
import { fireEvent } from "../events/events";
import { forwardHaptic } from "../events/haptic";
import { toggleEntity } from "./toggle-entity";
import { showToast } from "../events/toast";
import { navigate } from "./navigate";
import { ActionHandlerDetail } from "./action-handler-directive";

export interface BaseActionConfig {
  action: string;
}

export interface ToggleActionConfig extends BaseActionConfig {
  action: "toggle";
  entity?: string;
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: "perform-action";
  perform_action: string;
  target?: HassServiceTarget;
  data?: Record<string, unknown>;
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: "navigate";
  navigation_path: string;
  navigation_replace?: boolean;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: "url";
  url_path: string;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: "more-info";
  entity?: string;
}

export interface NoActionConfig extends BaseActionConfig {
  action: "none";
}

export type ActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | NoActionConfig;

export type ActionConfigParams = {
  hold_action?: ActionConfig;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
};

export async function handleAction(
  node: HTMLElement,
  hass: HomeAssistant,
  config: ActionConfigParams,
  action: ActionHandlerDetail['action'],
): Promise<void> {
  let actionConfig: ActionConfig = { action: "none" };

  if (action === "double_tap" && config.double_tap_action) {
    actionConfig = config.double_tap_action;
  } else if (action === "hold" && config.hold_action) {
    actionConfig = config.hold_action;
  } else if (action === "tap" && config.tap_action) {
    actionConfig = config.tap_action;
  }

  switch (actionConfig.action) {
    case "more-info":
      if (actionConfig.entity) {
        fireEvent(node, "hass-more-info", { entityId: actionConfig.entity });
      } else {
        showToast(node, {
          message: hass.localize(
            "ui.panel.lovelace.cards.actions.no_entity_more_info"
          ),
        });
        forwardHaptic("failure");
      }
      break;

    case "navigate":
      if (actionConfig.navigation_path) {
        navigate(actionConfig.navigation_path, { replace: actionConfig.navigation_replace });
      } else {
        showToast(node, {
          message: hass.localize(
            "ui.panel.lovelace.cards.actions.no_navigation_path"
          ),
        });
        forwardHaptic("failure");
      }
      break;

    case "url":
      if (actionConfig.url_path) {
        window.open(actionConfig.url_path);
      } else {
        showToast(node, {
          message: hass.localize("ui.panel.lovelace.cards.actions.no_url"),
        });
        forwardHaptic("failure");
      }
      break;

    case "toggle":
      if (actionConfig.entity) {
        toggleEntity(hass, actionConfig.entity!);
        forwardHaptic("light");
      } else {
        showToast(node, {
          message: hass.localize(
            "ui.panel.lovelace.cards.actions.no_entity_toggle"
          ),
        });
        forwardHaptic("failure");
      }
      break;

    case "perform-action":
      if (actionConfig.perform_action) {
        const [domain, service] = actionConfig.perform_action.split(".", 2);
        hass.callService(domain, service, actionConfig.data, actionConfig.target);
        forwardHaptic("light");
      } else {
        showToast(node, {
          message: hass.localize("ui.panel.lovelace.cards.actions.no_action"),
        });
        forwardHaptic("failure");
      }
      break;
  }
}

export function createDefaultAction(
  action: ActionConfig['action'],
  entity: string | undefined,
  optionalConfig: ActionConfig | undefined,
): ActionConfig {
  const config: ActionConfig = optionalConfig?.action ? <any>{ ...optionalConfig } : { action };

  if ((config.action === 'toggle' || config.action === 'more-info') && !config.entity) {
    config.entity = entity;
  }

  return config;
}
