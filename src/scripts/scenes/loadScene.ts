export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('ring', 'assets/img/ring.png');
    this.load.image('ball', 'assets/img/ball.png');
    this.load.image('wall-h', 'assets/img/wall-h.png');
    this.load.image('wall-v', 'assets/img/wall-v.png');
    this.load.image('background', 'assets/img/background.png');
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  create() {
    this.scene.start('MainScene');
  }
}
