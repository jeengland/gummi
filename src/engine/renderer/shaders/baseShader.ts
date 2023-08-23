/**
 * Module for handling shaders.
 * @module shaders
 */

import {getGl} from '../../internal/gl';
import {getVertexBuffer} from '../../internal/vertexBuffer';
import {ShaderError} from '../../helpers/error';

import {Color, Maybe} from '../../types';

/**
 * Loads and compiles a shader from an html script element.
 * @param {string} path - The path to the shader
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
function _loadShader(path: string, shaderType: number): WebGLShader {
  // Get shader source from file server
  const xmlReq: XMLHttpRequest = new XMLHttpRequest();
  xmlReq.open('GET', path, false);

  try {
    xmlReq.send();
  } catch (e) {
    throw new ShaderError(`Could not load shader: ${path}`);
  }

  const shaderSource: Maybe<string> = xmlReq.responseText;

  if (!shaderSource) {
    throw new ShaderError(`Could not find shader source: ${path}`);
  }

  // Create shader and specify shader type
  const gl = getGl();
  const shader = gl.createShader(shaderType);

  if (!shader) {
    throw new ShaderError(`Could not create shader: ${path}`);
  }

  // Specify shader source and compile shader
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new ShaderError(
      `Could not compile shader ${path}: ${gl.getShaderInfoLog(shader)}`
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
 * @property {WebGLUniformLocation} _pixelColorRef - The pixel color reference.
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
  private _pixelColorRef: WebGLUniformLocation;

  /**
   * Creates a shader.
   * @constructor
   *
   * @throws {ShaderError}
   * - If the program cannot be created.
   * - If the program cannot be linked.
   * - If the vertex position reference cannot be found.
   * - If the uniform location cannot be found.
   *
   * @param {string} vPath - The path to the vertex shader.
   * @param {string} fPath - The path to the fragment shader.
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

    const uniformLocation = gl.getUniformLocation(
      this._compiledShader,
      'uPixelColor'
    );

    if (!uniformLocation) {
      throw new ShaderError('Could not find uniform location');
    }

    this._pixelColorRef = uniformLocation;
  }

  /**
   * Activates the shader.
   *
   * @param {Color} pixelColor - The color of the pixel in RGBA format.
   *
   * @throws {ShaderError}
   * - If the vertex position reference cannot be found.
   *
   *  @example
   * const shader = new BaseShader('vertexShader', 'fragmentShader');
   * shader.activate([0, 1, 0, 1]);
   * // shader is now active and the pixel color is green
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/useProgram | MDN}
   */
  public activate(pixelColor: Color): void {
    const gl = getGl();

    // select the previously compiled shader program
    gl.useProgram(this._compiledShader);

    // enable the vertex position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, getVertexBuffer());
    gl.vertexAttribPointer(this._vertexPositionRef, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this._vertexPositionRef);
    gl.uniform4fv(this._pixelColorRef, pixelColor);
  }
}