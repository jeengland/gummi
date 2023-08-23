import {init, clearCanvas, Renderable} from '../engine/index';
import {mat4, vec3} from 'gl-matrix';

class Client {
  private _whiteSq: Renderable;
  private _redSq: Renderable;

  constructor(canvasId: string) {
    init(canvasId);

    this._whiteSq = new Renderable();
    this._whiteSq.setColor([1, 1, 1, 1]);
    this._redSq = new Renderable();
    this._redSq.setColor([1, 0, 0, 1]);

    clearCanvas([0.5, 0, 0.8, 1]);

    const trsMatrix = mat4.create();

    mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.5, 0.5, 0));
    mat4.rotateZ(trsMatrix, trsMatrix, Math.PI / 4);
    mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.25, 0.25, 1));

    this._whiteSq.draw(trsMatrix);

    mat4.identity(trsMatrix);

    mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.5, -0.5, 0));
    mat4.rotateZ(trsMatrix, trsMatrix, Math.PI / 4);
    mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.25, 0.25, 1));

    this._redSq.draw(trsMatrix);
  }
}

window.onload = () => {
  new Client('gummiCanvas');
};
