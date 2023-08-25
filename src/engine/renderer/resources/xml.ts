/**
 * Module for loading and caching xml resources.
 * @module xml
 */

import {
  getResource,
  hasResource,
  loadDecodeParse,
  unloadResource,
} from '../../internal/resourceMap';

/**
 * Parser for xml resources, instantiated once to avoid memory issues.
 * @private
 * @constant {DOMParser}
 */
const _parser = new DOMParser();

/**
 * Gets the xml resource at the given path.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {Document | null} - The xml resource.
 * @example
 * const xml = getXml('path/to/resource');
 * // xml is now the xml resource
 */
export function getXml(path: string): Document | null {
  return getResource(path);
}

/**
 * Checks if the resource map has a xml resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {boolean} - True if the resource map has the xml resource.
 * @example
 * const hasXml = hasXml('path/to/resource');
 * // hasXml is now true if the resource map has the xml resource
 * // otherwise, hasXml is false
 */
export function hasXml(path: string) {
  return hasResource(path);
}

/**
 * Unloads the xml resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {void}
 * @example
 * unloadXml('path/to/resource');
 * // xml resource is now unloaded
 * // subsequent calls to getXml() will throw an error
 * // if the resource is not reloaded
 */
export function unloadXml(path: string) {
  return unloadResource(path);
}

/**
 * Decoder function for xml resources.
 * To be used in conjunction with {@link loadDecodeParse}.
 */
function decodeXml(data: Response) {
  return data.text();
}

/**
 * Parser function for xml resources.
 * To be used in conjunction with {@link loadDecodeParse}.
 */
function parseXml(data: string) {
  return _parser.parseFromString(data, 'text/xml');
}

/**
 * Loads and caches an xml resource.
 * @param {string} path - The path to the resource.
 * @returns {Promise<void>} - A promise that resolves when the resource is loaded.
 * @example
 * loadXml('path/to/resource');
 * // xml resource is now available
 * // subsequent calls to getXml() will return the xml resource
 */
export function loadXml(path: string) {
  return loadDecodeParse(path, decodeXml, parseXml);
}
