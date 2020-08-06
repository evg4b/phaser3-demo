import FpsText from '../objects/FpsText';
import { Ring, Ball } from '../objects';

export class MainScene extends Phaser.Scene {
  private fpsText: Phaser.GameObjects.Text;

  private margin = 50;

  private balls: Phaser.GameObjects.Group;

  private rings: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.fpsText = new FpsText(this);
    this.balls = this.make.group({
      classType: Ball,
      key: 'ball',
      frameQuantity: 20,
    });
    const rect = new Phaser.Geom.Rectangle(300, 300, 150, 100);

    //  Randomly position the sprites within the rectangle
    Phaser.Actions.RandomRectangle(this.balls.getChildren(), rect);

    this.rings = this.make.group({
      classType: this.makeRandomRing,
      key: 'ring',
      quantity: 5,
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      Phaser.Actions.Call(this.balls.getChildren(), (p) => {
        const ball = p as Ball;
        const power = Phaser.Math.Distance.BetweenPoints(ball.getCenter(), pointer);
        const angle = Phaser.Math.Angle.BetweenPoints(ball.getCenter(), pointer);
        const demo = ball.getCenter().clone().setAngle(angle).negate()
          .scale(this.cameras.main.width / (10 * power));
        ball.setVelocity(demo.x, demo.y);
      }, this);
    }, this);

    this.physics.add.collider(this.balls, this.balls);
  }

  update() {
    this.fpsText.update();
  }

  makeRandomRing = (): Ring => {
    const x = Phaser.Math.Between(this.margin, this.cameras.main.width - this.margin);
    const y = Phaser.Math.Between(this.margin, this.cameras.main.height * (2 / 3));
    return new Ring(this, x, y);
  }
}
