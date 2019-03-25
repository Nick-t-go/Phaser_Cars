import {
  ScreenConfig,
} from '../classes/util/screenConfig';


class SceneLoad extends Phaser.Scene {
  constructor() {
    super('SceneLoader');
  }

  preload() {
    this.progText = this.add.text(ScreenConfig.width() / 2, ScreenConfig.height() / 2, '0%', {
      color: '#ffffff',
      fontSize: ScreenConfig.width() / 20,
    });
    this.progText.setOrigin(0.5, 0.5);
    this.load.on('progress', this.onProgress, this);
    this.load.image('road', 'assets/road-rush-image-1/road.jpg');
    this.load.spritesheet('cars', 'assets/road-rush-image-1/cars.png', {
      frameWidth: 60,
      frameHeight: 126,
    });
    this.load.image('line', 'assets/road-rush-image-1/line.png');
    this.load.image('barrier', 'assets/objs/barrier.png');
    this.load.image('cone', 'assets/objs/cone.png');
    this.load.image('pcar1', 'assets/objs/pcar1.png');
    this.load.image('pcar2', 'assets/objs/pcar2.png');

    this.load.image('toggleBack', 'assets/ui/toggles/1.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');

    this.load.audio('backgroundMusic', ['assets/audio/random-race.mp3', 'audio/random-race.ogg']);
    this.load.audio('boom', ['assets/audio/boom.mp3', 'assets/audio/boom.ogg']);
    this.load.audio('whoosh', ['assets/audio/whoosh.mp3', 'assets/audio/whoosh.ogg']);
  }

  onProgress(value) {
  	const per = Math.floor(value * 100);
    this.progText.setText(`${per}%`);
  }

  create() {
    this.scene.start('SceneTitle')
  }
}

export {
  SceneLoad,
}