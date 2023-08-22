import {RenderError} from './helpers/error.js';

const canvas: HTMLElement | null = document.getElementById('gummiCanvas');

if (!canvas) {
  throw new RenderError('Could not find entry point');
}
