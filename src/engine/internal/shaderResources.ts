/**
 * Module to make the same shader resources available across the engine.
 * @module shaderResources
 */

import {ShaderResourceError} from '../helpers/error';
import {loadText, unloadText} from '../resources/text';
import BaseShader from '../renderer/shaders/baseShader';
import {pushRequest} from './resourceMap';
import TextureShader from '../renderer/shaders/textureShader';

/**
 * Path to the vertex shader for the constant color shader.
 * @private
 * @constant {string}
 * @default
 */
const SIMPLE_VS_PATH = 'src/shaders/vertex/simple_vs.glsl';
/**
 * Path to the fragment shader for the constant color shader.
 * @private
 * @constant {string}
 * @default
 */
const SIMPLE_FS_PATH = 'src/shaders/fragment/simple_fs.glsl';
/**
 * Path to the vertex shader for the texture shader.
 * @private
 * @constant {string}
 * @default
 */
const TEXTURE_VS_PATH = 'src/shaders/vertex/texture_vs.glsl';
/**
 * Path to the fragment shader for the texture shader.
 * @private
 * @constant {string}
 * @default
 */
const TEXTURE_FS_PATH = 'src/shaders/fragment/texture_fs.glsl';

/**
 * The constant color shader.
 * @private
 * @type {BaseShader}
 */
let _constColorShader: BaseShader;
/**
 * The texture shader.
 * @private
 * @type {TextureShader}
 */
let _textureShader: TextureShader;

/**
 * Confirms that the constant color shader has been initialized.
 * @throws {ShaderResourceError} - If the shader has not been initialized.
 * @returns {void}
 * @example
 * confirmConstantColorShader();
 * // throws error if shader has not been initialized
 * // otherwise, shader is confirmed to be available
 */
function confirmConstantColorShader(): void {
  if (!_constColorShader) {
    throw new ShaderResourceError('Constant color shader not initialized');
  }
}

/**
 * Confirms that the texture shader has been initialized.
 * @throws {ShaderResourceError} - If the shader has not been initialized.
 * @returns {void}
 * @example
 * confirmTextureShader();
 * // throws error if shader has not been initialized
 * // otherwise, shader is confirmed to be available
 */
function confirmTextureShader(): void {
  if (!_textureShader) {
    throw new ShaderResourceError('Texture shader not initialized');
  }
}

/**
 * Creates the shaders.
 * @throws {ShaderResourceError} - If the shader cannot be created.
 * @returns {void}
 * @example
 * createShaders();
 * // shaders are now available
 * // confirmShader() will no longer throw an error
 */
function createShaders(): void {
  _constColorShader = new BaseShader(SIMPLE_VS_PATH, SIMPLE_FS_PATH);
  _textureShader = new TextureShader(TEXTURE_VS_PATH, TEXTURE_FS_PATH);
}

/**
 * Initializes the shader resources by loading the shader source files.
 * @returns {void}
 * @example
 * init();
 * // shader resources are now available
 */
export function initShader(): void {
  const loadPromise = new Promise<void>(resolve => {
    Promise.all([
      loadText(SIMPLE_FS_PATH),
      loadText(SIMPLE_VS_PATH),
      loadText(TEXTURE_FS_PATH),
      loadText(TEXTURE_VS_PATH),
    ])
      .then(() => {
        resolve();
      })
      .then(() => {
        createShaders();
      });
  });

  pushRequest(loadPromise);
}

/**
 * Gets the constant color shader.
 * @throws {ShaderResourceError} - If the shader has not been initialized.
 * @returns {BaseShader} - The constant color shader.
 * @example
 * const shader = getConstColorShader();
 */
export function getConstColorShader(): BaseShader {
  confirmConstantColorShader();
  return _constColorShader;
}

/**
 * Gets the texture shader.
 * @throws {ShaderResourceError} - If the shader has not been initialized.
 * @returns {TextureShader} - The texture shader.
 * @example
 * const shader = getTextureShader();
 */
export function getTextureShader(): TextureShader {
  confirmTextureShader();
  return _textureShader;
}

/**
 * Cleans up the shader resources by unloading the shader source files.
 * @returns {void}
 * @example
 * cleanup();
 * // shader resources are now unavailable
 */
export function cleanupShaders(): void {
  _constColorShader.unload();
  _textureShader.unload();
  unloadText(SIMPLE_FS_PATH);
  unloadText(SIMPLE_VS_PATH);
  unloadText(TEXTURE_FS_PATH);
  unloadText(TEXTURE_VS_PATH);
}
