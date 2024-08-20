import './area-card';
import { LovelaceElement } from './types';

declare global {
  interface LovelaceCardOptions {
    type?: string;
    entity?: string;
    name?: string;
    icon?: string;
  }

  interface Window {
    customCards: Array<Object>;
    loadCardHelpers(): Promise<{
      createCardElement(options: LovelaceCardOptions): LovelaceElement<any>;
      createRowElement(options: LovelaceCardOptions): LovelaceElement<any>;
    }>;
  }
}
