import './area-badge';
import './area-card';
import './area-climate-panel';
import './area-control';

declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "area-card",
  name: "Turn an entity on and off",
  description: "A pretty card with everything related to an area.",
});

