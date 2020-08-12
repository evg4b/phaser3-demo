import FontFaceObserver from 'fontfaceobserver';
import { FONT_FAMILY, SCENES, TEXTURES } from '../constants';

export class PreloadScene extends Phaser.Scene {
  private font: FontFaceObserver;

  constructor() {
    super({ key: SCENES.PRELOAD });
    this.font = new FontFaceObserver(FONT_FAMILY);
  }

  public preload() {
    this.load.image(TEXTURES.RING, 'assets/img/ring.png');
    this.load.image(TEXTURES.BALL, 'assets/img/ball.png');
    this.load.image(TEXTURES.WALL_HORIZONTAL, 'assets/img/wall-h.png');
    this.load.image(TEXTURES.WALL_VERTICAL, 'assets/img/wall-v.png');
    this.load.image(TEXTURES.BACKGROUND, 'assets/img/background.png');
  }

  public create() {
    this.font.load()
      .then(() => this.scene.start(SCENES.MAIN))
      .catch(() => { throw new Error(`Failed load font: '${FONT_FAMILY}'`); });
  }
}
