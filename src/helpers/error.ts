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
