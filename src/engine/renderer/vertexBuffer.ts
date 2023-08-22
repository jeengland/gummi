/**
    Module to handle vertex buffer functionality.
    @module vertexBuffer
*/

import {getGl} from './renderer';
import {VertexBufferError} from '../helpers/error';

let vertexBuffer: WebGLBuffer;

const mVerticesOfSquare = [
  0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,
];

function confirmVertexBuffer(): void {
  if (!vertexBuffer) {
    throw new VertexBufferError('Vertex buffer not initialized');
  }
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
  confirmVertexBuffer();
  return vertexBuffer;
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

  vertexBuffer = buffer;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(mVerticesOfSquare),
    gl.STATIC_DRAW
  );
}
