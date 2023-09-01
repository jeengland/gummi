import {Client} from '..';
import {
  audio,
  Camera,
  clearCanvas,
  input,
  Renderable,
  Scene,
  texture,
  xml,
} from '../../engine';
import {Key} from '../../engine/types';
import SceneFileParser from '../util/sceneParser';

// constants
const BGM_SRC = 'src/client/assets/audio/bg_clip.mp3';
const CUE_SRC = 'src/client/assets/audio/next_level_cue.wav';
const PORTAL_SRC = 'src/client/assets/images/minion_portal.jpg';
const COLLECTOR_SRC = 'src/client/assets/images/minion_collector.jpg';
const SCENE_SRC = 'src/client/assets/scene.xml';

export default class NextLevel extends Scene {
  private _camera: Camera | null;
  private _squares: Renderable[] | null;

  constructor() {
    super();

    this._camera = null;
    this._squares = [];
  }

  init() {
    const xmlFile = xml.getXml(SCENE_SRC);

    if (!xmlFile) {
      throw new Error('Could not load scene file');
    }

    const parser = new SceneFileParser(xmlFile);

    this._camera = parser.parseCamera();
    this._squares!.push(...parser.parseRenderables());
    this._squares!.push(...parser.parseTextureRenderables());

    audio.playBgm(BGM_SRC, 0.5);
  }

  update(): void {
    const whiteXform = this._squares![0].getXform();
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

    if (input.isKeyPressed(Key.Right) || input.isKeyPressed(Key.Left)) {
      audio.playCue(CUE_SRC, 0.5);
    }

    if (input.isKeyPressed(Key.Q) || input.isKeyPressed(Key.Escape)) {
      this.stop();
    }

    const color = this._squares![0].getColor();
    let augmentedColor = color[3] + deltaX;

    if (augmentedColor > 1) {
      augmentedColor = 0;
    }

    color[3] = augmentedColor;
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
    xml.loadXml(SCENE_SRC);

    audio.loadAudio(BGM_SRC);
    audio.loadAudio(CUE_SRC);

    texture.loadTexture(PORTAL_SRC);
    texture.loadTexture(COLLECTOR_SRC);
  }

  unload() {
    xml.unloadXml(SCENE_SRC);

    audio.stopBgm();

    audio.unloadAudio(BGM_SRC);
    audio.unloadAudio(CUE_SRC);

    texture.unloadTexture(PORTAL_SRC);
    texture.unloadTexture(COLLECTOR_SRC);
  }
}
