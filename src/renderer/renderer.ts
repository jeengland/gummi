/**
 * Module to handle base WebGL2 rendering functionality.
 * @module renderer
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | MDN WebGL docs}
 */
import {RenderError} from '../helpers/error.js';
import {isCanvasElement} from '../helpers/typeguards.js';

let gl: WebGL2RenderingContext;

/**
 * Confirms that the WebGL2 context has been initialized.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * confirmWebGLContext();
 * // WebGL2 context is now available
 */
function confirmWebGLContext(): void {
  if (!gl) {
    throw new RenderError('WebGL2 context not initialized');
  }
}

/**
 * Gets the WebGL2 context.
 *
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {WebGL2RenderingContext} - The WebGL2 context.
 * @example
 * const gl = getGl();
 * // WebGL2 context is now available
 */
export function getGl(): WebGL2RenderingContext {
  confirmWebGLContext();

  return gl;
}

/**
 * Initializes the WebGL2 context.
 * @param {string} canvasId - The id of the canvas element.
 * @throws {RenderError} - If the canvas element cannot be found.
 * @throws {RenderError} - If the entry point is not a canvas element.
 * @throws {RenderError} - If the WebGL2 context cannot be retrieved.
 * @returns {void}
 * @example
 * initWebGL('gummiCanvas');
 * // WebGL2 context is now available
 */
export function initWebGL(canvasId: string): void {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    throw new RenderError('Could not find entry point');
  }

  if (!isCanvasElement(canvas)) {
    throw new RenderError('Entry point is not a canvas');
  }

  const context = canvas.getContext('webgl2');

  if (!context) {
    throw new RenderError('Could not get WebGL2 context');
  }

  gl = context;
}

/**
 * Sets the clear color.
 * @param {number} r - The red component of the clear color.
 * @param {number} g - The green component of the clear color.
 * @param {number} b - The blue component of the clear color.
 * @param {number} a - The alpha component of the clear color.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * setClearColor(0.5, 0.0, 1.0, 1.0);
 * // Clear color is now set to a purple color
 */
export function setClearColor(
  r: number,
  g: number,
  b: number,
  a: number
): void {
  if (!gl) {
    throw new RenderError('WebGL2 context not initialized');
  }

  gl.clearColor(r, g, b, a);
}

/**
 * Clears the canvas.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * clearCanvas();
 * // Canvas is now cleared
 */
export function clearCanvas(): void {
  if (!gl) {
    throw new RenderError('WebGL2 context not initialized');
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
}
