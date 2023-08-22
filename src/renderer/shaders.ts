/**
 * Module for handling shaders.
 * @module shaders
 */

import {getGl} from './renderer';
import {getVertexBuffer} from './vertexBuffer';
import {ShaderError} from '../helpers/error';

import {Maybe} from '../types';

let compiledShader: WebGLProgram;
let vertexPositionRef: number;

/**
 * Loads and compiles a shader from an html script element.
 * @param {string} id - The id of the script element.
 * @param {number} shaderType - The type of shader to load.
 * @throws {ShaderError} - If the shader source cannot be found.
 * @throws {ShaderError} - If the shader cannot be created.
 * @throws {ShaderError} - If the shader cannot be compiled.
 * @returns {WebGLShader} - The compiled shader.
 * @example
 * const vertexShader = loadShader('vertexShader', gl.VERTEX_SHADER);
 * // vertex shader is now available
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource | MDN}
 */
function loadShader(id: string, shaderType: number): WebGLShader {
  // Get shader source from html
  const shaderScript = document.getElementById(id);
  const shaderSource: Maybe<string> = shaderScript?.firstChild?.textContent;

  if (!shaderSource) {
    throw new ShaderError(`Could not find shader source: ${id}`);
  }

  // Create shader and specify shader type
  const gl = getGl();
  const shader = gl.createShader(shaderType);

  if (!shader) {
    throw new ShaderError(`Could not create shader: ${id}`);
  }

  // Specify shader source and compile shader
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new ShaderError(
      `Could not compile shader ${id}: ${gl.getShaderInfoLog(shader)}`
    );
  }

  return shader;
}

/**
 * Initializes vertex and fragment shaders.
 * @param {string} vId - The id of the vertex shader script element.
 * @param {string} fId - The id of the fragment shader script element.
 * @throws {ShaderError} - If the program cannot be created.
 * @throws {ShaderError} - If the program cannot be linked.
 * @returns {void}
 * @example
 * initShaders('vertexShader', 'fragmentShader');
 * // shaders are now available
 */
export function initShaders(vId: string, fId: string): void {
  const gl = getGl();

  // Load shaders
  const vertexShader = loadShader(vId, gl.VERTEX_SHADER);
  const fragmentShader = loadShader(fId, gl.FRAGMENT_SHADER);

  // Create program and attach shaders
  const program = gl.createProgram();

  if (!program) {
    throw new ShaderError('Could not create program');
  }

  compiledShader = program;

  gl.attachShader(compiledShader, vertexShader);
  gl.attachShader(compiledShader, fragmentShader);

  // Link program
  gl.linkProgram(compiledShader);

  if (!gl.getProgramParameter(compiledShader, gl.LINK_STATUS)) {
    throw new ShaderError(
      `Could not link program: ${gl.getProgramInfoLog(compiledShader)}`
    );
  }

  vertexPositionRef = gl.getAttribLocation(compiledShader, 'aVertexPosition');
}

/**
 * Activates the shader program.
 * @throws {ShaderError} - If the shader program has not been initialized.
 * @returns {void}
 * @example
 * activateShader();
 * // shader program is now active
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/useProgram | MDN}
 */
export function activateShader(): void {
  const gl = getGl();

  if (!compiledShader) {
    throw new ShaderError('Shader program not initialized');
  }

  // select the previously compiled shader program
  gl.useProgram(compiledShader);

  // enable the vertex position attribute
  gl.bindBuffer(gl.ARRAY_BUFFER, getVertexBuffer());
  gl.vertexAttribPointer(vertexPositionRef, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPositionRef);
}
