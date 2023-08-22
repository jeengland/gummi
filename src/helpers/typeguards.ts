export function isCanvasElement(
  element: Element
): element is HTMLCanvasElement {
  return element instanceof HTMLCanvasElement;
}
