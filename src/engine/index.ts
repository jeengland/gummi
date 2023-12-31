/**
 * @module engine
 * @description
 * This module contains the engine's public API.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | MDN}
 */

// local imports -- not to be exported from this file
import {cleanupWebGL, getGl, initWebGL} from './internal/gl';
import {cleanupVertexBuffer, initVertexBuffer} from './internal/vertexBuffer';
import {cleanupShaders, initShader} from './internal/shaderResources';
import {cleanupLoop} from './internal/loop';
import {Color} from './types';
import {cleanupInput, initInput} from './user/input';
import {cleanupAudio, initAudio} from './resources/audio';

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
  initInput();
  initAudio();
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

/**
 * Cleans up all engine resources: WebGL context, vertex buffer, and shaders.
 * @returns {void}
 * @example
 * cleanup();
 * // Engine is now cleaned up
 */
function cleanup() {
  cleanupLoop();
  cleanupAudio();
  cleanupInput();
  cleanupShaders();
  cleanupVertexBuffer();
  cleanupWebGL();
}

// import classes to be exported from this file
import Camera from './renderer/camera';
import Renderable from './renderer/renderables/renderable';
import Scene from './renderer/scene';
import TextureRenderable from './renderer/renderables/textureRenderable';
import Transform from './renderer/transform';

// import modules to be exported from this file
import * as audio from './resources/audio';
import * as input from './user/input';
import * as text from './resources/text';
import * as texture from './resources/texture';
import * as xml from './resources/xml';

// export public API
export {
  // functions
  cleanup,
  clearCanvas,
  init,
  // classes
  Camera,
  Renderable,
  Scene,
  TextureRenderable,
  Transform,
  // modules
  audio,
  input,
  text,
  texture,
  xml,
};
