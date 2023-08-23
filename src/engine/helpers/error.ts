/**
 * Module for error classes to help narrow error sources
 * @module errors
 */

/**
 * Error for issues with base render functionality
 * @extends {Error}
 * */
export class RenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RenderError';
  }
}

/**
 * Error for issues with vertex buffer functionality
 * @extends {Error}
 * */
export class VertexBufferError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VertexBufferError';
  }
}

/**
 * Error for issues with shaders
 * @extends {Error}
 * */
export class ShaderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShaderError';
  }
}

/**
 * Error for issues with shader resources
 * @extends {Error}
 * */
export class ShaderResourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShaderResourceError';
  }
}
