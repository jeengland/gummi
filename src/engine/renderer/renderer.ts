/**
 * Module to handle base WebGL2 rendering functionality.
 * @module renderer
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | MDN WebGL docs}
 */
import {RenderError} from '../helpers/error.js';
import {isCanvasElement} from '../helpers/typeguards.js';
import BaseShader from './shaders.js';
import {initVertexBuffer} from './vertexBuffer.js';

let _gl: WebGL2RenderingContext;
let _shader: BaseShader;

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
    throw new RenderError('WebGL2 context not initialized');
  }
}

/**
 * Confirms that the shader has been initialized.
 * @throws {RenderError} - If the shader has not been initialized.
 * @returns {void}
 * @example
 * confirmShader();
 * // throws error if shader has not been initialized
 * // otherwise, shader is confirmed to be available
 */
function confirmShader(): void {
  if (!_shader) {
    throw new RenderError('Shader not initialized');
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

  return _gl;
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

  _gl = context;
}

/**
 * Sets clear color and clears the canvas.
 *
 * @param {number} r - The red component of the clear color.
 * @param {number} g - The green component of the clear color.
 * @param {number} b - The blue component of the clear color.
 * @param {number} a - The alpha component of the clear color.
 *
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * clearCanvas(0.5, 0.0, 1.0, 1.0);
 * // Canvas is now cleared to a purple color
 */
export function clearCanvas(r: number, g: number, b: number, a: number): void {
  confirmWebGLContext();

  _gl.clearColor(r, g, b, a);
  _gl.clear(_gl.COLOR_BUFFER_BIT);
}

/**
 * Draws a square.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @throws {RenderError} - If the shader has not been initialized.
 * @returns {void}
 * @example
 * drawSquare();
 * // Square is now drawn
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/TRIANGLE_STRIP | MDN}
 */
export function drawSquare() {
  confirmWebGLContext();
  confirmShader();

  _shader.activate();

  _gl.drawArrays(_gl.TRIANGLE_STRIP, 0, 4);
}

/**
 * Initializes the vertex buffer.
 * @throws {RenderError} - If the WebGL2 context has not been initialized.
 * @returns {void}
 * @example
 * initVertexBuffer();
 * // Vertex buffer is now initialized
 */
function createShader(): void {
  _shader = new BaseShader('VertexShader', 'FragmentShader');
}

/**
 * Initializes the renderer by initializing the WebGL2 context and the vertex buffer
 * and compiling the shaders.
 * @param {string} htmlId - The id of the canvas element.
 * @returns {void}
 * @example
 * init('gummiCanvas');
 * // Renderer is now initialized
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | MDN WebGL docs}
 */
export function init(htmlId: string) {
  initWebGL(htmlId);
  initVertexBuffer();
  createShader();
}
