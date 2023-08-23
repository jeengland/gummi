import {RenderError} from '../helpers/error';

let _canvas: HTMLCanvasElement;
let _gl: WebGLRenderingContext;

/**
 * Confirms that the WebGL2 context has been initialized.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * confirmWebGLContext();
 * // throws error if WebGL2 context has not been initialized
 * // otherwise, WebGL2 context is confirmed to be available
 */
function confirmWebGLContext(): void {
  if (!_gl) {
    throw new RenderError('WebGL context not initialized');
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
export function getGl(): WebGLRenderingContext {
  confirmWebGLContext();

  return _gl;
}

/**
 * Initializes the WebGL2 context.
 * @param {string} canvasId - The id of the canvas element.
 * @throws {RenderError}
 * - If the canvas element cannot be found.
 * - If the entry point is not a canvas element.
 * - If the WebGL2 context cannot be retrieved.
 * @returns {void}
 * @example
 * initWebGL('gummiCanvas');
 * // WebGL2 context is now available
 */
export function initWebGL(canvasId: string): void {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    throw new RenderError('Could not find canvas element');
  }

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new RenderError('Entry point is not a canvas element');
  }

  _canvas = canvas;

  const gl = canvas.getContext('webgl');

  if (!gl) {
    document.write('<br><b>WebGL is not supported.</b></br>');
    throw new RenderError('Could not retrieve WebGL context');
  }

  _gl = gl;
}
