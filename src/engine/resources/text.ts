/**
 * Module for loading and caching text resources.
 * @module text
 */
import {
  getResource,
  hasResource,
  loadDecodeParse,
  unloadResource,
} from '../internal/resourceMap';

/**
 * Gets the text resource at the given path.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {string | null} - The text resource.
 * @example
 * const text = getText('path/to/resource');
 * // text is now the text resource
 * // throws error if resource is not in resource map
 */
export function getText(path: string): string | null {
  return getResource(path);
}

/**
 * Checks if the resource map has a text resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {boolean} - True if the resource map has the text resource.
 * @example
 * const hasText = hasText('path/to/resource');
 * // hasText is now true if the resource map has the text resource
 * // otherwise, hasText is false
 */
export function hasText(path: string) {
  return hasResource(path);
}

/**
 * Unloads the text resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {void}
 * @example
 * unloadText('path/to/resource');
 * // text resource is now unloaded
 * // subsequent calls to getText() will throw an error
 * // if the resource is not reloaded
 */
export function unloadText(path: string) {
  return unloadResource(path);
}

/**
 * Decoder function for text resources.
 * To be used in conjunction with {@link loadDecodeParse}.
 */
function decodeText(data: Response) {
  return data.text();
}

/**
 * Parser function for text resources.
 * To be used in conjunction with {@link loadDecodeParse}.
 */
function parseText(text: string) {
  return text;
}

/**
 * Loads a text resource from the given path.
 * @param {string} path - The path to the resource.
 * @returns {Promise<void>} - A promise that resolves when the resource is loaded.
 * @example
 * loadText('path/to/resource');
 * // text resource is now available
 * // subsequent calls to getText() will return the text resource
 */
export function loadText(path: string) {
  return loadDecodeParse(path, decodeText, parseText);
}
