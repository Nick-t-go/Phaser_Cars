class FlatButton extends Phaser.GameObjects.Container {
  constructor({
    text = 'Button Text',
    x = 0,
    y = 0,
    scene,
    key,
    event,
    emitter,
    params = 'Boop',
    textConfig = {
      color: 'white',
      fontSize: 20
    },
    isMobile = false,
  }) {

    if (!scene || !key) {
      const msg = !scene ? 'missing scene' : 'missing key';
      console.log(msg);
      super();
      return;
    }

    super(scene);

    this.scene = scene;
    this.back = this.scene.add.image(0, 0, key);
    this.add(this.back);
    this.text1 = this.scene.add.text(0, 0, text, textConfig);
    this.text1.setOrigin(0.5, 0.5);
    this.add(this.text1);
    this.x = x;
    this.y = y;

    if (event && emitter) {
      this.back.setInteractive();
      this.back.on('pointerdown', this.pressed, this);
      this.emitter = emitter;
      this.event = event;
      this.params = params;
    }

    if (!isMobile) {
      this.back.on('pointerover', this.hover, this);
      this.back.on('pointerout', this.out, this);
    }


    this.scene.add.existing(this);
  }

  hover() {
    this.y -= 5;
  }

  out() {
    this.y += 5;
  }


  pressed() {
    this.emitter.emit(this.event, this.params);
  }

}

export {
  FlatButton,
}