/**
 * Module for loading and handling texture resources.
 * @module text
 */
import {TextureError} from '../helpers/error';
import {getGl} from '../internal/gl';
import {
  getResource,
  hasResource,
  incrementRefCount,
  pushRequest,
  requestLoad,
  setResource,
  unloadResource,
} from '../internal/resourceMap';

/**
 * Class for storing texture data.
 * @class
 * @property {number} width - The width of the texture.
 * @property {number} height - The height of the texture.
 * @property {WebGLTexture} data - The texture data.
 */
export class TextureData {
  public width: number;
  public height: number;
  public data: WebGLTexture;

  constructor(w: number, h: number, data: WebGLTexture) {
    this.width = w;
    this.height = h;
    this.data = data;
  }
}

/**
 * Checks if the resource map has a texture resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {boolean} - True if the resource map has the texture resource.
 * @example
 * const hasTexture = hasTexture('path/to/resource');
 * // hasTexture is now true if the resource map has the texture resource
 * // otherwise, hasTexture is false
 */
export function hasTexture(path: string): boolean {
  return hasResource(path);
}

/**
 * Gets the texture resource at the given path.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {TextureData | null} - The texture resource.
 * @example
 * const texture = getTexture('path/to/resource');
 * // texture is now the texture resource
 */
export function getTexture(path: string): TextureData | null {
  return getResource(path);
}

/**
 * Loads a texture resource.
 * @throws {TextureError} - If the texture cannot be loaded.
 * @param {string} path - The path to the texture.
 * @returns {Promise<void>} - A promise that resolves when the texture is loaded.
 * @example
 * loadTexture('path/to/resource');
 * // texture is now loaded
 */
export function loadTexture(path: string) {
  const image = new Image();
  if (hasResource(path)) {
    incrementRefCount(path);
  } else {
    requestLoad(path);
  }

  const texturePromise = new Promise<void>(resolve => {
    image.onload = () => resolve();
    image.src = path;
  }).then(() => {
    processLoadedImage(path, image);
  });

  pushRequest(texturePromise);
  return texturePromise;
}

/**
 * Unloads the texture resource at the given path.
 * @param {string} path - The path to the texture.
 * @returns {void}
 * @example
 * unloadTexture('path/to/resource');
 * // texture resource is now unloaded
 */
export function unloadTexture(path: string) {
  const texture = getTexture(path);

  if (!texture) {
    throw new TextureError('Could not unload texture');
  }

  if (unloadResource(path)) {
    const gl = getGl();
    gl.deleteTexture(texture.data);
  }
}

/**
 * Processes a loaded image.
 * @private
 * @param {string} path - The path to the image.
 * @param {HTMLImageElement} image - The image.
 * @returns {void}
 * @example
 * processLoadedImage('path/to/resource', image);
 * // image is processed and added to the resource map
 */
function processLoadedImage(path: string, image: HTMLImageElement) {
  const gl = getGl();

  const texture = gl.createTexture();
  if (!texture) {
    throw new TextureError('Could not create texture');
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);

  const texData = new TextureData(
    image.naturalWidth,
    image.naturalHeight,
    texture
  );

  setResource(path, texData);
}

/**
 * Activates a texture.
 * @throws {TextureError} - If the texture cannot be activated.
 * @param {string} path - The path to the texture.
 * @param {string} mode - The mode of the texture (smooth or sharp)
 * @returns {void}
 * @example
 * activateTexture('path/to/resource');
 * // texture is now active
 */
export function activateTexture(
  path: string,
  mode: 'smooth' | 'sharp' = 'smooth'
) {
  const gl = getGl();
  const texture = getTexture(path);

  if (!texture) {
    throw new TextureError('Could not activate texture');
  }

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture.data);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  if (mode === 'smooth') {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
  }

  if (mode === 'sharp') {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.NEAREST_MIPMAP_NEAREST
    );
  }
}

/**
 * Deactivates a texture.
 * @returns {void}
 * @example
 * deactivateTexture();
 * // texture is now inactive
 */
export function deactivateTexture() {
  const gl = getGl();
  gl.bindTexture(gl.TEXTURE_2D, null);
}
