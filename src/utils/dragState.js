// Simple singleton to store dragged item fallback for touch devices
// where dataTransfer might be restricted or buggy
let currentDraggedItem = null;

export const setDraggedItem = (item) => {
  currentDraggedItem = item;
};

export const getDraggedItem = () => {
  return currentDraggedItem;
};

export const clearDraggedItem = () => {
  currentDraggedItem = null;
};
