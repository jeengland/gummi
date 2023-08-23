/**
 * @module engine
 * @description
 * This module contains the engine's public API.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | MDN}
 */

// local imports -- not to be exported from this file
import {getGl, initWebGL} from './internal/gl';
import {initVertexBuffer} from './internal/vertexBuffer';
import {initShader} from './internal/shaderResources';
import {Color} from './types';

// engine utils

/**
 * Initializes all engine resources: WebGL context, vertex buffer, and shaders.
 * @param {string} htmlId - The id of the canvas element to use as the WebGL context.
 * @returns {void}
 * @example
 * init('gummiCanvas');
 * // Engine is now initialized
 */
function init(htmlId: string) {
  initWebGL(htmlId);
  initVertexBuffer();
  initShader();
}

/**
 * Clears the canvas with the specified color.
 * @param {Color} color - The color to clear the canvas with in RGBA format.
 * @returns {void}
 * @example
 * clearCanvas([1, 0, 0, 1]);
 * // Canvas is now cleared and red
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear | MDN}
 */
function clearCanvas(color: Color) {
  const gl = getGl();
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// imports to be exported from this file
import Renderable from './renderer/renderable';

// export public API
export {
  // functions
  init,
  clearCanvas,
  // classes
  Renderable,
};