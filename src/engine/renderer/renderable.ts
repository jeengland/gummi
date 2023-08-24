/**
 * Module to handle the drawing process.
 * @module renderable
 */
import {getGl} from '../internal/gl';
import {getConstColorShader} from '../internal/shaderResources';
import {Color} from '../types';
import BaseShader from './shaders/baseShader';
import Transform from './transform';
import Camera from './camera';

/**
 * A renderable object.
 * @class
 * @memberof module:renderable
 * @property {BaseShader} _shader - The shader to use when drawing.
 * @property {Color} _color - The color of the renderable object in RGBA format.
 * @property {Transform} xform - The transformation of the renderable object.
 */
export default class Renderable {
  private _shader: BaseShader;
  private _color: Color;
  private _xform: Transform;

  /**
   * Creates a renderable object.
   * @constructor
   * @example
   * const renderable = new Renderable();
   * // renderable object is now available
   */
  constructor() {
    this._shader = getConstColorShader();
    this._color = [1, 1, 1, 1];
    this._xform = new Transform();
  }

  /**
   * Draws the renderable object.
   * @param {Camera} camera - The camera to draw the renderable object for
   *
   * @returns {void}
   * @example
   * renderable.draw();
   * // renderable is now drawn using the current shader and color
   */
  draw(camera: Camera): void {
    const gl = getGl();
    this._shader.activate(
      this._color,
      this._xform.getTRSMatrix(),
      camera.getCameraMatrix()
    );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /**
   * Sets the color of the renderable object.
   * @param {Color} color - The color to set in RGBA format.
   * @returns {void}
   * @example
   * renderable.setColor([1, 0, 0, 1]);
   * // renderable is now red
   */
  setColor(color: Color): void {
    this._color = color;
  }

  /**
   * Gets the color of the renderable object.
   * @returns {Color} - The color of the renderable object in RGBA format.
   * @example
   * const color = renderable.getColor();
   * // returns [1, 0, 0, 1] if renderable is red
   */
  getColor(): Color {
    return this._color;
  }

  /**
   * Gets the transformation of the renderable object.
   * @returns {Transform} - The transformation of the renderable object.
   * @example
   * const transform = renderable.getTransform();
   * // transform is now available
   */
  getXform(): Transform {
    return this._xform;
  }
}
