class Bar extends Phaser.GameObjects.Container {
  constructor({
    scene,
    x = 10,
    y = 10,
    color = 0xff0000,
    width = 200,
    height = 50,
  }) {
    super(scene);
    this.scene = scene;
    this.graphics = this.scene.add.graphics();
    this.graphics.fillStyle(color);
    this.graphics.fillRect(0, 0, width, height);
    this.add(this.graphics);
    this.graphics.x = -width / 2;
    this.graphics.y = -height / 2;
    this.x = x;
    this.y = y;
    this.scene.add.existing(this);
  }

  setPercent(per) {
    this.graphics.scaleX = per;
  }
}

export {
  Bar,
}