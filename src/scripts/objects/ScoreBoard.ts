export class ScoreBoard extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, score: number) {
    super(scene, 50, 20, ScoreBoard.makeMessage(score), {
      color: 'black',
      fontSize: '28px',
      fontFamily: 'Bungee',
    });
    scene.add.existing(this);
    this.setOrigin(0);
  }

  update(score: number) {
    this.setText(ScoreBoard.makeMessage(score));
  }

  static makeMessage(score: number) {
    return `Your score: ${score}`;
  }
}
