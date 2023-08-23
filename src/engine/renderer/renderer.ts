/**
 * Module to handle base WebGL2 rendering functionality.
 * @module renderer
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | MDN WebGL docs}
 */
import {RenderError} from '../helpers/error.js';
import {Color} from '../types.js';
import BaseShader from './shaders/baseShader.js';
import {initVertexBuffer} from '../internal/vertexBuffer.js';
import {initWebGL} from '../internal/gl.js';

let _gl: WebGL2RenderingContext;
let _shader: BaseShader;

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
  _gl.clearColor(r, g, b, a);
  _gl.clear(_gl.COLOR_BUFFER_BIT);
}

/**
 * Draws a square.
 *
 * @param {Color} color - The color of the square in RGBA format.
 *
 * @throws {RenderError}
 * - If the WebGL2 context has not been initialized.
 * - If the shader has not been initialized.
 * @returns {void}
 * @example
 * drawSquare([1, 0, 0, 1]);
 * // A red square is now drawn
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/TRIANGLE_STRIP | MDN}
 */
export function drawSquare(color: Color) {
  confirmShader();

  _shader.activate(color);

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
  _shader = new BaseShader(
    'src/shaders/vertex/simple_vs.glsl',
    'src/shaders/fragment/simple_fs.glsl'
  );
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
