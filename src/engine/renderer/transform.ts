/**
 * Module to handle matrix transformations.
 * @module renderer
 *
 */
import {mat4, vec2, vec3} from 'gl-matrix';

/**
 * A matrix transformation.
 * @class Transform
 * @memberof module:renderer
 * @property {vec2} _position - The position of the object.
 * @property {vec2} _scale - The scale of the object.
 * @property {number} _rotation - The rotation of the object in radians.
 * @example
 * const transform = new Transform();
 * // transform is now available
 * transform.setPosition(0.5, 0.5);
 * transform.setRotationDegrees(45);
 * transform.setSize(0.5, 0.5);
 * // transform is now positioned at (0.5, 0.5), rotated 45 degrees, and scaled to 0.5x0.5
 * const trsMatrix = transform.getTRSMatrix();
 * // trsMatrix returns a matrix that represents the transformation.
 * // This matrix can be used to draw the object.
 */
export default class Transform {
  private _position: vec2;
  private _scale: vec2;
  private _rotation: number;

  /**
   * Creates a transform.
   * @constructor
   * @example
   * const transform = new Transform();
   * // transform is now available
   */
  constructor() {
    this._position = vec2.fromValues(0, 0); // translation x and y
    this._scale = vec2.fromValues(1, 1); // width and height
    this._rotation = 0.0; //radians
  }

  /**
   * Sets the position of the object.
   * @param {number} posX - The x position of the object.
   * @param {number} posY - The y position of the object.
   * @returns {void}
   * @example
   * transform.setPosition(0.5, 0.5);
   * // transform is now positioned at (0.5, 0.5)
   */
  setPosition(posX: number, posY: number): void {
    this._position = vec2.fromValues(posX, posY);
  }

  /**
   * Sets the x position of the object.
   * @param {number} posX - The x position of the object.\
   * @returns {void}
   * @example
   * transform.setPositionX(0.5);
   * // transform is now positioned at (0.5, 1)
   */
  setPositionX(posX: number): void {
    this._position[0] = posX;
  }

  /**
   * Sets the y position of the object.
   * @param {number} posY - The y position of the object.
   * @returns {void}
   * @example
   * transform.setPositionY(0.5);
   * // transform is now positioned at (0.5, 1)
   */
  setPositionY(posY: number): void {
    this._position[1] = posY;
  }

  /**
   * Increments the x position of the object.
   * @param {number} increment - The amount to increment the x position of the object.
   * @returns {void}
   * @example
   * // assume transform position is (0, 0)
   * transform.incrementPositionX(0.5);
   * // transform is now positioned at (0.5, 0)
   * transform.incrementPositionX(0.5);
   * // transform is now positioned at (1, 0)
   */
  incrementPositionX(increment: number): void {
    this._position[0] += increment;
  }

  /**
   * Increments the y position of the object.
   * @param {number} increment - The amount to increment the y position of the object.
   * @returns {void}
   * @example
   * // assume transform position is (0, 0)
   * transform.incrementPositionY(0.5);
   * // transform is now positioned at (0, 0.5)
   * transform.incrementPositionY(0.5);
   * // transform is now positioned at (0, 1)
   */
  incrementPositionY(increment: number): void {
    this._position[1] += increment;
  }

  /**
   * Gets the position of the object.
   * @returns {vec2} - The position of the object.
   * @example
   * const position = transform.getPosition();
   * // returns [0.5, 0.5] if transform is positioned at (0.5, 0.5)
   */
  getPosition(): vec2 {
    return this._position;
  }

  /**
   * Gets the x position of the object.
   * @returns {number} - The x position of the object.
   * @example
   * const posX = transform.getPositionX();
   * // returns 0.5 if transform is positioned at (0.5, 1)
   */
  getPositionX(): number {
    return this._position[0];
  }

  /**
   * Gets the y position of the object.
   * @returns {number} - The y position of the object.
   * @example
   * const posY = transform.getPositionY();
   * // returns 1 if transform is positioned at (0.5, 1)
   */
  getPositionY(): number {
    return this._position[1];
  }

  /**
   * Sets the size of the object.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   * @returns {void}
   * @example
   * transform.setSize(0.5, 0.5);
   * // transform is now scaled to 0.5x0.5
   */
  setSize(width: number, height: number): void {
    this._scale = vec2.fromValues(width, height);
  }

  /**
   * Sets the width of the object.
   * @param {number} width - The width of the object.
   * @returns {void}
   * @example
   * transform.setWidth(0.5);
   * // transform is now scaled to 0.5x1
   */
  setWidth(width: number): void {
    this._scale[0] = width;
  }

  /**
   * Sets the height of the object.
   * @param {number} height - The height of the object.
   * @returns {void}
   * @example
   * transform.setHeight(0.5);
   * // transform is now scaled to 1x0.5
   */
  setHeight(height: number): void {
    this._scale[1] = height;
  }

  /**
   * Gets the size of the object.
   * @returns {vec2} - The size of the object.
   * @example
   * const size = transform.getSize();
   * // returns [0.5, 0.5] if transform is scaled to 0.5x0.5
   */
  getSize(): vec2 {
    return this._scale;
  }

  /**
   * Gets the width of the object.
   * @returns {number} - The width of the object.
   * @example
   * const width = transform.getWidth();
   * // returns 0.5 if transform is scaled to 0.5x1
   */
  getWidth(): number {
    return this._scale[0];
  }

  /**
   * Gets the height of the object.
   * @returns {number} - The height of the object.
   * @example
   * const height = transform.getHeight();
   * // returns 1 if transform is scaled to 0.5x1
   */
  getHeight(): number {
    return this._scale[1];
  }

  /**
   * Increments the width of the object.
   * @param {number} increment - The amount to increment the width of the object.
   * @returns {void}
   * @example
   * // assume transform scale is 1x1
   * transform.incrementWidth(0.5);
   * // transform is now scaled to 1.5x1
   * transform.incrementWidth(0.5);
   * // transform is now scaled to 2x1
   */
  incrementSizeX(increment: number): void {
    this._scale[0] += increment;
  }

  /**
   * Increments the height of the object.
   * @param {number} increment - The amount to increment the height of the object.
   * @returns {void}
   * @example
   * // assume transform scale is 1x1
   * transform.incrementHeight(0.5);
   * // transform is now scaled to 1x1.5
   * transform.incrementHeight(0.5);
   * // transform is now scaled to 1x2
   */
  incrementSizeY(increment: number): void {
    this._scale[1] += increment;
  }

  /**
   * Increments both the width and height of the object.
   * @param {number} increment - The amount to increment the width and height of the object.
   * @returns {void}
   * @example
   * // assume transform scale is 1x1
   * transform.incrementSize(0.5);
   * // transform is now scaled to 1.5x1.5
   * transform.incrementSize(0.5);
   * // transform is now scaled to 2x2
   */
  incrementSize(increment: number): void {
    this._scale[0] += increment;
    this._scale[1] += increment;
  }

  /**
   * Sets the rotation of the object.
   * @param {number} degrees - The rotation of the object in degrees.
   * @returns {void}
   * @example
   * transform.setRotationDegrees(45);
   * // transform is now set to .785398 radians
   */
  setRotationDegrees(degrees: number): void {
    this._rotation = (degrees * Math.PI) / 180;
  }

  /**
   * Gets the rotation of the object in degrees.
   * @returns {number} - The rotation of the object in degrees.
   * @example
   * const degrees = transform.getRotationDegrees();
   * // returns 28.6479 if transform is rotated .5 radians
   */
  getRotationDegrees(): number {
    return (this._rotation * 180) / Math.PI;
  }

  /**
   * Increments the rotation of the object in degrees.
   * @param {number} increment - The amount to increment the rotation of the object in degrees.
   * @returns {void}
   * @example
   * // assume transform rotation is 0 radians
   * transform.incrementRotationDegrees(45);
   * // transform is now rotated .785398 radians
   * transform.incrementRotationDegrees(45);
   * // transform is now rotated 1.5708 radians
   */
  incrementRotationDegrees(increment: number): void {
    this._rotation += (increment * Math.PI) / 180;
  }

  /**
   * Sets the rotation of the object in radians.
   * @param {number} radians - The rotation of the object in radians.
   * @returns {void}
   * @example
   * transform.setRotationRadians(0.6);
   * // transform is now set to 0.6 radians
   */
  setRotationRadians(radians: number): void {
    this._rotation = radians;
  }

  /**
   * Gets the rotation of the object in radians.
   * @returns {number} - The rotation of the object in radians.
   * @example
   * const radians = transform.getRotationRadians();
   * // returns 0.6 if transform is rotated 0.6 radians
   */
  getRotationRadians(): number {
    return this._rotation;
  }

  /**
   * Increments the rotation of the object in radians.
   * @param {number} increment - The amount to increment the rotation of the object in radians.
   * @returns {void}
   * @example
   * // assume transform rotation is 0 radians
   * transform.incrementRotationRadians(0.6);
   * // transform is now rotated 0.6 radians
   * transform.incrementRotationRadians(0.6);
   * // transform is now rotated 1.2 radians
   */
  incrementRotationRadians(increment: number): void {
    this._rotation += increment;
  }

  /**
   * Gets the TRS matrix of the object.
   * @returns {mat4} - The TRS matrix of the object.
   * @example
   * const trsMatrix = transform.getTRSMatrix();
   * // returns a matrix that represents the transformation
   * // this matrix can be used to draw the object
   */
  getTRSMatrix(): mat4 {
    const matrix = mat4.create();

    mat4.translate(
      matrix,
      matrix,
      vec3.fromValues(this.getPositionX(), this.getPositionY(), 0.0)
    );
    mat4.rotateZ(matrix, matrix, this.getRotationRadians());
    mat4.scale(
      matrix,
      matrix,
      vec3.fromValues(this.getWidth(), this.getHeight(), 1.0)
    );

    return matrix;
  }
}
