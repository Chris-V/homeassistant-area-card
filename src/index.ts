import './card';

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

