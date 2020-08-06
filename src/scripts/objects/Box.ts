import { Wall } from './Wall';

export class Box extends Phaser.GameObjects.GameObject {
  private group: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    super(scene, 'group');
    const { width, height } = scene.cameras.main;
    this.group = scene.add.group([
      new Wall(scene, width / 2, 50),
      new Wall(scene, width / 2, height - 50),
      new Wall(scene, 50, height / 2, Wall.Vertical),
      new Wall(scene, width - 50, height / 2, Wall.Vertical),
    ]);
  }

  getGroup() {
    return this.group;
  }
}
