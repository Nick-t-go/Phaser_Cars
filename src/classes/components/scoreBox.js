class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.text1 = this.scene.add.text(0, 0, 'SCORE: 0');
    this.add(this.text1);

    this.scene.add.existing(this);
    this.scene.emitter.on(this.scene.gameConstants.SCORE_UPDATED, this.scoreUpdated, this);
  }

  scoreUpdated() {
  	this.text1.setText(`Score: ${this.scene.model.score}`);
  }
}

export {
  ScoreBox
}