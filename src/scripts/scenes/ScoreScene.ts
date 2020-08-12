import { SCENES, SCORE_STYLES } from '../constants';
import { Button } from '../objects';

export class ScoreScene extends Phaser.Scene {
  private score: number = 0;

  constructor() {
    super({ key: SCENES.SCORE });
  }

  public init({ score }: { score: number }) {
    this.score = score;
  }

  public create() {
    const { centerX, centerY, width, height } = this.cameras.main;
    this.add.tileSprite(centerX, centerY, width, height, 'background');

    this.add.text(centerX - 180, centerY, `Your score: ${String(this.score).padStart(4, '0')}`, {
      ...SCORE_STYLES,
      fontSize: '40px',
    });

    new Button(this, centerX - 70, centerY + 100, 'New game', () => this.scene.start(SCENES.MAIN));
  }
}
