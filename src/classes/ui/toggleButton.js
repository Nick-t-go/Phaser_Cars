import {
  Align,
} from '../util/align';


class ToggleButton extends Phaser.GameObjects.Container {
  constructor({
    x = 0,
    y = 0,
    scene,
    backKey,
    event,
    emitter,
    isMobile = false,
    onIcon,
    offIcon,
    value = true,
    width,
  }) {

    if (!scene || !backKey || !onIcon || !offIcon) {
      const msg = !scene ? 'missing scene' : 'missing image';
      console.log(msg);
      super();
      return;
    }

    super(scene);

    this.scene = scene;
    this.back = this.scene.add.image(0, 0, backKey);
    this.onIcon = this.scene.add.image(0, 0, onIcon);
    this.offIcon = this.scene.add.image(0, 0, offIcon);

    Align.scaleToGameW(this.back, 0.1, width);
    Align.scaleToGameW(this.onIcon, 0.05, width);
    Align.scaleToGameW(this.offIcon, 0.05, width);

    this.add(this.back);
    this.add(this.onIcon);
    this.add(this.offIcon);

    this.x = x;
    this.y = y;
    this.value = value;

    this.back.setInteractive();
    this.back.on('pointerdown', this.toggle, this);

    if (event && emitter) {
      this.event = event;
      this.emitter = emitter;
    }

    if (!isMobile) {
      this.back.on('pointerover', this.hover, this);
      this.back.on('pointerout', this.out, this);
    }
    this.setSize(this.back.displayWIdth, this.back.displayHeight);
    this.scene.add.existing(this);
    this.setIcons();
  }

  hover() {
    this.y -= 5;
  }

  out() {
    this.y += 5;
  }

  toggle() {
    this.value = !this.value;
    this.setIcons();
    if (this.event) {
      this.emitter.emit(this.event, this.value);
    }
  }

  setIcons() {
    this.onIcon.visible = this.value;
    this.offIcon.visible = !this.value;
  }
}

export {
  ToggleButton,
}