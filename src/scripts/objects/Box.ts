import { Wall } from './Wall';

export class Box extends Phaser.GameObjects.GameObject {
  private group: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    super(scene, 'group');
    const { centerX, centerY, width, height } = scene.cameras.main;
    this.group = scene.add.group([
      new Wall(scene, centerX, 80),
      new Wall(scene, centerX, height - 50),
      new Wall(scene, 50, centerY + 15, Wall.VERTICAL),
      new Wall(scene, width - 50, centerY + 15, Wall.VERTICAL),
    ]);
  }

  public getGroup() {
    return this.group;
  }
}
