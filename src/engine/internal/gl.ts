/**
 * Module for WebGL2 context functionality.
 * @module gl
 */
import {RenderError} from '../helpers/error';

let _canvas: HTMLCanvasElement | null;
let _gl: WebGLRenderingContext | null;

/**
 * Confirms that the WebGL2 context has been initialized.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {WebGL2RenderingContext} - The WebGL2 context.
 * @example
 * const context = confirmWebGLContext();
 * // throws error if WebGL2 context has not been initialized
 * // otherwise, WebGL2 context is returned
 */
function confirmWebGLContext(): WebGLRenderingContext {
  if (!_gl) {
    throw new RenderError('WebGL context not initialized');
  }

  return _gl;
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
  const context = confirmWebGLContext();

  return context;
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

/**
 * Cleans up the WebGL2 context.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * cleanupWebGL();
 * // WebGL2 context is now cleaned up
 * // Canvas will be transparent gray and fixed in the top left corner
 * // with a message indicating that Gummi has shut down
 */
export function cleanupWebGL(): void {
  if (!_gl || !_canvas) {
    throw new RenderError(
      'Engine cleanup failed: WebGL context not initialized'
    );
  }

  _gl = null;
  _canvas.style.position = 'fixed';
  _canvas.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
  _canvas = null;

  document.write('<br><h1>Gummi shutdown successful</h1></br>');
}
