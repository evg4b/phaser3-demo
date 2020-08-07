import { Ring, Ball, Box, ScoreBoard, Wall } from '../objects';
import { Button } from '../objects/Button';

export class MainScene extends Phaser.Scene {
  private margin = 50;
  private balls: Phaser.GameObjects.Group;
  private rings: Phaser.GameObjects.Group;
  private scoreBoard: ScoreBoard;
  private actionRectangle: Phaser.Geom.Rectangle;
  private score: number;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    const { centerX, centerY, width, height } = this.cameras.main;
    this.actionRectangle = new Phaser.Geom.Rectangle(centerX - 70, height - 170, 140, 100);
    this.add.tileSprite(centerX, centerY, width, height, 'background');
    this.score = 0;
    this.scoreBoard = new ScoreBoard(this, this.score);
    const box = new Box(this);

    this.add.graphics({
      fillStyle: { color: 0x00000, alpha: 0.1 },
    }).fillRectShape(this.actionRectangle);

    this.balls = this.make.group({ classType: Ball, key: 'ball', frameQuantity: 20 });
    Phaser.Actions.RandomRectangle(this.balls.getChildren(), this.actionRectangle);

    this.rings = this.make.group({ classType: Ring, key: 'ring', quantity: 5 });
    const ringRect = new Phaser.Geom.Rectangle(
      this.margin * 2,
      this.margin * 2,
      width - this.margin * 4,
      height * (2 / 3),
    );
    Phaser.Actions.RandomRectangle(this.rings.getChildren(), ringRect);

    // eslint-disable-next-line no-new
    new Button(this, width - 180, 20, 'Restart', () => this.scene.restart());

    this.input.on('pointerdown', this.pointerDownHandler, this);

    this.physics.add.collider(this.balls, this.balls);
    this.physics.add.collider(this.balls, box.getGroup(), (ball, wall) => (wall as Wall).collision());
    this.physics.add.overlap(this.balls, this.rings, (ball) => {
      this.incrementScore();
      ball.destroy();
    });
  }

  private pointerDownHandler = (pointer: Phaser.Input.Pointer) => {
    if (Phaser.Geom.Rectangle.Contains(this.actionRectangle, pointer.x, pointer.y)) {
      Phaser.Actions.Call(this.balls.getChildren(), (x) => this.directBall(x as Ball, pointer), this);
    }
  };

  update() {
    this.scoreBoard.update(this.score);
    Phaser.Actions.Call(this.balls.getChildren(), (x) => {
      if (!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, (x as Ball).getBounds())) {
        (x as Ball).destroy();
      }
    }, this);

    if (!this.balls.getTotalUsed()) {
      this.scene.start('ScoreScene', { score: this.score });
    }
  }

  private directBall(ball: Ball, pointer: Phaser.Input.Pointer) {
    const power = Phaser.Math.Distance.BetweenPoints(ball.getCenter(), pointer);
    const angle = Phaser.Math.Angle.BetweenPoints(ball.getCenter(), pointer);
    const targetVector = ball.getCenter()
      .clone()
      .setAngle(angle)
      .negate()
      .scale(this.cameras.main.width / (10 * power));
    ball.setVelocity(targetVector.x, targetVector.y);
  }

  private incrementScore() {
    this.score += 100;
  }
}
