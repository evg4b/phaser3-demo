/* eslint-disable no-unused-vars */

import FpsText from '../objects/FpsText';
import { Ring, Ball, Wall, Box } from '../objects';

export class MainScene extends Phaser.Scene {
  private fpsText: Phaser.GameObjects.Text;

  private margin = 50;

  private balls: Phaser.GameObjects.Group;

  private rings: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    const box = new Box(this);
    this.fpsText = new FpsText(this);
    this.balls = this.make.group({
      classType: Ball,
      key: 'ball',
      frameQuantity: 20,
    });
    const rect = new Phaser.Geom.Rectangle(300, 300, 150, 100);
    Phaser.Actions.RandomRectangle(this.balls.getChildren(), rect);

    this.rings = this.make.group({
      classType: Ring,
      key: 'ring',
      quantity: 5,
    });

    const ringRect = new Phaser.Geom.Rectangle(
      this.margin,
      this.margin,
      this.cameras.main.width - this.margin * 2,
      this.cameras.main.height * (2 / 3),
    );
    Phaser.Actions.RandomRectangle(this.rings.getChildren(), ringRect);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      Phaser.Actions.Call(this.balls.getChildren(), (p) => {
        const ball = p as Ball;
        const power = Phaser.Math.Distance.BetweenPoints(ball.getCenter(), pointer);
        const angle = Phaser.Math.Angle.BetweenPoints(ball.getCenter(), pointer);
        const targetVector = ball.getCenter()
          .clone()
          .setAngle(angle)
          .negate()
          .scale(this.cameras.main.width / (10 * power));
        ball.setVelocity(targetVector.x, targetVector.y);
      }, this);
    }, this);

    this.physics.add.collider(this.balls, this.balls);
    // eslint-disable-next-line max-len
    this.physics.add.collider(this.balls, box.getGroup(), (ball, wall) => (wall as Wall).collision());
    this.physics.add.overlap(this.balls, this.rings, (ball, ring) => {
      ball.destroy();
    });
  }

  update() {
    this.fpsText.update();
  }
}
