/**
 * Renderable that draws a texture to the screen
 * @module renderables
 */
import {getTextureShader} from '../../internal/shaderResources';
import {activateTexture} from '../../resources/texture';
import Camera from '../camera';
import Renderable from './renderable';

/**
 * A renderable object that draws a texture to the screen.
 * @class TextureRenderable
 * @memberof module:renderables
 * @extends Renderable
 */
export default class TextureRenderable extends Renderable {
  private _texturePath: string;
  /**
   * Creates a texture renderable object.
   * @constructor
   * @param {WebGLTexture} texture - The texture to draw.
   * @example
   * const textureRenderable = new TextureRenderable(texture);
   * // textureRenderable object is now available
   */
  constructor(texture: string) {
    super();

    super.setColor([1, 1, 1, 0]);
    super._setShader(getTextureShader());
    this._texturePath = texture;
  }

  /**
   * Draws the texture renderable object.
   * @param {Camera} camera - The camera to draw the texture renderable object for
   * @returns {void}
   * @example
   * textureRenderable.draw(camera);
   * // textureRenderable is now drawn using the current shader and texture
   */
  draw(camera: Camera) {
    activateTexture(this._texturePath);
    super.draw(camera);
  }

  /**
   * Gets the texture of the texture renderable object.
   * @returns {WebGLTexture} The texture of the texture renderable object.
   * @example
   * const texture = textureRenderable.getTexture();
   * // texture is now available
   */
  getTexturePath(): string {
    return this._texturePath;
  }

  /**
   * Sets the texture of the texture renderable object.
   * @param {WebGLTexture} texture - The texture to set.
   * @returns {void}
   * @example
   * textureRenderable.setTexture(texture);
   * // textureRenderable now uses the new texture
   */
  setTexturePath(texture: string): void {
    this._texturePath = texture;
  }
}
