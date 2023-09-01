/**
 * Shader that renders textures onto renderables.
 * @module shaders
 */
import {mat4} from 'gl-matrix';
import {ShaderError} from '../../helpers/error';
import {getGl} from '../../internal/gl';
import {Color} from '../../types';
import BaseShader from './baseShader';
import {getTextureCoordinates} from '../../internal/vertexBuffer';

/**
 * Shader that renders textures onto renderables.
 * @class
 * @extends BaseShader
 */
export default class TextureShader extends BaseShader {
  private _textureCoordBufferRef: number;
  private _samplerRef: WebGLUniformLocation;

  /**
   * Creates an instance of TextureShader.
   * @constructor
   * @throws {ShaderError} - If the texture coordinate buffer reference cannot be found.
   * @param {string} vPath - The path to the vertex shader.
   * @param {string} fPath - The path to the fragment shader.
   * @example
   * const shader = new TextureShader('vertexShader', 'fragmentShader');
   * // shader is now available
   */
  constructor(vPath: string, fPath: string) {
    super(vPath, fPath);
    const gl = getGl();

    this._textureCoordBufferRef = gl.getAttribLocation(
      this._compiledShader,
      'textureCoordinate'
    );

    const samplerRef = gl.getUniformLocation(
      this._compiledShader,
      'samplerUtil'
    );

    if (!samplerRef) {
      throw new ShaderError(
        'Could not find uniform location for texture sampler'
      );
    }

    this._samplerRef = samplerRef;
  }

  /**
   * Activates the shader.
   * @param {Color} pixelColor - The color of the pixel in RGBA format.
   * @param {mat4} trsMatrix
   * - The transformation matrix for the object.
   * - trs stands for translate, rotate, scale.
   * @param {mat4} viewMatrix - The view matrix.
   * @returns {void}
   * @example
   * shader.activate(pixelColor, trsMatrix, viewMatrix);
   * // shader is now active
   */
  public activate(pixelColor: Color, trsMatrix: mat4, viewMatrix: mat4): void {
    super.activate(pixelColor, trsMatrix, viewMatrix);

    const gl = getGl();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._getTextureCoordBufferRef());
    gl.vertexAttribPointer(
      this._textureCoordBufferRef,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(this._textureCoordBufferRef);
    gl.uniform1i(this._samplerRef, 0);
  }

  private _getTextureCoordBufferRef(): WebGLBuffer {
    return getTextureCoordinates();
  }
}
