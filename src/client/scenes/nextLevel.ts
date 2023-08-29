import {Client} from '..';
import {Camera, clearCanvas, input, Renderable, Scene, xml} from '../../engine';
import {Key} from '../../engine/types';
import SceneFileParser from '../util/sceneParser';

export default class NextLevel extends Scene {
  private _camera: Camera | null;
  private _squares: Renderable[] | null;
  private _sceneFile: string;

  constructor() {
    super();

    this._camera = null;
    this._squares = null;
    this._sceneFile = 'src/client/assets/scene.xml';
  }

  init() {
    const xmlFile = xml.getXml(this._sceneFile);

    if (!xmlFile) {
      throw new Error('Could not load scene file');
    }

    const parser = new SceneFileParser(xmlFile);

    this._camera = parser.parseCamera();
    this._squares = parser.parseRenderables();
  }

  update(): void {
    const whiteXform = this._squares![1].getXform();
    const deltaX = 0.05;

    if (input.isKeyDown(Key.Right)) {
      if (whiteXform.getPositionX() > 30) {
        whiteXform.setPosition(12, 60);
      }
      whiteXform.incrementPositionX(deltaX);
      whiteXform.incrementRotationDegrees(1);
    }

    if (input.isKeyDown(Key.Left)) {
      if (whiteXform.getPositionX() < 11) {
        this.next();
      }
      whiteXform.incrementPositionX(-deltaX);
      whiteXform.incrementRotationDegrees(-1);
    }

    if (input.isKeyPressed(Key.Q) || input.isKeyPressed(Key.Escape)) {
      this.stop();
    }
  }

  next(): void {
    super.next();

    const nextScene = new Client();
    nextScene.start();
  }

  draw() {
    clearCanvas([0.9, 0.9, 0.9, 1]);
    this._camera!.setViewAndCameraMatrix();
    for (let i = 0; i < this._squares!.length; i++) {
      this._squares![i].draw(this._camera!);
    }
  }

  load() {
    xml.loadXml(this._sceneFile);
  }

  unload() {
    xml.unloadXml(this._sceneFile);
  }
}
