import { SCORE_STYLES } from '../constants';

export class ScoreBoard extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, score: number) {
    super(scene, 50, 20, ScoreBoard.makeMessage(score), SCORE_STYLES);
    scene.add.existing(this);
    this.setOrigin(0);
  }

  public update(score: number) {
    this.setText(ScoreBoard.makeMessage(score));
  }

  private static makeMessage(score: number) {
    return `Your score: ${String(score).padStart(4, '0')}`;
  }
}
