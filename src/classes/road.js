import {
  Align
} from './util/align';
import {
  Collision
} from './util/collision';
import {
  ScreenConfig
} from './util/screenConfig';

class Road extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.back = this.scene.add.image(0, 0, 'road');
    this.add(this.back);
    this.scene.add.existing(this);
    this.screenHeight = ScreenConfig.height();
    this.screenWidth = ScreenConfig.width();

    Align.scaleToGameW(this.back, 0.5, this.screenWidth);

    this.setSize(this.back.dispayWidth, this.screenHeight);
    this.lineGroup = this.scene.add.group();
    this.count = 0;

    this.car = this.scene.add.sprite(this.back.displayWidth / 4, this.screenHeight * 0.9, 'cars');
    Align.scaleToGameW(this.car, 0.10, this.screenWidth);
    this.add(this.car);

    this.back.setInteractive();
    this.back.on('pointerdown', this.changeLanes, this);
    this.addObject();
  }

  addObject() {
    const objs = [{
      key: 'pcar1',
      speed: 10,
      scale: 0.1,
    },
    {
      key: 'pcar2',
      speed: 10,
      scale: 0.1,
    },
    {
      key: 'cone',
      speed: 20,
      scale: 0.05,
    },
    {
      key: 'barrier',
      speed: 20,
      scale: 0.08,
    }];

    const index = Math.floor(Math.random() * 4);
    const {
      key,
      speed,
      scale,
    } = objs[index];

    this.object = this.scene.add.sprite(this.back.displayWidth / 4, 0, key);
    this.object.speed = speed;
    this.object.scale = scale;
    const lane = Math.random() * 100;
    if (lane < 50) {
      this.object.x = -this.back.displayWidth / 4;
    }
    Align.scaleToGameW(this.object, this.object.scale, this.screenWidth);
    this.add(this.object);
  }

  changeLanes() {
    if (this.scene.model.gameOver) return;
    this.scene.emitter.emit(this.scene.G.PLAY_SOUND, 'whoosh');
    const dWidth = this.back.displayWidth;
    this.car.x = this.car.x > 0 ? -dWidth / 4 : dWidth / 4;
  }

  makeLines() {
    this.vSpace = this.displayHeight / 10;
    for (let i = 0; i < 20; i++) {
      const line = this.scene.add.image(this.x, this.vSpace * i, 'line');
      line.oy = line.y;
      this.lineGroup.add(line);
    }
  }

  moveLines() {
    this.lineGroup.children.iterate((child) => {
      child.y += this.vSpace / 20;
    });
    this.count++;
    if (this.count === 20) {
      this.count = 0;
      this.lineGroup.children.iterate((child) => {
        child.y = child.oy;
      });
    }
  }

  goGameOver() {
    this.scene.start('SceneOver');
  }

  moveObject() {
    this.object.y += this.vSpace / this.object.speed;
    if (Collision.checkCollide(this.car, this.object)) {
      this.scene.emitter.emit(this.scene.G.PLAY_SOUND, 'boom');
      this.scene.tweens.add({
        targets: this.car,
        duration: 1000,
        y: ScreenConfig.height(),
        angle: -270,
      });
      this.scene.model.gameOver = true;
      this.scene.time.addEvent({
        delay: 2000,
        callback: this.goGameOver,
        callbackScope: this.scene,
        loop: false,
      });
    } 

    if (this.object.y > this.screenHeight) {
      this.scene.emitter.emit(this.scene.G.UP_POINTS, 1);
      this.object.destroy();
      this.addObject();
    }
  }
}

export {
  Road
}