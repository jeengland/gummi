import {
  Camera,
  clearCanvas,
  init,
  input,
  Renderable,
  xml,
} from '../engine/index';
import {startLoop} from '../engine/internal/loop';
import {Color, Key} from '../engine/types';
import SceneFileParser from './util/sceneParser';

function getRandomColor(): Color {
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();
  return [r, g, b, 1];
}

class Client {
  private _sceneFile: string;
  private _squares: Renderable[] | null;
  private _camera: Camera | null;

  constructor() {
    this._sceneFile = '/src/client/assets/scene.xml';
    this._squares = null;
    this._camera = null;
  }

  // using the following function to emulate how scene class will eventually work
  // using engine internals for now but this is not ideal
  init() {
    const xmlFile = xml.getXml(this._sceneFile);

    if (!xmlFile) {
      throw new Error('Could not load scene file');
    }

    const parser = new SceneFileParser(xmlFile);

    this._camera = parser.parseCamera();
    this._squares = parser.parseRenderables();
  }

  draw() {
    clearCanvas([0.9, 0.9, 0.9, 1]);
    this._camera!.setViewAndCameraMatrix();
    for (let i = 0; i < this._squares!.length; i++) {
      this._squares![i].draw(this._camera!);
    }
  }

  update() {
    const whiteXform = this._squares![0].getXform();
    const deltaX = 0.05;
    if (input.isKeyDown(Key.Right)) {
      if (whiteXform.getPositionX() > 30) {
        whiteXform.setPosition(10, 60);
      }
      whiteXform.incrementPositionX(deltaX);
      whiteXform.incrementRotationDegrees(1);
    }
    if (input.isKeyDown(Key.Left)) {
      if (whiteXform.getPositionX() < 10) {
        whiteXform.setPosition(30, 60);
      }
      whiteXform.incrementPositionX(-deltaX);
      whiteXform.incrementRotationDegrees(-1);
    }
    const redXform = this._squares![1].getXform();
    if (input.isKeyDown(Key.Up)) {
      if (redXform.getWidth() > 5) {
        redXform.setSize(2, 2);
      }
      redXform.incrementSize(0.05);
    }
    if (input.isKeyDown(Key.Down)) {
      if (redXform.getWidth() < 2) {
        redXform.setSize(5, 5);
      }
      redXform.incrementSize(-0.05);
    }
    if (input.isKeyPressed(Key.A)) {
      this._squares![0].setColor(getRandomColor());
    }
    if (input.isKeyPressed(Key.S)) {
      this._squares![1].setColor(getRandomColor());
    }
    if (input.isKeyPressed(Key.D)) {
      this._camera!.setBackgroundColor(getRandomColor());
    }
  }

  load() {
    xml.loadXml(this._sceneFile);
  }

  unload() {
    xml.unloadXml(this._sceneFile);
  }
}

window.onload = () => {
  init('gummiCanvas');
  const client = new Client();

  startLoop(client);
};
