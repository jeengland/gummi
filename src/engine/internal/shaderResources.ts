/**
 * Module to make the same shader resources available across the engine.
 * @module shaderResources
 */

import {ShaderResourceError} from '../helpers/error';
import BaseShader from '../renderer/shaders/baseShader';

const SIMPLE_VS_PATH = 'src/shaders/vertex/simple_vs.glsl';
const SIMPLE_FS_PATH = 'src/shaders/fragment/simple_fs.glsl';

let _constColorShader: BaseShader;

/**
 * Confirms that the shader has been initialized.
 * @throws {ShaderResourceError} - If the shader has not been initialized.
 * @returns {void}
 * @example
 * confirmShader();
 * // throws error if shader has not been initialized
 * // otherwise, shader is confirmed to be available
 */
function confirmShader(): void {
  if (!_constColorShader) {
    throw new ShaderResourceError('Shader not initialized');
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
}

/**
 * Initializes the shader resources.
 * @returns {void}
 * @example
 * init();
 * // shader resources are now available
 */
export function initShader(): void {
  createShaders();
}

/**
 * Gets the constant color shader.
 * @throws {ShaderResourceError} - If the shader has not been initialized.
 * @returns {BaseShader} - The constant color shader.
 * @example
 * const shader = getConstColorShader();
 */
export function getConstColorShader(): BaseShader {
  confirmShader();
  return _constColorShader;
}
