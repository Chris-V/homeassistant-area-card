import { LovelaceElement } from '../types';
import './area-badge';
import './area-card';
import './area-climate-panel';
import './area-control';

declare global {

  interface Window {
    customCards: Array<Object>;
    loadCardHelpers(): Promise<{
      createCardElement(options: { type?: string, entity?: string, name?: string }): LovelaceElement<any>;
      createRowElement(options: { type?: string, entity?: string, name?: string }): LovelaceElement<any>;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "area-card",
  name: "Turn an entity on and off",
  description: "A pretty card with everything related to an area.",
});

