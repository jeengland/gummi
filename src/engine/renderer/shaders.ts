/**
 * Module for handling shaders.
 * @module shaders
 */

import {getGl} from './renderer';
import {getVertexBuffer} from './vertexBuffer';
import {ShaderError} from '../helpers/error';

import {Maybe} from '../types';

/**
 * Loads and compiles a shader from an html script element.
 * @param {string} id - The id of the script element.
 * @param {number} shaderType - The type of shader to load.
 * @throws {ShaderError}
 * - If the shader source cannot be found.
 * - If the shader cannot be created.
 * - If the shader cannot be compiled.
 * @returns {WebGLShader} - The compiled shader.
 * @example
 * const vertexShader = loadShader('vertexShader', gl.VERTEX_SHADER);
 * // vertex shader is now available
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource | MDN}
 */
function _loadShader(id: string, shaderType: number): WebGLShader {
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
 * Base shader class.
 * @class
 *
 * @property {function} activate - Activates the shader.
 * @property {WebGLProgram} _compiledShader - The compiled shader.
 * @property {number} _vertexPositionRef - The vertex position reference.
 * @property {WebGLShader} _vertexShader - The vertex shader.
 * @property {WebGLShader} _fragmentShader - The fragment shader.
 *
 *
 * @example
 * const shader = new BaseShader('vertexShader', 'fragmentShader');
 * shader.activate();
 * // shader is now active
 */
export default class BaseShader {
  private _compiledShader: WebGLProgram;
  private _vertexPositionRef: number;
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;

  /**
   * Creates a shader.
   * @constructor
   *
   * @throws {ShaderError}
   * - If the program cannot be created.
   * - If the program cannot be linked.
   * - If the vertex position reference cannot be found.
   *
   * @param {string} vId - The html id of the vertex shader.
   * @param {string} fId - The html id of the fragment shader.
   */
  public constructor(vId: string, fId: string) {
    // load shaders from html
    const gl = getGl();

    this._vertexShader = _loadShader(vId, gl.VERTEX_SHADER);
    this._fragmentShader = _loadShader(fId, gl.FRAGMENT_SHADER);

    // Create program and attach shaders
    const program = gl.createProgram();

    if (!program) {
      throw new ShaderError('Could not create program');
    }

    this._compiledShader = program;

    gl.attachShader(this._compiledShader, this._vertexShader);
    gl.attachShader(this._compiledShader, this._fragmentShader);

    // Link program
    gl.linkProgram(this._compiledShader);

    if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
      throw new ShaderError(
        `Could not link program: ${gl.getProgramInfoLog(this._compiledShader)}`
      );
    }

    this._vertexPositionRef = gl.getAttribLocation(
      this._compiledShader,
      'aVertexPosition'
    );
  }

  /**
   * Activates the shader.
   *
   * @throws {ShaderError}
   * - If the vertex position reference cannot be found.
   *
   *  @example
   * const shader = new BaseShader('vertexShader', 'fragmentShader');
   * shader.activate();
   * // shader is now active
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/useProgram | MDN}
   */
  public activate(): void {
    const gl = getGl();

    // select the previously compiled shader program
    gl.useProgram(this._compiledShader);

    // enable the vertex position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, getVertexBuffer());
    gl.vertexAttribPointer(this._vertexPositionRef, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this._vertexPositionRef);
  }
}
