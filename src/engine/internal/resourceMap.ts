/**
 * Module to handle loading and storing resources.
 * @module resourceMap
 */

import {ResourceError} from '../helpers/error';

// disabling eslint rule because we don't know what the type of the resource is
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _map = new Map<string, MapEntry<any>>();
const _outstandingRequests: Array<Promise<void>> = [];

/**
 * Class to store resource data and reference count.
 * @private
 * @class
 * @template T
 * @property {T | null} _data - The resource data.
 */
class MapEntry<T> {
  private _data: T | null;
  private _refCount: number;

  /**
   * Creates a MapEntry.
   * @param {T | null} data - The resource data.
   * @param {number} refCount - The reference count.
   * @example
   */
  constructor(data: T | null) {
    this._data = data;
    this._refCount = 1;
  }

  /**
   * Decrements the reference count.
   * @returns {void}
   * @example
   * entry.decrementRefCount();
   * // reference count is now decremented
   * // if reference count is 0, the resource can be removed
   */
  decrementRefCount(): void {
    this._refCount--;
  }

  /**
   * Increments the reference count.
   * @returns {void}
   * @example
   * entry.incrementRefCount();
   * // reference count is now incremented
   */
  incrementRefCount(): void {
    this._refCount++;
  }

  /**
   * Sets the resource data.
   * @param {T} data - The resource data.
   * @returns {void}
   * @example
   * entry.setData(1);
   * // resource data is now 1
   */
  setData(data: T) {
    this._data = data;
  }

  /**
   * Gets the resource data.
   * @throws {ResourceError} - If the resource data is null.
   * @returns {T} - The resource data.
   * @example
   * const data = entry.getData();
   * // data is now the resource data
   */
  getData(): T {
    if (this._data === null) {
      throw new ResourceError('Resource data is null');
    }
    return this._data;
  }

  /**
   * Checks if the resource can be removed.
   * @returns {boolean} - True if the resource can be removed.
   * @example
   * const canRemove = entry.canRemove();
   * // canRemove is now true if the resource can be removed
   */
  canRemove(): boolean {
    return this._refCount <= 0;
  }
}

/**
 * Checks if the resource map has a resource.
 * @param {string} path - The path to the resource.
 * @returns {boolean} - True if the resource map has the resource.
 * @example
 * const hasResource = hasResource('path/to/resource');
 * // hasResource is now true if the resource map has the resource
 * // otherwise, hasResource is false
 */
export function hasResource(path: string): boolean {
  return _map.has(path);
}

/**
 * Gets the resource.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {T | null} - The resource.
 * @example
 * const resource = getResource('path/to/resource');
 * // resource is now the resource
 */
export function getResource<T = unknown>(path: string): T | null {
  if (!hasResource(path)) {
    throw new ResourceError(`Resource ${path} not found in resource map`);
  }

  return _map.get(path)?.getData();
}

/**
 * Sets the resource.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @param {T} resource - The resource.
 * @returns {void}
 * @example
 * setResource('path/to/resource', 1);
 * // resource is now 1
 */
export function setResource(path: string, resource: unknown) {
  if (!hasResource(path)) {
    throw new ResourceError(`Resource ${path} not found in resource map`);
  }

  _map.get(path)?.setData(resource);
}

/**
 * Requests to load a resource.
 * @param {string} path - The path to the resource.
 * @returns {void}
 * @example
 * requestLoad('path/to/resource');
 * // resource is now requested to be loaded
 * // if the resource is already loaded, the reference count is incremented
 */
export function requestLoad(path: string) {
  _map.set(path, new MapEntry(null));
}

/**
 * Increments the reference count of a resource.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {void}
 * @example
 * incrementRefCount('path/to/resource');
 * // reference count is now incremented
 */
export function incrementRefCount(path: string) {
  if (!hasResource(path)) {
    throw new ResourceError(`Resource ${path} not found in resource map`);
  }

  _map.get(path)?.incrementRefCount();
}

/**
 * Unloads a resource.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {boolean} - True if the resource can be removed.
 * @example
 * unloadResource('path/to/resource');
 * // if the resource can be removed, it is removed from the resource map
 * // otherwise, it is kept in the resource map and true is returned
 */
export function unloadResource(path: string) {
  if (!hasResource(path)) {
    throw new ResourceError(`Resource ${path} not found in resource map`);
  }

  const entry = _map?.get(path);

  if (!entry) {
    throw new ResourceError(`Resource ${path} not found in resource map`);
  }

  if (entry.canRemove()) {
    _map.delete(path);
  }

  return entry.canRemove();
}

/**
 * Pushes a request to the outstanding requests array.
 * @param {Promise<void>} request - The request to push.
 * @returns {void}
 * @example
 * pushRequest(request);
 * // request is now pushed to the outstanding requests array
 * // request will be waited on in waitOnRequests()
 */
export function pushRequest(request: Promise<void>): void {
  _outstandingRequests.push(request);
}

/**
 * Loads a resource using a fetch request.
 * The resource is decoded and parsed using the provided functions
 * for the specific resource type.
 * @param {string} path - The path to the resource.
 * @param {Function} decode - The function to decode the resource.
 * @param {Function} parse - The function to parse the resource.
 * @throws {ResourceError} - If the resource cannot be loaded.
 * @returns {Promise<void>} - The fetch promise.
 * @example
 * const fetchPromise = loadDecodeParse(
 *  'path/to/resource',
 * decodeFunction,
 * parseFunction
 * );
 * // returns a promise that resolves when the resource is loaded
 */
export function loadDecodeParse(
  path: string,
  decode: Function,
  parse: Function
) {
  let fetchPromise = null;

  if (!hasResource(path)) {
    requestLoad(path);

    fetchPromise = fetch(path)
      .then(response => decode(response))
      .then(data => parse(data))
      .then(data => setResource(path, data))
      .catch(error => {
        throw new ResourceError(`Error loading resource ${path}: ${error}`);
      });

    pushRequest(fetchPromise);
  } else {
    incrementRefCount(path);
  }

  return fetchPromise;
}

/**
 * Waits on all outstanding requests.
 * @returns {Promise<void>} - The promise that resolves when all requests are
 * resolved.
 * @example
 * await waitOnRequests();
 * // all outstanding requests are now resolved
 * // this is useful for loading resources before starting the game loop
 * // or for loading resources before switching scenes
 */
export async function waitOnRequests(): Promise<void> {
  await Promise.all(_outstandingRequests);
  _outstandingRequests.length = 0;
}
