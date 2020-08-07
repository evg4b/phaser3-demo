import 'phaser';
import { MainScene, PreloadScene, ScoreScene } from './scenes';

const DEFAULT_WIDTH = 900;
const DEFAULT_HEIGHT = 1280;

window.addEventListener('load', () => new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  banner: false,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MainScene, ScoreScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  disableContextMenu: true,
}));
