/**
 * Module to handle camera functionality.
 * @module camera
 */
import {mat4, vec2, vec3} from 'gl-matrix';
import {Color, ColorChannel, Viewport, ViewportArray} from '../types';
import {getGl} from '../internal/gl';

/**
 * Camera class to handle viewport and camera matrix.
 * @class Camera
 * @memberof module:camera
 * @property {vec2} _wcCenter - The center of the camera in world coordinates.
 * @property {number} _wcWidth - The width of the camera in world coordinates.
 * @property {ViewportArray} _viewport - The viewport array.
 * @property {mat4} _cameraMatrix - The camera matrix.
 * @property {Color} _backgroundColor - The background color of the camera in RGBA format.
 * @example
 * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
 * // camera is now available
 * camera.setBackgroundColor([0, 0, 0, 1]);
 * camera.setViewAndCameraMatrix();
 * // camera is now set to the viewport and background color
 * // and the camera matrix is set
 * const cameraMatrix = camera.getCameraMatrix();
 * // cameraMatrix is now available
 * // cameraMatrix can be used to draw objects
 * // the camera matrix is used to draw objects in world coordinates
 */
export default class Camera {
  private _wcCenter: vec2;
  private _wcWidth: number;
  private _viewport: ViewportArray;
  private _cameraMatrix: mat4;
  private _backgroundColor: Color;

  /**
   * Creates a camera.
   * @constructor
   * @param {vec2} wcCenter - The center of the camera in world coordinates.
   * @param {number} wcWidth - The width of the camera in world coordinates.
   * @param {ViewportArray} viewportArray - The viewport array.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   */
  constructor(wcCenter: vec2, wcWidth: number, viewportArray: ViewportArray) {
    this._wcCenter = wcCenter;
    this._wcWidth = wcWidth;
    this._viewport = viewportArray;

    this._cameraMatrix = mat4.create();

    this._backgroundColor = [0, 0, 0, 1];
  }

  /**
   * Gets the height of the camera in world coordinates based on the viewport.
   * @returns {number} The height of the camera in world coordinates.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   * const wcHeight = camera.getWCHeight();
   * // wcHeight is calculated as 7.5 based on the viewport
   */
  getWCHeight(): number {
    const ratio =
      this._viewport[Viewport.Height] / this._viewport[Viewport.Width];

    return this._wcWidth * ratio;
  }

  /**
   * Sets the center of the camera in world coordinates.
   * @param {number} posX - The x position of the camera in world coordinates.
   * @param {number} posY - The y position of the camera in world coordinates.
   * @returns {void}
   * @example
   * camera.setWCCenter(0, 0);
   * // camera is now centered at (0, 0)
   */
  setWCCenter(posX: number, posY: number): void {
    this._wcCenter = vec2.fromValues(posX, posY);
  }

  /**
   * Gets the center of the camera in world coordinates.
   * @returns {vec2} The center of the camera in world coordinates.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   * const wcCenter = camera.getWCCenter();
   * // wcCenter is now [0, 0]
   */
  getWCCenter(): vec2 {
    return this._wcCenter;
  }

  /**
   * Sets the width of the camera in world coordinates.
   * @param {number} width - The width of the camera in world coordinates.
   * @returns {void}
   * @example
   * camera.setWCWidth(10);
   * // camera width is set to 10 world coordinates
   */
  setWCWidth(width: number): void {
    this._wcWidth = width;
  }

  /**
   * Gets the width of the camera in world coordinates.
   * @returns {number} The width of the camera in world coordinates.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   * const wcWidth = camera.getWCWidth();
   * // wcWidth is now 10
   */
  getWCWidth(): number {
    return this._wcWidth;
  }

  /**
   * Sets the viewport array.
   * @param {ViewportArray} viewportArray - The viewport array.
   * @returns {void}
   * @example
   * camera.setViewport([0, 0, 800, 600]);
   * // camera viewport is now set to [0, 0, 800, 600]
   * // the viewport array is used to set the viewport and camera matrix
   */
  setViewport(viewportArray: ViewportArray): void {
    this._viewport = viewportArray;
  }

  /**
   * Gets the viewport array.
   * @returns {ViewportArray} The viewport array.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   * const viewport = camera.getViewport();
   * // viewport is now [0, 0, 800, 600]
   */
  getViewport(): ViewportArray {
    return this._viewport;
  }

  /**
   * Sets the background color of the camera.
   * @param {Color} color - The background color of the camera in RGBA format.
   * @returns {void}
   * @example
   * camera.setBackgroundColor([0, 0, 0, 1]);
   * // camera background color is now black
   */
  setBackgroundColor(color: Color): void {
    this._backgroundColor = color;
  }

  /**
   * Gets the background color of the camera.
   * @returns {Color} The background color of the camera in RGBA format.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   * const backgroundColor = camera.getBackgroundColor();
   * // backgroundColor is now [0, 0, 0, 1]
   */
  getBackgroundColor(): Color {
    return this._backgroundColor;
  }

  /**
   * Sets the viewport and camera matrix.
   * @returns {void}
   * @example
   * camera.setViewAndCameraMatrix();
   * // camera viewport is now set to [0, 0, 800, 600]
   * // camera background color is now black
   * // camera matrix is now set
   */
  setViewAndCameraMatrix(): void {
    const gl = getGl();

    gl.viewport(
      this._viewport[Viewport.X],
      this._viewport[Viewport.Y],
      this._viewport[Viewport.Width],
      this._viewport[Viewport.Height]
    );

    gl.scissor(
      this._viewport[Viewport.X],
      this._viewport[Viewport.Y],
      this._viewport[Viewport.Width],
      this._viewport[Viewport.Height]
    );

    gl.clearColor(
      this._backgroundColor[ColorChannel.Red],
      this._backgroundColor[ColorChannel.Green],
      this._backgroundColor[ColorChannel.Blue],
      this._backgroundColor[ColorChannel.Alpha]
    );

    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    const center = this.getWCCenter();

    mat4.scale(
      this._cameraMatrix,
      mat4.create(),
      vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0)
    );

    mat4.translate(
      this._cameraMatrix,
      this._cameraMatrix,
      vec3.fromValues(-center[0], -center[1], 0.0)
    );
  }

  /**
   * Gets the camera matrix.
   * @returns {mat4} The camera matrix.
   * @example
   * const camera = new Camera([0, 0], 10, [0, 0, 800, 600]);
   * const cameraMatrix = camera.getCameraMatrix();
   * // cameraMatrix is now available
   */
  getCameraMatrix(): mat4 {
    return this._cameraMatrix;
  }
}
