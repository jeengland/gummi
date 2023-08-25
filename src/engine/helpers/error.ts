/**
 * Module for error classes to help narrow error sources
 * @module errors
 */

/**
 * Error for issues with base render functionality
 * Errors of this type originate from the gl module
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
 * Errors of this type originate from the vertexBuffer module
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
 * Errors of this type originate from a shader module
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
 * Errors of this type originate from the shaderResources module
 * @extends {Error}
 * */
export class ShaderResourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShaderResourceError';
  }
}

/**
 * Error for issues with scenes and looping
 * Errors of this type originate from the loop module
 * @extends {Error}
 * */
export class LoopError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoopError';
  }
}

/**
 * Error for issues with resource loading
 * Errors of this type originate from the resourceMap module
 * @extends {Error}
 * */
export class ResourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResourceError';
  }
}
