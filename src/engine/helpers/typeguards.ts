/**
 * Module for type guards, which help narrow types to assist with type safety.
 * @module typeguards
 * @see {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards | TypeScript docs}
 */

/**
 * Type guard for HTMLCanvasElement
 * @param element - The element to check.
 * @returns {boolean} - Whether the element is an HTMLCanvasElement.
 * @example
 * const canvas = document.getElementById('gummiCanvas');
 * if (isCanvasElement(canvas)) {
 *  // we can now safely use canvas as an HTMLCanvasElement
 * }
 * @see {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards | TypeScript docs}
 */
export function isCanvasElement(
  element: Element
): element is HTMLCanvasElement {
  return element instanceof HTMLCanvasElement;
}
