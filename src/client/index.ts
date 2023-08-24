import {mat4, vec2, vec3} from 'gl-matrix';
import {init, clearCanvas, Renderable} from '../engine/index';
import {getGl} from '../engine/internal/gl';

class Client {
  private _blueSq: Renderable;
  private _redSq: Renderable;
  private _tLSq: Renderable;
  private _tRSq: Renderable;
  private _bLSq: Renderable;
  private _bRSq: Renderable;

  constructor(canvasId: string) {
    init(canvasId);

    this._blueSq = new Renderable();
    this._blueSq.setColor([0.25, 0.25, 0.95, 1]);
    this._redSq = new Renderable();
    this._redSq.setColor([1, 0.25, 0.25, 1]);

    this._tLSq = new Renderable();
    this._tLSq.setColor([0.1, 0.9, 0.1, 1]);

    this._tRSq = new Renderable();
    this._tRSq.setColor([0.9, 0.1, 0.1, 1]);

    this._bLSq = new Renderable();
    this._bLSq.setColor([0.1, 0.1, 0.9, 1]);

    this._bRSq = new Renderable();
    this._bRSq.setColor([0.1, 0.1, 0.1, 1]);

    clearCanvas([0.5, 0, 0.8, 1]);

    const gl = getGl();

    gl.viewport(20, 40, 600, 300);
    gl.scissor(20, 40, 600, 300);

    gl.enable(gl.SCISSOR_TEST);

    clearCanvas([0.4, 0, 0.7, 1]);

    gl.disable(gl.SCISSOR_TEST);

    const cameraCenter = vec2.fromValues(20, 60);
    const wcSize = vec2.fromValues(20, 10);
    const cameraMatrix = mat4.create();

    mat4.scale(
      cameraMatrix,
      mat4.create(),
      vec3.fromValues(2 / wcSize[0], 2 / wcSize[1], 1)
    );
    mat4.translate(
      cameraMatrix,
      cameraMatrix,
      vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 0)
    );

    this._blueSq.getXform().setPosition(20, 60);
    this._blueSq.getXform().setRotationDegrees(45);
    this._blueSq.getXform().setSize(5, 5);
    this._blueSq.draw(cameraMatrix);

    this._redSq.getXform().setPosition(20, 60);
    this._redSq.getXform().setSize(2, 2);
    this._redSq.draw(cameraMatrix);

    this._tRSq.getXform().setPosition(10, 65);
    this._tRSq.draw(cameraMatrix);

    this._tLSq.getXform().setPosition(30, 65);
    this._tLSq.draw(cameraMatrix);

    this._bRSq.getXform().setPosition(30, 55);
    this._bRSq.draw(cameraMatrix);

    this._bLSq.getXform().setPosition(10, 55);
    this._bLSq.draw(cameraMatrix);
  }
}

window.onload = () => {
  new Client('gummiCanvas');
};
