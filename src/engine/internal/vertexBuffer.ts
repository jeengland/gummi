/**
    Module to handle vertex buffer functionality.
    @module vertexBuffer
*/

import {getGl} from '../internal/gl';
import {VertexBufferError} from '../helpers/error';

let _vertexBuffer: WebGLBuffer | null;

// 2D square vertices
// X, Y, Z
// using prettier-ignore to keep the array formatted more readably
// prettier-ignore
const mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0,
];

/**
 * Confirms that the vertex buffer has been initialized.
 * @throws {VertexBufferError} - If the vertex buffer has not been initialized.
 * @returns {WebGLBuffer} - The vertex buffer.
 * @example
 * const vb = confirmVertexBuffer();
 * // throws error if vertex buffer has not been initialized
 * // otherwise, vertex buffer is returned
 */
function confirmVertexBuffer(): WebGLBuffer {
  if (!_vertexBuffer) {
    throw new VertexBufferError('Vertex buffer not initialized');
  }

  return _vertexBuffer;
}

/**
 * Gets the vertex buffer.
 * @throws {VertexBufferError} - If the vertex buffer has not been initialized.
 * @returns {WebGLBuffer} - The vertex buffer.
 * @example
 * const vertexBuffer = getVertexBuffer();
 * // vertex buffer is now available
 */
export function getVertexBuffer(): WebGLBuffer {
  const buffer = confirmVertexBuffer();
  return buffer;
}

/**
 * Initializes the vertex buffer.
 * @throws {VertexBufferError} - If the vertex buffer cannot be created.
 * @returns {void}
 * @example
 * initVertexBuffer();
 * // vertex buffer is now available
 */
export function initVertexBuffer(): void {
  const gl = getGl();

  const buffer = gl.createBuffer();

  if (!buffer) {
    throw new VertexBufferError('Could not create vertex buffer');
  }

  _vertexBuffer = buffer;

  gl.bindBuffer(gl.ARRAY_BUFFER, _vertexBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(mVerticesOfSquare),
    gl.STATIC_DRAW
  );
}

/**
 * Cleans up the vertex buffer.
 * @throws {VertexBufferError} - If the vertex buffer has not been initialized.
 * @returns {void}
 * @example
 * cleanupVertexBuffer();
 * // vertex buffer is now cleaned up
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteBuffer | MDN}
 */
export function cleanupVertexBuffer(): void {
  confirmVertexBuffer();
  const gl = getGl();
  gl.deleteBuffer(_vertexBuffer);
  _vertexBuffer = null;
}
